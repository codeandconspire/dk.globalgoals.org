var DEFAULT_FAVICON = '/favicon.ico'
var prefix = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAg'
var icons = [
  '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'
]

module.exports = favicon

function favicon (goal = null) {
  return {
    icon: goal ? prefix + icons[goal - 1] : DEFAULT_FAVICON,
    type: goal ? 'image/png' : 'image/icon'
  }
}
