var ui = require('./script/ui.js');
var VDIPeerConnection = ui.peers.myPeerConnection;
var localStream = ui.peers.localStream;
var remoteStream = ui.peers.remoteStream;

/*Initialization of video elements used in this application*/
const VDIRemote = ui.video.localVideo;
const VDILocal = ui.video.remoteLocal;

/*Initialization of audio/video elements used to enumerate devices*/
const VDIaudioInput = ui.select.audio;
const VDIaudioOutput = ui.select.audioOut;
const VDIvideo = ui.select.video;
const VDIselectors = [VDIaudioInput, VDIaudioOutput, VDIvideo];


var answerVDI = ui.buttons.answerVDI;
var muteVDI = ui.buttons.muteVDI;
var hangupVDI = ui.buttons.hangupVDI;
var videoVDI = ui.buttons.videoVDI;
var callVDI = ui.buttons.callVDI;
callVDI.disabled = false;
answerVDI.disabled = true;
muteVDI.disabled = true;
hangupVDI.disabled = true;
videoVDI.disabled = true;


function VDIgotDevices(deviceInfos) {
	const values = VDIselectors.map(select => select.value);
	VDIselectors.forEach(select => {
		while (select.firstChild) {
			select.removeChild(select.firstChild);
		}
	});
	for (let i = 0; i !== deviceInfos.length; ++i) {

		const deviceInfo = deviceInfos[i];
		const option = document.createElement('option');
		option.value = deviceInfo.deviceId;
		if (deviceInfo.kind === 'audioinput') {
			option.text = deviceInfo.label || `microphone ${VDIaudioInput.length + 1}`;
			VDIaudioInput.appendChild(option);
		} else if (deviceInfo.kind === 'audiooutput') {
			option.text = deviceInfo.label || `speaker ${VDIaudioOutput.length + 1}`;
			VDIaudioOutput.appendChild(option);
		} else if (deviceInfo.kind === 'videoinput') {
			option.text = deviceInfo.label || `camera ${VDIvideo.length + 1}`;
			VDIvideo.appendChild(option);
		} else {
			console.log('Some other kind of source/device: ', deviceInfo);
		}
	}
	VDIselectors.forEach((select, selectorIndex) => {
		if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
			select.value = values[selectorIndex];
		}
	});
}
navigator.mediaDevices.enumerateDevices().then(VDIgotDevices).catch(VDIhandleError);


function VDIgotStream(stream) {
	//window.stream = stream; // make stream available to console
	localStream = stream.clone();
	VDILocal.srcObject = stream;
	return navigator.mediaDevices.enumerateDevices();
}

function VDIhandleError(error) {
	console.log('Error!! ', error.message, error.name);
}

function modifyVideoVDI() {
	const audioSource = VDIaudioInput.value;
	const videoSource = VDIVideo.value;
	const constraints = {
		audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
		video: { deviceId: videoSource ? { exact: videoSource } : undefined }
	};
	if (VDIPeerConnection !== null) {
		//videoElement.srcObject = remoteStream;
	}
}

function modifyAudioVDI() {
	remoteStream.removeTrack(NativePeerConnection.getAudioTracks()[0]);
	const videoSource = NativeAudioInput.value;
	remoteStream.addTrack(videoSource);
	NativePeerConnection.addStream(remoteStream);
}

function VDI_startCall() {
	const audioSource = NativeAudioInput.value;
	const videoSource = NativeVideo.value;
	const constraints = {
		audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
		video: { deviceId: videoSource ? { exact: videoSource } : undefined }
	};
	navigator.mediaDevices.getUserMedia(constraints).then((s) => {
		var stream = s.clone();
		VDIgotStream(stream);
		console.log("In VDI_startCall, after getUserMedia");
		console.log(s);
		if (VDIPeerConnection === null) {
			createPeerConnectionVDI();
		}
		VDIPeerConnection.addStream(s);
		VDIPeerConnection.createOffer().then(function (offer) {
			console.log("In createOffer");
			console.log(offer);
			VDIPeerConnection.setLocalDescription(offer);
			addRemoteNative(offer);
			return
		});
		//console.log("This is where O a,");
		return navigator.mediaDevices.enumerateDevices();
	}).then(VDIgotDevices).catch(VDIhandleError);
}

