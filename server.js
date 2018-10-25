if (!process.env.NOW) require('dotenv/config')

var REPOSITORY = 'https://verdensmaalene.cdn.prismic.io/api/v2'
var LAYOUTS = [
  [1, 6], [3, 8], [17, 7], [13, 2], [9, 16], [10, 11], [1, 12], [15, 5], [14, 4]
]

var url = require('url')
var ics = require('ics')
var jalla = require('jalla')
var dedent = require('dedent')
var body = require('koa-body')
var route = require('koa-route')
var geoip = require('geoip-lite')
var compose = require('koa-compose')
var parse = require('date-fns/parse')
var { asText } = require('prismic-richtext')
var Prismic = require('prismic-javascript')
var purge = require('./lib/purge')
var resolve = require('./lib/resolve')

var app = jalla('index.js', { sw: 'sw.js' })

// proxy cloudinary on-demand-transform API
app.use(require('./lib/cloudinary-proxy'))

// disallow robots anywhere but live URL
app.use(route.get('/robots.txt', function (ctx, next) {
  // if (ctx.host === 'dk.globalgoals.org') return next()
  ctx.type = 'text/plain'
  ctx.body = dedent`
    User-agent: *
    Disallow: /
  `
}))

// add webhook for prismic updates
app.use(route.post('/prismic-hook', compose([body(), function (ctx) {
  var secret = ctx.request.body && ctx.request.body.secret
  ctx.assert(secret === process.env.PRISMIC_VERDENSMAALENE_SECRET, 403, 'Secret mismatch')
  return new Promise(function (resolve, reject) {
    queried().then(function (urls) {
      purge(urls, function (err, response) {
        if (err) return reject(err)
        ctx.type = 'application/json'
        ctx.body = {}
        resolve()
      })
    })
  })
}])))

// set preview cookie
app.use(route.get('/prismic-preview', async function (ctx) {
  var host = process.env.NOW_URL && url.parse(process.env.NOW_URL).host
  if (host && ctx.host !== host) {
    return ctx.redirect(url.resolve(process.env.NOW_URL, ctx.url))
  }

  var token = ctx.query.token
  var api = await Prismic.api(REPOSITORY, { req: ctx.req })
  var href = await api.previewSession(token, resolve, '/')
  var expires = app.env === 'development'
    ? new Date(Date.now() + (1000 * 60 * 60 * 12))
    : new Date(Date.now() + (1000 * 60 * 30))

  ctx.set('Cache-Control', 'max-age=0')
  ctx.cookies.set(Prismic.previewCookie, token, { expires: expires, path: '/' })
  ctx.redirect(href)
}))

// redirect goal shorthand url to complete slug
app.use(route.get('/:num(\\d{1,2})', async function (ctx, num) {
  var api = await Prismic.api(REPOSITORY, { req: ctx.req })
  var response = await api.query(Prismic.Predicates.at('my.goal.number', +num))
  var doc = response.results[0]
  ctx.assert(doc, 404, 'Page not found')
  ctx.redirect(`/${num}-${doc.uid}`)
}))

// push goal background bundle
app.use(route.get('/:num(\\d{1,2})-:uid', function (ctx, num, uid, next) {
  if (app.env === 'development') return next()
  var reg = new RegExp(`bundle-\\d+-(${num})\\.js`)
  var key = Object.keys(ctx.assets).find((key) => reg.test(key))
  if (key) {
    ctx.append('Link', `<${ctx.assets[key].url}>; rel=preload; as=script`)
  }
  return next()
}))

