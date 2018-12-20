var html = require('choo/html')
var nanoraf = require('nanoraf')
var Component = require('choo/component')
var { i18n } = require('../base')
var symbol = require('../symbol')
var share = require('../share')

var text = i18n(require('./lang.json'))

module.exports = class Target extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {
      clicked: false,
      collapsed: true,
      isInitialized: false
    }
  }

  update () {
    return false
  }

  init () {
    if (this.local.isInitialized) return
    this.local.isInitialized = true

    var element = this.element
    var resize = nanoraf(() => {
      var styles = window.getComputedStyle(element)
      var collapse = Number(styles.getPropertyValue('--collapse-body'))
      var fig = element.querySelector('.js-figure')
      var content = element.querySelector('.js-content')
      element.classList.remove('is-collapsed')
      element.classList.add('is-calculating')
      if (!fig || !collapse) return

      if (content.offsetHeight > (fig.offsetHeight + 8) && !this.local.clicked) {
        this.local.collapsed = true
      } else {
        this.local.collapsed = false
      }
      this.rerender()
    })

    resize()

    window.addEventListener('resize', resize)
    this.unload = () => {
      this.local.isInitialized = false
      window.removeEventListener('resize', resize)
    }
  }

  createElement (opts = {}) {
    var color = opts.goal === 7 ? 'u-colorBlack' : 'u-colorWhite'
    var bg = 'u-bg' + opts.goal

    var onexpand = (event) => {
      this.local.clicked = true
      this.local.collapsed = false
      this.rerender()
      event.preventDefault()
    }

    return html`
      <div class="Target ${this.local.collapsed ? 'is-collapsed' : ''}" id="${text`target`}-${opts.id}">
        ${opts.icon ? html`
          <div class="Target-figure ${color} ${bg}">
            <figure class="u-sizeFill js-figure">
              <figcaption class="Target-caption u-textHeading">${text`Target`} ${opts.id}</figcaption>
              <img class="Target-icon" src="${opts.icon.url}" alt="${text`Target`} ${opts.id}" onload=${() => this.init()} />
            </figure>
            <div class="Target-actions u-colorBlack u-spaceT1">
              ${opts.href ? html`
                <a class="Target-action" href="${opts.href}#${text`target`}-${opts.id}" onclick="${onshare}" title="${text`Share`}">
                  <span class="u-hiddenVisually">${text`Share`}</span>
                  ${symbol('share', { circle: true })}
                </a>
              ` : null}
              <a class="Target-action" href="${opts.icon.url}" title="${text`Download icon`}" download>
                <span class="u-hiddenVisually">${text`Download icon`}</span>
                ${symbol('download', { circle: true })}
              </a>
            </div>
          </div>
        ` : null}
        <div class="Target-content js-content">
          <div class="Target-heading">
            <h3 class="Target-title u-textHeading">
              <span class="u-hiddenVisually">${text`Target`} ${opts.id} – </span> ${opts.title}
            </h3>
            <div class="Target-actions">
              ${opts.href ? html`
                <a class="Target-action" href="${opts.href}#${text`target`}-${opts.id}" onclick="${onshare}" title="${text`Share`}">
                  <span class="u-hiddenVisually">${text`Share`}</span>
                  ${symbol('share', { circle: true })}
                </a>
              ` : null}
              <a class="Target-action" href="${opts.icon.url}" title="${text`Download icon`}" download>
                <span class="u-hiddenVisually">${text`Download icon`}</span>
                ${symbol('download', { circle: true })}
              </a>
            </div>
          </div>
          <div class="Target-body">
            ${opts.body}
          </div>
          ${this.local.collapsed ? html`
            <span area-hidden="true" class="Target-fade"><span>${text`Show more`}</span></span>
          ` : null}
        </div>
        ${this.local.collapsed ? html`
          <a href="#${text`target`}-${opts.id}" class="Target-button" onclick="${onexpand}"><span class="u-hiddenVisually">${text`Show more`}</span></a>
        ` : null}
      </div>
    `

    function onshare (event) {
      share.render({
        href: opts.href + `#${text`target`}-${opts.id}`,
        image: opts.icon.url,
        title: opts.title,
        description: opts.description
      })
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