function addRemoteVDI(desc) {
	var offer = new RTCSessionDescription(desc);
	console.log("In addRemoteVDI");
	console.log(offer);
	if (VDIPeerConnection === null) {
		createPeerConnectionVDI();
	}
	VDIPeerConnection.setRemoteDescription(offer);
	answerVDI.disabled = false;
	muteVDI.disabled = false;
	hangupVDI.disabled = false;
	videoVDI.disabled = false;
	callVDI.disabled = true;
}

var pc_owner = null;

function createPeerConnectionVDI() {

	VDIPeerConnection = new RTCPeerConnection({
		iceServers: [{
			urls: 'stun:stun.l.google.com:19302'
		}]
	});
	VDIPeerConnection = VDIPeerConnection.peer;
	VDIPeerConnection.onaddstream = VDIhandleAddStreamEvent;
	VDIPeerConnection.ontrack = VDIhandleAddStreamEvent;
	VDIPeerConnection.onicecandidate = addIceEventVDI;
}

function addIceEventVDI(event) {
	console.log("In addIceEventVDI");
	console.log(event.candidate);
	if (event.candidate == null) {
		desc = VDIPeerConnection.localDescription;
		addRemoteNative(desc);
	}
}

function VDIhandleAddStreamEvent(event) {
	console.log("In VDIhandleAddStreamEvent");
	console.log(event.stream);
	VDIRemote.srcObject = event.stream;
}

function VDI_handleVideoOfferMsg() {
	if (VDIPeerConnection == null) {
		alert("No Call recieved Yet, please wait");
		return;
	}
	var localStreaming = null;
	if (VDIPeerConnection === null) {
		createPeerConnectionVDI();
	}
	const audioSource = VDIaudioInput.value;
	const videoSource = VDIVideo.value;
	const constraints = {
		audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
		video: { deviceId: videoSource ? { exact: videoSource } : undefined }
	};

	navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
		remoteStream = stream;
		VDIgotStream(stream);
		VDIPeerConnection.addStream(stream);
		return VDIPeerConnection.createAnswer();
	})
		.then((answer) => {
			console.log("In createAnswer");
			console.log(answer);
			return VDIPeerConnection.setLocalDescription(answer);
		}).catch(VDIhandleError);
}

function muteVDI() {
	if (remoteStream.getAudioTracks()[0]) {
		remoteStream.getAudioTracks()[0].enabled = false;
	} else {
		remoteStream.getAudioTracks()[0].enabled = true;
	}
}

function pauseVDI() {
	if (remoteStream.getVideoTracks()[0]) {
		remoteStream.getVideoTracks()[0].enabled = false;
	} else {
		remoteStream.getVideoTracks()[0].enabled = true;
	}
}

function hangupVDIFunc() {
	if (VDIPeerConnection) {
		VDIPeerConnection.onaddstream = null;
		NativePeerConnection.onaddstream = null;
		if (NativeLocal.srcObject) {
			NativeLocal.srcObject.getTracks().forEach(track => track.stop());
		}
		if (NativeRemote.srcObject) {
			NativeRemote.srcObject.getTracks().forEach(track => track.stop());
		}
		if (VDILocal.srcObject) {
			VDILocal.srcObject.getTracks().forEach(track => track.stop());
		}
		if (VDIRemote.srcObject) {
			VDIRemote.srcObject.getTracks().forEach(track => track.stop());
		}
		NativeLocal.srcObject = null;
		NativeRemote.srcObject = null;
		VDILocal.srcObject = null;
		VDIRemote.srcObject = null;


		VDIPeerConnection.close();
		NativePeerConnection.close();
		VDIPeerConnection = null;
		NativePeerConnection = null;
		callNative.disabled = false;
		answerNative.disabled = true;
		audioNative.disabled = true;
		hangupNative.disabled = true;
		videoNative.disabled = true;
		callVDI.disabled = false;
		answerVDI.disabled = true;
		audioVDI.disabled = true;
		hangupVDI.disabled = true;
		videoVDI.disabled = true;
	}
}

function exit() {
	hangupVDIFunc()
	const remote = require('electron').remote
	document.getElementById('exit').onclick = (event) => {
		let w = remote.getCurrentWindow();
		w.close();
	}
}