// get event as iCalendar file
app.use(route.get('/events/:uid.ics', async function (ctx, uid) {
  var api = await Prismic.api(REPOSITORY, { req: ctx.req })
  var response = await api.query(Prismic.Predicates.at('my.event.uid', uid))
  var doc = response.results[0]
  ctx.assert(doc, 404, 'Page not found')
  var start = parse(doc.data.start)
  var end = parse(doc.data.end)
  var event = {
    start: [
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate(),
      start.getHours(),
      start.getMinutes()
    ],
    end: [
      end.getFullYear(),
      end.getMonth() + 1,
      end.getDate(),
      end.getHours(),
      end.getMinutes()
    ],
    title: asText(doc.data.title),
    description: asText(doc.data.description),
    location: [
      doc.data.venue,
      doc.data.street_address,
      `${doc.data.zip_code} ${doc.data.city}`,
      doc.data.country
    ].filter(Boolean).join('\\n '),
    url: 'https://dk.globalgoals.org' + resolve(doc),
    geo: { lat: doc.data.location.latitude, lon: doc.data.location.longitude }
  }

  ctx.type = 'text/calendar'
  ics.createEvent(event, function (err, value) {
    if (err) ctx.throw(err)
    if (doc.data.image.url) {
      var image = `IMAGE;VALUE=URI;DISPLAY=FULLSIZE;FMTTYPE=image/png:https://res.cloudinary.com/dykmd8idd/image/fetch/f_png,w_900,q_auto/${doc.data.image.url}`
    }
    ctx.body = value.replace(/^LOCATION:.+$/m, `$&\n${image}`)
  })
}))

// loopkup user location by ip
app.use(route.get('/geoip', function (ctx, next) {
  ctx.set('Cache-Control', 'max-age=0')
  ctx.type = 'application/json'
  var ip = ctx.headers['cf-connecting-ip'] || ctx.ip
  ctx.body = geoip.lookup(ip.replace('::1', '2.131.255.255'))
}))

// randomize layout
app.use(route.get('/', function (ctx, next) {
  if (!ctx.accepts('html')) return next()
  var layout = parseInt(ctx.query.layout, 10)
  if (!layout) layout = Math.ceil(Math.random() * 9)
  ctx.state.ui = ctx.state.ui || {}
  ctx.state.ui.gridLayout = layout

  // push layout background bundles
  if (app.env !== 'development') {
    var reg = new RegExp(`bundle-\\d+-(${LAYOUTS[layout - 1].join('|')})\\.js`)
    ctx.append('Link', Object.keys(ctx.assets)
      .filter((key) => reg.test(key))
      .map((key) => `<${ctx.assets[key].url}>; rel=preload; as=script`)
    )
  }

  return next()
}))

// expose origin on state
app.use(function (ctx, next) {
  ctx.state.origin = app.env === 'development'
    ? `http://localhost:${process.env.PORT || 8080}`
    : 'https://dk.globalgoals.org'
  return next()
})

// set cache headers
app.use(function (ctx, next) {
  if (!ctx.accepts('html')) return next()
  var previewCookie = ctx.cookies.get(Prismic.previewCookie)
  if (previewCookie) {
    ctx.state.ref = previewCookie
    ctx.set('Cache-Control', 'max-age=0')
  } else {
    ctx.state.ref = null
  }
  var allowCache = app.env !== 'development'
  if (!previewCookie && allowCache && ctx.path !== '/prismic-preview') {
    ctx.set('Cache-Control', `s-maxage=${60 * 60 * 12}, max-age=${60}`)
  }
  return next()
})

if (process.env.NOW && app.env === 'production') {
  queried().then(function (urls) {
    purge(['/sw.js', ...urls], function (err) {
      if (err) throw err
      start()
    })
  })
} else {
  start()
}

// start server
// () -> void
function start () {
  app.listen(process.env.PORT || 8080)
}

// get urls for all queried pages
// () -> Promise
function queried () {
  return Prismic.api(REPOSITORY).then(async function (api) {
    var urls = await api.query(
      Prismic.Predicates.at('document.type', 'news'),
      { pageSize: 6 }
    ).then(function (response) {
      var urls = []
      for (let i = 0; i < response.total_pages; i++) {
        urls.push(`/nyheder?page=${i + 1}`)
      }
      return urls
    })

    for (let i = 0, len = LAYOUTS.length; i < len; i++) {
      urls.push(`/?layout=${i + 1}`)
    }

    return urls
  })
}
