var html = require('choo/html')
var Component = require('choo/component')
var Goal = require('../goal')
var {i18n} = require('../base')

var text = i18n(require('./lang.json'))

var TOTAL_GOALS = 17
var LAYOUTS = [ // [<landscape>, <portrait>]
  [1, 6],
  [3, 8],
  [17, 7],
  [13, 2],
  [9, 16],
  [10, 11],
  [1, 12],
  [5, 15],
  [4, 14]
]

module.exports = class GoalGrid extends Component {
  constructor (id, state, emit) {
    super(id)
    this.cache = state.cache
    this.local = state.components[id] = {
      id: id,
      inTransition: false
    }
  }

  update (goals = [], layout) {
    if (this.local.inTransition) return false
    if (this.local.layout !== layout) return true
    return this.local.goals !== goals.map((goal) => goal.number).join()
  }

  createElement (goals = [], layout = null, slot = Function.prototype) {
    this.local.layout = layout
    this.local.goals = goals.map((goal) => goal.number).join()

    var cache = this.cache

    var cells = []
    for (let i = 0; i < TOTAL_GOALS; i++) {
      let num = i + 1
      let pair = LAYOUTS[layout - 1]
      let goal = goals.find((goal) => goal.number === num)
      let format = pair.includes(num) ? ['landscape', 'portrait'][pair.indexOf(num)] : 'square'
      let props = Object.assign({format: format, blank: !goal}, goal)
      cells.push(child(props, i + 1))
      if (format !== 'square') {
        // augument a square goal for each landscape/portrait
        cells.push(child(Object.assign({}, props, {format: 'square'}), i + 1))
      }
    }

    return html`
      <div class="GoalGrid ${layout ? 'GoalGrid--layout GoalGrid--layout' + layout : ''}" id="${this.local.id}">
        ${cells}
        ${['large', 'small', 'square'].map((type) => html`
          <div class="GoalGrid-item GoalGrid-item--slot GoalGrid-item--${type}">
            ${slot(type)}
          </div>
        `)}
      </div>
    `

    // create grid child cell
    // (obj, num) -> HTMLElement
    function child (props, num) {
      var goal = cache(Goal, `goalgrid-${num}-${props.format}`)
      return html`
        <a class="GoalGrid-item GoalGrid-item--${num} GoalGrid-item--${props.format}" href="${props.href}" title="${props.label ? props.label.replace(/\n/, ' ') : ''}">
          ${goal.render(props, !props.blank && props.format !== 'square' ? html`
            <div class="GoalGrid-content">
              <p class="GoalGrid-description">${props.description}</p>
              <span class="GoalGrid-button">${text`Explore goal`}</span>
            </div>
          ` : null)}
        </a>
      `
    }
  }
}