var html = require('choo/html')
var parse = require('date-fns/parse')
var { external } = require('../symbol')
var { i18n, srcset } = require('../base')

var text = i18n(require('./lang.json'))

module.exports = bookmark
module.exports.loading = loading

function bookmark (props) {
  var url = new URL(props.url)
  var date = props.date && parse(props.date)

  return html`
    <figure class="Bookmark">
      <div class="Bookmark-thumbnail">
        <img onerror=${onerror} class="Bookmark-image" alt="${props.title}" sizes="200px" srcset="${srcset(props.image, [200, 400])}" src="${srcset(props.image, [200]).split(' ')[0]}">
        ${props.publisher ? html`<small class="Bookmark-publisher">${props.publisher}</small>` : null}
      </div>
      <a href="${props.url}" rel="noreferrer noopener" target="_blank" class="Bookmark-icon">
        <span class="u-hiddenVisually">${text`Visit ${url.hostname}`}</span>
        ${external({ cover: true })}
      </a>
      <figcaption class="Bookmark-body">
        <small class="Bookmark-meta">
          <span class="Bookmark-date">
            ${text`Published`} ${date ? html`
              <time datetime="${JSON.stringify(date).replace(/"/g, '')}">${text`on the ${date.getDate()}. ${text(`MONTH_${date.getMonth()}`).substr(0, 3)} ${date.getFullYear()}`}</time>
            ` : null} ${text`on`}
          </span> <span class="Bookmark-href">${url.hostname}</span>
        </small>
        <h3 class="Bookmark-title">${props.title}</h3>
        ${props.description ? html`<p class="Bookmark-description">${snippet(props.description)}</p>` : null}
      </figcaption>
    </figure>
  `

  function onerror () {
    this.removeAttribute('srcset')
    this.removeAttribute('sizes')
    this.src = props.image
  }
}

function loading () {
  return html`
    <figure class="Bookmark is-loading">
      <div class="Bookmark-thumbnail u-loadingOnGray"></div>
      <figcaption class="Bookmark-body">
        <small class="u-loadingOnGray">${text`LOADING_TEXT_MEDIUM`}</small>
        <h3 class="Bookmark-title"><span class="u-loadingOnGray">${text`LOADING_TEXT_MEDIUM`}</span></h3>
        <p class="Bookmark-description"><span class="u-loadingOnGray">${snippet(text`LOADING_TEXT_LONG`)}</span></p>
      </figcaption>
    </figure>
  `
}

// cut off text at max length
// str -> Element
function snippet (str) {
  if (str.length < 90) return str
  var words = str.split(' ')
  var snipped = ''
  while (snipped.length < 90) snipped += ' ' + words.shift()
  return [snipped, ' ', html`<span class="u-textNowrap">${words[0]}…</span>`]
}