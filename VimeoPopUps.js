
/**
 * VimeoPopUps
 * Links to build a popup with vimeo vid (via api request)
 * Just pass vimeo id
 * @example <a data-vimeo-popup="333916706">Watch Video</a>
 */
function VimeoPopUps() {
  this.html = document.querySelector('html')
  this.popUpLinks = document.querySelectorAll('[data-vimeo-popup]')
  this.isOpen = false
}

/**
 * Vimeo Popups Methods
 */
VimeoPopUps.prototype = {
  constructor : VimeoPopUps,

  init() {
    self = this
    this.handleClick()
  },

  /**
   * Fetch Data
   * Fetch utility
   * @param {string} url - url to fetch
   */
  fetchData(url) {
    return window.fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        return json
      })
      .catch(ex => console.log('failed', ex))
  },

  /**
   * Open Click Event
   */
  handleClick() {
    this.popUpLinks.forEach((popUpLink) => {
      popUpLink.addEventListener('click', (e) => {
        e.preventDefault()

        self.open(popUpLink)
        self.request(popUpLink)
      })
    })
  },

  /**
   * Open Popup
   * @param {string} link - PopUpLink
   */
  open(link) {
    this.html.classList.add('popup-is-opening')

    setTimeout(() => {
      this.html.classList.remove('popup-is-opening')
      this.html.classList.add('popup-is-open')
      this.isOpen = true
    }, 200)
  },

  /**
   * Close Popup
   * @param {html element} popup - popup instance
   */
  close(popup){

    this.html.classList.add('popup-is-closing')
    popup.classList.add('is-closing')

    setTimeout(function(){
      this.html.classList.remove('popup-is-open')
      popup.classList.remove('is-open')
      this.html.classList.remove('popup-is-closing')
      this.html.classList.add('popup-is-closed')
      popup.classList.remove('is-closing')
      popup.classList.add('is-closed')
      this.isOpen = false
      self.remove(popup)
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
      self.close(popup)
    })

    if (this.isOpen) {
      window.onkeydown = function(e) {
        if (e.keyCode === 27) {
          self.close(popup)
        }
      }
    }
  },

  /**
   * Remove Popup/Vid
   * @param {html element} popup - popup instance
   */
  remove(popup) {
    popup.remove()
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
        vimeoApi      = 'http://www.vimeo.com/api/oembed.json?url=',
        vimeoPlayerId = vimeoPlayer + vimeoID,
        vimeoRequest  = 'http://www.vimeo.com/api/oembed.json?url=' +
                        encodeURIComponent(vimeoPlayerId) + '&color=' + vimeoColor + '&autoplay=1&callback=?';

    self.loadJSONP(vimeoRequest, (data) => {
      const vimeoData = unescape(data.html)
      const tmpl      = self.popUpTmpl(vimeoData)

      document.body.insertAdjacentHTML( 'beforeend', tmpl )
        self.handleClose()
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
         <div class="popup__x close-x is-white"></div>
       </button>
        <div class="popup__vid">
          <div class="flex-vid vimeo popup__vid js-vid-wrap">${vidEl}</div>
        </div>
      </section>`
  }
}

export default new VimeoPopUps;
