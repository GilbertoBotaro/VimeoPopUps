## Vimeo Popups

A JS component for creating vimeo vid popups from just a link element.

No additional markup needed.

## Useage

Add links with `data-vimeo-popup` attribute equaling the ID of your Vimeo Vid's ID.

```html
 <a data-vimeo-popup="333916706">Watch This Dope Vid Brah</a>
```

Import the js, and init the `VimeoPopUps` instance


```javascript
import VimeoPopUps from './components/_VimeoPopUps.js'

VimeoPopUps.init()
```

Note, current setup is actually exporting a new instance of `VimeoPopUps`

```javascript
export default new VimeoPopUps
```

You may want to alter that to something like

```javascript
export default VimeoPopUps
```

Then be all like

```javascript
import VimeoPopUps from './components/_VimeoPopUps.js'

let bigPoppa = new VimeoPopUps

bigPoppa.init()
```

Or whateves.


### Styles

You gonna need some styles.

`_popups.scss` has some styles.

Handles the actual popup stuff.
