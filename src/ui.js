var ui = {}

module.exports = ui

ui.show = show
ui.hide = hide

ui.select = {
  audio: document.querySelector('select#audioSource'),
  audioRemote: document.querySelector('select#audioSourceRemote'),
  audioOut: document.querySelector('select#audioOutput'),
  audioOutRemote: document.querySelector('select#audioOutputRemote'),
  video: document.querySelector('select#videoSource'),
  videoRemote: document.querySelector('select#videoSourceRemote'),
}
ui.video = {
  localVideo: document.querySelector('video#localVideo'),
  remoteVideo: document.querySelector('video#remoteVideo'),
  remoteLocal: document.querySelector('video#remote-local'),
  localRemote: document.querySelector('video#local-remote')
}

ui.buttons = {
  callNative: document.querySelector('button#callNative'),
  callVDI: document.querySelector('button#callVDI'),
  muteVDI: document.querySelector('button#audioVDI'),
  muteNative: document.querySelector('button#audioNative'),
  hangupNative: document.querySelector('button#hangupNative'),
  hangupVDI: document.querySelector('button#hangupVDI'),
  videoVDI: document.querySelector('button#videoVDI'),
  videoNative: document.querySelector('button#videoNative'),
  answerVDI: document.querySelector('button#answerVDI'),
  answerNative: document.querySelector('button#answerNative'),
}

function show(ele) {
  if (!ele) return
  ele.classList.remove('dn')
}

function hide(ele) {
  if (!ele) return
  ele.classList.add('dn')
  ele.classList.remove('db')
}


ui.peers = {
  myPeerConnection: null,
  remotePeerConnection: null,
  localStream: null,
  remoteStream: null,
}

// window.getWindowHandleAsHex = function () {
//   const remote = require('electron').remote;
//   let win = remote.getCurrentWindow();
//   return new Promise((resolve, reject) => {
//     var uint8String = "";
//     var uint8 = win.getNativeWindowHandle();
//     uint8.forEach(function (element) {
//       if (element < 16) {
//         uint8String = uint8String.concat("0")
//       }
//       uint8String = uint8String.concat(element.toString(16));
//     });
//     console.log(uint8String);
//     resolve(uint8String);
//   })
// };