var Chaplin = {

  start: function(){
    this.setTimer()
    this.setListener()
  },

  getMuteButton: function(success, error){
    var innerButton = document.querySelector('.ha-w-P-y-Xi-f')
    if(innerButton){
      success(innerButton.parentNode)
    } else {
      error()
    }
  },

  onMessage: function(request, sender, sendResponse){
    if(request.action == 'toggleMute'){
      this.toggleMute.bind(this)()
    }
    sendResponse()
  },

  reportStatus: function(){
    var _this = this
    this.getMuteButton(function(muteButton){
      if(muteButton.getAttribute('aria-pressed') == 'true'){
        _this.sendMessage('setMutedIcon')
      } else {
        _this.sendMessage('setUnmutedIcon')
      }
    }, function(){
      _this.sendMessage('hideIcon')
    })
  },

  sendMessage: function(action){
    chrome.extension.sendMessage({
      action: action
    }, function(){
    })
  },

  setListener: function(){
    chrome.runtime.onMessage.addListener(this.onMessage.bind(this))
  },

  setTimer: function(){
    setInterval(this.reportStatus.bind(this), 2000)
    this.reportStatus()
  },

  toggleMute: function(){
    var _this = this
    this.getMuteButton(function(muteButton){
      muteButton.dispatchEvent(new MouseEvent('mousedown'))
      muteButton.dispatchEvent(new MouseEvent('mouseup'))
      muteButton.dispatchEvent(new MouseEvent('mouseout'))
      _this.reportStatus()
    }, function(){})
  }
}

Chaplin.start()
