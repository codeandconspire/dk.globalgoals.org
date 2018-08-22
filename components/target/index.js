var html = require('choo/html')
var Component = require('choo/component')
var {i18n} = require('../base')
var nanoraf = require('nanoraf')

var text = i18n(require('./lang.json'))

module.exports = class Target extends Component {
  constructor (id, opts) {
    super(id)
    this.clicked = false
    this.collapsed = false
    this.opts = opts
  }

  update () {
    return false
  }

  load (element) {
    var resize = nanoraf(() => {
      var styles = window.getComputedStyle(element)
      var collapse = Number(styles.getPropertyValue('--collapse-body'))
      var fig = element.querySelector('.js-figure')
      var content = element.querySelector('.js-content')
      element.classList.remove('is-collapsed')
      if (!fig || !collapse) return

      if (content.offsetHeight > (fig.offsetHeight + 8) && !this.clicked) {
        this.collapsed = true
      } else {
        this.collapsed = false
      }
      this.rerender()
    })

    resize()

    window.addEventListener('resize', resize)
    this.unload = () => window.removeEventListener('resize', resize)
  }

  createElement (opts = {}) {
    var id = this.opts.id ? this.opts.id : '?'
    var color = this.opts.goal === 7 ? 'u-colorBlack' : 'u-colorWhite'
    var bg = 'u-bg' + this.opts.goal

    var onclick = () => {
      this.clicked = true
      this.collapsed = false
      this.rerender()
    }

    return html`
      <div class="Target ${this.collapsed ? 'is-collapsed' : ''}" id="${id}">
        <div class="Target-container">
          ${this.opts.icon ? html`
            <figure class="Target-figure ${color} ${bg}">
              <div class="js-figure">
                <figcaption class="Target-caption u-textHeading">${text`Target`} ${id}</figcaption>
                <img class="Target-icon" src="${this.opts.icon.url}" alt="${text`Target`} ${id}" />
              </div>
            </figure>
          ` : null}
          <div class="Target-content js-content">
            <h2 class="Target-title u-textHeading">
              <span class="u-hiddenVisually">${text`Target`} ${id} – </span> ${this.opts.title}
            </h2>
            <div class="Target-body">
              ${this.opts.body}
            </div>
            ${this.collapsed ? html`
              <button class="Target-show" onclick=${onclick} role="button">
                <span class="Target-more">${text`Show more`}</span>
              </button>
            ` : null}
          </div>
        </div>
        ${this.collapsed ? html`
          <div class="Target-button" onclick=${onclick} tabindex="-1"></div>
        ` : null}
      </div>
    `
  }
}