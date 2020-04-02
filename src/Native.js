var ui = require('./script/ui.js');
const NativeLocal = ui.video.localRemote;
var NativePeerConnection = ui.peers.remotePeerConnection;

const NativeAudioInput = ui.select.audioRemote;
const NativeAudioOutput = ui.select.audioOutRemote;
const NativeVideo = ui.select.videoRemote;
const selectorsRemote = [NativeAudioInput, NativeAudioOutput, NativeVideo];

const NativeRemote = ui.video.remoteVideo;

var answerNative = ui.buttons.answerNative;
var audioNative = ui.buttons.muteNative;
var hangupNative = ui.buttons.hangupNative;
var videoNative = ui.buttons.videoNative;
var callNative = ui.buttons.callNative;
callNative.disabled = false;
answerNative.disabled = true;
audioNative.disabled = true;
hangupNative.disabled = true;
videoNative.disabled = true;

function NativegotDevices(deviceInfos) {
	// Handles being called several times to update labels. Preserve values.
	const values = selectorsRemote.map(select => select.value);
	selectorsRemote.forEach(select => {
		while (select.firstChild) {
			select.removeChild(select.firstChild);
		}
	});
	for (let i = 0; i !== deviceInfos.length; ++i) {
		const deviceInfo = deviceInfos[i];
		const option = document.createElement('option');
		option.value = deviceInfo.deviceId;
		if (deviceInfo.kind === 'audioinput') {
			option.text = deviceInfo.label || `microphone ${NativeAudioInput.length + 1}`;
			NativeAudioInput.appendChild(option);
		} else if (deviceInfo.kind === 'audiooutput') {
			option.text = deviceInfo.label || `speaker ${NativeAudioOutput.length + 1}`;
			NativeAudioOutput.appendChild(option);
		} else if (deviceInfo.kind === 'videoinput') {
			option.text = deviceInfo.label || `camera ${NativeVideo.length + 1}`;
			NativeVideo.appendChild(option);
		} else {
			console.log('Some other kind of source/device: ', deviceInfo);
		}
	}
	selectorsRemote.forEach((select, selectorIndex) => {
		if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
			select.value = values[selectorIndex];
		}
	});
}
navigator.mediaDevices.enumerateDevices().then(NativegotDevices).catch(NativehandleError);


function NativegotStream(stream) {
	//window.stream = stream; // make stream available to console
	console.log("Setting up stream");
	remoteStream = stream;
	NativeLocal.srcObject = stream;
	console.log("In NativegotStream");
	console.log(stream);
	return navigator.mediaDevices.enumerateDevices();
}

function NativehandleError(error) {
	console.log('Error!! ', error.message, error.name);
}

function modifyVideoNative() {
	const audioSource = NativeAudioInput.value;
	const videoSource = NativeVideo.value;
	const constraints = {
		audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
		video: { deviceId: videoSource ? { exact: videoSource } : undefined }
	};
	if (NativePeerConnection !== null) {
		//videoElement.srcObject = remoteStream;
	}
}

function modifyAudioNative() {
	remoteStream.removeTrack(NativePeerConnection.getAudioTracks()[0]);
	const videoSource = NativeAudioInput.value;
	remoteStream.addTrack(videoSource);
	NativePeerConnection.addStream(remoteStream);
}

function Native_startCall() {
	const audioSource = NativeAudioInput.value;
	const videoSource = NativeVideo.value;
	const constraints = {
		audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
		video: { deviceId: videoSource ? { exact: videoSource } : undefined }
	};
	navigator.mediaDevices.getUserMedia(constraints).then((s) => {
		var stream = s.clone();
		NativegotStream(stream);
		console.log("In Native_startCall, after getUserMedia");
		console.log(s);
		if (NativePeerConnection === null) {
			createPeerConnectionNative();
		}
		NativePeerConnection.addStream(s);
		NativePeerConnection.createOffer().then(function (offer) {
			console.log("In createOffer");
			console.log(offer);
			NativePeerConnection.setLocalDescription(offer);
			return //addRemoteVDI(offer);
		});
		//console.log("This is where O a,");
		return navigator.mediaDevices.enumerateDevices();
	}).then(NativegotDevices).catch(NativehandleError);
}

function addRemoteNative(desc) {
	var offer = new RTCSessionDescription(desc);
	console.log("In addRemoteNative");
	console.log(offer);
	if (NativePeerConnection === null) {
		createPeerConnectionNative();
	}
	NativePeerConnection.setRemoteDescription(offer);
	answerNative.disabled = false;
	audioNative.disabled = false;
	hangupNative.disabled = false;
	videoNative.disabled = false;
	callNative.disabled = true;
}

var pc_owner = null;

function createPeerConnectionNative() {

	NativePeerConnection = new RTCPeerConnection({
		iceServers: [{
			urls: 'stun:stun.l.google.com:19302'
		}]
	});
	NativePeerConnection = NativePeerConnection.peer;
	NativePeerConnection.onaddstream = NativehandleAddStreamEvent;
	NativePeerConnection.ontrack = NativehandleAddStreamEvent;
	NativePeerConnection.onicecandidate = addIceEventNative;
}

function addIceEventNative(event) {
	console.log("In addIceEventNative");
	console.log(event.candidate);
	if (event.candidate == null) {
		desc = NativePeerConnection.localDescription;
		addRemoteVDI(desc);
	}
}

function NativehandleAddStreamEvent(event) {
	console.log("In NativehandleAddStreamEvent");
	console.log(event.stream);
	NativeRemote.srcObject = event.stream;
}

function Native_handleVideoOfferMsg() {
	if (NativePeerConnection == null) {
		alert("No Call recieved Yet, please wait");
		return;
	}
	var localStreaming = null;
	if (NativePeerConnection === null) {
		createPeerConnectionNative();
	}
	const audioSource = NativeAudioInput.value;
	const videoSource = NativeVideo.value;
	const constraints = {
		audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
		video: { deviceId: videoSource ? { exact: videoSource } : undefined }
	};

	navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
		remoteStream = stream;
		NativegotStream(stream);
		NativePeerConnection.addStream(stream);
		return NativePeerConnection.createAnswer();
	})
		.then((answer) => {
			console.log("In createAnswer");
			console.log(answer);
			return NativePeerConnection.setLocalDescription(answer);
		}).catch(NativehandleError);
}

function muteNative() {
	if (remoteStream.getAudioTracks()[0].enabled) {
		remoteStream.getAudioTracks()[0].enabled = false;
	} else {
		remoteStream.getAudioTracks()[0].enabled = true;
	}
}

function pauseNative() {
	console.log(remoteStream.getVideoTracks()[0])
	if (remoteStream.getVideoTracks()[0].enabled) {
		remoteStream.getVideoTracks()[0].enabled = false;
	} else {
		remoteStream.getVideoTracks()[0].enabled = true;
	}
}

function hangupNativeFunc() {
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