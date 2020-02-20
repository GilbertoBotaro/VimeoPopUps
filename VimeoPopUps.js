
/**
 * VimeoPopUps
 * Links to build a popup with vimeo vid (via api request)
 * Just pass vimeo id
 * @example <a data-vimeo-popup="333916706">Watch Video</a>
 */
 /**
  * VimeoPopUps
  * Links that call a popup with vimeo vid (via api request)
  * Just pass vimeo id
  * @example <a data-vimeo-popup="333916706">Watch Video</a>
  */
 function VimeoPopUps() {
   this.html = document.querySelector('html')
   this.popUpLinks = document.querySelectorAll('[data-vimeo-popup]')
   this.isOpen = false
 }

 /**
  * VimeoPopUps Methods
  * @class VimeoPopUps
  */
VimeoPopUps.prototype = {
  constructor : VimeoPopUps,

  init() {
   this.handleClick()
  },

 /**
  * JSONP Helper to load external data
  * @param {String} url
  * @param {function} callback
  * @param {Object} Invoked context in callback
  */
  loadJSONP(url, callback, context){

    var unique = 0
    var name = "_jsonp_" + unique++
    if (url.match(/\?/)) url += "&callback="+name
    else url += "?callback="+name

    // Create script
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url

    window[name] = function(data){
      callback.call((context || window), data)
      document.getElementsByTagName('head')[0].removeChild(script)
      script = null
      delete window[name]
    };

    // Load JSON
    document.getElementsByTagName('head')[0].appendChild(script)
  },

 /**
  * Open Click Event
  */
  handleClick() {
    this.popUpLinks.forEach((popUpLink) => {
      popUpLink.addEventListener('click', (e) => {
        e.preventDefault()

        this.open(popUpLink)
        this.request(popUpLink)
      })
    })
  },

 /**
  * Open Popup
  * @param {string} link - PopUpLink
  */
  open(link) {
    this.html.classList.add('popup-is-opening')
    this.isOpen = true
    setTimeout(() => {
      this.html.classList.remove('popup-is-opening')
      this.html.classList.add('popup-is-open')
    }, 200)
  },

 /**
  * Close Popup
  * @param {html element} popup - popup instance
  */
  close(popup){
    this.html.classList.add('popup-is-closing')
    popup.classList.add('is-closing')

    var closer  = setTimeout(() => {
      this.html.classList.remove('popup-is-open')
      popup.classList.remove('is-open')
      this.html.classList.remove('popup-is-closing')
      this.html.classList.add('popup-is-closed')
      popup.classList.remove('is-closing')
      popup.classList.add('is-closed')

      this.remove(popup)
      this.isOpen = false
    }, 1000)
  },

 /**
  * Handle Closing Click Event
  */
  handleClose() {
    const popup = document.querySelector('.popup')
    const closeLink = document.querySelector('.js-close-popup')

    closeLink.addEventListener('click', (e) => {
      e.preventDefault()
      this.close(popup)
    })

    if (this.isOpen) {
      window.onkeydown = (e) => {
        if (e.keyCode === 27) {
          this.close(popup)
        }
      }
    }
  },

 /**
  * Remove Popup/Vid
  * @param {html element} popup - popup instance
  */
 remove(el) {
   el.remove()
 },

 /**
  * Vimeo API request
  * Makes the actual vimeo api request and plays vi
  * data-vimeo-popup="[vimeo id]"
  * data-vimeo-color=[hex value for vimeo color]
  * @param {string} link - PopUpLink
  */
  request(popUpLink) {

    let vimeoID       = popUpLink.dataset.vimeoPopup,
        vimeoColor    = popUpLink.dataset.vimeoColor,
        vimeoPlayer   = 'https://player.vimeo.com/video/',
        vimeoApi      = 'https://www.vimeo.com/api/oembed.json?url=',
        vimeoPlayerId = vimeoPlayer + vimeoID,
        vimeoRequest  = 'https://www.vimeo.com/api/oembed.json?url=' +
                      encodeURIComponent(vimeoPlayerId) + '&color=' + vimeoColor + '&autoplay=1&callback=?';

    this.loadJSONP(vimeoRequest, (data) => {
      const vimeoData = unescape(data.html)
      const tmpl      = this.popUpTmpl(vimeoData)

      document.body.insertAdjacentHTML( 'beforeend', tmpl )
        this.handleClose()
    })
  },

 /**
  * PopUp Template
  * @param {html element} vidEl - vimeo iframe from api request
  */
  popUpTmpl(vidEl) {
   return `
     <section class="popup is-open" aria-hidden="true">
      <button class="popup__close js-close-popup" aria-label="Close">
        <div class="popup__x close-x"></div>
      </button>
       <div class="popup__vid">
         <div class="flex-vid vimeo popup__vid js-vid-wrap">${vidEl}</div>
       </div>
     </section>`
  }
}

export default new VimeoPopUps;
