/******************************************************************************************************************************************
 *******************************************************************************************************************************************
 Version        :    1.0
 Desciption    :    This is a Demo application for understanding how do we use Citrix WebRTC APIs to create
 standalone WebRTC Application working on Citrix VDI
 Author        :    Chaitanya Ambegaonkar
 WebRTC Dependancies:
 1. We need a build using CommonJS to resolve a few dependancies
 2. The Application name needs to be Teams.exe
 3. You need to use Node js module, winreg, to run this script. This needs to be added to your package before running your
 application, if you are using function checkVDA()
 4. Citrix WebRTC runs on WebRTC 1.0 (https://www.w3.org/TR/2012/WD-webrtc-20120821/)
 *******************************************************************************************************************************************
 *******************************************************************************************************************************************/

/*Initialization of Variables*/
// var ui = require('./ui.js');
var vdiCitrix = require('./CitrixWebRTC.js');
console.log(vdiCitrix);
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
var audioVDI = ui.buttons.muteVDI;
var hangupVDI = ui.buttons.hangupVDI;
var videoVDI = ui.buttons.videoVDI;
var callVDI = ui.buttons.callVDI;
callVDI.disabled = false;
answerVDI.disabled = true;
audioVDI.disabled = true;
hangupVDI.disabled = true;
videoVDI.disabled = true;

/******************************************************************************************************************************************/
/*
	Function 	: 	sdpConstraints
	Desciption	:	This part detemines what constraints are to be sent across when we make the video call.
	Author		:	Chaitanya Ambegaonkar
*/
/******************************************************************************************************************************************/
var sdpConstraints = {
    mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    }
};

/******************************************************************************************************************************************/
/*
	Function 	: 	VDIgotDevices(deviceInfos)
	Desciption	:	This function will enumerate all the devices connected to the Client machine and display them on the screen.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
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

/******************************************************************************************************************************************/
/*
	Function 	: 	enumerateDevices()
	Desciption	:	This part will enumerate all the devices connected to the Client machine.
	Author		:	Chaitanya Ambegaonkar
*/
/******************************************************************************************************************************************/
vdiCitrix
    .enumerateDevices()
    .then(VDIgotDevices)
    .catch(VDIhandleError);

/******************************************************************************************************************************************/
/*
	Function 	: 	VDIgotStream()
	Desciption	:	This function will define the local stream which is being used to send across
	Return Value:	Enumareates devices to reload the devices connected to the client machine
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function VDIgotStream(stream) {
    localStream = stream.clone();
    VDILocal.srcObject = stream;
    return vdiCitrix
        .enumerateDevices()
        .then(VDIgotDevices)
        .catch(VDIhandleError);
}

/******************************************************************************************************************************************/
/*
	Function 	: 	VDIhandleError()
	Desciption	:	This function takes care of all the errors occuring in the entire program on the Citrix VDI side.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function VDIhandleError(error) {
    console.log('Error !! ', error);
    console.error(error);
}

/******************************************************************************************************************************************/
/*
	Function 	: 	modifyVideoVDI()
	Desciption	:	This function is called when video stream is changed in between the call
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function modifyVideoVDI() {
    if (VDIPeerConnection) {
        const audioSource = VDIaudioInput.value;
        const videoSource = VDIvideo.value;
        const constraints = {
            audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
            video: {
                mandatory: {
                    sourceId: videoSource,
                    minWidth: 1080,
                    maxWidth: 1080,
                    minHeight: 720,
                    maxHeight: 720,
                    maxFrameRate: 30
                }
            }
        };
        vdiCitrix.getUserMedia(constraints, VDIgotStream, VDIhandleError);

        if (VDIPeerConnection !== null) {
            VDI_handleVideoOfferMsg();
        }
    }
}

/******************************************************************************************************************************************/
/*
	Function 	: 	modifyAudioVDI()
	Desciption	:	This function is called when audio stream is changed in between the call
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function modifyAudioVDI() {
    if (VDIPeerConnection) {
        const audioSource = VDIaudioInput.value;
        const videoSource = VDIvideo.value;
        const constraints = {
            audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
            video: {
                mandatory: {
                    sourceId: videoSource,
                    minWidth: 1080,
                    maxWidth: 1080,
                    minHeight: 720,
                    maxHeight: 720,
                    maxFrameRate: 30
                }
            }
        };
        vdiCitrix.getUserMedia(constraints, VDIgotStream, VDIhandleError);

        if (VDIPeerConnection !== null) {
            VDI_handleVideoOfferMsg();
        }
    }
}

/******************************************************************************************************************************************/
/*
	Function 	: 	mapVideoElement()
	Desciption	:	This function initialized both the video element present on the screen. This is an important task to do before
					you can add srcObject to the video element. By doing this, client machine will get to know where the video rendering
					should take place.
	Author		:	Chaitanya Ambegaonkar
*/
/******************************************************************************************************************************************/
vdiCitrix.mapVideoElement(VDILocal);
vdiCitrix.mapVideoElement(VDIRemote);

