# Chaplin: a microphone mute button for Google Hangouts

Do you spend precious seconds hovering your cursor over the Hangout window, desperately trying to summon the mute button, while a passing ambulance siren drowns out the meeting you were meant to be silently attending?

Or maybe you’ve just been asked to speak, and now that all eyes are on you, you suddenly find yourself bumbling and scrambling to unmute your microphone, like a total n00b?

Chaplin (the world’s most famous mute) is here to help.

Chaplin lives silently in Google Chrome, and only gets activated on Hangouts pages, so he won’t eat up all your memory. Click his icon, and your microphone is **instantly** muted or unmuted. Bliss.

### How to install (assuming you’re on a Mac)

1. Open Terminal.
2. `cd` to some place you keep random scripts and stuff (in Zarino’s case, `~/repos`)
3. `git clone git@github.com:zarino/chaplin.git`
4. Open up [chrome://extensions](chrome://extensions) in Chrome
5. Tick the **Developer mode** checkbox
6. Press the **Load unpacked extension…** button, and select the directory you cloned in step 3 (eg: `~/repos/chaplin`)
7. Open up a Google Hangout and see it in action :-)

To pull the latest version of the extension, `cd` into the repo and run `git pull`. The extension will be reloaded next time you launch Chrome.

### How it works

1. `manifest.json` defines a "page action" that is automatically injected *only* into pages matching the glob `*://plus.google.com/hangouts/*` – which means, if the extension has loaded, we know we can work on the page.
2. On pageload, `inject.js` is injected into the page, and sets a repeating timer, which works out, every few seconds, whether the microphone is muted or not, and tells `background.js` using `chrome.extension.sendMessage()`.
3. Whenever `background.js` receives the message, it sets its icon accordingly.
4. When the user clicks the toolbar icon, `background.js` tells `inject.js` to trigger the javascript click events on the mute button in the page.
5. After the click, `inject.js` responds to `background.js`, telling it the new state, so `background.js` can change its icon immediately (rather than waiting for the next pass of the timer).

