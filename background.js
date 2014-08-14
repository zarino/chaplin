var onClicked = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'toggleMute'
    }, function(){})
  })
}

var onMessage = function(request, sender, sendResponse) {
  if(request.action == 'setMutedIcon'){
    showIcon(sender.tab.id)
    setMutedIcon(sender.tab.id)
  } else if(request.action == 'setUnmutedIcon'){
    showIcon(sender.tab.id)
    setUnmutedIcon(sender.tab.id)
  } else if(request.action == 'hideIcon'){
    hideIcon(sender.tab.id)
  }
  sendResponse()
}

var showIcon = function(tabId){
  if(!isShown){
    chrome.pageAction.show(tabId)
    isShown = true
  }
}

var hideIcon = function(tabId){
  if(isShown){
    chrome.pageAction.hide(tabId)
    isShown = false
  }
}

var setMutedIcon = function(tabId){
  if(!isMuted){
    chrome.pageAction.setTitle({
      tabId: tabId,
      title: 'Unmute microphone'
    })
    chrome.pageAction.setIcon({
      tabId: tabId,
      path: 'icons/icon19-muted.png'
    })
    isMuted = true
  }
}

var setUnmutedIcon = function(tabId){
  if(isMuted){
    chrome.pageAction.setTitle({
      tabId: tabId,
      title: 'Mute microphone'
    })
    chrome.pageAction.setIcon({
      tabId: tabId,
      path: 'icons/icon19.png'
    })
    isMuted = false
  }
}

var isShown = false
var isMuted = false

chrome.runtime.onMessage.addListener(onMessage)

chrome.pageAction.onClicked.addListener(onClicked)