/******************************************************************************************************************************************/
/*
	Function 	: 	VDI_startCall()
	Desciption	:	This function starts the call, it takes user media stream and then creates offer which will be then set to local
					description. That same will be sent to Native code, in this case as a function call, but in the code it also can be sent
					across servers.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function VDI_startCall() {
    const audioSource = VDIaudioInput.value;
    const videoSource = VDIvideo.value;
    const constraints = {
        audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
        video: {
            mandatory: {
                sourceId: videoSource,
                minWidth: 1080,
                maxWidth: 1080,
                minHeight: 720,
                maxHeight: 720,
                maxFrameRate: 30
            }
        }
    };
    vdiCitrix.getUserMedia(
        constraints,
        s => {
            var stream = s.clone();
            VDIgotStream(stream);
            if (VDIPeerConnection === null) {
                createPeerConnectionVDI();
            }
            VDIPeerConnection.addStream(s);
            VDIPeerConnection.createOffer(
                descr => {
                    VDIPeerConnection.setLocalDescription(descr);
                    addRemoteNative(descr);
                },
                VDIhandleError,
                sdpConstraints
            );
        },
        VDIhandleError
    );
}

/******************************************************************************************************************************************/
/*
	Function 	: 	addRemoteVDI()
	Input		:	description
	Desciption	:	This function takes the description sent by the Native side/ by server, and sets it to remote description of the
					VDIPeerConnection.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function addRemoteVDI(description) {
    if (VDIPeerConnection === null) {
        createPeerConnectionVDI();
    }
    VDIPeerConnection.setRemoteDescription(
        description,
        () => {
            console.log('set remote description');
        },
        () => {
            console.log('can not set remote description');
        }
    );
    answerVDI.disabled = false;
    audioVDI.disabled = false;
    hangupVDI.disabled = false;
    videoVDI.disabled = false;
    callVDI.disabled = true;
}

/******************************************************************************************************************************************/
/*
	Function 	: 	createPeerConnectionVDI()
	Desciption	:	Creates peer connection using Citrix Peer Connection API
					You need to enable DTLS manually, the part needs to be sent as configuration in the PeerConnection, using enableDtlsSrtp: true
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function createPeerConnectionVDI() {
    const configuration = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ],
        enableDtlsSrtp: true
    };
    VDIPeerConnection = new vdiCitrix.CitrixPeerConnection(configuration);
    VDIPeerConnection.onaddstream = VDIhandleAddStreamEvent;
    VDIPeerConnection.onicecandidate = addIceEventVDI;
    VDIPeerConnection.onicegatheringstatechange = () => {};
}

/******************************************************************************************************************************************/
/*
	Function 	: 	addIceEventVDI()
	Desciption	:	This function is triggered after ICE candidate is added to VDI. After all ICE candidates are added then the function
					will send the information to Native side
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function addIceEventVDI(event) {
    console.log(event.candidate);
    if (event.candidate == null) {
        desc = VDIPeerConnection.localDescription;
        addRemoteNative(desc);
    }
}

/******************************************************************************************************************************************/
/*
	Function 	: 	VDIhandleAddStreamEvent()
	Desciption	:	This function is triggered after Add Stream Event takes place.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function VDIhandleAddStreamEvent(event) {
    console.log('In VDIhandleAddStreamEvent');
    console.log(event.stream);
    VDIRemote.srcObject = event.stream;
}

/******************************************************************************************************************************************/
/*
	Function 	: 	VDI_handleVideoOfferMsg()
	Desciption	:	This function handles incoming call to the peer. It gets user media, then adds stream to the current peer connection
					It then creates Answer and sets the local description of the peer connection. Then we wait for all the ICE candidate
					to take place.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function VDI_handleVideoOfferMsg() {
    if (VDIPeerConnection == null) {
        alert('No Call recieved Yet, please wait');
        return;
    }
    const audioSource = VDIaudioInput.value;
    const videoSource = VDIvideo.value;
    const constraints = {
        audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
        video: {
            mandatory: {
                sourceId: videoSource,
                minWidth: 640,
                maxWidth: 640,
                minHeight: 360,
                maxHeight: 360,
                maxFrameRate: 30
            }
        }
    };
    vdiCitrix.getUserMedia(
        constraints,
        s => {
            console.log('In VDI_handleVideoOfferMsg, after getting usermedia');
            console.log(s);
            VDIgotStream(s);
            if (VDIPeerConnection === null) {
                createPeerConnectionVDI();
            }
            VDIPeerConnection.addStream(s);
            VDIPeerConnection.createAnswer(
                descr => {
                    VDIPeerConnection.setLocalDescription(descr);
                },
                VDIhandleError,
                sdpConstraints
            );
        },
        VDIhandleError
    );
}

/******************************************************************************************************************************************/
/*
	Function 	: 	muteVDI()
	Desciption	:	This function will mute the Audio track and unmute it when needed.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function muteVDI() {
    if (localStream.getAudioTracks()[0].enabled) {
        localStream.getAudioTracks()[0].enabled = false;
    } else {
        localStream.getAudioTracks()[0].enabled = true;
    }
}

/******************************************************************************************************************************************/
/*
	Function 	: 	pauseVDI()
	Desciption	:	This function will mute the Video track and unmute it when needed.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function pauseVDI() {
    if (localStream.getVideoTracks()[0].enabled) {
        localStream.getVideoTracks()[0].enabled = false;
    } else {
        localStream.getVideoTracks()[0].enabled = true;
    }
}

/******************************************************************************************************************************************/
/*
	Function 	: 	hangupVDIFunc()
	Desciption	:	Hangs up the connection and removes all the tracks from all video elements. Closes all the Peer Connections
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
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

/******************************************************************************************************************************************/
/*
	Function 	: 	exit()
	Desciption	:	Closes the application.
	Author		:	Chaitanya Ambegaonkar
*/

/******************************************************************************************************************************************/
function exit() {
    hangupVDIFunc();
    const remote = require('electron').remote;
    document.getElementById('exit').onclick = event => {
        let w = remote.getCurrentWindow();
        w.close();
    };
}
