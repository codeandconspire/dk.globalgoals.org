var html = require('choo/html')
var assert = require('assert')
var symbol = require('../symbol')
var { i18n, isSameDomain, filetype, className } = require('../base')

var text = i18n(require('./lang.json'))

module.exports = link
link.loading = loading

function link (opts = {}) {
  assert(opts.href, 'link: href string is required')

  opts.file = opts.file ? opts.file : filetype(opts.href)
  opts.external = opts.external ? opts.external : !isSameDomain(opts.href)

  var attrs = { class: 'Card-link', href: opts.href }
  // Files should only open in new tab if it's a (pdf) document
  if ((opts.external && !opts.file) || opts.file === 'document') {
    attrs.rel = 'noopener noreferrer'
    attrs.target = '_blank'
  }
  if (opts.file) attrs.download = ''
  attrs.class = className('Card-link', {
    'Card-link--block': opts.block,
    'Card-link--silent': opts.silent,
    'Card-link--inherit': opts.inherit
  })

  return html`
    <a ${attrs}>
      ${label(opts)}
      <span class="Card-icon">${symbol(icon(opts), { cover: true })}</span>
    </a>
  `
}

function loading (opts = {}) {
  return html`<div><span class="u-loading">${text`LOADING_TEXT_SHORT`}</span></div>`
}

function label (opts) {
  if (opts.text) return opts.text
  if (opts.file) return text(`Download ${opts.file}`)
  if (opts.external) return text`Go to website`
  return text`Read more`
}

function icon (opts) {
  if (opts.icon) return opts.icon
  if (opts.file) return 'download'
  if (opts.external) return 'external'
  return 'forward'
}
