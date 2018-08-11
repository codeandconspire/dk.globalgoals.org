var choo = require('choo')

var REPOSITORY = 'https://verdensmaalene.cdn.prismic.io/api/v2'
var app = choo({hash: false})

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  app.use(require('choo-devtools')())
  app.use(require('choo-service-worker/clear')())
}

app.use(require('choo-service-worker')('/sw.js'))
app.use(require('./stores/prismic')({repository: REPOSITORY, req: app.state.req}))
app.use(require('./stores/meta'))
app.use(require('./stores/ui'))

app.route('/', require('./views/home'))
app.route('/404', require('./views/404'))

try {
  module.exports = app.mount('body')
} catch (err) {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('has-js')
  }
}
