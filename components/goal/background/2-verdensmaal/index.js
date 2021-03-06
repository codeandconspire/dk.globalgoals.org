var html = require('choo/html')
var Component = require('choo/component')
var { vw } = require('../../../base')

module.exports = class Background2 extends Component {
  update () {
    return false
  }

  load (element) {
    var field = element.querySelector('.js-field')
    var crops = element.querySelectorAll('.js-crop')

    if (vw() < 900) {
      const [x, y, width, height] = field.getAttribute('viewBox').split(' ')
      field.setAttribute('viewBox', [x, y, width * 0.7, height].join(' '))
      field.setAttribute('width', width * 0.7)

      for (let i = 0; i < crops.length; i++) {
        const crop = crops[i]
        const current = +crop.getAttribute('x')
        const next = (current * 0.7)

        crop.setAttribute('x', next)
      }
    }
  }

  createElement (opts = {}) {
    return html`
      <div class="Background2 ${opts.size === 'small' ? 'Background2--small' : ''}" id="background-2">
        <svg class="Background2-field js-field" viewBox="0 0 1440 246" width="1440" height="246">
          <symbol id="background2-wheat" viewBox="0 0 40 160">
            <path fill="currentColor" fill-rule="evenodd" d="M19.6 27s-7.3 7.8-7.3 13.5c0 4.8 5.6 7.8 7.2 9 0 0 7.5-4 7.5-9 0-6-7.4-13.6-7.4-13.6M3.2 41S2 54 7.6 58c0 0 1.8 2.4 10.5 3.8 0 0 1-8.4-2-12 0 0-1.6-2.4-12.6-8.7M2 57S.8 71.3 6.8 75.6c0 0 2 2.6 11.4 4 0 0 1-9-2.3-12.8 0 0-2-2.8-13.8-9.6m0 18.3s-2 15.2 4 19.5c0 0 2.4 3 11.8 4.4 0 0 1.6-9.4-2-13 0 0-2-4-13.6-11M.4 94s-1 15.8 5 20c0 0 3 3 12.5 4.6 0 0 1-10.3-2.6-14 0 0-3-4.2-15.3-10.6m36-53s1.2 13-4.4 17c0 0-2 2.4-10.6 3.8 0 0-1-8.4 2.3-12 0 0 1.6-2.4 12.6-8.7m1 16s1.3 14.3-4.7 18.6c0 0-2 2.6-11.4 4 0 0-1-9 2.4-12.8 0 0 1.7-2.8 13.6-9.6m0 18.5s2 15.2-4.2 19.5c0 0-2.4 3-11.8 4.4 0 0-1.4-9.4 2-13 0 0 2-4 14-11M38.8 94s1 15.8-5 20c0 0-3.2 3-12.6 4.6 0 0-1-10.3 2.3-14 0 0 3-4.2 15.3-10.6m-21.4 65.3h4.2V121h-4.2M6.4 13c0-1-.8-1.5-1.5-1.5-1 0-1.7.6-1.7 1.4v25.3l3 1.6V13zM12 8.4c0-.7-.7-1.3-1.5-1.3-.7 0-1.3 1-1.3 1.6V39c.5-1.5 1.6-4.7 2.7-6.7v-24zm5.8-7C17.8.6 17 0 16.4 0c-.8 0-1.4.6-1.4 1.4V28l2.8-3.8V1.4zM33 13c0-1 .5-1.5 1.3-1.5s1.4.6 1.4 1.4v25.3L33 40V13zm-5.7-4.6c0-.7.6-1.3 1.3-1.3.8 0 1.4 1 1.4 1.6V39c-.5-1.5-1.6-4.7-2.7-6.7v-24zm-6-7c0-.8.8-1.4 1.5-1.4.8 0 1.4.6 1.4 1.4V28l-2.8-4V1.4z"/>
          </symbol>
          <symbol id="background2-corn" viewBox="0 0 174 546">
            <path fill="currentColor" d="M96.6 323H82.9v86.5l-10.4-31.1c-1.3-3.9-4.5-6.8-8.5-7.7-4-.9-8.1.3-11 3.3L.82 438.62l57.63-33.8 24.45 46.2v94.08h13.7V323zM72.1 115.2v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.7 0-5 2.3-5 5zM58.2 124h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c-.1 2.8 2.2 5 5 5zm15.6-22.5c0 2.8 2.3 5 5 5h5.5c2.8 0 5-2.3 5-5v-3.8c0-2.8-2.3-5-5-5h-5.5c-2.8 0-5 2.3-5 5v3.8zM60 107.2h5.5c2.8 0 5-2.3 5-5v-3.8c0-2.8-2.3-5-5-5H60c-2.8 0-5 2.3-5 5v3.8c-.1 2.7 2.2 5 5 5zm24.4 19.6h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c.1-2.7-2.2-5-5-5zm-26.2 14.1h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c-.1 2.7 2.2 5 5 5zm13.9 11.3c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7zm-2.4 0v-3.7c0-2.8-2.3-5-5-5h-6.5c-1.8 0-3.4 1-4.3 2.5 1.6 3 3.7 7 5.9 11.3h4.9c2.8 0 5-2.3 5-5.1zm14.7 7.9h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c.1-2.8-2.2-5-5-5zm-14.7 8.8v-3.7c0-2.8-2.3-5-5-5h-3.5c2.2 4.5 4.2 9.1 5.8 13.2 1.6-.9 2.7-2.6 2.7-4.5zm8.2 21.7h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c-.1 2.7 2.2 5 5 5zm0 16.6h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.1 0-4 1.4-4.7 3.3.7 3.1 1.4 6.3 2 9.7.8.3 1.7.7 2.7.7zm6.5 16.3c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5c-.7 0-1.3.1-1.9.4.8 4.3 1.7 8.8 2.5 13.5h5.9v-.2zm-2.9 16.9h3c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5H79c.5 2.7.9 5.3 1.4 8.1.4 1.8.7 3.8 1.1 5.6zm8 11.3V248c0-2.8-2.3-5-5-5H82c1 5 2 9.6 2.9 13.8 2.5-.3 4.6-2.5 4.6-5.1zm.3 16.3v-3.7c0-2.5-1.9-4.5-4.3-4.9 1.2 5 2.2 9.1 3 11.9.8-.9 1.3-2 1.3-3.3zM75.3 87.1c0 1.9 1.5 3.4 3.4 3.4h7.4c1.9 0 3.4-1.5 3.4-3.4v-6.4c0-1.9-1.5-3.4-3.4-3.4h-7.4c-1.9 0-3.4 1.5-3.4 3.4v6.4zm.8-21.3v5.5c0 1.9 1.5 3.4 3.4 3.4H86c1.9 0 3.4-1.5 3.4-3.4v-5.5c0-1.9-1.5-3.4-3.4-3.4h-6.5c-1.8.1-3.4 1.6-3.4 3.4zM61.9 74h6.5c1.9 0 3.4-1.5 3.4-3.4v-5.5c0-1.9-1.5-3.4-3.4-3.4h-6.5c-1.9 0-3.4 1.5-3.4 3.4v5.5c0 1.9 1.5 3.4 3.4 3.4zm3.6-15.7h5.6c1.9 0 3.4-1.5 3.4-3.4v-4.7c0-1.9-1.5-3.4-3.4-3.4h-5.6c-1.9 0-3.4 1.5-3.4 3.4v4.7c0 1.9 1.5 3.4 3.4 3.4zm11.7-8.7v4.7c0 1.9 1.5 3.4 3.4 3.4h5.6c1.9 0 3.4-1.5 3.4-3.4v-4.7c0-1.9-1.5-3.4-3.4-3.4h-5.6c-1.9 0-3.4 1.6-3.4 3.4zm8.9-6.3c1.9 0 3.4-1.5 3.4-3.4v-3.1c0-1.9-1.5-3.4-3.4-3.4h-4.2c-1.9 0-3.4 1.5-3.4 3.4v3.1c0 1.9 1.5 3.4 3.4 3.4h4.2zm-18.5.1h4.2c1.9 0 3.4-1.5 3.4-3.4v-3.1c0-1.9-1.5-3.4-3.4-3.4h-4.2c-1.9 0-3.4 1.5-3.4 3.4V40c.1 1.9 1.6 3.4 3.4 3.4zm4.7-12.5h2.8c1.9 0 3.4-1.5 3.4-3.4v-2.8c0-1.9-1.5-3.4-3.4-3.4h-2.8c-1.9 0-3.4 1.5-3.4 3.4v2.8c0 1.9 1.5 3.4 3.4 3.4zM90 24.7c0-1.9-1.5-3.4-3.4-3.4h-2.8c-1.9 0-3.4 1.5-3.4 3.4v2.8c0 1.9 1.5 3.4 3.4 3.4h2.8c1.9 0 3.4-1.5 3.4-3.4v-2.8zM60.4 90.5h7.4c1.9 0 3.4-1.5 3.4-3.4v-6.4c0-1.9-1.5-3.4-3.4-3.4h-7.4c-1.9 0-3.4 1.5-3.4 3.4v6.4c0 1.8 1.5 3.4 3.4 3.4zM84 16.2v1.5c0 .9.8 1.7 1.7 1.7h2.6c.9 0 1.7-.8 1.7-1.7v-1.5c0-.9-.8-1.7-1.7-1.7h-2.6c-1 0-1.7.8-1.7 1.7zm-7.9 3.2h2.6c.9 0 1.7-.8 1.7-1.7v-1.5c0-.9-.8-1.7-1.7-1.7h-2.6c-.9 0-1.7.8-1.7 1.7v1.5c0 1 .8 1.7 1.7 1.7zm4.1-7.9h2.6c.9 0 1.7-.8 1.7-1.7V8.3c0-.9-.8-1.7-1.7-1.7h-2.6c-.9 0-1.7.8-1.7 1.7v1.5c0 1 .8 1.7 1.7 1.7zm7.3-7.4h1.4c.9 0 1.7-.8 1.7-1.7v-.5c0-.9-.8-1.7-1.7-1.7h-1.4c-.9 0-1.7.8-1.7 1.7v.5c0 1 .8 1.7 1.7 1.7zm16.8 106.1h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c.1-2.7-2.2-5-5-5zm14 0c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.8-2.3-5-5-5h-6.5zm-15.2-17.6h-5.5c-2.8 0-5 2.3-5 5v3.8c0 2.8 2.3 5 5 5h5.5c2.8 0 5-2.3 5-5v-3.8c0-2.7-2.2-5-5-5zm14.2.7c-2.8 0-5 2.3-5 5v3.8c0 2.8 2.3 5 5 5h5.5c2.8 0 5-2.3 5-5v-3.8c0-2.8-2.3-5-5-5h-5.5zm-7.6 38.6c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7zm20.1.2c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7zm-26.2 11.3h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7c0-2.7-2.2-5-5-5zm26.2 5.1c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7zM110 165.1c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7zm19.8 3.8v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5zm-21.2 12.9c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8 0 5-2.3 5-5v-3.7zm3.1.4v3.7c0 2.3 1.6 4.2 3.7 4.8 3.1-5.4 6.3-9.8 9.3-13.3-.4-.1-.9-.3-1.4-.3h-6.5c-2.8 0-5.1 2.3-5.1 5.1zm-3.1 19.9v-3.7c0-2.8-2.3-5-5-5h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.5c2.8.1 5-2.2 5-5zm-1.8 8.8c-.9-.8-2-1.3-3.2-1.3h-6.5c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h6.2c1.2-4.4 2.4-8.6 3.5-12.4zm-4.4 15.7H97c-2.8 0-5 2.3-5 5v3.7c0 2.8 2.3 5 5 5h1.7c1.3-4.5 2.5-9.2 3.7-13.7zm-4.3 16.3H97c-2.8 0-5 2.3-5 5v3.7c0 1.9 1.1 3.6 2.7 4.4 1.1-4 2.2-8.5 3.4-13.1zm6.7-165.6h-7.4c-1.9 0-3.4 1.5-3.4 3.4v6.4c0 1.9 1.5 3.4 3.4 3.4h7.4c1.9 0 3.4-1.5 3.4-3.4v-6.4c-.1-1.9-1.6-3.4-3.4-3.4zm-2-15.6h-6.5c-1.9 0-3.4 1.5-3.4 3.4v5.5c0 1.9 1.5 3.4 3.4 3.4h6.5c1.9 0 3.4-1.5 3.4-3.4v-5.5c0-1.9-1.5-3.4-3.4-3.4zm10.3 0c-1.9 0-3.4 1.5-3.4 3.4v5.5c0 1.9 1.5 3.4 3.4 3.4h6.5c1.9 0 3.4-1.5 3.4-3.4v-5.5c0-1.9-1.5-3.4-3.4-3.4h-6.5zm-3.9-10.4V56c0 1.9 1.5 3.4 3.4 3.4h5.6c1.9 0 3.4-1.5 3.4-3.4v-4.7c0-1.9-1.5-3.4-3.4-3.4h-5.6c-1.9.1-3.4 1.6-3.4 3.4zm-6.4-4.4h-5.6c-1.9 0-3.4 1.5-3.4 3.4V55c0 1.9 1.5 3.4 3.4 3.4h5.6c1.9 0 3.4-1.5 3.4-3.4v-4.7c-.1-1.9-1.6-3.4-3.4-3.4zm-2.4-13.4h-4.2c-1.9 0-3.4 1.5-3.4 3.4V40c0 1.9 1.5 3.4 3.4 3.4h4.2c1.9 0 3.4-1.5 3.4-3.4v-3.1c0-1.9-1.6-3.4-3.4-3.4zm6.7 4.4V41c0 1.9 1.5 3.4 3.4 3.4h4.2c1.9 0 3.4-1.5 3.4-3.4v-3.1c0-1.9-1.5-3.4-3.4-3.4h-4.2c-1.9 0-3.4 1.5-3.4 3.4zm-2.5-13.2v2.8c0 1.9 1.5 3.4 3.4 3.4h2.8c1.9 0 3.4-1.5 3.4-3.4v-2.8c0-1.9-1.5-3.4-3.4-3.4H108c-1.9 0-3.4 1.6-3.4 3.4zm-5.9-3.4h-2.8c-1.9 0-3.4 1.5-3.4 3.4v2.8c0 1.9 1.5 3.4 3.4 3.4h2.8c1.9 0 3.4-1.5 3.4-3.4v-2.8c-.1-1.8-1.6-3.4-3.4-3.4zm16.4 56c-1.9 0-3.4 1.5-3.4 3.4v6.4c0 1.9 1.5 3.4 3.4 3.4h7.4c1.9 0 3.4-1.5 3.4-3.4v-6.4c0-1.9-1.5-3.4-3.4-3.4h-7.4zM97.5 14.5h-2.6c-.9 0-1.7.8-1.7 1.7v1.5c0 .9.8 1.7 1.7 1.7h2.6c.9 0 1.7-.8 1.7-1.7v-1.5c0-.9-.7-1.7-1.7-1.7zM93 6.7h-2.6c-.9 0-1.7.8-1.7 1.7v1.5c0 .9.8 1.7 1.7 1.7H93c.9 0 1.7-.8 1.7-1.7V8.4c0-1-.7-1.7-1.7-1.7zm9.2 9.5v1.5c0 .9.8 1.7 1.7 1.7h2.6c.9 0 1.7-.8 1.7-1.7v-1.5c0-.9-.8-1.7-1.7-1.7h-2.6c-.9 0-1.7.8-1.7 1.7zM99 11.5h2.6c.9 0 1.7-.8 1.7-1.7V8.3c0-.9-.8-1.7-1.7-1.7H99c-.9 0-1.7.8-1.7 1.7v1.5c0 1 .8 1.7 1.7 1.7zm-4.8-7.4h1.4c.9 0 1.7-.8 1.7-1.7v-.5c0-.9-.8-1.7-1.7-1.7h-1.4c-.9 0-1.7.8-1.7 1.7v.5c0 1 .7 1.7 1.7 1.7z"/>
            <path fill="currentColor" d="M162.6 178.3c-10.3-9-19.9-7.6-27.1-3.4-2.9 1.7-9.3 10.7-10.9 13.3-2.9 4.9-9.3 14.8-13 28.4-.2.6-5.5 19.3-6.7 23.5-.2.8-3.1 11.5-4.4 16.3-.2.8-3.1 11.5-4.3 15.7-3.8 13.8-8.7 25.3-8.7 25.3 1.5-6.2-1.6-11.7-3.4-19.1-2.9-11.9-4.9-19.6-5.1-20.4-.9-4-10.6-52.4-13.7-63.5-1.1-4-7-29-14.6-41.5-.5-.6-5.4-10.1-7.7-13.8-13.2-20.8-26-29-26-29 8.4 9.6 18.3 44.8 20.5 59.4 2.2 14.6 6.4 28.9 7.8 57.1 2.5 49.4 26.6 80.2 26.6 80.2s4.7 6.3 19.6 6.1c14.9-.2 16.9-4.3 21.5-7.5 7-8 9.6-12.6 14.6-24.1 6-14 6.6-30.3 7.1-42.9.4-11.2 5.6-43.5 6.7-50.5 3.7 1.4 7.7 3.1 12.1 5.5 16.1 8.7 19.8 18.8 19.8 18.8s4.7-20.6-10.7-33.9z"/>
          </symbol>
          <symbol id="background2-barley" viewBox="0 0 43 160">
            <path stroke="currentColor" stroke-width="3.9" d="M32.7 47c1.4 5.4 1.7 17.8 1.7 24v88.6"/>
            <path fill="currentColor" d="M17 42.6s5 4.6 8.3 3.6c0 0 1.5 0 4.8-3 0 0-3-3-5-2.8 0 0-1 0-7 2.2M43 35s-6.6-1-8.7 1.8c0 0-1.3 1-2 5.3 0 0 4 1 6-1 0 0 1.2 0 4.7-6m-5.7-10s-6.5 2-7.5 5c0 0-.8 2 0 6 0 0 4-1 5.3-3 0 0 1-1 3-7m-7-11s-6 3-6 7c0 0 0 1 2 5 0 0 4-2 4-4.2 0 0 .7-1.4 0-7.8m-8-8s-5 4.6-4.4 8c0 0-.2 1.5 2.4 5 0 0 3-2.6 3-5 0 0 0-1.5-1.6-7.7M15 1s-4.2 5-3 8.3c0 0 0 1.5 3 4.7 0 0 3-3.2 2.8-5.6 0 0 0-1.5-2.5-7.4m0 32.2s3.8 5.4 7.2 5c0 0 1.5.4 5.3-2 0 0-2.4-3.4-4.7-3.7 0 0-1-.5-7 .7m-3-6.8s5 4.7 8 3.8c0 0 2 0 5-2.8 0 0-3-3-5-3 0 0-1.4-.2-7.4 2m-6-6.2s5 4.6 8 3.6c0 0 1.8 0 5-3 0 0-3-3-5.4-3 0 0-1.7 0-7.7 2.4m-6-7.5s4.3 5 7.8 4.5c0 0 1.6.2 5-2.5 0 0-2.6-3.3-5-3.4 0 0-1.4-.3-7.6 1.4M.4 0s0 6.7 3.2 8.4c0 0 1 1 5.5 1.3 0 0 0-4.3-2-6 0 0-.4-1-6.3-3.6M35 158l7.3-101c4.8.3-6.8 101.6-6.8 101.6m-1 1.2L28 77c-4.8.4 5.2 82.6 5.2 82.6"/>
          </symbol>
          <symbol id="background2-carrot" viewBox="0 0 23 82">
            <path fill="currentColor" fill-rule="evenodd" d="M6.7 15.7C2 16.4-.7 20.4.2 25.2l.3 1.5H9c.6 0 1 .4 1 1 0 .5-.4 1-1 1H1l1.3 7H9c.6 0 1 .4 1 1 0 .4-.4 1-1 1H2.7l1.4 7h5c.8 0 1 .4 1 1 0 .4-.2 1-1 1H4.7L7.2 61c1 5.2 2.7 5.2 3.7 0l7-36c1-4.8-2-8.8-6.8-9.5V15l.8-3.6c.6-2 1.4-3.3 2.3-4 .4-.4.4-1 0-1.4-.2-.4-.8-.5-1.3 0-1 1-2 2.6-2.7 5l-.3 1.3V1c0-.5-.5-1-1-1S8 .5 8 1v9.3c0-.4 0-.8-.2-1C7.3 6.8 6.5 5 5.4 3.6c-.3-.4-1-.5-1.4 0-.4.2-.4.8 0 1.2.8 1 1.4 2.6 2 4.6.3 1.5.5 3 .6 4.6v1.5z"/>
          </symbol>
          <use x="-715" height="94" y="152" class="Background2-crop Background2-crop--barley Background2-crop--dark Background2-crop--sm js-crop" xlink:href="#background2-barley" />
          <use x="-660" height="246" y="1" class="Background2-crop Background2-crop--corn Background2-crop--lg js-crop" xlink:href="#background2-corn" />
          <use x="-618" height="94" y="152" class="Background2-crop Background2-crop--corn Background2-crop--dark Background2-crop--sm js-crop" xlink:href="#background2-corn" />
          <use x="-528" height="62" y="184" class="Background2-crop Background2-crop--wheat Background2-crop--dark Background2-crop--xs js-crop" xlink:href="#background2-wheat" />
          <use x="-516" height="243" y="4" class="Background2-crop Background2-crop--barley Background2-crop--lg js-crop" xlink:href="#background2-barley" />
          <use x="-417" height="62" y="184" class="Background2-crop Background2-crop--wheat Background2-crop--dark Background2-crop--xs js-crop" xlink:href="#background2-wheat" />
          <use x="-318" height="108" y="139" class="Background2-crop Background2-crop--wheat js-crop" xlink:href="#background2-wheat" />
          <use x="-278" height="62" y="184" class="Background2-crop Background2-crop--wheat Background2-crop--dark Background2-crop--xs js-crop" xlink:href="#background2-wheat" />

          <use x="144" y="210" height="86" class="Background2-crop Background2-crop--carrot Background2-crop--sm js-crop" xlink:href="#background2-carrot" />
          <use x="184" y="201" height="102"class="Background2-crop Background2-crop--carrot js-crop" xlink:href="#background2-carrot" />
          <use x="218" y="210" height="86" class="Background2-crop Background2-crop--carrot Background2-crop--sm js-crop" xlink:href="#background2-carrot" />

          <use x="355" y="137" height="115" class="Background2-crop Background2-crop--barley Background2-crop--dark Background2-crop--mirror js-crop" xlink:href="#background2-barley" />
          <use x="398" y="179" height="77" class="Background2-crop Background2-crop--wheat Background2-crop--dark Background2-crop--xs js-crop" xlink:href="#background2-wheat" />
          <use x="484" y="137" height="118" class="Background2-crop Background2-crop--corn Background2-crop--dark js-crop" xlink:href="#background2-corn" />
          <use x="590" y="174" height="77" class="Background2-crop Background2-crop--wheat Background2-crop--dark Background2-crop--xs js-crop" xlink:href="#background2-wheat" />
          <use x="614" y="6" height="243" class="Background2-crop Background2-crop--barley Background2-crop--lg js-crop" xlink:href="#background2-barley" />
          <use x="708" y="114" height="133" class="Background2-crop Background2-crop--wheat js-crop" xlink:href="#background2-wheat" />

          <g>
            <use x="-568" height="160" y="117" class="Background2-crop Background2-crop--grow Background2-crop--wheat js-crop" xlink:href="#background2-wheat" />
            <use x="-451" height="94" y="182" class="Background2-crop Background2-crop--grow Background2-crop--wheat Background2-crop--dark Background2-crop--sm js-crop" xlink:href="#background2-wheat" />
            <use x="-373" height="164" y="113" class="Background2-crop Background2-crop--grow Background2-crop--corn js-crop" xlink:href="#background2-corn" />
            <use x="316" y="189" height="92" class="Background2-crop Background2-crop--grow Background2-crop--wheat Background2-crop--dark Background2-crop--xs js-crop" xlink:href="#background2-wheat" />
            <use x="439" y="148" height="132" class="Background2-crop Background2-crop--grow Background2-crop--wheat js-crop" xlink:href="#background2-wheat" />
            <use x="542" y="46" height="235" class="Background2-crop Background2-crop--grow Background2-crop--corn Background2-crop--lg js-crop" xlink:href="#background2-corn" />
          </g>
        </svg>
        <svg class="Background2-tractor" width="134" height="108" viewBox="0 0 134 111">
          <g fill="currentColor" fill-rule="evenodd">
            <path fill-rule="nonzero" d="M31.5 47.5C14 47.5 0 61.8 0 79c0 17.5 14.3 31.5 31.5 31.5S63 96.2 63 79c.4-17.2-13.9-31.5-31.5-31.5zm0 52.7c-11.7 0-21.1-9.4-21.1-21.1 0-11.7 9.4-21.1 21.1-21.1 11.7 0 21.1 9.4 21.1 21.1.4 11.7-9 21.4-21.1 21.1.4.3.4.3 0 0z"/>
            <circle cx="31.5" cy="79.4" r="16.2" />
            <path fill-rule="nonzero" d="M107.6 67c-11.4 0-20.5 9.4-20.5 20.8s9.4 20.5 20.8 20.5 20.5-9.1 20.5-20.5C128 76.1 118.9 67 107.6 67zm0 34.5c-7.8 0-14-6.2-14-14s6.2-14 14-14 14 6.2 14 14c-.4 7.8-6.2 14-14 14 0 0 0 .3 0 0z"/>
            <path d="M107.6 78.4c-5.2 0-9.4 4.2-9.4 9.1 0 4.9 4.2 9.1 9.1 9.1 5.2 0 9.4-4.2 9.4-9.1 0-4.9-4.3-9.1-9.1-9.1z"/>
            <path class="Background2-chassis" fill-rule="nonzero" d="M133.6 48.2l-47.1-7.5v-8.8h-1.6V18.3c0-1 .3-1.9 1-2.6.7-.7 1.9-1 2.9-1v-2.9c-1.9 0-3.6.6-4.9 1.9a5.42 5.42 0 0 0-1.6 4.9v13.6h-1.6v7.5l-5.8-1L63.4 3H16.6v36.1C10.1 42.7 4.6 47.9.7 54l2.9 2.3c12.7-15.6 35.7-17.5 51.3-4.9 8.4 6.8 13.3 17.2 13.3 27.9v1h15.9s5.8-16.9 23.4-16.9c9.7-.6 18.5 5.5 21.8 14.6h4.5l-.2-29.8zm-91.7-9.8H21.4V8.2h20.5v30.2zm5.2 0V8.2h10.4l10.4 30.2H47.1z"/>
          </g>
        </svg>
      </div>
    `
  }
}
