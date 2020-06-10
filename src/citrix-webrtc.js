(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CitrixWebRTC"] = factory();
	else
		root["CitrixWebRTC"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:!0});
var Logger=function(){function c(a){this.tracing=!1;this.mslogger_=void 0;this.tag=a;this.enabled=!0}c.prototype.setMSLogger=function(a){this.mslogger_=a};c.prototype.log=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];this.enabled&&(void 0!=this.mslogger_?this.mslogger_.info(this.tag+" "+a):console.log(this.tag+" "+a))};c.prototype.trace=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];this.tracing&&this.log.apply(this,a)};return c}();exports.Logger=Logger;
exports.logger=new Logger("[HdxWebRTC.js]");exports.logger.enabled=!0;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {value: !0});
exports.HDXMS_VERSION = "1.2.0.2";
var VersionData = function () {
    return function (a, e, c, b) {
        this.major = a;
        this.minor = e;
        this.revision = c;
        this.build = b
    }
}();
exports.VersionData = VersionData;
var FeatureData = function () {
    return function () {
    }
}();
exports.FeatureData = FeatureData;
var WebrpcFeatureInfo = function () {
        return function (a, e) {
            this.fature = a;
            this.version = e
        }
    }(), FEATURE_ms_teams_redirection = "ms_teams_redirection",
    FEATURE_ms_teams_desktop_sharing = "ms_teams_desktop_sharing",
    FEATURE_ms_teams_speaking_indicator = "ms_teams_speaking_indicator",
    feature_map = [new WebrpcFeatureInfo(FEATURE_ms_teams_redirection, new VersionData(1, 1, 0, 0)), new WebrpcFeatureInfo(FEATURE_ms_teams_desktop_sharing, new VersionData(1, 2, 0, 0)), new WebrpcFeatureInfo(FEATURE_ms_teams_speaking_indicator, new VersionData(1,
        2, 0, 0))], class_id_t;
(function (a) {
    a[a.EngineControl = 0] = "EngineControl";
    a[a.RTCPeerConnection = 1] = "RTCPeerConnection";
    a[a.RTCSessionDescription = 2] = "RTCSessionDescription";
    a[a.RTCIceCandidate = 3] = "RTCIceCandidate";
    a[a.RTCIceCandidateEvent = 4] = "RTCIceCandidateEvent";
    a[a.MediaDevices = 5] = "MediaDevices";
    a[a.MediaDeviceInfo = 6] = "MediaDeviceInfo";
    a[a.MediaStreamTrack = 7] = "MediaStreamTrack";
    a[a.MediaStreamEvent = 8] = "MediaStreamEvent";
    a[a.MediaStream = 9] = "MediaStream";
    a[a.NavigatorUserMedia = 10] = "NavigatorUserMedia";
    a[a.VideoElement = 11] =
        "VideoElement";
    a[a.AudioElement = 12] = "AudioElement";
    a[a.RTCRtpReceiver = 13] = "RTCRtpReceiver"
})(class_id_t = exports.class_id_t || (exports.class_id_t = {}));
var method_id_EngineControl_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.version = 1] = "version";
    a[a.feature_flags = 2] = "feature_flags";
    a[a.version_info = 3] = "version_info"
})(method_id_EngineControl_t = exports.method_id_EngineControl_t || (exports.method_id_EngineControl_t = {}));
var method_id_RTCPeerConnection_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.localDescription = 1] = "localDescription";
    a[a.remoteDescription = 2] = "remoteDescription";
    a[a.readyState = 3] = "readyState";
    a[a.iceState = 4] = "iceState";
    a[a.localStreams = 5] = "localStreams";
    a[a.remoteStreams = 6] = "remoteStreams";
    a[a.createOffer = 7] = "createOffer";
    a[a.createAnswer = 8] = "createAnswer";
    a[a.setLocalDescription = 9] = "setLocalDescription";
    a[a.setRemoteDescription = 10] = "setRemoteDescription";
    a[a.updateIce = 11] = "updateIce";
    a[a.addIceCandidate = 12] = "addIceCandidate";
    a[a.addStream =
        13] = "addStream";
    a[a.removeStream = 14] = "removeStream";
    a[a.close = 15] = "close";
    a[a.iceConnectionState = 16] = "iceConnectionState";
    a[a.iceGatheringState = 17] = "iceGatheringState";
    a[a.signalingState = 18] = "signalingState";
    a[a.onaddstream = 19] = "onaddstream";
    a[a.onicecandidate = 20] = "onicecandidate";
    a[a.oniceconnectionstatechange = 21] = "oniceconnectionstatechange";
    a[a.onicegatheringstatechange = 22] = "onicegatheringstatechange";
    a[a.onsignalingstatechange = 23] = "onsignalingstatechange";
    a[a.onnegotiationneeded = 24] = "onnegotiationneeded";
    a[a.onremovestream = 25] = "onremovestream";
    a[a.getStats = 26] = "getStats";
    a[a.getReceivers = 27] = "getReceivers"
})(method_id_RTCPeerConnection_t = exports.method_id_RTCPeerConnection_t || (exports.method_id_RTCPeerConnection_t = {}));
var method_id_MediaDevices_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.enumerateDevices = 1] = "enumerateDevices";
    a[a.getDisplayMedia = 2] = "getDisplayMedia";
    a[a.ondevicechange = 3] = "ondevicechange"
})(method_id_MediaDevices_t = exports.method_id_MediaDevices_t || (exports.method_id_MediaDevices_t = {}));
var method_id_MediaDeviceInfo_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.deviceId = 1] = "deviceId";
    a[a.kind = 2] = "kind";
    a[a.label = 3] = "label";
    a[a.groupId = 4] = "groupId"
})(method_id_MediaDeviceInfo_t = exports.method_id_MediaDeviceInfo_t || (exports.method_id_MediaDeviceInfo_t = {}));
var method_id_RTCSessionDescription_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.type = 1] = "type";
    a[a.sdp = 2] = "sdp"
})(method_id_RTCSessionDescription_t = exports.method_id_RTCSessionDescription_t || (exports.method_id_RTCSessionDescription_t = {}));
var method_id_MediaStreamTrack_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.kind = 1] = "kind";
    a[a.id = 2] = "id";
    a[a.label = 3] = "label";
    a[a.enabled = 4] = "enabled";
    a[a.muted = 5] = "muted";
    a[a.readyState = 6] = "readyState";
    a[a.onended = 7] = "onended";
    a[a.onmute = 8] = "onmute";
    a[a.onunmute = 9] = "onunmute";
    a[a.clone = 10] = "clone";
    a[a.stop = 11] = "stop";
    a[a.getCapabilities = 12] = "getCapabilities";
    a[a.getSettings = 13] = "getSettings";
    a[a.applyConstraints = 14] = "applyConstraints"
})(method_id_MediaStreamTrack_t = exports.method_id_MediaStreamTrack_t || (exports.method_id_MediaStreamTrack_t =
    {}));
var method_id_MediaStream_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.id = 1] = "id";
    a[a.getAudioTracks = 2] = "getAudioTracks";
    a[a.getVideoTracks = 3] = "getVideoTracks";
    a[a.getTracks = 4] = "getTracks";
    a[a.getTrackById = 5] = "getTrackById";
    a[a.addTrack = 6] = "addTrack";
    a[a.removeTrack = 7] = "removeTrack";
    a[a.clone = 8] = "clone";
    a[a.active = 9] = "active"
})(method_id_MediaStream_t = exports.method_id_MediaStream_t || (exports.method_id_MediaStream_t = {}));
var method_id_NavigatorUserMedia_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.getUserMedia = 1] = "getUserMedia"
})(method_id_NavigatorUserMedia_t = exports.method_id_NavigatorUserMedia_t || (exports.method_id_NavigatorUserMedia_t = {}));
var method_id_RTCIceCandidate_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.candidate = 1] = "candidate";
    a[a.sdpMid = 2] = "sdpMid";
    a[a.sdpMLineIndex = 3] = "sdpMLineIndex"
})(method_id_RTCIceCandidate_t = exports.method_id_RTCIceCandidate_t || (exports.method_id_RTCIceCandidate_t = {}));
var method_id_RTCIceCandidateEvent_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.candidate = 1] = "candidate"
})(method_id_RTCIceCandidateEvent_t = exports.method_id_RTCIceCandidateEvent_t || (exports.method_id_RTCIceCandidateEvent_t = {}));
var method_id_MediaStreamEvent_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.stream = 1] = "stream"
})(method_id_MediaStreamEvent_t = exports.method_id_MediaStreamEvent_t || (exports.method_id_MediaStreamEvent_t = {}));
var method_id_VideoElement_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.sinkId = 1] = "sinkId";
    a[a.connectTo = 2] = "connectTo";
    a[a.disconnect = 3] = "disconnect";
    a[a.setFrame = 4] = "setFrame";
    a[a.addClipRect = 5] = "addClipRect";
    a[a.removeClipRect = 6] = "removeClipRect";
    a[a.onerror = 7] = "onerror";
    a[a.onvideoframechanged = 8] = "onvideoframechanged"
})(method_id_VideoElement_t = exports.method_id_VideoElement_t || (exports.method_id_VideoElement_t = {}));
var method_id_AudioElement_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.sinkId = 1] = "sinkId";
    a[a.srcObject = 2] = "srcObject";
    a[a.src = 3] = "src";
    a[a.play = 4] = "play";
    a[a.pause = 5] = "pause"
})(method_id_AudioElement_t = exports.method_id_AudioElement_t || (exports.method_id_AudioElement_t = {}));
var method_id_RTCRtpReceiver_t;
(function (a) {
    a[a.ctor = 0] = "ctor";
    a[a.track = 1] = "track";
    a[a.getContributingSources = 2] = "getContributingSources"
})(method_id_RTCRtpReceiver_t = exports.method_id_RTCRtpReceiver_t || (exports.method_id_RTCRtpReceiver_t = {}));
var WebrpcMethodInfo = function () {
    return function (a, e, c, b, d) {
        void 0 === d && (d = FEATURE_ms_teams_redirection);
        this.iid = a;
        this.mid = e;
        this.name = c;
        this.isprop = b;
        this.feature = d
    }
}();
exports.WebrpcMethodInfo = WebrpcMethodInfo;
var WebrpcClassInfo = function () {
    return function (a, e, c) {
        this.id = a;
        this.name = e;
        this.methods = c
    }
}();
exports.WebrpcClassInfo = WebrpcClassInfo;
var WebrpcClassLibInfo = function () {
        return function (a, e) {
            this.name = a;
            this.classes = e
        }
    }(),
    class_lib_info = new WebrpcClassLibInfo("msteams_class_library", [new WebrpcClassInfo(class_id_t.EngineControl, "EngineControl", [new WebrpcMethodInfo(class_id_t.EngineControl, method_id_EngineControl_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.EngineControl, method_id_EngineControl_t.version, "version", !0), new WebrpcMethodInfo(class_id_t.EngineControl, method_id_EngineControl_t.feature_flags, "feature_flags", !0), new WebrpcMethodInfo(class_id_t.EngineControl,
        method_id_EngineControl_t.version_info, "version_info", !0, FEATURE_ms_teams_desktop_sharing)]), new WebrpcClassInfo(class_id_t.RTCPeerConnection, "RTCPeerConnection", [new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.localDescription, "localDescription", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.remoteDescription, "remoteDescription", !0),
        new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.readyState, "readyState", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.iceState, "iceState", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.localStreams, "localStreams", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.remoteStreams, "remoteStreams", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.createOffer,
            "createOffer", !1), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.createAnswer, "createAnswer", !1), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.setLocalDescription, "setLocalDescription", !1), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.setRemoteDescription, "setRemoteDescription", !1), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.updateIce, "updateIce", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection,
            method_id_RTCPeerConnection_t.addIceCandidate, "addIceCandidate", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.addStream, "addStream", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.removeStream, "removeStream", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.close, "close", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.iceConnectionState, "iceConnectionState",
            !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.iceGatheringState, "iceGatheringState", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.signalingState, "signalingState", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.onaddstream, "onaddstream", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.onicecandidate, "onicecandidate", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection,
            method_id_RTCPeerConnection_t.oniceconnectionstatechange, "oniceconnectionstatechange", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.onicegatheringstatechange, "onicegatheringstatechange", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.onsignalingstatechange, "onsignalingstatechange", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.onnegotiationneeded, "onnegotiationneeded", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection,
            method_id_RTCPeerConnection_t.onremovestream, "onremovestream", !0), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.getStats, "getStats", !1), new WebrpcMethodInfo(class_id_t.RTCPeerConnection, method_id_RTCPeerConnection_t.getReceivers, "getReceivers", !1, FEATURE_ms_teams_speaking_indicator)]), new WebrpcClassInfo(class_id_t.RTCSessionDescription, "RTCSessionDescription", [new WebrpcMethodInfo(class_id_t.RTCSessionDescription, method_id_RTCSessionDescription_t.ctor, "ctor", !1),
        new WebrpcMethodInfo(class_id_t.RTCSessionDescription, method_id_RTCSessionDescription_t.type, "type", !0), new WebrpcMethodInfo(class_id_t.RTCSessionDescription, method_id_RTCSessionDescription_t.sdp, "sdp", !0)]), new WebrpcClassInfo(class_id_t.RTCIceCandidate, "RTCIceCandidate", [new WebrpcMethodInfo(class_id_t.RTCIceCandidate, method_id_RTCIceCandidate_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.RTCIceCandidate, method_id_RTCIceCandidate_t.candidate, "candidate", !0), new WebrpcMethodInfo(class_id_t.RTCIceCandidate,
        method_id_RTCIceCandidate_t.sdpMid, "sdpMid", !0), new WebrpcMethodInfo(class_id_t.RTCIceCandidate, method_id_RTCIceCandidate_t.sdpMLineIndex, "sdpMLineIndex", !0)]), new WebrpcClassInfo(class_id_t.RTCIceCandidateEvent, "RTCIceCandidateEvent", [new WebrpcMethodInfo(class_id_t.RTCIceCandidateEvent, method_id_RTCIceCandidateEvent_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.RTCIceCandidateEvent, method_id_RTCIceCandidateEvent_t.candidate, "candidate", !0)]), new WebrpcClassInfo(class_id_t.MediaDevices, "MediaDevices",
        [new WebrpcMethodInfo(class_id_t.MediaDevices, method_id_MediaDevices_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.MediaDevices, method_id_MediaDevices_t.enumerateDevices, "enumerateDevices", !1), new WebrpcMethodInfo(class_id_t.MediaDevices, method_id_MediaDevices_t.getDisplayMedia, "getDisplayMedia", !1, FEATURE_ms_teams_desktop_sharing), new WebrpcMethodInfo(class_id_t.MediaDevices, method_id_MediaDevices_t.ondevicechange, "ondevicechange", !0, FEATURE_ms_teams_speaking_indicator)]), new WebrpcClassInfo(class_id_t.MediaDeviceInfo,
        "MediaDeviceInfo", [new WebrpcMethodInfo(class_id_t.MediaDeviceInfo, method_id_MediaDeviceInfo_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.MediaDeviceInfo, method_id_MediaDeviceInfo_t.deviceId, "deviceId", !0), new WebrpcMethodInfo(class_id_t.MediaDeviceInfo, method_id_MediaDeviceInfo_t.kind, "kind", !0), new WebrpcMethodInfo(class_id_t.MediaDeviceInfo, method_id_MediaDeviceInfo_t.label, "label", !0), new WebrpcMethodInfo(class_id_t.MediaDeviceInfo, method_id_MediaDeviceInfo_t.groupId, "groupId", !0)]), new WebrpcClassInfo(class_id_t.MediaStreamTrack,
        "MediaStreamTrack", [new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.clone, "clone", !1), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.stop, "stop", !1), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.getCapabilities, "getCapabilities", !1), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.getSettings,
            "getSettings", !1), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.applyConstraints, "applyConstraints", !1, FEATURE_ms_teams_desktop_sharing), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.kind, "kind", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.id, "id", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.label, "label", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.enabled,
            "enabled", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.muted, "muted", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.readyState, "readyState", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.onended, "onended", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.onmute, "onmute", !0), new WebrpcMethodInfo(class_id_t.MediaStreamTrack, method_id_MediaStreamTrack_t.onunmute,
            "onunmute", !0)]), new WebrpcClassInfo(class_id_t.MediaStream, "MediaStream", [new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.id, "id", !0), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.getAudioTracks, "getAudioTracks", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.getVideoTracks, "getVideoTracks", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.getTracks,
        "getTracks", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.getTrackById, "getTrackById", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.addTrack, "addTrack", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.removeTrack, "removeTrack", !1), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.clone, "clone", !0), new WebrpcMethodInfo(class_id_t.MediaStream, method_id_MediaStream_t.active, "active", !0)]), new WebrpcClassInfo(class_id_t.NavigatorUserMedia,
        "NavigatorUserMedia", [new WebrpcMethodInfo(class_id_t.NavigatorUserMedia, method_id_NavigatorUserMedia_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.NavigatorUserMedia, method_id_NavigatorUserMedia_t.getUserMedia, "getUserMedia", !1)]), new WebrpcClassInfo(class_id_t.MediaStreamEvent, "MediaStreamEvent", [new WebrpcMethodInfo(class_id_t.MediaStreamEvent, method_id_MediaStreamEvent_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.MediaStreamEvent, method_id_MediaStreamEvent_t.stream, "stream", !0)]), new WebrpcClassInfo(class_id_t.VideoElement,
        "VideoElement", [new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.ctor, "ctor", !1), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.sinkId, "sinkId", !0), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.connectTo, "connectTo", !1), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.disconnect, "disconnect", !1), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.setFrame, "setFrame", !1), new WebrpcMethodInfo(class_id_t.VideoElement,
            method_id_VideoElement_t.addClipRect, "addClipRect", !1), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.removeClipRect, "removeClipRect", !1), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.onerror, "onerror", !0), new WebrpcMethodInfo(class_id_t.VideoElement, method_id_VideoElement_t.onvideoframechanged, "onvideoframechanged", !0)]), new WebrpcClassInfo(class_id_t.AudioElement, "AudioElement", [new WebrpcMethodInfo(class_id_t.AudioElement, method_id_AudioElement_t.ctor,
        "ctor", !1), new WebrpcMethodInfo(class_id_t.AudioElement, method_id_AudioElement_t.sinkId, "sinkId", !0), new WebrpcMethodInfo(class_id_t.AudioElement, method_id_AudioElement_t.srcObject, "srcObject", !0), new WebrpcMethodInfo(class_id_t.AudioElement, method_id_AudioElement_t.src, "src", !0), new WebrpcMethodInfo(class_id_t.AudioElement, method_id_AudioElement_t.play, "play", !1), new WebrpcMethodInfo(class_id_t.AudioElement, method_id_AudioElement_t.pause, "pause", !1)]), new WebrpcClassInfo(class_id_t.RTCRtpReceiver,
        "RTCRtpReceiver", [new WebrpcMethodInfo(class_id_t.RTCRtpReceiver, method_id_RTCRtpReceiver_t.ctor, "ctor", !1, FEATURE_ms_teams_speaking_indicator), new WebrpcMethodInfo(class_id_t.RTCRtpReceiver, method_id_RTCRtpReceiver_t.track, "track", !0, FEATURE_ms_teams_speaking_indicator), new WebrpcMethodInfo(class_id_t.RTCRtpReceiver, method_id_RTCRtpReceiver_t.getContributingSources, "getContributingSources", !1, FEATURE_ms_teams_speaking_indicator)])]),
    WebrpcClassLibInfoUtil = function () {
        function a() {
        }

        a.getInterfaceByid =
            function (a) {
                for (var c = 0, b = class_lib_info.classes; c < b.length; c++) {
                    var d = b[c];
                    if (d.id == a) return d
                }
                return null
            };
        a.getMethodByid = function (a, c) {
            var b = this.getInterfaceByid(a);
            if (null != b) for (var d = 0, b = b.methods; d < b.length; d++) {
                var f = b[d];
                if (f.mid == c) return f
            }
            return null
        };
        a.getMethodFeatureByid = function (a, c) {
            var b = this.getInterfaceByid(a);
            if (null != b) for (var d = 0, b = b.methods; d < b.length; d++) {
                var f = b[d];
                if (f.mid == c) return f.feature
            }
            return null
        };
        a.composeClassInfoData = function (a) {
            a = a.hdr;
            if (void 0 == a) return "*** Invalid packet: Couldn't find hdr object ***";
            var c = a.proc;
            if (void 0 == c) return "";
            a = c.iid;
            for (var c = c.methodid, b = 0, d = class_lib_info.classes; b < d.length; b++) {
                var f = d[b];
                if (f.id == a) for (var g = 0, h = f.methods; g < h.length; g++) {
                    var k = h[g];
                    if (k.mid == c) return f.name + "::" + k.name
                }
            }
            return ""
        };
        return a
    }();
exports.WebrpcClassLibInfoUtil = WebrpcClassLibInfoUtil;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:!0});
var hdxms_1=__webpack_require__(3),logger_1=__webpack_require__(0),wsjsonutil_1=__webpack_require__(6),garbagecollector_1=__webpack_require__(7),webrpcclassinfo_1=__webpack_require__(1),deferred_action=function(){function a(c, b, a){this.resolve=c;this.reject=b;this.name=a}a.prototype.post=function(c){1==c?(logger_1.logger.log('deferred_action.post(): resolving "'+this.name+'"'),this.resolve()):(logger_1.logger.log('deferred_action.post(): rejecting "'+this.name+'"'),this.reject())};return a}();
exports.deferred_action=deferred_action;var rpc_callback=function(){return function(a,c){this.id=a;this.is_null=c}}();exports.rpc_callback=rpc_callback;
var callback=function(){function a(c,b,a){this.success=new rpc_callback(c<<16,b);this.fail=new rpc_callback(c<<16|1,b);this.id=c;this.oneShot=a}a.prototype.resolve=function(c){logger_1.logger.trace("callback.resolve() called. [id="+this.id+"]");null!=this.handler&&this.handler(c)};a.prototype.reject=function(){null!=this.err_handler&&this.err_handler()};a.prototype.then=function(c){this.handler=c};a.prototype.prom=function(){var c=this;return new Promise(function(a,d){c.handler=a;c.err_handler=d})};
return a}();exports.callback=callback;var ProxyReadyState;(function(a){a[a.NotConfigured=0]="NotConfigured";a[a.Configured=1]="Configured";a[a.Error=2]="Error";a[a.Destroyed=3]="Destroyed"})(ProxyReadyState||(ProxyReadyState={}));
var ProxyObject=function(){function a(c,b,d,e){for(var h=[],f=4;f<arguments.length;f++)h[f-4]=arguments[f];var g=this;this.hdxms=hdxms_1.getRedirector();this.iid=b;this.oid=d;this.state=ProxyReadyState.NotConfigured;this.deferredActions=[];this.cbs=new Map;0==e?(f=!1,this.iid===webrpcclassinfo_1.class_id_t.EngineControl&&(f=!0),this.hdxms.startRedirection(f,this.user_friendly_id()).then(function(){g.oid=a.nextId++;var c=webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(b,0);return g.hdxms.WSSendObjectWrapper(c,
b,0,wsjsonutil_1.WsJsonUtil.createMessageByid.apply(wsjsonutil_1.WsJsonUtil,[!1,!1,wsjsonutil_1.ws_msg_type_t.req,b,0,g.oid].concat(h)))}).then(function(a){logger_1.logger.trace("ProxyObject: setting state to configured. (iid: "+g.iid+" oid: "+g.oid+")");g.state=ProxyReadyState.Configured;g.oid=g.param0(a);g.onConnected();garbagecollector_1.gc.trackObject(g,c)})["catch"](function(){g.state=ProxyReadyState.Error;g.onConnected()})):(this.state=ProxyReadyState.Configured,garbagecollector_1.gc.trackObject(this,
c))}a.prototype.reconstructor=function(c,a,d){for(var e=this,h=[],f=3;f<arguments.length;f++)h[f-3]=arguments[f];this.state=ProxyReadyState.NotConfigured;this.deferredActions=[];f=webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(a,0);this.hdxms.WSSendObjectWrapper(f,a,0,wsjsonutil_1.WsJsonUtil.createMessageByid.apply(wsjsonutil_1.WsJsonUtil,[!1,!1,wsjsonutil_1.ws_msg_type_t.req,a,0,this.oid].concat(h))).then(function(a){logger_1.logger.trace("ProxyObject: setting state to configured. (iid: "+
e.iid+" oid: "+e.oid+")");e.state=ProxyReadyState.Configured;e.oid=e.param0(a);e.onConnected();garbagecollector_1.gc.trackObject(e,c)})["catch"](function(){e.state=ProxyReadyState.Error;e.onConnected()})};a.prototype.setParent=function(a){garbagecollector_1.gc.setParent(this,a)};a.prototype.release=function(){logger_1.logger.log(this.user_friendly_id()+".release() called.");garbagecollector_1.gc.releaseObject(this)};a.prototype.destroy=function(){this.state=ProxyReadyState.Destroyed;var a=webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(this.iid,
0);this.hdxms.WSSendObjectWrapper(a,this.iid,0,wsjsonutil_1.WsJsonUtil.createMessageByid(!1,!0,wsjsonutil_1.ws_msg_type_t.req,this.iid,0,this.oid))};a.prototype.onConnected=function(){for(;this.deferredActions&&0<this.deferredActions.length;)this.deferredActions.shift().post(this.state==ProxyReadyState.Configured)};a.prototype.checkState=function(a,b){var d=this;0>=a?(logger_1.logger.log("ProxyObject.checkState() timeout waiting for connection response! failed. (iid: "+d.iid+" oid: "+d.oid+")"),d.onConnected()):
setTimeout(function(){if(d.state==ProxyReadyState.Configured)d.onConnected();else if(d.state==ProxyReadyState.Error)d.onConnected();else if(d.state==ProxyReadyState.Destroyed)d.onConnected();else logger_1.logger.log('ProxyObject.checkState(): count= "'+a+'". (iid: '+d.iid+" oid: "+d.oid+")"),d.checkState(--a,b)},b)};a.prototype.waitUntilConnected=function(a){var b=this;return new Promise(function(d,e){logger_1.logger.trace("ProxyObject.waitUntilConnected(): readyState="+b.state+". (iid: "+b.iid+" oid: "+
b.oid+")");b.state==ProxyReadyState.Destroyed&&(b.onConnected(),e("Object already destroyed :"+b.user_friendly_id()));b.state==ProxyReadyState.Configured?(b.onConnected(),d()):b.state==ProxyReadyState.Error?(logger_1.logger.trace("ProxyObject.waitUntilConnected(): readyState="+b.state+". (iid: "+b.iid+" oid: "+b.oid+")"),b.onConnected(),e()):(logger_1.logger.log('ProxyObject.waitUntilConnected(): deferring action "'+a+'". (iid: '+b.iid+" oid: "+b.oid+")"),b.deferredActions.push(new deferred_action(d,
e,a)),b.checkState(20,1E3))})};a.prototype.remoteInvoke=function(a,b){for(var d=[],e=2;e<arguments.length;e++)d[e-2]=arguments[e];if(this.state==ProxyReadyState.Destroyed)return Promise.reject("Cannot invoke destroyed object :"+this.user_friendly_id());e=webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(this.iid,b);return this.hdxms.WSSendObjectWrapper(e,this.iid,b,wsjsonutil_1.WsJsonUtil.createMessageByid.apply(wsjsonutil_1.WsJsonUtil,[a,!1,wsjsonutil_1.ws_msg_type_t.req,this.iid,b,this.oid].concat(d)))};
a.prototype.registerCallbacks=function(c,b,d){this.unregisterCallbacks(d);var e=a.nextcbid++,h=new callback(e,b,c);b||(c||this.cbs.set(d,e),this.hdxms.registerHandler(this.iid,this.oid,h));return h};a.prototype.unregisterCallbacks=function(a){this.cbs.has(a)?(this.hdxms.unregisterHandler(this.iid,this.oid,this.cbs.get(a)),this.cbs["delete"](a)):(logger_1.logger.log("ProxyObject: Cant find callback handler registration for mid: "+a),logger_1.logger.trace(this.cbs))};a.prototype.object_id=function(){return this.oid};
a.prototype.param0=function(a){return a.params[0]};a.prototype.isNullCallback=function(a){return void 0==a||null==a};a.prototype.user_friendly_id=function(){return this.constructor.name+"["+this.oid+"]"};a.prototype.isRedirected=function(){return this.hdxms.isRedirected()};a.nextId=0;a.nextcbid=0;return a}();exports.ProxyObject=ProxyObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:!0});var proxyobject_1=__webpack_require__(2),logger_1=__webpack_require__(0),webrpcclassinfo_1=__webpack_require__(1),wsjsonutil_1=__webpack_require__(6),completion=function(){return function(a, c, e, b, g, d, f){this.resolve=a;this.reject=c;this.iid=e;this.oid=b;this.cbid=g;this.oneShot=d;this.mid=f}}(),RedirectionStatus;
(function(a){a[a.NotRedirected=0]="NotRedirected";a[a.Connecting=1]="Connecting";a[a.Binding=2]="Binding";a[a.Redirected=3]="Redirected"})(RedirectionStatus=exports.RedirectionStatus||(exports.RedirectionStatus={}));
var HdxMediaStream=function(){function a(){this.pingactive=!1;this.status=RedirectionStatus.NotRedirected;this.reqs=[];this.cbs=[];this.deferredActions=[]}a.prototype.setRemoteSessionInfoCb=function(c){this.remoteSessionInfoCb=c};a.prototype.setFeatures=function(c){this.features=c};a.prototype.onRedirectionComplete=function(){for(;this.deferredActions&&0<this.deferredActions.length;)this.deferredActions.shift().post(this.status==RedirectionStatus.Redirected)};a.prototype.connectToService=function(){logger_1.logger.log("Redirection status: Connecting...");
this.status=RedirectionStatus.Connecting;return new Promise(function(c,e){var b=new WebSocket("wss://127.0.0.1:9002");b.onopen=function(){c(b)};b.onerror=function(b){logger_1.logger.log("websocket connection error: "+b.type);e(b)}})};a.prototype.waitUntilRedirected=function(c){var e=this;return new Promise(function(b,a){e.status==RedirectionStatus.Redirected?b():0>=c?a():setTimeout(function(){logger_1.logger.log("waitUntilRedirected() timeout. count="+c);e.status!=RedirectionStatus.Redirected?e.waitUntilRedirected(--c).then(function(){b()})["catch"](function(){a()}):
b()},2E3)})};a.prototype.handleRemoteSessionInfo=function(){logger_1.logger.log("handleRemoteSessionInfo called.");var c=this;c.remoteSessionInfoCb?c.remoteSessionInfoCb().then(function(e){logger_1.logger.log("remoteSessionInfo success! info:"+JSON.stringify(e));logger_1.logger.log("Redirection status: Redirected");c.status=RedirectionStatus.Redirected;c.pingConnectionEnd();(0,window.onVdiClientConnected)();c.onRedirectionComplete()})["catch"](function(){logger_1.logger.log("remoteSessionInfo failure!");
c.suspendRedirection(!0);c.onRedirectionComplete()}):(logger_1.logger.log("remoteSessionInfoCb is invalid!"),c.suspendRedirection(!0),c.onRedirectionComplete())};a.prototype.startRedirection=function(c,e){var b=this,a=window.onVdiUnableToRemote;return new Promise(function(d,f){b.status==RedirectionStatus.NotRedirected?(logger_1.logger.log("Attempting to start redirection: "+e),0==c?b.deferredActions.push(new proxyobject_1.deferred_action(d,f,e)):b.connectToService().then(function(c){logger_1.logger.log("Redirection status: Binding...");
b.status=RedirectionStatus.Binding;b.websocket=c;b.websocket.onmessage=function(c){b.onWSMessage(c)};b.websocket.onclose=function(c){b.onWSClose(c)};d();b.handleRemoteSessionInfo()})["catch"](function(c){logger_1.logger.log("Unable to connect to websocket service!");f();b.suspendRedirection(!0);b.onRedirectionComplete();a()})):b.status==RedirectionStatus.Connecting||b.status==RedirectionStatus.Binding?(logger_1.logger.log("Waiting for start redirection to finish"),b.waitUntilRedirected(15).then(function(){logger_1.logger.log("Waiting for start redirection: success");
d()})["catch"](function(){logger_1.logger.log("Waiting for start redirection: failed");f();a()})):(logger_1.logger.log("Redirection already started."),d())})};a.prototype.suspendRedirection=function(c){logger_1.logger.log("Suspending redirection.");(0,window.onVdiClientDisconnected)();this.status===RedirectionStatus.Redirected&&this.pingConnectionBegin();logger_1.logger.log("Redirection status: NotRedirected");this.status=RedirectionStatus.NotRedirected};a.prototype.onWSOpen=function(){};a.prototype.onWSClose=
function(c){logger_1.logger.log("disconnected from websocket service.");try{this.suspendRedirection(!0)}catch(e){logger_1.logger.log("suspendRedirection(): exception closing WebSocket: "+e.message)}};a.prototype.onWSError=function(){try{this.suspendRedirection(!0)}catch(c){logger_1.logger.log("suspendRedirection(): exception on WebSocket error: "+c.message)}};a.prototype.WSSendObjectWrapper=function(c,e,b,a){var d=!0;e!=webrpcclassinfo_1.class_id_t.EngineControl||b!=webrpcclassinfo_1.method_id_EngineControl_t.ctor&&
b!=webrpcclassinfo_1.method_id_EngineControl_t.version&&b!=webrpcclassinfo_1.method_id_EngineControl_t.feature_flags||(d=!1);var f=!0;if(d&&(f=!1,void 0!=this.features))for(var d=0,h=this.features;d<h.length;d++){var k=h[d];if(!0===k.value&&k.name==c){f=!0;break}}return 1==f?this.WSSendObject(a):Promise.reject("Cannot invoke method that is not supported by webrpc: iid("+e+") mid("+b+")")};a.prototype.WSSendObject=function(c){var e=this;return new Promise(function(b,a){if("webrtc"==c.v){var d=c.hdr.proc.iid,
f=c.hdr.proc.methodid,h=c.objref.oid,k=c.hdr.destroy;c.hdr.modifier||k||(d=new completion(b,a,d,h,0,!0,f),e.reqs.push(d));d=JSON.stringify(c);logger_1.logger.trace("WSSendObject: >>> "+webrpcclassinfo_1.WebrpcClassLibInfoUtil.composeClassInfoData(c)+" "+d);try{e.websocket.send(d)}catch(l){logger_1.logger.log("WSSendObject(): exception: "+l.message),a(l.message)}}else"overlay"==c.v?(d=JSON.stringify(c),logger_1.logger.log("HDXMS: SendOverlayData: >>> "+d+"'"),e.websocket.send(d)):logger_1.logger.log("HDXMS: Unknown protocol: '"+
JSON.stringify(c)+"'")})};a.prototype.onWSMessage=function(c){var a=c.data,b;try{b=JSON.parse(a)}catch(k){console.log("invalid JSON!!!"),console.log(k),console.log(a)}if("webrtc"==b.v){logger_1.logger.trace("onWSMessage: <<< "+webrpcclassinfo_1.WebrpcClassLibInfoUtil.composeClassInfoData(b)+" "+a);var g=b.hdr.proc.iid,d=b.hdr.proc.methodid,f=b.objref.oid;c=b.status;if(b.hdr.msg_type==wsjsonutil_1.WsJsonUtil.getMsgType(wsjsonutil_1.ws_msg_type_t.reply))a=this.reqs.findIndex(function(a){return a.iid==
g&&a.oid==f&&a.mid==d}),0<=a?0==c?this.reqs.splice(a,1).shift().resolve(b):this.reqs.splice(a,1).shift().reject():(logger_1.logger.log("HDXMS didnt find this one. (reqs)"),logger_1.logger.log(this.reqs));else if(b.hdr.msg_type==wsjsonutil_1.WsJsonUtil.getMsgType(wsjsonutil_1.ws_msg_type_t.event_req)){var h=b.func.id,a=this.cbs.findIndex(function(a){return a.iid==g&&a.oid==f&&a.cbid==h>>16});0<=a?(0==(h&65535)?this.cbs[a].resolve(b):this.cbs[a].reject(),1==this.cbs[a].oneShot&&this.cbs.splice(a,1)):
(logger_1.logger.log("HDXMS didnt find this one. (cbs)"),logger_1.logger.log(this.cbs))}else logger_1.logger.log("HDXMS Received bogus message: "+a+"'")}else logger_1.logger.log("HDXMS: Unknown protocol: "+a+"'")};a.prototype.registerHandler=function(a,e,b){a=new completion(b.resolve.bind(b),b.reject.bind(b),a,e,b.id,b.oneShot,0);this.cbs.push(a)};a.prototype.unregisterHandler=function(a,e,b){var g=this.cbs.findIndex(function(d){return d.iid==a&&d.oid==e&&d.cbid==b});0<=g?this.cbs.splice(g,1):(logger_1.logger.log("HDXMS Didnt find this callback in the list!"),
console.log(this.cbs))};a.prototype.isRedirected=function(){return this.status===RedirectionStatus.Redirected||this.status===RedirectionStatus.Binding||this.status===RedirectionStatus.Connecting};a.prototype.isPingActive=function(){return this.pingactive};a.prototype.pingConnectionBegin=function(){this.pingactive=!0;this.conntimer=setTimeout(function(){logger_1.logger.log("checking if we are connected...");(0,window.onVdiClientDisconnectedTimer)()},15E3)};a.prototype.pingConnectionEnd=function(){this.pingactive=
!1;clearTimeout(this.conntimer)};return a}();exports.HdxMediaStream=HdxMediaStream;var hdxMediaStream=new HdxMediaStream;function getRedirector(){return hdxMediaStream}exports.getRedirector=getRedirector;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var $jscomp = {
    scope: {}, getGlobal: function (a) {
        return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
    }
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.initSymbol = function () {
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
    $jscomp.initSymbol = function () {
    }
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (a) {
    return "jscomp_symbol_" + a + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.makeIterator = function (a) {
    $jscomp.initSymbolIterator();
    if (a[$jscomp.global.Symbol.iterator]) return a[$jscomp.global.Symbol.iterator]();
    var b = 0;
    return {
        next: function () {
            return b == a.length ? {done: !0} : {done: !1, value: a[b++]}
        }
    }
};
$jscomp.arrayFromIterator = function (a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
    return c
};
$jscomp.arrayFromIterable = function (a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
};
$jscomp.inherits = function (a, b) {
    function c() {
    }

    c.prototype = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    for (var e in b) if ($jscomp.global.Object.defineProperties) {
        var d = $jscomp.global.Object.getOwnPropertyDescriptor(b, e);
        d && $jscomp.global.Object.defineProperty(a, e, d)
    } else a[e] = b[e]
};
$jscomp.array = $jscomp.array || {};
$jscomp.array.done_ = function () {
    return {done: !0, value: void 0}
};
$jscomp.array.arrayIterator_ = function (a, b) {
    a instanceof String && (a = String(a));
    var c = 0;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var e = {}, d = (e.next = function () {
        if (c < a.length) {
            var e = c++;
            return {value: b(e, a[e]), done: !1}
        }
        d.next = $jscomp.array.done_;
        return $jscomp.array.done_()
    }, e[Symbol.iterator] = function () {
        return d
    }, e);
    return d
};
$jscomp.array.findInternal_ = function (a, b, c) {
    a instanceof String && (a = String(a));
    for (var e = a.length, d = 0; d < e; d++) {
        var f = a[d];
        if (b.call(c, f, d, a)) return {i: d, v: f}
    }
    return {i: -1, v: void 0}
};
$jscomp.array.from = function (a, b, c) {
    b = void 0 === b ? function (a) {
        return a
    } : b;
    var e = [];
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    if (a[Symbol.iterator]) {
        $jscomp.initSymbol();
        $jscomp.initSymbolIterator();
        a = a[Symbol.iterator]();
        for (var d; !(d = a.next()).done;) e.push(b.call(c, d.value))
    } else {
        d = a.length;
        for (var f = 0; f < d; f++) e.push(b.call(c, a[f]))
    }
    return e
};
$jscomp.array.of = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return $jscomp.array.from(b)
};
$jscomp.array.entries = function () {
    return $jscomp.array.arrayIterator_(this, function (a, b) {
        return [a, b]
    })
};
$jscomp.array.entries$install = function () {
    Array.prototype.entries || (Array.prototype.entries = $jscomp.array.entries)
};
$jscomp.array.keys = function () {
    return $jscomp.array.arrayIterator_(this, function (a) {
        return a
    })
};
$jscomp.array.keys$install = function () {
    Array.prototype.keys || (Array.prototype.keys = $jscomp.array.keys)
};
$jscomp.array.values = function () {
    return $jscomp.array.arrayIterator_(this, function (a, b) {
        return b
    })
};
$jscomp.array.values$install = function () {
    Array.prototype.values || (Array.prototype.values = $jscomp.array.values)
};
$jscomp.array.copyWithin = function (a, b, c) {
    var e = this.length;
    a = Number(a);
    b = Number(b);
    c = Number(null != c ? c : e);
    if (a < b) for (c = Math.min(c, e); b < c;) b in this ? this[a++] = this[b++] : (delete this[a++], b++); else for (c = Math.min(c, e + b - a), a += c - b; c > b;) --c in this ? this[--a] = this[c] : delete this[a];
    return this
};
$jscomp.array.copyWithin$install = function () {
    Array.prototype.copyWithin || (Array.prototype.copyWithin = $jscomp.array.copyWithin)
};
$jscomp.array.fill = function (a, b, c) {
    null != c && a.length || (c = this.length || 0);
    c = Number(c);
    for (b = Number((void 0 === b ? 0 : b) || 0); b < c; b++) this[b] = a;
    return this
};
$jscomp.array.fill$install = function () {
    Array.prototype.fill || (Array.prototype.fill = $jscomp.array.fill)
};
$jscomp.array.find = function (a, b) {
    return $jscomp.array.findInternal_(this, a, b).v
};
$jscomp.array.find$install = function () {
    Array.prototype.find || (Array.prototype.find = $jscomp.array.find)
};
$jscomp.array.findIndex = function (a, b) {
    return $jscomp.array.findInternal_(this, a, b).i
};
$jscomp.array.findIndex$install = function () {
    Array.prototype.findIndex || (Array.prototype.findIndex = $jscomp.array.findIndex)
};
$jscomp.Map = function (a) {
    a = void 0 === a ? [] : a;
    this.data_ = {};
    this.head_ = $jscomp.Map.createHead_();
    this.size = 0;
    if (a) {
        a = $jscomp.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next()) b = b.value, this.set(b[0], b[1])
    }
};
$jscomp.Map.checkBrowserConformance_ = function () {
    var a = $jscomp.global.Map;
    if (!a || !a.prototype.entries || !Object.seal) return !1;
    try {
        var b = Object.seal({x: 4}), c = new a($jscomp.makeIterator([[b, "s"]]));
        if ("s" != c.get(b) || 1 != c.size || c.get({x: 4}) || c.set({x: 4}, "t") != c || 2 != c.size) return !1;
        var e = c.entries(), d = e.next();
        if (d.done || d.value[0] != b || "s" != d.value[1]) return !1;
        d = e.next();
        return d.done || 4 != d.value[0].x || "t" != d.value[1] || !e.next().done ? !1 : !0
    } catch (f) {
        return !1
    }
};
$jscomp.Map.createHead_ = function () {
    var a = {};
    return a.previous = a.next = a.head = a
};
$jscomp.Map.getId_ = function (a) {
    if (!(a instanceof Object)) return String(a);
    $jscomp.Map.key_ in a || a instanceof Object && Object.isExtensible && Object.isExtensible(a) && $jscomp.Map.defineProperty_(a, $jscomp.Map.key_, ++$jscomp.Map.index_);
    return $jscomp.Map.key_ in a ? a[$jscomp.Map.key_] : " " + a
};
$jscomp.Map.prototype.set = function (a, b) {
    var c = this.maybeGetEntry_(a), e = c.id, d = c.list, c = c.entry;
    d || (d = this.data_[e] = []);
    c ? c.value = b : (c = {
        next: this.head_,
        previous: this.head_.previous,
        head: this.head_,
        key: a,
        value: b
    }, d.push(c), this.head_.previous.next = c, this.head_.previous = c, this.size++);
    return this
};
$jscomp.Map.prototype["delete"] = function (a) {
    var b = this.maybeGetEntry_(a);
    a = b.id;
    var c = b.list, e = b.index;
    return (b = b.entry) && c ? (c.splice(e, 1), c.length || delete this.data_[a], b.previous.next = b.next, b.next.previous = b.previous, b.head = null, this.size--, !0) : !1
};
$jscomp.Map.prototype.clear = function () {
    this.data_ = {};
    this.head_ = this.head_.previous = $jscomp.Map.createHead_();
    this.size = 0
};
$jscomp.Map.prototype.has = function (a) {
    return !!this.maybeGetEntry_(a).entry
};
$jscomp.Map.prototype.get = function (a) {
    return (a = this.maybeGetEntry_(a).entry) && a.value
};
$jscomp.Map.prototype.maybeGetEntry_ = function (a) {
    var b = $jscomp.Map.getId_(a), c = this.data_[b];
    if (c) for (var e = 0; e < c.length; e++) {
        var d = c[e];
        if (a !== a && d.key !== d.key || a === d.key) return {id: b, list: c, index: e, entry: d}
    }
    return {id: b, list: c, index: -1, entry: void 0}
};
$jscomp.Map.prototype.entries = function () {
    return this.iter_(function (a) {
        return [a.key, a.value]
    })
};
$jscomp.Map.prototype.keys = function () {
    return this.iter_(function (a) {
        return a.key
    })
};
$jscomp.Map.prototype.values = function () {
    return this.iter_(function (a) {
        return a.value
    })
};
$jscomp.Map.prototype.forEach = function (a, b) {
    for (var c = $jscomp.makeIterator(this.entries()), e = c.next(); !e.done; e = c.next()) e = e.value, a.call(b, e[1], e[0], this)
};
$jscomp.Map.prototype.iter_ = function (a) {
    var b = this, c = this.head_;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var e = {};
    return e.next = function () {
        if (c) {
            for (; c.head != b.head_;) c = c.previous;
            for (; c.next != c.head;) return c = c.next, {done: !1, value: a(c)};
            c = null
        }
        return {done: !0, value: void 0}
    }, e[Symbol.iterator] = function () {
        return this
    }, e
};
$jscomp.Map.index_ = 0;
$jscomp.Map.defineProperty_ = Object.defineProperty ? function (a, b, c) {
    Object.defineProperty(a, b, {value: String(c)})
} : function (a, b, c) {
    a[b] = String(c)
};
$jscomp.Map.Entry_ = function () {
};
$jscomp.Map.ASSUME_NO_NATIVE = !1;
$jscomp.Map$install = function () {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    !$jscomp.Map.ASSUME_NO_NATIVE && $jscomp.Map.checkBrowserConformance_() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.key_ = Symbol("map-id-key"));
    $jscomp.Map$install = function () {
    }
};
$jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function (a) {
    a = Number(a) >>> 0;
    if (0 === a) return 32;
    var b = 0;
    0 === (a & 4294901760) && (a <<= 16, b += 16);
    0 === (a & 4278190080) && (a <<= 8, b += 8);
    0 === (a & 4026531840) && (a <<= 4, b += 4);
    0 === (a & 3221225472) && (a <<= 2, b += 2);
    0 === (a & 2147483648) && b++;
    return b
};
$jscomp.math.imul = function (a, b) {
    a = Number(a);
    b = Number(b);
    var c = a & 65535, e = b & 65535;
    return c * e + ((a >>> 16 & 65535) * e + c * (b >>> 16 & 65535) << 16 >>> 0) | 0
};
$jscomp.math.sign = function (a) {
    a = Number(a);
    return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1
};
$jscomp.math.log10 = function (a) {
    return Math.log(a) / Math.LN10
};
$jscomp.math.log2 = function (a) {
    return Math.log(a) / Math.LN2
};
$jscomp.math.log1p = function (a) {
    a = Number(a);
    if (.25 > a && -.25 < a) {
        for (var b = a, c = 1, e = a, d = 0, f = 1; d != e;) b *= a, f *= -1, e = (d = e) + f * b / ++c;
        return e
    }
    return Math.log(1 + a)
};
$jscomp.math.expm1 = function (a) {
    a = Number(a);
    if (.25 > a && -.25 < a) {
        for (var b = a, c = 1, e = a, d = 0; d != e;) b *= a / ++c, e = (d = e) + b;
        return e
    }
    return Math.exp(a) - 1
};
$jscomp.math.cosh = function (a) {
    a = Number(a);
    return (Math.exp(a) + Math.exp(-a)) / 2
};
$jscomp.math.sinh = function (a) {
    a = Number(a);
    return 0 === a ? a : (Math.exp(a) - Math.exp(-a)) / 2
};
$jscomp.math.tanh = function (a) {
    a = Number(a);
    if (0 === a) return a;
    var b = Math.exp(2 * -Math.abs(a)), b = (1 - b) / (1 + b);
    return 0 > a ? -b : b
};
$jscomp.math.acosh = function (a) {
    a = Number(a);
    return Math.log(a + Math.sqrt(a * a - 1))
};
$jscomp.math.asinh = function (a) {
    a = Number(a);
    if (0 === a) return a;
    var b = Math.log(Math.abs(a) + Math.sqrt(a * a + 1));
    return 0 > a ? -b : b
};
$jscomp.math.atanh = function (a) {
    a = Number(a);
    return ($jscomp.math.log1p(a) - $jscomp.math.log1p(-a)) / 2
};
$jscomp.math.hypot = function (a, b, c) {
    for (var e = [], d = 2; d < arguments.length; ++d) e[d - 2] = arguments[d];
    a = Number(a);
    b = Number(b);
    for (var f = Math.max(Math.abs(a), Math.abs(b)), h = $jscomp.makeIterator(e), d = h.next(); !d.done; d = h.next()) f = Math.max(f, Math.abs(d.value));
    if (1E100 < f || 1E-100 > f) {
        a /= f;
        b /= f;
        h = a * a + b * b;
        e = $jscomp.makeIterator(e);
        for (d = e.next(); !d.done; d = e.next()) d = d.value, d = Number(d) / f, h += d * d;
        return Math.sqrt(h) * f
    }
    f = a * a + b * b;
    e = $jscomp.makeIterator(e);
    for (d = e.next(); !d.done; d = e.next()) d = d.value, d = Number(d), f +=
        d * d;
    return Math.sqrt(f)
};
$jscomp.math.trunc = function (a) {
    a = Number(a);
    if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
    var b = Math.floor(Math.abs(a));
    return 0 > a ? -b : b
};
$jscomp.math.cbrt = function (a) {
    if (0 === a) return a;
    a = Number(a);
    var b = Math.pow(Math.abs(a), 1 / 3);
    return 0 > a ? -b : b
};
$jscomp.number = $jscomp.number || {};
$jscomp.number.isFinite = function (a) {
    return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a
};
$jscomp.number.isInteger = function (a) {
    return $jscomp.number.isFinite(a) ? a === Math.floor(a) : !1
};
$jscomp.number.isNaN = function (a) {
    return "number" === typeof a && isNaN(a)
};
$jscomp.number.isSafeInteger = function (a) {
    return $jscomp.number.isInteger(a) && Math.abs(a) <= $jscomp.number.MAX_SAFE_INTEGER
};
$jscomp.number.EPSILON = Math.pow(2, -52);
$jscomp.number.MAX_SAFE_INTEGER = 9007199254740991;
$jscomp.number.MIN_SAFE_INTEGER = -9007199254740991;
$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function (a, b) {
    for (var c = [], e = 1; e < arguments.length; ++e) c[e - 1] = arguments[e];
    c = $jscomp.makeIterator(c);
    for (e = c.next(); !e.done; e = c.next()) if (e = e.value) for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d]);
    return a
};
$jscomp.object.is = function (a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
};
$jscomp.Set = function (a) {
    a = void 0 === a ? [] : a;
    this.map_ = new $jscomp.Map;
    if (a) {
        a = $jscomp.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next()) this.add(b.value)
    }
    this.size = this.map_.size
};
$jscomp.Set.checkBrowserConformance_ = function () {
    var a = $jscomp.global.Set;
    if (!a || !a.prototype.entries || !Object.seal) return !1;
    var b = Object.seal({x: 4}), a = new a($jscomp.makeIterator([b]));
    if (a.has(b) || 1 != a.size || a.add(b) != a || 1 != a.size || a.add({x: 4}) != a || 2 != a.size) return !1;
    var a = a.entries(), c = a.next();
    if (c.done || c.value[0] != b || c.value[1] != b) return !1;
    c = a.next();
    return c.done || c.value[0] == b || 4 != c.value[0].x || c.value[1] != c.value[0] ? !1 : a.next().done
};
$jscomp.Set.prototype.add = function (a) {
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this
};
$jscomp.Set.prototype["delete"] = function (a) {
    a = this.map_["delete"](a);
    this.size = this.map_.size;
    return a
};
$jscomp.Set.prototype.clear = function () {
    this.map_.clear();
    this.size = 0
};
$jscomp.Set.prototype.has = function (a) {
    return this.map_.has(a)
};
$jscomp.Set.prototype.entries = function () {
    return this.map_.entries()
};
$jscomp.Set.prototype.values = function () {
    return this.map_.values()
};
$jscomp.Set.prototype.forEach = function (a, b) {
    var c = this;
    this.map_.forEach(function (e) {
        return a.call(b, e, e, c)
    })
};
$jscomp.Set.ASSUME_NO_NATIVE = !1;
$jscomp.Set$install = function () {
    !$jscomp.Set.ASSUME_NO_NATIVE && $jscomp.Set.checkBrowserConformance_() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.Map$install(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values);
    $jscomp.Set$install = function () {
    }
};
$jscomp.string = $jscomp.string || {};
$jscomp.string.noRegExp_ = function (a, b) {
    if (a instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
};
$jscomp.string.fromCodePoint = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    for (var c = "", b = $jscomp.makeIterator(b), e = b.next(); !e.done; e = b.next()) {
        e = e.value;
        e = +e;
        if (0 > e || 1114111 < e || e !== Math.floor(e)) throw new RangeError("invalid_code_point " + e);
        65535 >= e ? c += String.fromCharCode(e) : (e -= 65536, c += String.fromCharCode(e >>> 10 & 1023 | 55296), c += String.fromCharCode(e & 1023 | 56320))
    }
    return c
};
$jscomp.string.repeat = function (a) {
    var b = this.toString();
    if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
    a |= 0;
    for (var c = ""; a;) if (a & 1 && (c += b), a >>>= 1) b += b;
    return c
};
$jscomp.string.repeat$install = function () {
    String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat)
};
$jscomp.string.codePointAt = function (a) {
    var b = this.toString(), c = b.length;
    a = Number(a) || 0;
    if (0 <= a && a < c) {
        a |= 0;
        var e = b.charCodeAt(a);
        if (55296 > e || 56319 < e || a + 1 === c) return e;
        a = b.charCodeAt(a + 1);
        return 56320 > a || 57343 < a ? e : 1024 * (e - 55296) + a + 9216
    }
};
$jscomp.string.codePointAt$install = function () {
    String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt)
};
$jscomp.string.includes = function (a, b) {
    b = void 0 === b ? 0 : b;
    $jscomp.string.noRegExp_(a, "includes");
    return -1 !== this.toString().indexOf(a, b)
};
$jscomp.string.includes$install = function () {
    String.prototype.includes || (String.prototype.includes = $jscomp.string.includes)
};
$jscomp.string.startsWith = function (a, b) {
    b = void 0 === b ? 0 : b;
    $jscomp.string.noRegExp_(a, "startsWith");
    var c = this.toString();
    a += "";
    for (var e = c.length, d = a.length, f = Math.max(0, Math.min(b | 0, c.length)), h = 0; h < d && f < e;) if (c[f++] != a[h++]) return !1;
    return h >= d
};
$jscomp.string.startsWith$install = function () {
    String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith)
};
$jscomp.string.endsWith = function (a, b) {
    $jscomp.string.noRegExp_(a, "endsWith");
    var c = this.toString();
    a += "";
    void 0 === b && (b = c.length);
    for (var e = Math.max(0, Math.min(b | 0, c.length)), d = a.length; 0 < d && 0 < e;) if (c[--e] != a[--d]) return !1;
    return 0 >= d
};
$jscomp.string.endsWith$install = function () {
    String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith)
};
var __extends = this && this.__extends || function () {
    var a = function (b, c) {
        a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
            a.__proto__ = c
        } || function (a, c) {
            for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
        };
        return a(b, c)
    };
    return function (b, c) {
        function e() {
            this.constructor = b
        }

        a(b, c);
        b.prototype = null === c ? Object.create(c) : (e.prototype = c.prototype, new e)
    }
}(), __awaiter = this && this.__awaiter || function (a, b, c, e) {
    return new (c || (c = Promise))(function (d, f) {
        function h(a) {
            try {
                k(e.next(a))
            } catch (c) {
                f(c)
            }
        }

        function g(a) {
            try {
                k(e["throw"](a))
            } catch (c) {
                f(c)
            }
        }

        function k(a) {
            a.done ? d(a.value) : (new c(function (c) {
                c(a.value)
            })).then(h, g)
        }

        k((e = e.apply(a, b || [])).next())
    })
}, __generator = this && this.__generator || function (a, b) {
    function c(a) {
        return function (c) {
            return e([a, c])
        }
    }

    function e(c) {
        if (f) throw new TypeError("Generator is already executing.");
        for (; d;) try {
            if (f = 1, h && (g = c[0] & 2 ? h["return"] : c[0] ? h["throw"] || ((g = h["return"]) && g.call(h), 0) : h.next) && !(g = g.call(h, c[1])).done) return g;
            if (h = 0, g) c = [c[0] & 2, g.value];
            switch (c[0]) {
                case 0:
                case 1:
                    g =
                        c;
                    break;
                case 4:
                    return d.label++, {value: c[1], done: !1};
                case 5:
                    d.label++;
                    h = c[1];
                    c = [0];
                    continue;
                case 7:
                    c = d.ops.pop();
                    d.trys.pop();
                    continue;
                default:
                    if (!(g = d.trys, g = 0 < g.length && g[g.length - 1]) && (6 === c[0] || 2 === c[0])) {
                        d = 0;
                        continue
                    }
                    if (3 === c[0] && (!g || c[1] > g[0] && c[1] < g[3])) d.label = c[1]; else if (6 === c[0] && d.label < g[1]) d.label = g[1], g = c; else if (g && d.label < g[2]) d.label = g[2], d.ops.push(c); else {
                        g[2] && d.ops.pop();
                        d.trys.pop();
                        continue
                    }
            }
            c = b.call(a, d)
        } catch (e) {
            c = [6, e], h = 0
        } finally {
            f = g = 0
        }
        if (c[0] & 5) throw c[1];
        return {
            value: c[0] ?
                c[1] : void 0, done: !0
        }
    }

    var d = {
        label: 0, sent: function () {
            if (g[0] & 1) throw g[1];
            return g[1]
        }, trys: [], ops: []
    }, f, h, g, k;
    $jscomp.initSymbol();
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    return k = {
        next: c(0),
        "throw": c(1),
        "return": c(2)
    }, "function" === typeof Symbol && (k[Symbol.iterator] = function () {
        return this
    }), k
};
Object.defineProperty(exports, "__esModule", {value: !0});
var webrpcclassinfo_1 = __webpack_require__(1), proxyobject_1 = __webpack_require__(2),
    logger_1 = __webpack_require__(0), SimpleEvent = function () {
        return function (a, b) {
            this.type = a;
            this.target = b
        }
    }(), CloneState = function () {
        function a() {
            this.is_local_clone = !1;
            this.clone_id = this.clone_count = 0
        }

        a.prototype.clone = function () {
            this.clone_count++;
            var b = new a;
            b.is_local_clone = !0;
            b.clone_id = this.clone_count;
            return b
        };
        a.prototype.synchronize = function (a) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this,
                    function (c) {
                        return this.is_local_clone ? [2, a.asyncClone()] : [2, a]
                    })
            })
        };
        return a
    }(), RemoteMediaTrack = function (a) {
        function b(c, b) {
            var d = a.call(this, c, webrpcclassinfo_1.class_id_t.MediaStreamTrack, b, !0) || this;
            d.refCount_ = 0;
            d.refCount_++;
            d.clone_state = new CloneState;
            return d
        }

        __extends(b, a);
        Object.defineProperty(b.prototype, "refcount", {
            get: function () {
                return this.refCount_
            }, enumerable: !0, configurable: !0
        });
        b.prototype.addRef = function () {
            this.refCount_++;
            logger_1.logger.log(this.user_friendly_id() + ".addRef() called. [id=" +
                this.id + "] refcount=" + this.refCount_)
        };
        Object.defineProperty(b.prototype, "onended", {
            get: function () {
                logger_1.logger.log(this.user_friendly_id() + ".get_onended() called. [id=" + this.id + "]");
                return this.onended_
            }, set: function (a) {
                var b = this;
                logger_1.logger.log(this.user_friendly_id() + ".set_onended() called. [id=" + this.id + "]");
                this.onended_ = a;
                this.waitUntilConnected("MediaStreamTrack.onended").then(function () {
                    var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_MediaStreamTrack_t.onended);
                    d.then(function (a) {
                        logger_1.logger.log(b.user_friendly_id() + "onended event received!!!");
                        a = new SimpleEvent("ended", b);
                        b.readyState_ = "ended";
                        b.onended_(a)
                    });
                    return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.onended, d.success)
                })["catch"](function () {
                    logger_1.logger.log(b.user_friendly_id() + ".onended failed!!!")
                })
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(b.prototype, "onmute", {
            get: function () {
                logger_1.logger.log(this.user_friendly_id() + ".get_onmute() called. [id=" + this.id +
                    "]");
                return this.onmute_
            }, set: function (a) {
                var b = this;
                logger_1.logger.log(this.user_friendly_id() + ".set_onmute() called. [id=" + this.id + "]");
                this.onmute_ = a;
                this.waitUntilConnected("MediaStreamTrack.onmute").then(function () {
                    var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_MediaStreamTrack_t.onmute);
                    d.then(function (a) {
                        logger_1.logger.log(b.user_friendly_id() + "onmute event received!!!");
                        a = new SimpleEvent("mute", b);
                        b.muted = !0;
                        b.onmute_(a)
                    });
                    return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.onmute,
                        d.success)
                })["catch"](function () {
                    logger_1.logger.log(b.user_friendly_id() + ".onmute failed!!!")
                })
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(b.prototype, "onunmute", {
            get: function () {
                logger_1.logger.log(this.user_friendly_id() + ".get_onunmute() called. [id=" + this.id + "]");
                return this.onunmute_
            }, set: function (a) {
                var b = this;
                logger_1.logger.log(this.user_friendly_id() + ".set_onunmute() called. [id=" + this.id + "]");
                this.onunmute_ = a;
                this.waitUntilConnected("MediaStreamTrack.onunmute").then(function () {
                    var d =
                        b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_MediaStreamTrack_t.onunmute);
                    d.then(function (a) {
                        logger_1.logger.log("onunmute event received!!!");
                        a = new SimpleEvent("unmute", b);
                        b.muted = !1;
                        b.onunmute_(a)
                    });
                    return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.onunmute, d.success)
                })["catch"](function () {
                    logger_1.logger.log(b.user_friendly_id() + ".onunmute failed!!!")
                })
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(b.prototype, "onstop", {
            set: function (a) {
                this.onstop_ =
                    a
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(b.prototype, "enabled", {
            get: function () {
                logger_1.logger.log(this.user_friendly_id() + ".get_enabled() called. [id=" + this.id + ", value=" + this.enabled_ + "]");
                return this.enabled_
            }, set: function (a) {
                logger_1.logger.log(this.user_friendly_id() + ".set_enabled() called. [id=" + this.id + ", value=" + a + "]");
                this.enabled_ = a;
                this.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.enabled, a)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(b.prototype,
            "readyState", {
                get: function () {
                    logger_1.logger.log(this.user_friendly_id() + ".get_readyState() called. [id=" + this.id + "]");
                    return this.readyState_
                }, enumerable: !0, configurable: !0
            });
        b.prototype.asyncClone = function () {
            return __awaiter(this, void 0, void 0, function () {
                var a, e, d;
                return __generator(this, function (f) {
                    switch (f.label) {
                        case 0:
                            return [4, this.waitUntilConnected("RemoteMediaTrack.asyncClone")];
                        case 1:
                            return f.sent(), [4, this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.clone, [])];
                        case 2:
                            return a =
                                f.sent(), e = this.param0(a), d = new b(this, e.oid), [2, d.syncBarrier()]
                    }
                })
            })
        };
        b.prototype.clone = function () {
            logger_1.logger.log(this.user_friendly_id() + ".clone() called. [id=" + this.id + "]");
            var a = this.clone_state.clone(), e = new b(this, this.object_id());
            e.id = this.id + "." + a.clone_id.toString();
            e.label = this.label;
            e.kind = this.kind;
            e.enabled_ = this.enabled_;
            e.muted = this.muted;
            e.readyState_ = this.readyState_;
            e.trackSettings_ = this.trackSettings_;
            e.clone_state = a;
            return e
        };
        b.prototype.stop = function () {
            var a = this;
            logger_1.logger.log(this.user_friendly_id() +
                ".stop() called. [id=" + this.id + "] refcount=" + this.refCount_);
            this.readyState_ = "ended";
            if (0 < this.refCount_ && (this.refCount_--, 0 === this.refCount_ && (logger_1.logger.log(this.user_friendly_id() + ".stop() called. [id=" + this.id + "] remote invoking..."), this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.stop)["catch"](function (b) {
                logger_1.logger.log(a.user_friendly_id() + ".stop() failed with:" + b)
            }), null !== this.onstop_))) this.onstop_()
        };
        b.prototype.getCapabilities = function () {
            logger_1.logger.log(this.user_friendly_id() +
                ".getCapabilities() called. [id=" + this.id + "]")
        };
        b.prototype.getConstrains = function () {
            logger_1.logger.log(this.user_friendly_id() + ".getConstrains() called. [id=" + this.id + "]")
        };
        b.prototype.getSettings = function () {
            return "audio" == this.kind ? function (a) {
                return {deviceId: a.deviceId, echoCancellation: a.echoCancellation}
            }(this.trackSettings_) : function (a) {
                return {
                    aspectRatio: a.aspectRatio,
                    deviceId: a.deviceId,
                    frameRate: a.frameRate,
                    height: a.height,
                    width: a.width
                }
            }(this.trackSettings_)
        };
        b.prototype.applyConstraints =
            function (a) {
                var b = this;
                logger_1.logger.log("MediaStreamTrack.applyConstraints() called.");
                return new Promise(function (d, f) {
                    b.waitUntilConnected("MediaStreamTrack.applyConstraints").then(function () {
                        return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.applyConstraints, a)
                    }).then(function () {
                        d()
                    })["catch"](function () {
                        f({name: "OverconstrainedError", message: "Failed to apply constraints."})
                    })
                })
            };
        b.convertReadyState = function (a) {
            return 0 == a ? "live" : "ended"
        };
        b.prototype.syncBarrier = function () {
            var a =
                this;
            logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
            return new Promise(function (e, d) {
                a.waitUntilConnected("MediaStreamTrack.syncBarrier").then(function () {
                    return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.kind, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.id, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.label, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.enabled, !1), a.remoteInvoke(!1,
                        webrpcclassinfo_1.method_id_MediaStreamTrack_t.muted, !1), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.readyState, 0), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.getSettings)])
                }).then(function (d) {
                    var h = 0;
                    d = d.map(function (b) {
                        return a.param0(b)
                    });
                    a.kind = d[0];
                    a.id = d[1];
                    a.label = d[2];
                    a.enabled_ = d[3];
                    a.muted = d[4];
                    h = d[5];
                    a.trackSettings_ = d[6];
                    a.readyState_ = b.convertReadyState(h);
                    e(a)
                })["catch"](function () {
                    d()
                })
            })
        };
        return b
    }(proxyobject_1.ProxyObject);
exports.RemoteMediaTrack = RemoteMediaTrack;
var StreamInfo = function () {
    return function () {
    }
}(), RemoteStream = function (a) {
    function b(c, b) {
        var d = a.call(this, c, webrpcclassinfo_1.class_id_t.MediaStream, b, !0) || this;
        d.clone_state = new CloneState;
        return d
    }

    __extends(b, a);
    b.prototype.dumpTrackInfo = function () {
        logger_1.logger.log(this.user_friendly_id() + ".dumpTrackInfo() called. [id=" + this.id + "]");
        for (var a = 0, b = this.tracks_; a < b.length; a++) {
            var d = b[a];
            logger_1.logger.log(d.user_friendly_id() + " [id=" + d.id + "] refcount=" + d.refcount)
        }
    };
    b.prototype.toJSON = function () {
        var a =
            new StreamInfo;
        a.id = this.id;
        a.active = this.active;
        a.oid = this.object_id();
        return "RemoteStream:" + JSON.stringify(a)
    };
    b.prototype.getAudioTracks = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getAudioTracks() called. [id=" + this.id + "]");
        for (var a = [], b = 0, d = this.tracks_; b < d.length; b++) {
            var f = d[b];
            "audio" == f.kind && a.push(f)
        }
        return a
    };
    b.prototype.getVideoTracks = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getVideoTracks() called. [id=" + this.id + "]");
        for (var a = [], b = 0, d = this.tracks_; b < d.length; b++) {
            var f =
                d[b];
            "video" == f.kind && a.push(f)
        }
        return a
    };
    b.prototype.getTracks = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getTracks() called. [id=" + this.id + "]");
        return this.tracks_
    };
    b.prototype.getTrackById = function (a) {
        logger_1.logger.log(this.user_friendly_id() + ".getTrackById() called. [id=" + this.id + "]");
        for (var b = 0, d = this.tracks_; b < d.length; b++) {
            var f = d[b];
            if (f.id == a) return f
        }
    };
    b.prototype.addTrack = function (a) {
        logger_1.logger.log(this.user_friendly_id() + ".addTrack() called. [id=" + this.id + "]");
        this.tracks_.push(a);
        this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.addTrack, {oid: a.object_id()})
    };
    b.prototype.removeTrack = function (a) {
        logger_1.logger.log(this.user_friendly_id() + ".removeTrack() called. [id=" + this.id + "]");
        var b = this.tracks_.indexOf(a);
        this.tracks_.splice(b, 1);
        this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.removeTrack, {oid: a.object_id()})
    };
    b.prototype.asyncClone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a, e, d;
            return __generator(this, function (f) {
                switch (f.label) {
                    case 0:
                        return logger_1.logger.log(this.user_friendly_id() +
                            ".asyncClone() called. [id=" + this.id + "]"), [4, this.waitUntilConnected("asyncClone")];
                    case 1:
                        return f.sent(), [4, this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.clone, [])];
                    case 2:
                        return a = f.sent(), console.log(a), e = this.param0(a), d = new b(this, e.oid), [2, d.syncBarrier()]
                }
            })
        })
    };
    b.prototype.clone = function () {
        logger_1.logger.log(this.user_friendly_id() + ".clone() called. [id=" + this.id + "]");
        var a = this.clone_state.clone(), e = new b(this, this.object_id());
        e.id = this.id + "." + a.clone_id.toString();
        this.tracks_.forEach(function (a) {
            a.addRef()
        });
        e.tracks_ = this.tracks_;
        e.clone_state = a;
        return e
    };
    b.prototype.syncBarrier = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called. [id=" + this.id + "]");
        return new Promise(function (b, d) {
            a.waitUntilConnected("MediaStream.syncBarrier").then(function () {
                return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.id, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.active, !1), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.getTracks,
                    [])])
            }).then(function (b) {
                b = b.map(function (b) {
                    return a.param0(b)
                });
                a.id = b[0];
                a.active = b[1];
                b = b[2];
                for (var e = [], d = 0; d < b.length; d++) {
                    var k = new RemoteMediaTrack(a, b[d].oid);
                    e.push(k.syncBarrier())
                }
                return Promise.all(e)
            }).then(function (d) {
                a.tracks_ = [];
                d.forEach(function (b) {
                    b.onstop = function () {
                        var b = !0;
                        a.tracks_.forEach(function (a) {
                            "ended" != a.readyState && (b = !1)
                        });
                        b && a.release()
                    };
                    a.tracks_.push(b)
                });
                b(a)
            })["catch"](function () {
                d()
            })
        })
    };
    return b
}(proxyobject_1.ProxyObject);
exports.RemoteStream = RemoteStream;
var RemoteStreamEvent = function (a) {
    function b(b, e) {
        return a.call(this, b, webrpcclassinfo_1.class_id_t.MediaStreamEvent, e, !0) || this
    }

    __extends(b, a);
    b.prototype.syncBarrier = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
        return new Promise(function (b, d) {
            a.waitUntilConnected("MediaStreamEvent.syncBarrier").then(function () {
                return a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamEvent_t.stream, {oid: 0})
            }).then(function (b) {
                return (new RemoteStream(a, b.params[0].oid)).syncBarrier()
            }).then(function (d) {
                a.stream =
                    d;
                b(a)
            })["catch"](function () {
                d()
            })
        })
    };
    return b
}(proxyobject_1.ProxyObject);
exports.RemoteStreamEvent = RemoteStreamEvent;
var RemoteDeviceInfo = function (a) {
    function b(b) {
        return a.call(this, null, webrpcclassinfo_1.class_id_t.MediaDeviceInfo, b, !0) || this
    }

    __extends(b, a);
    b.prototype.convertKind = function (a) {
        return 0 == a ? "audioinput" : 1 == a ? "audiooutput" : "videoinput"
    };
    b.prototype.syncBarrier = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
        return new Promise(function (b, d) {
            a.waitUntilConnected("RemoteDeviceInfo.syncBarrier").then(function () {
                return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.deviceId,
                    ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.kind, 0), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.label, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.groupId, "")])
            }).then(function (d) {
                a.kind = a.convertKind(a.param0(d.splice(1, 1)[0]));
                d = d.map(function (b) {
                    return a.param0(b)
                });
                a.deviceId = d[0];
                a.label = d[1];
                a.groupId = d[2];
                b(a)
            })["catch"](function () {
                logger_1.logger.log(a.user_friendly_id() + ".syncBarrier(): rejected.");
                d()
            })
        })
    };
    return b
}(proxyobject_1.ProxyObject);
exports.RemoteDeviceInfo = RemoteDeviceInfo;
var RemoteDevices = function (a) {
    function b() {
        var b = a.call(this, null, webrpcclassinfo_1.class_id_t.MediaDevices, 0, !1) || this;
        b.devices_ = [];
        b.setDeviceChangeCallback();
        return b
    }

    __extends(b, a);
    b.prototype.enumerateDevices = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".enumerateDevices() called");
        return new Promise(function (b, d) {
            a.waitUntilConnected("RemoteDevices.enumerateDevices").then(function () {
                return a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDevices_t.enumerateDevices, [])
            }).then(function (b) {
                var d =
                    [];
                b.params[0].forEach(function (b) {
                    var e = a.devices_.find(function (a) {
                        return a.object_id() === b.oid
                    });
                    void 0 === e ? (e = new RemoteDeviceInfo(b.oid), d.push(e.syncBarrier())) : d.push(e)
                });
                return Promise.all(d)
            }).then(function (d) {
                logger_1.logger.log(a.user_friendly_id() + ".enumerateDevices: returning enumerated devices with ids [" + d.map(function (a) {
                    return a.object_id()
                }) + "]");
                b(d);
                a.devices_.forEach(function (a) {
                    for (var b = !0, c = 0; c < d.length; c++) if (a === d[c]) {
                        b = !1;
                        break
                    }
                    b && a.release()
                });
                a.devices_ = d
            })["catch"](function () {
                logger_1.logger.log(a.user_friendly_id() +
                    ".enumerateDevices() didnt get response.");
                a.devices_ = [];
                d()
            })
        })
    };
    b.prototype.getDisplayMedia = function (a) {
        var b = this;
        return new Promise(function (d, f) {
            b.waitUntilConnected("RemoteDevices.getDisplayMedia").then(function () {
                return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDevices_t.getDisplayMedia, a)
            }).then(function (a) {
                return (new RemoteStream(null, a.params[0].oid)).syncBarrier()
            }).then(function (a) {
                d(a)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".getDisplayMedia() returned an error.");
                f(new DOMException("Unable to get a display stream.", "NotReadableError"))
            })
        })
    };
    b.prototype.setDeviceChangeCallback = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".set_DeviceChangeCallback() called.");
        this.waitUntilConnected("MediaDevices.ondevicechange").then(function () {
            var b = a.registerCallbacks(!1, !1, webrpcclassinfo_1.method_id_MediaDevices_t.ondevicechange);
            b.then(function () {
                logger_1.logger.log(a.user_friendly_id() + ".ondevicechange(): callback received!!!");
                navigator.mediaDevices.dispatchEvent(new CustomEvent("devicechange"))
            });
            return a.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaDevices_t.ondevicechange, b.success)
        })["catch"](function () {
            logger_1.logger.log(a.user_friendly_id() + ".set_ondevicechange(): failed.")
        })
    };
    return b
}(proxyobject_1.ProxyObject);
exports.RemoteDevices = RemoteDevices;
var NavigatorUserMedia = function (a) {
    function b() {
        return a.call(this, null, webrpcclassinfo_1.class_id_t.NavigatorUserMedia, 0, !1) || this
    }

    __extends(b, a);
    b.prototype.webkitGetUserMedia = function (a, b, d) {
        this.getUserMedia(a, b, d)
    };
    b.prototype.getUserMedia = function (a, b, d) {
        var f = this;
        logger_1.logger.log(this.user_friendly_id() + ".getUserMedia() called: " + JSON.stringify(a));
        this.waitUntilConnected("NavigatorUserMedia.getUserMedia").then(function () {
            var b = f.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_NavigatorUserMedia_t.getUserMedia);
            "undefined" !== typeof a.audio && 0 == Object.keys(a.audio).length && (a.audio = {dummy: 1});
            if ("undefined" !== typeof a.video) {
                var d = a.video;
                void 0 == d.mandatory.maxFrameRate && (d.mandatory.maxFrameRate = 30);
                void 0 == d.mandatory.minWidth && (d.mandatory.minWidth = 360);
                void 0 == d.mandatory.maxWidth && (d.mandatory.maxWidth = 1920);
                void 0 == d.mandatory.minHeight && (d.mandatory.minHeight = 180);
                void 0 == d.mandatory.maxHeight && (d.mandatory.maxHeight = 1080)
            }
            f.remoteInvoke(!1, webrpcclassinfo_1.method_id_NavigatorUserMedia_t.getUserMedia,
                a, b.success, b.fail);
            return b.prom()
        }).then(function (a) {
            logger_1.logger.log(f.user_friendly_id() + ".getUserMedia: received success callback!");
            return (new RemoteStream(null, f.param0(a).oid)).syncBarrier()
        }).then(function (a) {
            logger_1.logger.log(f.user_friendly_id() + ".getUserMedia: MediaStream ready to deliver", JSON.stringify(a));
            0 == a.getTracks().length ? (logger_1.logger.log(f.user_friendly_id() + ".getUserMedia: reporting no tracks as error."), d({
                    constraintName: "",
                    name: "ConstraintNotSatisfiedError",
                    message: ""
                })) :
                b(a)
        })["catch"](function (a) {
            logger_1.logger.log(a);
            d({constraintName: "", name: "ConstraintNotSatisfiedError", message: ""})
        })
    };
    return b
}(proxyobject_1.ProxyObject);
exports.NavigatorUserMedia = NavigatorUserMedia;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:!0});var webrpcclassinfo_1=__webpack_require__(1),ws_msg_type_t;(function(a){a[a.req=0]="req";a[a.reply=1]="reply";a[a.event_req=2]="event_req";a[a.event_reply=3]="event_reply"})(ws_msg_type_t=exports.ws_msg_type_t||(exports.ws_msg_type_t={}));
var WsJsonUtil=function(){function a(){}a.createMessageByid=function(a,c,g,e,f,h){for(var d=[],b=6;b<arguments.length;b++)d[b-6]=arguments[b];(b=webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodByid(e,f))&&b.isprop||(a=!1);return this.createMessage.apply(this,[g,a,c,e,f,h].concat(d))};a.createMessage=function(a,c,g,e,f,h){for(var d=[],b=6;b<arguments.length;b++)d[b-6]=arguments[b];return{v:"webrtc",hdr:{version:this._version,msg_type:this.getMsgType(a),modifier:c,destroy:g,proc:{iid:e,methodid:f}},
objref:{oid:h},params:d.slice()}};a.getMsgType=function(a){var c="";switch(a){default:c="req";break;case ws_msg_type_t.reply:c="reply";break;case ws_msg_type_t.event_req:c="event-req";break;case ws_msg_type_t.event_reply:c="event-reply"}return c};a._version=1;return a}();exports.WsJsonUtil=WsJsonUtil;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:!0});
var Node=function(){function b(a){this.parent_=this.object_=null;this.children_=[];this.object_=a}b.prototype.addChild=function(a){a.parent_!=this&&(a.parent_=this,this.children_.push(a))};b.prototype.removeChild=function(a){var d=this.children_.indexOf(a);this.children_.splice(d,1);a.parent_=null};return b}(),GC=function(){function b(){this.root_=new Node(null)}b.prototype.trackObject=function(a,d){void 0===d&&(d=null);if(null===this.findNode(a,this.root_)){var c=this.findNode(d,this.root_),b=new Node(a);
c.addChild(b)}};b.prototype.releaseObject=function(a){a=this.findNode(a,this.root_);if(null===a||a===this.root_)return!1;this.destroyNodeObjectRecurse(a);a.parent_.removeChild(a);return!0};b.prototype.destroyNodeObjectRecurse=function(a){for(var d=0,c=a.children_;d<c.length;d++)this.destroyNodeObjectRecurse(c[d]);a.object_.destroy()};b.prototype.setParent=function(a,d){var c=this.findNode(a,this.root_);if(null===c)return!1;var b=this.findNode(d,this.root_);if(null===b)return!1;if(c.parent_===b)return!0;
c.parent_.removeChild(c);b.addChild(c);return!0};b.prototype.reset=function(){this.root_.children_=[]};b.prototype.findNode=function(a,b){if(b.object_===a)return b;for(var c=null,e=0,f=b.children_;e<f.length&&(c=this.findNode(a,f[e]),null===c);e++);return c};return b}();exports.GC=GC;exports.gc=new GC;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var vdishim = __webpack_require__(9), rmshim = __webpack_require__(5), videoelem = __webpack_require__(11),
    audioelem = __webpack_require__(12), frametracker = __webpack_require__(13),
    logger = __webpack_require__(0).logger, remotesession = __webpack_require__(14),
    garbagecollector = __webpack_require__(7).gc, remoteDevices = new rmshim.RemoteDevices;
module.exports.CitrixPeerConnection = vdishim.PeerConnection;
module.exports.getUserMedia = function (a, c, b) {
    return (new rmshim.NavigatorUserMedia).webkitGetUserMedia(a, c, b)
};
module.exports.enumerateDevices = function () {
    return remoteDevices.enumerateDevices()
};
module.exports.mapVideoElement = function (a) {
    var c = new frametracker.FrameTracker;
    logger.log("VDI New Video Element Created, Creating Mapping to VDA");
    void 0 !== a.VDAVideoElement ? logger.log("Video element is already configured!") : (Object.defineProperty(a, "VDAVideoElement", {
        writable: !0,
        value: null
    }), a.VDAVideoElement = new videoelem.VideoElement, a.VDAVideoElement.onloadedmetadata = function () {
        var b = new Event("loadedmetadata");
        a.dispatchEvent(b)
    }, a.VDAVideoElement.ontimeupdate = function () {
        var b = new Event("timeupdate");
        a.dispatchEvent(b)
    }, a.VDAVideoElement.onconnectionstatechange = function () {
        "connected" == a.VDAVideoElement.connectionState ? c.track(a, function (b) {
            a.VDAVideoElement.setFrame(b)
        }) : c.untrack(a)
    }, Object.defineProperty(a, "sinkId", {
        get: function () {
            return a.VDAVideoElement.sinkId
        }, set: function (b) {
            logger.log("VDI Shim set video element SinkId value = " + b);
            a.VDAVideoElement.sinkId = b
        }
    }), Object.defineProperty(a, "srcObject", {
        get: function () {
            return a.VDAVideoElement.srcObject
        }, set: function (b) {
            logger.log("VDI Shim set video element srcObject");
            a.VDAVideoElement.srcObject = b
        }
    }), Object.defineProperty(a, "videoWidth", {
        get: function () {
            return a.VDAVideoElement.videoWidth
        }
    }), Object.defineProperty(a, "videoHeight", {
        get: function () {
            return a.VDAVideoElement.videoHeight
        }
    }))
};
module.exports.mapAudioElement = function (curAudioElem) {
	logger.log("VDI New Audio Element Created, Creating Mapping to VDA");
	if (curAudioElem['VDAAudioElement'] !== undefined) {
		logger.log('Audio element is already configured!');
		return;
	}

	Object.defineProperty(curAudioElem, 'VDAAudioElement', {
		writable: true,
		value: null
	});
	curAudioElem.VDAAudioElement = new audioelem.AudioElement();

	Object.defineProperty(curAudioElem, 'sinkId', {
		get: function () {
			return curAudioElem.VDAAudioElement.sinkId;
		},
		set: function (v) {
			logger.log("VDI Shim set audio element SinkId value = " + v);
			curAudioElem.VDAAudioElement.sinkId = v;
		}
	});

	Object.defineProperty(curAudioElem, 'srcObject', {
		get: function () {
			return curAudioElem.VDAAudioElement.srcObject;
		},
		set: function (v) {
			logger.log('VDI Shim set video element srcObject');
			curAudioElem.VDAAudioElement.srcObject = v;
			if (v === null || v === undefined) {
				//TODO - delete if actually setting srcObject on AudioElement
				if (curAudioElem.VDAAudioElement.srcObject !== null) {
					let audio_tr = teamsAudioElem.remoteAudioElement.srcObject.getTracks();
					for (let next of audio_tr) {
						next.enabled = false;
					}
				}
				curAudioElem.VDAAudioElement.release();
			}
			else {
				curAudioElem.VDAAudioElement.srcObject = v;
				console.log(v);
				let audio_tr = v.getTracks();
				for (let next of audio_tr) {
					next.enabled = true;
				}
			}
		},
	});
}
module.exports.addClipRect = function (a) {
    logger.log("VDI Adding Occlusion " + JSON.stringify(a));
    null === videoElementFrameTracker && (videoElementFrameTracker = new frametracker.FrameTracker);
    videoElementFrameTracker.addOcclusion(a)
};
module.exports.removeClipRect = function (a) {
    logger.log("VDI Removing Occlusion " + JSON.stringify(a));
    null === videoElementFrameTracker && (videoElementFrameTracker = new frametracker.FrameTracker);
    videoElementFrameTracker.removeOcclusion(a)
};
onVMEvent = void 0;
module.exports.setVMEventCallback = function (a) {
    onVMEvent = a;
    logger.log("VDI Event Callback Set")
};
window.onVdiClientDisconnected = function () {
    logger.log("VDI Event: vdiClientDisconnected");
    cleanup();
    remotefailure_notified = !1;
    try {
        onVMEvent({event: "vdiClientDisconnected", request: "endCalls"})
    } catch (a) {
        logger.log("onVMEvent(): exception: " + a.message)
    }
};
var remoteSession = new remotesession.RemoteSession;
window.onVdiClientDisconnectedTimer = function () {
    logger.log("VDI Event: onVdiClientDisconnectedTimer");
    null === remoteSession && (remoteSession = new remotesession.RemoteSession)
};
window.onVdiClientConnected = function () {
    logger.log("VDI Event: vdiClientConnected");
    sendSessionInfo();
    null === remoteDevices && (remoteDevices = new rmshim.RemoteDevices, originalEnumerateDevices = remoteDevices.enumerateDevices, originalGetDisplayMedia = remoteDevices.getDisplayMedia, navigator.mediaDevices.dispatchEvent(new CustomEvent("devicechange")))
};
var remotefailure_notified = !1;
window.onVdiUnableToRemote = function () {
    logger.log("VDI Event: vdiUnableToRemote");
    cleanup();
    if (!1 === remotefailure_notified) {
        logger.log("VDI Event: vdiUnableToRemote reported");
        remotefailure_notified = !0;
        try {
            onVMEvent({event: "vdiUnableToRemote"})
        } catch (a) {
            logger.log("onVMEvent(): exception: " + a.message)
        }
    }
};

function sendSessionInfo() {
    logger.log("VDI: sendSessionInfo");
    remoteSession && remoteSession.getSessionInfo().then(function (a) {
        a.event = "vdiClientConnected";
        logger.log("getSessionInfo success! info:" + JSON.stringify(a));
        try {
            onVMEvent(a)
        } catch (c) {
            logger.log("onVMEvent(): exceptionvar vdishim = require(\"./peerconnection\"), rmshim = require(\"./remotemedia\"), videoelem = require(\"./videoelement\"),\n" +
                "    audioelem = require(\"./audioelement\"), frametracker = require(\"./frametracker\"),\n" +
                "    logger = require(\"./logger\").logger, remotesession = require(\"./remotesession\"),\n" +
                "    garbagecollector = require(\"./garbagecollector\").gc, remoteDevices = new rmshim.RemoteDevices;\n" +
                "module.exports.CitrixPeerConnection = vdishim.PeerConnection;\n" +
                "module.exports.getUserMedia = function (a, c, b) {\n" +
                "    return (new rmshim.NavigatorUserMedia).webkitGetUserMedia(a, c, b)\n" +
                "};\n" +
                "module.exports.enumerateDevices = function () {\n" +
                "    return remoteDevices.enumerateDevices()\n" +
                "};\n" +
                "module.exports.mapVideoElement = function (a) {\n" +
                "    var c = new frametracker.FrameTracker;\n" +
                "    logger.log(\"VDI New Video Element Created, Creating Mapping to VDA\");\n" +
                "    void 0 !== a.VDAVideoElement ? logger.log(\"Video element is already configured!\") : (Object.defineProperty(a, \"VDAVideoElement\", {\n" +
                "        writable: !0,\n" +
                "        value: null\n" +
                "    }), a.VDAVideoElement = new videoelem.VideoElement, a.VDAVideoElement.onloadedmetadata = function () {\n" +
                "        var b = new Event(\"loadedmetadata\");\n" +
                "        a.dispatchEvent(b)\n" +
                "    }, a.VDAVideoElement.ontimeupdate = function () {\n" +
                "        var b = new Event(\"timeupdate\");\n" +
                "        a.dispatchEvent(b)\n" +
                "    }, a.VDAVideoElement.onconnectionstatechange = function () {\n" +
                "        \"connected\" == a.VDAVideoElement.connectionState ? c.track(a, function (b) {\n" +
                "            a.VDAVideoElement.setFrame(b)\n" +
                "        }) : c.untrack(a)\n" +
                "    }, Object.defineProperty(a, \"sinkId\", {\n" +
                "        get: function () {\n" +
                "            return a.VDAVideoElement.sinkId\n" +
                "        }, set: function (b) {\n" +
                "            logger.log(\"VDI Shim set video element SinkId value = \" + b);\n" +
                "            a.VDAVideoElement.sinkId = b\n" +
                "        }\n" +
                "    }), Object.defineProperty(a, \"srcObject\", {\n" +
                "        get: function () {\n" +
                "            return a.VDAVideoElement.srcObject\n" +
                "        }, set: function (b) {\n" +
                "            logger.log(\"VDI Shim set video element srcObject\");\n" +
                "            a.VDAVideoElement.srcObject = b\n" +
                "        }\n" +
                "    }), Object.defineProperty(a, \"videoWidth\", {\n" +
                "        get: function () {\n" +
                "            return a.VDAVideoElement.videoWidth\n" +
                "        }\n" +
                "    }), Object.defineProperty(a, \"videoHeight\", {\n" +
                "        get: function () {\n" +
                "            return a.VDAVideoElement.videoHeight\n" +
                "        }\n" +
                "    }))\n" +
                "};\n" +
                "module.exports.addClipRect = function (a) {\n" +
                "    logger.log(\"VDI Adding Occlusion \" + JSON.stringify(a));\n" +
                "    null === videoElementFrameTracker && (videoElementFrameTracker = new frametracker.FrameTracker);\n" +
                "    videoElementFrameTracker.addOcclusion(a)\n" +
                "};\n" +
                "module.exports.removeClipRect = function (a) {\n" +
                "    logger.log(\"VDI Removing Occlusion \" + JSON.stringify(a));\n" +
                "    null === videoElementFrameTracker && (videoElementFrameTracker = new frametracker.FrameTracker);\n" +
                "    videoElementFrameTracker.removeOcclusion(a)\n" +
                "};\n" +
                "onVMEvent = void 0;\n" +
                "module.exports.setVMEventCallback = function (a) {\n" +
                "    onVMEvent = a;\n" +
                "    logger.log(\"VDI Event Callback Set\")\n" +
                "};\n" +
                "window.onVdiClientDisconnected = function () {\n" +
                "    logger.log(\"VDI Event: vdiClientDisconnected\");\n" +
                "    cleanup();\n" +
                "    remotefailure_notified = !1;\n" +
                "    try {\n" +
                "        onVMEvent({event: \"vdiClientDisconnected\", request: \"endCalls\"})\n" +
                "    } catch (a) {\n" +
                "        logger.log(\"onVMEvent(): exception: \" + a.message)\n" +
                "    }\n" +
                "};\n" +
                "var remoteSession = new remotesession.RemoteSession;\n" +
                "window.onVdiClientDisconnectedTimer = function () {\n" +
                "    logger.log(\"VDI Event: onVdiClientDisconnectedTimer\");\n" +
                "    null === remoteSession && (remoteSession = new remotesession.RemoteSession)\n" +
                "};\n" +
                "window.onVdiClientConnected = function () {\n" +
                "    logger.log(\"VDI Event: vdiClientConnected\");\n" +
                "    sendSessionInfo();\n" +
                "    null === remoteDevices && (remoteDevices = new rmshim.RemoteDevices, originalEnumerateDevices = remoteDevices.enumerateDevices, originalGetDisplayMedia = remoteDevices.getDisplayMedia, navigator.mediaDevices.dispatchEvent(new CustomEvent(\"devicechange\")))\n" +
                "};\n" +
                "var remotefailure_notified = !1;\n" +
                "window.onVdiUnableToRemote = function () {\n" +
                "    logger.log(\"VDI Event: vdiUnableToRemote\");\n" +
                "    cleanup();\n" +
                "    if (!1 === remotefailure_notified) {\n" +
                "        logger.log(\"VDI Event: vdiUnableToRemote reported\");\n" +
                "        remotefailure_notified = !0;\n" +
                "        try {\n" +
                "            onVMEvent({event: \"vdiUnableToRemote\"})\n" +
                "        } catch (a) {\n" +
                "            logger.log(\"onVMEvent(): exception: \" + a.message)\n" +
                "        }\n" +
                "    }\n" +
                "};\n" +
                "\n" +
                "function sendSessionInfo() {\n" +
                "    logger.log(\"VDI: sendSessionInfo\");\n" +
                "    remoteSession && remoteSession.getSessionInfo().then(function (a) {\n" +
                "        a.event = \"vdiClientConnected\";\n" +
                "        logger.log(\"getSessionInfo success! info:\" + JSON.stringify(a));\n" +
                "        try {\n" +
                "            onVMEvent(a)\n" +
                "        } catch (c) {\n" +
                "            logger.log(\"onVMEvent(): exception: \" + c.message)\n" +
                "        }\n" +
                "    })[\"catch\"](function () {\n" +
                "        logger.log(\"getSessionInfo failure! session is not fully connected yet...\")\n" +
                "    })\n" +
                "}\n" +
                "\n" +
                "function cleanup() {\n" +
                "    logger.log(\"VDI : cleanup\");\n" +
                "    videoElementFrameTracker = remoteDevices = remoteUserMedia = null;\n" +
                "    audioNotifications = [];\n" +
                "    remoteSession && remoteSession.release();\n" +
                "    remoteSession = null;\n" +
                "    garbagecollector.reset();\n" +
                "    logger.log(\"VDI : cleanup done\")\n" +
                "};\n: " + c.message)
        }
    })["catch"](function () {
        logger.log("getSessionInfo failure! session is not fully connected yet...")
    })
}

function cleanup() {
    logger.log("VDI : cleanup");
    videoElementFrameTracker = remoteDevices = remoteUserMedia = null;
    audioNotifications = [];
    remoteSession && remoteSession.release();
    remoteSession = null;
    garbagecollector.reset();
    logger.log("VDI : cleanup done")
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var $jscomp = {
    scope: {}, getGlobal: function (a) {
        return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
    }
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.initSymbol = function () {
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
    $jscomp.initSymbol = function () {
    }
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (a) {
    return "jscomp_symbol_" + a + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.makeIterator = function (a) {
    $jscomp.initSymbolIterator();
    if (a[$jscomp.global.Symbol.iterator]) return a[$jscomp.global.Symbol.iterator]();
    var b = 0;
    return {
        next: function () {
            return b == a.length ? {done: !0} : {done: !1, value: a[b++]}
        }
    }
};
$jscomp.arrayFromIterator = function (a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
    return c
};
$jscomp.arrayFromIterable = function (a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
};
$jscomp.inherits = function (a, b) {
    function c() {
    }

    c.prototype = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    for (var e in b) if ($jscomp.global.Object.defineProperties) {
        var d = $jscomp.global.Object.getOwnPropertyDescriptor(b, e);
        d && $jscomp.global.Object.defineProperty(a, e, d)
    } else a[e] = b[e]
};
$jscomp.array = $jscomp.array || {};
$jscomp.array.done_ = function () {
    return {done: !0, value: void 0}
};
$jscomp.array.arrayIterator_ = function (a, b) {
    a instanceof String && (a = String(a));
    var c = 0;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var e = {}, d = (e.next = function () {
        if (c < a.length) {
            var e = c++;
            return {value: b(e, a[e]), done: !1}
        }
        d.next = $jscomp.array.done_;
        return $jscomp.array.done_()
    }, e[Symbol.iterator] = function () {
        return d
    }, e);
    return d
};
$jscomp.array.findInternal_ = function (a, b, c) {
    a instanceof String && (a = String(a));
    for (var e = a.length, d = 0; d < e; d++) {
        var f = a[d];
        if (b.call(c, f, d, a)) return {i: d, v: f}
    }
    return {i: -1, v: void 0}
};
$jscomp.array.from = function (a, b, c) {
    b = void 0 === b ? function (a) {
        return a
    } : b;
    var e = [];
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    if (a[Symbol.iterator]) {
        $jscomp.initSymbol();
        $jscomp.initSymbolIterator();
        a = a[Symbol.iterator]();
        for (var d; !(d = a.next()).done;) e.push(b.call(c, d.value))
    } else {
        d = a.length;
        for (var f = 0; f < d; f++) e.push(b.call(c, a[f]))
    }
    return e
};
$jscomp.array.of = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return $jscomp.array.from(b)
};
$jscomp.array.entries = function () {
    return $jscomp.array.arrayIterator_(this, function (a, b) {
        return [a, b]
    })
};
$jscomp.array.entries$install = function () {
    Array.prototype.entries || (Array.prototype.entries = $jscomp.array.entries)
};
$jscomp.array.keys = function () {
    return $jscomp.array.arrayIterator_(this, function (a) {
        return a
    })
};
$jscomp.array.keys$install = function () {
    Array.prototype.keys || (Array.prototype.keys = $jscomp.array.keys)
};
$jscomp.array.values = function () {
    return $jscomp.array.arrayIterator_(this, function (a, b) {
        return b
    })
};
$jscomp.array.values$install = function () {
    Array.prototype.values || (Array.prototype.values = $jscomp.array.values)
};
$jscomp.array.copyWithin = function (a, b, c) {
    var e = this.length;
    a = Number(a);
    b = Number(b);
    c = Number(null != c ? c : e);
    if (a < b) for (c = Math.min(c, e); b < c;) b in this ? this[a++] = this[b++] : (delete this[a++], b++); else for (c = Math.min(c, e + b - a), a += c - b; c > b;) --c in this ? this[--a] = this[c] : delete this[a];
    return this
};
$jscomp.array.copyWithin$install = function () {
    Array.prototype.copyWithin || (Array.prototype.copyWithin = $jscomp.array.copyWithin)
};
$jscomp.array.fill = function (a, b, c) {
    null != c && a.length || (c = this.length || 0);
    c = Number(c);
    for (b = Number((void 0 === b ? 0 : b) || 0); b < c; b++) this[b] = a;
    return this
};
$jscomp.array.fill$install = function () {
    Array.prototype.fill || (Array.prototype.fill = $jscomp.array.fill)
};
$jscomp.array.find = function (a, b) {
    return $jscomp.array.findInternal_(this, a, b).v
};
$jscomp.array.find$install = function () {
    Array.prototype.find || (Array.prototype.find = $jscomp.array.find)
};
$jscomp.array.findIndex = function (a, b) {
    return $jscomp.array.findInternal_(this, a, b).i
};
$jscomp.array.findIndex$install = function () {
    Array.prototype.findIndex || (Array.prototype.findIndex = $jscomp.array.findIndex)
};
$jscomp.Map = function (a) {
    a = void 0 === a ? [] : a;
    this.data_ = {};
    this.head_ = $jscomp.Map.createHead_();
    this.size = 0;
    if (a) {
        a = $jscomp.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next()) b = b.value, this.set(b[0], b[1])
    }
};
$jscomp.Map.checkBrowserConformance_ = function () {
    var a = $jscomp.global.Map;
    if (!a || !a.prototype.entries || !Object.seal) return !1;
    try {
        var b = Object.seal({x: 4}), c = new a($jscomp.makeIterator([[b, "s"]]));
        if ("s" != c.get(b) || 1 != c.size || c.get({x: 4}) || c.set({x: 4}, "t") != c || 2 != c.size) return !1;
        var e = c.entries(), d = e.next();
        if (d.done || d.value[0] != b || "s" != d.value[1]) return !1;
        d = e.next();
        return d.done || 4 != d.value[0].x || "t" != d.value[1] || !e.next().done ? !1 : !0
    } catch (f) {
        return !1
    }
};
$jscomp.Map.createHead_ = function () {
    var a = {};
    return a.previous = a.next = a.head = a
};
$jscomp.Map.getId_ = function (a) {
    if (!(a instanceof Object)) return String(a);
    $jscomp.Map.key_ in a || a instanceof Object && Object.isExtensible && Object.isExtensible(a) && $jscomp.Map.defineProperty_(a, $jscomp.Map.key_, ++$jscomp.Map.index_);
    return $jscomp.Map.key_ in a ? a[$jscomp.Map.key_] : " " + a
};
$jscomp.Map.prototype.set = function (a, b) {
    var c = this.maybeGetEntry_(a), e = c.id, d = c.list, c = c.entry;
    d || (d = this.data_[e] = []);
    c ? c.value = b : (c = {
        next: this.head_,
        previous: this.head_.previous,
        head: this.head_,
        key: a,
        value: b
    }, d.push(c), this.head_.previous.next = c, this.head_.previous = c, this.size++);
    return this
};
$jscomp.Map.prototype["delete"] = function (a) {
    var b = this.maybeGetEntry_(a);
    a = b.id;
    var c = b.list, e = b.index;
    return (b = b.entry) && c ? (c.splice(e, 1), c.length || delete this.data_[a], b.previous.next = b.next, b.next.previous = b.previous, b.head = null, this.size--, !0) : !1
};
$jscomp.Map.prototype.clear = function () {
    this.data_ = {};
    this.head_ = this.head_.previous = $jscomp.Map.createHead_();
    this.size = 0
};
$jscomp.Map.prototype.has = function (a) {
    return !!this.maybeGetEntry_(a).entry
};
$jscomp.Map.prototype.get = function (a) {
    return (a = this.maybeGetEntry_(a).entry) && a.value
};
$jscomp.Map.prototype.maybeGetEntry_ = function (a) {
    var b = $jscomp.Map.getId_(a), c = this.data_[b];
    if (c) for (var e = 0; e < c.length; e++) {
        var d = c[e];
        if (a !== a && d.key !== d.key || a === d.key) return {id: b, list: c, index: e, entry: d}
    }
    return {id: b, list: c, index: -1, entry: void 0}
};
$jscomp.Map.prototype.entries = function () {
    return this.iter_(function (a) {
        return [a.key, a.value]
    })
};
$jscomp.Map.prototype.keys = function () {
    return this.iter_(function (a) {
        return a.key
    })
};
$jscomp.Map.prototype.values = function () {
    return this.iter_(function (a) {
        return a.value
    })
};
$jscomp.Map.prototype.forEach = function (a, b) {
    for (var c = $jscomp.makeIterator(this.entries()), e = c.next(); !e.done; e = c.next()) e = e.value, a.call(b, e[1], e[0], this)
};
$jscomp.Map.prototype.iter_ = function (a) {
    var b = this, c = this.head_;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var e = {};
    return e.next = function () {
        if (c) {
            for (; c.head != b.head_;) c = c.previous;
            for (; c.next != c.head;) return c = c.next, {done: !1, value: a(c)};
            c = null
        }
        return {done: !0, value: void 0}
    }, e[Symbol.iterator] = function () {
        return this
    }, e
};
$jscomp.Map.index_ = 0;
$jscomp.Map.defineProperty_ = Object.defineProperty ? function (a, b, c) {
    Object.defineProperty(a, b, {value: String(c)})
} : function (a, b, c) {
    a[b] = String(c)
};
$jscomp.Map.Entry_ = function () {
};
$jscomp.Map.ASSUME_NO_NATIVE = !1;
$jscomp.Map$install = function () {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    !$jscomp.Map.ASSUME_NO_NATIVE && $jscomp.Map.checkBrowserConformance_() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.key_ = Symbol("map-id-key"));
    $jscomp.Map$install = function () {
    }
};
$jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function (a) {
    a = Number(a) >>> 0;
    if (0 === a) return 32;
    var b = 0;
    0 === (a & 4294901760) && (a <<= 16, b += 16);
    0 === (a & 4278190080) && (a <<= 8, b += 8);
    0 === (a & 4026531840) && (a <<= 4, b += 4);
    0 === (a & 3221225472) && (a <<= 2, b += 2);
    0 === (a & 2147483648) && b++;
    return b
};
$jscomp.math.imul = function (a, b) {
    a = Number(a);
    b = Number(b);
    var c = a & 65535, e = b & 65535;
    return c * e + ((a >>> 16 & 65535) * e + c * (b >>> 16 & 65535) << 16 >>> 0) | 0
};
$jscomp.math.sign = function (a) {
    a = Number(a);
    return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1
};
$jscomp.math.log10 = function (a) {
    return Math.log(a) / Math.LN10
};
$jscomp.math.log2 = function (a) {
    return Math.log(a) / Math.LN2
};
$jscomp.math.log1p = function (a) {
    a = Number(a);
    if (.25 > a && -.25 < a) {
        for (var b = a, c = 1, e = a, d = 0, f = 1; d != e;) b *= a, f *= -1, e = (d = e) + f * b / ++c;
        return e
    }
    return Math.log(1 + a)
};
$jscomp.math.expm1 = function (a) {
    a = Number(a);
    if (.25 > a && -.25 < a) {
        for (var b = a, c = 1, e = a, d = 0; d != e;) b *= a / ++c, e = (d = e) + b;
        return e
    }
    return Math.exp(a) - 1
};
$jscomp.math.cosh = function (a) {
    a = Number(a);
    return (Math.exp(a) + Math.exp(-a)) / 2
};
$jscomp.math.sinh = function (a) {
    a = Number(a);
    return 0 === a ? a : (Math.exp(a) - Math.exp(-a)) / 2
};
$jscomp.math.tanh = function (a) {
    a = Number(a);
    if (0 === a) return a;
    var b = Math.exp(2 * -Math.abs(a)), b = (1 - b) / (1 + b);
    return 0 > a ? -b : b
};
$jscomp.math.acosh = function (a) {
    a = Number(a);
    return Math.log(a + Math.sqrt(a * a - 1))
};
$jscomp.math.asinh = function (a) {
    a = Number(a);
    if (0 === a) return a;
    var b = Math.log(Math.abs(a) + Math.sqrt(a * a + 1));
    return 0 > a ? -b : b
};
$jscomp.math.atanh = function (a) {
    a = Number(a);
    return ($jscomp.math.log1p(a) - $jscomp.math.log1p(-a)) / 2
};
$jscomp.math.hypot = function (a, b, c) {
    for (var e = [], d = 2; d < arguments.length; ++d) e[d - 2] = arguments[d];
    a = Number(a);
    b = Number(b);
    for (var f = Math.max(Math.abs(a), Math.abs(b)), h = $jscomp.makeIterator(e), d = h.next(); !d.done; d = h.next()) f = Math.max(f, Math.abs(d.value));
    if (1E100 < f || 1E-100 > f) {
        a /= f;
        b /= f;
        h = a * a + b * b;
        e = $jscomp.makeIterator(e);
        for (d = e.next(); !d.done; d = e.next()) d = d.value, d = Number(d) / f, h += d * d;
        return Math.sqrt(h) * f
    }
    f = a * a + b * b;
    e = $jscomp.makeIterator(e);
    for (d = e.next(); !d.done; d = e.next()) d = d.value, d = Number(d), f +=
        d * d;
    return Math.sqrt(f)
};
$jscomp.math.trunc = function (a) {
    a = Number(a);
    if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
    var b = Math.floor(Math.abs(a));
    return 0 > a ? -b : b
};
$jscomp.math.cbrt = function (a) {
    if (0 === a) return a;
    a = Number(a);
    var b = Math.pow(Math.abs(a), 1 / 3);
    return 0 > a ? -b : b
};
$jscomp.number = $jscomp.number || {};
$jscomp.number.isFinite = function (a) {
    return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a
};
$jscomp.number.isInteger = function (a) {
    return $jscomp.number.isFinite(a) ? a === Math.floor(a) : !1
};
$jscomp.number.isNaN = function (a) {
    return "number" === typeof a && isNaN(a)
};
$jscomp.number.isSafeInteger = function (a) {
    return $jscomp.number.isInteger(a) && Math.abs(a) <= $jscomp.number.MAX_SAFE_INTEGER
};
$jscomp.number.EPSILON = Math.pow(2, -52);
$jscomp.number.MAX_SAFE_INTEGER = 9007199254740991;
$jscomp.number.MIN_SAFE_INTEGER = -9007199254740991;
$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function (a, b) {
    for (var c = [], e = 1; e < arguments.length; ++e) c[e - 1] = arguments[e];
    c = $jscomp.makeIterator(c);
    for (e = c.next(); !e.done; e = c.next()) if (e = e.value) for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d]);
    return a
};
$jscomp.object.is = function (a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
};
$jscomp.Set = function (a) {
    a = void 0 === a ? [] : a;
    this.map_ = new $jscomp.Map;
    if (a) {
        a = $jscomp.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next()) this.add(b.value)
    }
    this.size = this.map_.size
};
$jscomp.Set.checkBrowserConformance_ = function () {
    var a = $jscomp.global.Set;
    if (!a || !a.prototype.entries || !Object.seal) return !1;
    var b = Object.seal({x: 4}), a = new a($jscomp.makeIterator([b]));
    if (a.has(b) || 1 != a.size || a.add(b) != a || 1 != a.size || a.add({x: 4}) != a || 2 != a.size) return !1;
    var a = a.entries(), c = a.next();
    if (c.done || c.value[0] != b || c.value[1] != b) return !1;
    c = a.next();
    return c.done || c.value[0] == b || 4 != c.value[0].x || c.value[1] != c.value[0] ? !1 : a.next().done
};
$jscomp.Set.prototype.add = function (a) {
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this
};
$jscomp.Set.prototype["delete"] = function (a) {
    a = this.map_["delete"](a);
    this.size = this.map_.size;
    return a
};
$jscomp.Set.prototype.clear = function () {
    this.map_.clear();
    this.size = 0
};
$jscomp.Set.prototype.has = function (a) {
    return this.map_.has(a)
};
$jscomp.Set.prototype.entries = function () {
    return this.map_.entries()
};
$jscomp.Set.prototype.values = function () {
    return this.map_.values()
};
$jscomp.Set.prototype.forEach = function (a, b) {
    var c = this;
    this.map_.forEach(function (e) {
        return a.call(b, e, e, c)
    })
};
$jscomp.Set.ASSUME_NO_NATIVE = !1;
$jscomp.Set$install = function () {
    !$jscomp.Set.ASSUME_NO_NATIVE && $jscomp.Set.checkBrowserConformance_() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.Map$install(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values);
    $jscomp.Set$install = function () {
    }
};
$jscomp.string = $jscomp.string || {};
$jscomp.string.noRegExp_ = function (a, b) {
    if (a instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
};
$jscomp.string.fromCodePoint = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    for (var c = "", b = $jscomp.makeIterator(b), e = b.next(); !e.done; e = b.next()) {
        e = e.value;
        e = +e;
        if (0 > e || 1114111 < e || e !== Math.floor(e)) throw new RangeError("invalid_code_point " + e);
        65535 >= e ? c += String.fromCharCode(e) : (e -= 65536, c += String.fromCharCode(e >>> 10 & 1023 | 55296), c += String.fromCharCode(e & 1023 | 56320))
    }
    return c
};
$jscomp.string.repeat = function (a) {
    var b = this.toString();
    if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
    a |= 0;
    for (var c = ""; a;) if (a & 1 && (c += b), a >>>= 1) b += b;
    return c
};
$jscomp.string.repeat$install = function () {
    String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat)
};
$jscomp.string.codePointAt = function (a) {
    var b = this.toString(), c = b.length;
    a = Number(a) || 0;
    if (0 <= a && a < c) {
        a |= 0;
        var e = b.charCodeAt(a);
        if (55296 > e || 56319 < e || a + 1 === c) return e;
        a = b.charCodeAt(a + 1);
        return 56320 > a || 57343 < a ? e : 1024 * (e - 55296) + a + 9216
    }
};
$jscomp.string.codePointAt$install = function () {
    String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt)
};
$jscomp.string.includes = function (a, b) {
    b = void 0 === b ? 0 : b;
    $jscomp.string.noRegExp_(a, "includes");
    return -1 !== this.toString().indexOf(a, b)
};
$jscomp.string.includes$install = function () {
    String.prototype.includes || (String.prototype.includes = $jscomp.string.includes)
};
$jscomp.string.startsWith = function (a, b) {
    b = void 0 === b ? 0 : b;
    $jscomp.string.noRegExp_(a, "startsWith");
    var c = this.toString();
    a += "";
    for (var e = c.length, d = a.length, f = Math.max(0, Math.min(b | 0, c.length)), h = 0; h < d && f < e;) if (c[f++] != a[h++]) return !1;
    return h >= d
};
$jscomp.string.startsWith$install = function () {
    String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith)
};
$jscomp.string.endsWith = function (a, b) {
    $jscomp.string.noRegExp_(a, "endsWith");
    var c = this.toString();
    a += "";
    void 0 === b && (b = c.length);
    for (var e = Math.max(0, Math.min(b | 0, c.length)), d = a.length; 0 < d && 0 < e;) if (c[--e] != a[--d]) return !1;
    return 0 >= d
};
$jscomp.string.endsWith$install = function () {
    String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith)
};
var __extends = this && this.__extends || function () {
    var a = function (b, c) {
        a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
            a.__proto__ = c
        } || function (a, c) {
            for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
        };
        return a(b, c)
    };
    return function (b, c) {
        function e() {
            this.constructor = b
        }

        a(b, c);
        b.prototype = null === c ? Object.create(c) : (e.prototype = c.prototype, new e)
    }
}(), __awaiter = this && this.__awaiter || function (a, b, c, e) {
    return new (c || (c = Promise))(function (d, f) {
        function h(a) {
            try {
                k(e.next(a))
            } catch (c) {
                f(c)
            }
        }

        function g(a) {
            try {
                k(e["throw"](a))
            } catch (c) {
                f(c)
            }
        }

        function k(a) {
            a.done ? d(a.value) : (new c(function (c) {
                c(a.value)
            })).then(h, g)
        }

        k((e = e.apply(a, b || [])).next())
    })
}, __generator = this && this.__generator || function (a, b) {
    function c(a) {
        return function (c) {
            return e([a, c])
        }
    }

    function e(c) {
        if (f) throw new TypeError("Generator is already executing.");
        for (; d;) try {
            if (f = 1, h && (g = c[0] & 2 ? h["return"] : c[0] ? h["throw"] || ((g = h["return"]) && g.call(h), 0) : h.next) && !(g = g.call(h, c[1])).done) return g;
            if (h = 0, g) c = [c[0] & 2, g.value];
            switch (c[0]) {
                case 0:
                case 1:
                    g =
                        c;
                    break;
                case 4:
                    return d.label++, {value: c[1], done: !1};
                case 5:
                    d.label++;
                    h = c[1];
                    c = [0];
                    continue;
                case 7:
                    c = d.ops.pop();
                    d.trys.pop();
                    continue;
                default:
                    if (!(g = d.trys, g = 0 < g.length && g[g.length - 1]) && (6 === c[0] || 2 === c[0])) {
                        d = 0;
                        continue
                    }
                    if (3 === c[0] && (!g || c[1] > g[0] && c[1] < g[3])) d.label = c[1]; else if (6 === c[0] && d.label < g[1]) d.label = g[1], g = c; else if (g && d.label < g[2]) d.label = g[2], d.ops.push(c); else {
                        g[2] && d.ops.pop();
                        d.trys.pop();
                        continue
                    }
            }
            c = b.call(a, d)
        } catch (e) {
            c = [6, e], h = 0
        } finally {
            f = g = 0
        }
        if (c[0] & 5) throw c[1];
        return {
            value: c[0] ?
                c[1] : void 0, done: !0
        }
    }

    var d = {
        label: 0, sent: function () {
            if (g[0] & 1) throw g[1];
            return g[1]
        }, trys: [], ops: []
    }, f, h, g, k;
    $jscomp.initSymbol();
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    return k = {
        next: c(0),
        "throw": c(1),
        "return": c(2)
    }, "function" === typeof Symbol && (k[Symbol.iterator] = function () {
        return this
    }), k
};
Object.defineProperty(exports, "__esModule", {value: !0});
var remotemedia_1 = __webpack_require__(5), proxyobject_1 = __webpack_require__(2),
    webrpcclassinfo_1 = __webpack_require__(1), logger_1 = __webpack_require__(0), stats_1 = __webpack_require__(10);

function ensure_config_defined(a) {
    return void 0 != a ? a : {}
}

var IceCandidateEvent = function (a) {
    function b(c, b, d) {
        c = a.call(this, c, webrpcclassinfo_1.class_id_t.RTCIceCandidateEvent, b, !0) || this;
        c.target = d;
        c.type = "icecandidate";
        return c
    }

    __extends(b, a);
    Object.defineProperty(b.prototype, "candidate", {
        get: function () {
            return this.candidate_
        }, enumerable: !0, configurable: !0
    });
    b.prototype.syncBarrier = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
        return new Promise(function (b, d) {
            a.waitUntilConnected("IceCandidateEvent.syncBarrier").then(function () {
                return a.remoteInvoke(!1,
                    webrpcclassinfo_1.method_id_RTCIceCandidateEvent_t.candidate, {oid: 0})
            }).then(function (b) {
                b = a.param0(b);
                return !1 === b.is_null ? (new IceCandidate(a, b.oid)).syncBarrier() : Promise.resolve(null)
            }).then(function (d) {
                logger_1.logger.log(a.user_friendly_id() + ".onicecandidate: icecandidate available!");
                a.candidate_ = d;
                b(a)
            })["catch"](function () {
                logger_1.logger.log(a.user_friendly_id() + ".onicecandidate() failed.");
                d()
            })
        })
    };
    return b
}(proxyobject_1.ProxyObject);
exports.IceCandidateEvent = IceCandidateEvent;
var IceCandidate = function (a) {
    function b(c, b) {
        return a.call(this, c, webrpcclassinfo_1.class_id_t.RTCIceCandidate, b, !0) || this
    }

    __extends(b, a);
    Object.defineProperty(b.prototype, "candidate", {
        get: function () {
            return this.candidate_
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "sdpMid", {
        get: function () {
            return this.sdpMid_
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "sdpMLineIndex", {
        get: function () {
            return this.sdpMLineIndex_
        }, enumerable: !0, configurable: !0
    });
    b.prototype.syncBarrier =
        function () {
            var a = this;
            logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
            return new Promise(function (b, d) {
                a.waitUntilConnected("IceCandidate.syncBarrier").then(function () {
                    return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCIceCandidate_t.candidate, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCIceCandidate_t.sdpMid, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCIceCandidate_t.sdpMLineIndex, 0)])
                }).then(function (d) {
                    d = d.map(function (b) {
                        return a.param0(b)
                    });
                    a.candidate_ = d[0];
                    a.sdpMid_ = d[1];
                    a.sdpMLineIndex_ = d[2];
                    b(a)
                })["catch"](function () {
                    d()
                })
            })
        };
    return b
}(proxyobject_1.ProxyObject);
exports.IceCandidate = IceCandidate;
var IceGatherer = function () {
        function a(a) {
            this.state_ = "new";
            this.candidates_ = [];
            this.pc_ = a
        }

        a.prototype.pushState = function (a) {
            logger_1.logger.log(this.pc_.user_friendly_id() + ".onicegatheringstatechange: new state is " + a);
            this.state_ = a;
            "gathering" == this.state_ ? (this.candidates_ = [], this.postUpdate()) : this.processRemaining()
        };
        a.prototype.addIceCandidate = function (a) {
            var c = this;
            this.candidates_.push(a);
            a.syncBarrier().then(function (a) {
                logger_1.logger.log(c.pc_.user_friendly_id() + ".onicecandidate: icecandidate available!");
                return Promise.all([c.pc_.updateLocalDescription(), Promise.resolve(a)])
            }).then(function (a) {
                c.postIceCandidate(a[1])
            })
        };
        a.prototype.postIceCandidate = function (a) {
            logger_1.logger.log(this.pc_.user_friendly_id() + ".onicecandidate: posting ice candidate now!");
            if (null != this.pc_.onicecandidate) this.pc_.onicecandidate(a); else logger_1.logger.log(this.pc_.user_friendly_id() + "onicecandidate is NULL!!!");
            this.candidates_.shift();
            this.processRemaining()
        };
        a.prototype.postUpdate = function () {
            logger_1.logger.log(this.pc_.user_friendly_id() +
                ".onicegatheringstatechange: posting event now!");
            var a = new PeerConnectionEvent("onicegatheringstatechange", this.pc_);
            this.pc_.onicegatheringstatechange(a)
        };
        a.prototype.processRemaining = function () {
            0 == this.candidates_.length && "complete" == this.state_ ? (this.pc_.onicecandidate({
                candidate: null,
                target: this
            }), this.postUpdate()) : logger_1.logger.log(this.pc_.user_friendly_id() + ".onicecandidate: candidates remaining=[" + this.candidates_.map(function (a) {
                return a.object_id()
            }) + "], state=" + this.state_)
        };
        return a
    }(),
    SessionDescription = function (a) {
        function b(c, b, d) {
            for (var f = [], h = 3; h < arguments.length; h++) f[h - 3] = arguments[h];
            return a.apply(this, [c, webrpcclassinfo_1.class_id_t.RTCSessionDescription, b, d].concat(f)) || this
        }

        __extends(b, a);
        b.prototype.toJSON = function () {
            return {type: this.type_, sdp: this.sdp_}
        };
        Object.defineProperty(b.prototype, "sdp", {
            get: function () {
                return this.sdp_
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(b.prototype, "type", {
            get: function () {
                return this.type_
            }, enumerable: !0, configurable: !0
        });
        b.prototype.syncBarrier = function () {
            var a = this;
            logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
            return new Promise(function (b, d) {
                a.waitUntilConnected("SessionDescription.syncBarrier").then(function () {
                    return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCSessionDescription_t.type, 0), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCSessionDescription_t.sdp, "")])
                }).then(function (d) {
                    a.type_ = a.convertType(a.param0(d[0]));
                    a.sdp_ = a.param0(d[1]);
                    b(a)
                })["catch"](function () {
                    d()
                })
            })
        };
        b.prototype.convertType = function (a) {
            return 0 == a ? "offer" : 1 == a ? "pranswer" : "answer"
        };
        b.convertC2H = function (a) {
            return "offer" == a ? 0 : "pranswer" == a ? 1 : 2
        };
        return b
    }(proxyobject_1.ProxyObject);
exports.SessionDescription = SessionDescription;
var PeerConnectionEvent = function () {
    return function (a, b) {
        this.type = a;
        this.target = b
    }
}(), RtpReceiver = function (a) {
    function b(c, b) {
        var d = a.call(this, c, webrpcclassinfo_1.class_id_t.RTCRtpReceiver, b, !0) || this;
        logger_1.logger.log(d.user_friendly_id() + ".constructor");
        return d
    }

    __extends(b, a);
    b.prototype.syncBarrier = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called.");
        return new Promise(function (b, d) {
            a.waitUntilConnected("RtpReceiver.syncBarrier").then(function () {
                return Promise.all([a.remoteInvoke(!1,
                    webrpcclassinfo_1.method_id_RTCRtpReceiver_t.track, {oid: a.object_id()}), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCRtpReceiver_t.getContributingSources, [])])
            }).then(function (b) {
                var e;
                b = b.map(function (b) {
                    return a.param0(b)
                });
                e = b[0];
                a.contribsources = b[1];
                return void 0 == a.track_ || a.track_.object_id() != e.oid ? (new remotemedia_1.RemoteMediaTrack(a, e.oid)).syncBarrier() : Promise.resolve(a.track_)
            }).then(function (d) {
                a.track_ = d;
                b(a)
            })["catch"](function () {
                logger_1.logger.log(a.user_friendly_id() + ".syncBarrier(): rejected.");
                d()
            })
        })
    };
    Object.defineProperty(b.prototype, "track", {
        get: function () {
            logger_1.logger.log(this.user_friendly_id() + ".get track() called.");
            return this.track_
        }, enumerable: !0, configurable: !0
    });
    b.prototype.getCapabilities = function (a) {
        logger_1.logger.log(this.user_friendly_id() + ".getCapabilities() called.");
        return this.capabilities
    };
    b.prototype.getContributingSources = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".getContributingSources() called. " + JSON.stringify(this.contribsources));
        this.waitUntilConnected("PeerConnection.getReceivers").then(function () {
            return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCRtpReceiver_t.getContributingSources, [])])
        }).then(function (b) {
            a.contribsources = b.map(function (b) {
                return a.param0(b)
            })[0]
        })["catch"](function () {
            logger_1.logger.log(a.user_friendly_id() + ".getContributingSources() didnt get response.");
            a.contribsources = []
        });
        return this.contribsources
    };
    b.prototype.getParameters = function () {
        logger_1.logger.log(this.user_friendly_id() +
            ".getParameters() called.");
        return null
    };
    b.prototype.getStats = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getStats() called.");
        return null
    };
    b.prototype.getSynchronizationSources = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getSynchronizationSources() called.");
        return this.syncsources
    };
    return b
}(proxyobject_1.ProxyObject), PeerConnection = function (a) {
    function b(c) {
        var b = a.call(this, null, webrpcclassinfo_1.class_id_t.RTCPeerConnection, 0, !1, ensure_config_defined(c), {}) || this;
        logger_1.logger.log("peerconnection.constructor");
        logger_1.logger.log(JSON.stringify(c));
        b.localStreams = [];
        b.remoteStreams = [];
        b.onaddstream_ = null;
        b.signalingState_ = "stable";
        b.iceConnectionState_ = "new";
        b.iceGatheringState_ = "new";
        b.iceQ_ = new IceGatherer(b);
        b.receivers_ = [];
        return b
    }

    __extends(b, a);
    b.prototype.addIceCandidate = function () {
        logger_1.logger.log(this.user_friendly_id() + ".addIceCandidate");
        logger_1.logger.log(arguments)
    };
    Object.defineProperty(b.prototype, "onicecandidate", {
        get: function () {
            return this.onicecandidate_
        }, set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() + ".set_onicecandidate() called.");
            this.onicecandidate_ = a;
            this.waitUntilConnected("PeerConnection.onicecandidate").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.onicecandidate);
                d.then(function (a) {
                    logger_1.logger.log(b.user_friendly_id() + ".onicecandidate callback received!!!");
                    a = new IceCandidateEvent(b, b.param0(a).oid, b);
                    null != b.iceQ_ && b.iceQ_.addIceCandidate(a)
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.onicecandidate,
                    d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_onicecandidate() failed.")
            })
        }, enumerable: !0, configurable: !0
    });
    b.prototype.convertIceConnectionState = function (a) {
        return 0 == a ? "new" : 1 == a ? "checking" : 2 == a ? "connected" : 3 == a ? "completed" : 4 == a ? "failed" : 5 == a ? "disconnected" : "closed"
    };
    Object.defineProperty(b.prototype, "oniceconnectionstatechange", {
        get: function () {
            return this.oniceconnectionstatechange_
        }, set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() + ".set_oniceconnectionstatechange() called.");
            this.oniceconnectionstatechange_ = a;
            this.waitUntilConnected("PeerConnection.oniceconnectionstatechange").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.oniceconnectionstatechange);
                d.then(function (a) {
                    logger_1.logger.log(b.user_friendly_id() + ".oniceconnectionstatechange(): success callback received!!!");
                    b.iceConnectionState_ = b.convertIceConnectionState(b.param0(a));
                    a = new PeerConnectionEvent("iceconnectionstatechange", b);
                    b.oniceconnectionstatechange_(a)
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.oniceconnectionstatechange, d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_oniceconnectionstatechange() failed.")
            })
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "iceConnectionState", {
        get: function () {
            logger_1.logger.log(this.user_friendly_id() + ".get_iceConnectionState() called, value = " + this.iceConnectionState_);
            return this.iceConnectionState_
        }, enumerable: !0, configurable: !0
    });
    b.prototype.convertIceGatheringState = function (a) {
        return 0 == a ? "new" : 1 == a ? "gathering" : "complete"
    };
    Object.defineProperty(b.prototype, "onicegatheringstatechange", {
        get: function () {
            return this.onicegatheringstatechange_
        }, set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() + ".set_onicegatheringstatechange() called.");
            this.onicegatheringstatechange_ = a;
            this.waitUntilConnected("PeerConnection.onicegatheringstatechange").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.onicegatheringstatechange);
                d.then(function (a) {
                    logger_1.logger.log(b.user_friendly_id() + ".onicegatheringstatechange(): callback received!!!");
                    b.iceGatheringState_ = b.convertIceGatheringState(b.param0(a));
                    null != b.iceQ_ && b.iceQ_.pushState(b.iceGatheringState_)
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.onicegatheringstatechange, d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_onicegatheringstatechange() failed.")
            })
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype,
        "iceGatheringState", {
            get: function () {
                logger_1.logger.log(this.user_friendly_id() + ".get_iceGatheringState() called, value = " + this.iceGatheringState_);
                return this.iceGatheringState_
            }, enumerable: !0, configurable: !0
        });
    b.prototype.convertSignalState = function (a) {
        return 0 == a ? "stable" : 1 == a ? "have-local-offer" : 2 == a ? "have-local-pranswer" : 3 == a ? "have-remote-offer" : 4 == a ? "have-remote-pranswer" : "closed"
    };
    Object.defineProperty(b.prototype, "onsignalingstatechange", {
        set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() +
                ".set_onsignalingstatechange() called.");
            this.onsignalingstatechange_ = a;
            this.waitUntilConnected("PeerConnection.onsignalingstatechanged").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.onsignalingstatechange);
                d.then(function (a) {
                    logger_1.logger.log(b.user_friendly_id() + ".onsignalingstatechange(): callback received!!!");
                    b.signalingState_ = b.convertSignalState(b.param0(a));
                    a = new PeerConnectionEvent("onsignalingstatechange", b);
                    b.onsignalingstatechange_(a)
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.onsignalingstatechange, d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_onsignalingstatechange(): failed.")
            })
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "onsignalingstatechanged", {
        get: function () {
            return this.onsignalingstatechange_
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "signalingState", {
        get: function () {
            logger_1.logger.log(this.user_friendly_id() +
                ".get_signalingState() called, value = " + this.signalingState_);
            return this.signalingState_
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "onnegotiationneeded", {
        get: function () {
            return this.onnegotiationneeded_
        }, set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() + ".set_onnegotiationneeded() called.");
            this.onnegotiationneeded_ = a;
            this.waitUntilConnected("PeerConnection.onnegotiationneeded").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.onnegotiationneeded);
                d.then(function () {
                    logger_1.logger.log(b.user_friendly_id() + ".onnegotiationneeded(): callback received!!!");
                    var a = new PeerConnectionEvent("negotiationneeded", b);
                    b.onnegotiationneeded_(a)
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.onnegotiationneeded, d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_onnegotiationneeded(): failed.")
            })
        }, enumerable: !0, configurable: !0
    });
    b.prototype.createOffer = function (a, b, d) {
        var f = this;
        logger_1.logger.log(this.user_friendly_id() +
            ".createOffer() called.", JSON.stringify(d));
        this.waitUntilConnected("PeerConnection.createOffer").then(function () {
            var a = f.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.createOffer);
            f.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.createOffer, a.success, a.fail, {});
            return a.prom()
        }).then(function (a) {
            logger_1.logger.log(f.user_friendly_id() + ".createOffer(): success callback received!!!");
            return (new SessionDescription(f, f.param0(a).oid, !0)).syncBarrier()
        }).then(function (b) {
            a &&
            a(b)
        })["catch"](function () {
            logger_1.logger.log(f.user_friendly_id() + ".createOffer() failed.");
            b && b(new DOMException("PeerConnection.createOffer() failed.", "PeerConnection"))
        })
    };
    b.prototype.createAnswer = function (a, b, d) {
        var f = this;
        logger_1.logger.log(this.user_friendly_id() + ".createAnswer() called.", JSON.stringify(d));
        this.waitUntilConnected("PeerConnection.createAnswer").then(function () {
            var a = f.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.createAnswer);
            f.remoteInvoke(!1,
                webrpcclassinfo_1.method_id_RTCPeerConnection_t.createAnswer, a.success, a.fail, {}, {});
            return a.prom()
        }).then(function (a) {
            logger_1.logger.log(f.user_friendly_id() + ".createAnswer(): success callback received!!!");
            return (new SessionDescription(f, f.param0(a).oid, !0)).syncBarrier()
        }).then(function (b) {
            a && a(b)
        })["catch"](function () {
            logger_1.logger.log(f.user_friendly_id() + ".createAnswer() failed.");
            b && b("PeerConnection::createAnswer() failed.")
        })
    };
    b.prototype.updateLocalDescription = function () {
        return __awaiter(this,
            void 0, void 0, function () {
                var a, b, d;
                return __generator(this, function (f) {
                    switch (f.label) {
                        case 0:
                            return logger_1.logger.log(this.user_friendly_id() + ".updateLocalDescription() called."), [4, this.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.localDescription, {oid: this.object_id()})];
                        case 1:
                            return a = f.sent(), b = new SessionDescription(this, this.param0(a).oid, !0), [4, b.syncBarrier()];
                        case 2:
                            return this.localDescription = d = f.sent(), [2]
                    }
                })
            })
    };
    b.prototype.setLocalDescription = function (a, b, d) {
        var f =
            this;
        logger_1.logger.log(this.user_friendly_id() + ".setLocalDescription() called.");
        this.waitUntilConnected("PeerConnection.setLocalDescription").then(function () {
            return (new SessionDescription(f, 0, !1, {
                type: SessionDescription.convertC2H(a.type),
                sdp: a.sdp
            })).syncBarrier()
        }).then(function (a) {
            var c = f.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.setLocalDescription);
            f.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.setLocalDescription, {oid: a.object_id()}, c.success,
                c.fail);
            c.prom().then(function () {
                logger_1.logger.log(f.user_friendly_id() + ".setLocalDescription(): success callback received!!!");
                f.localDescription = a;
                b && b()
            })
        })["catch"](function () {
            logger_1.logger.log(f.user_friendly_id() + ".setLocalDescription() failed.");
            d && d("PeerConnection::setLocalDescription() failed.")
        })
    };
    b.prototype.setRemoteDescription = function (a, b, d) {
        var f = this;
        logger_1.logger.log(this.user_friendly_id() + ".setRemoteDescription() called.");
        this.waitUntilConnected("PeerConnection.setRemoteDescription").then(function () {
            return (new SessionDescription(f,
                0, !1, {type: SessionDescription.convertC2H(a.type), sdp: a.sdp})).syncBarrier()
        }).then(function (a) {
            var c = f.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.setRemoteDescription);
            f.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.setRemoteDescription, {oid: a.object_id()}, c.success, c.fail);
            c.prom().then(function () {
                logger_1.logger.log(f.user_friendly_id() + ".setRemoteDescription(): success callback received!!!");
                f.remoteDescription = a;
                b && b()
            })
        })["catch"](function () {
            logger_1.logger.log(f.user_friendly_id() +
                ".setRemoteDescription() failed.");
            d && d("PeerConnection::setRemoteDescription() failed.")
        })
    };
    b.prototype.getLocalStreams = function () {
        logger_1.logger.log("PeerConnection.getLocalStreams() called. [oid=" + this.object_id() + "]");
        for (var a = 0, b = this.localStreams; a < b.length; a++) logger_1.logger.log(JSON.stringify(b[a]));
        return this.localStreams
    };
    b.prototype.getRemoteStreams = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getRemoteStreams() called.");
        for (var a = 0, b = this.remoteStreams; a < b.length; a++) logger_1.logger.log(JSON.stringify(b[a]));
        return this.remoteStreams
    };
    b.prototype.addStream = function (a) {
        var b = this;
        logger_1.logger.log(this.user_friendly_id() + ".addStream() called: " + JSON.stringify(a));
       a.dumpTrackInfo();
        this.localStreams.push(a);
        this.waitUntilConnected("PeerConnection.addStream").then(function () {
            return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.addStream, {oid: a.object_id()}, {})
        }).then(function () {
            logger_1.logger.log(b.user_friendly_id() + ".addStream() success.")
        })["catch"](function () {
            logger_1.logger.log(b.user_friendly_id() +
                ".addStream() failed.")
        })
    };
    b.prototype.removeStream = function (a) {
        var b = this;
        logger_1.logger.log(this.user_friendly_id() + ".removeStream() called: " + JSON.stringify(a));
        for (var d = 0; d < this.localStreams.length; d++) this.localStreams[d] == a && this.localStreams.splice(d, 1);
        this.waitUntilConnected("PeerConnection.removeStream").then(function () {
            return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.removeStream, {oid: a.object_id()})
        }).then(function () {
            logger_1.logger.log(b.user_friendly_id() + ".removeStream() success.")
        })["catch"](function () {
            logger_1.logger.log(b.user_friendly_id() +
                ".removeStream() failed.")
        })
    };
    Object.defineProperty(b.prototype, "onaddstream", {
        get: function () {
            return this.onaddstream_
        }, set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() + ".set_onaddstream() called.");
            this.onaddstream_ = a;
            this.waitUntilConnected("PeerConnection.onaddstream").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.onaddstream);
                d.then(function (a) {
                    (new remotemedia_1.RemoteStreamEvent(b, b.param0(a).oid)).syncBarrier().then(function (a) {
                        for (var c =
                            0, d = a.stream.getAudioTracks(); c < d.length; c++) d[c].enabled = !1;
                        logger_1.logger.log(b.user_friendly_id() + ".onaddstream callback received!");
                        b.remoteStreams.push(a.stream);
                        b.onaddstream_(a)
                    })
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.onaddstream, d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_onaddstream(): failed!")
            })
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(b.prototype, "onremovestream", {
        get: function () {
            return this.onremovestream_
        },
        set: function (a) {
            var b = this;
            logger_1.logger.log(this.user_friendly_id() + ".set_onremovestream() called.");
            this.onremovestream_ = a;
            this.waitUntilConnected("PeerConnection.onremovestream").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_RTCPeerConnection_t.onremovestream);
                d.then(function (a) {
                    (new remotemedia_1.RemoteStreamEvent(b, b.param0(a).oid)).syncBarrier().then(function (a) {
                        logger_1.logger.log(b.user_friendly_id() + ".onremovestream callback received!");
                        var c =
                            b.remoteStreams.findIndex(function (b) {
                                return b.id == a.stream.id
                            });
                        0 <= c && b.remoteStreams.splice(c, 1);
                        b.onremovestream_(a)
                    })
                });
                return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_RTCPeerConnection_t.onremovestream, d.success)
            })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".set_onremovestream(): failed!")
            })
        }, enumerable: !0, configurable: !0
    });
    b.prototype.getStats = function (a) {
        logger_1.logger.log(this.user_friendly_id() + ".getStats");
        var b = this;
        return new Promise(function (d, f) {
            b.isRedirected() ?
                b.waitUntilConnected("PeerConnection.getStats").then(function () {
                    var f = b.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.getStats);
                    f.then(function (b) {
                        void 0 !== b.params && 0 !== b.params.length && (a(stats_1.StatsReport.fromJSON(JSON.parse(b.params[0]))), d())
                    });
                    return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.getStats, f.success)
                })["catch"](function () {
                    logger_1.logger.log(b.user_friendly_id() + ".getStats(): failed!");
                    f()
                }) : (logger_1.logger.log(b.user_friendly_id() +
                ".getStats(): not in active redirection!"), a({}), d())
        })
    };
    b.prototype.close = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".close() called.");
        this.onnegotiationneeded = this.onsignalingstatechange = this.onicegatheringstatechange = this.oniceconnectionstatechange = this.onicecandidate = this.onaddstream = null;
        this.waitUntilConnected("PeerConnection.close").then(function () {
            return a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.close)
        }).then(function () {
            a.iceQ_ = null;
            a.release();
            logger_1.logger.log(a.user_friendly_id() + ".close() success.")
        })["catch"](function () {
            a.iceQ_ = null;
            a.release();
            logger_1.logger.log(a.user_friendly_id() + ".close() failed.")
        })
    };
    b.prototype.getSenders = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getSenders() called.")
    };
    b.prototype.getReceivers = function () {
        var a = this;
        logger_1.logger.log(this.user_friendly_id() + ".getReceivers() called.");
        this.waitUntilConnected("PeerConnection.getReceivers").then(function () {
            return a.remoteInvoke(!1, webrpcclassinfo_1.method_id_RTCPeerConnection_t.getReceivers,
                [])
        }).then(function (b) {
            var d = [];
            b.params[0].forEach(function (b) {
                var e = a.receivers_.find(function (a) {
                    return a.object_id() === b.oid
                });
                void 0 === e ? (e = new RtpReceiver(a, b.oid), d.push(e.syncBarrier())) : d.push(e)
            });
            return Promise.all(d)
        }).then(function (b) {
            logger_1.logger.log(a.user_friendly_id() + ".getReceivers: returning receiver with ids [" + b.map(function (a) {
                return a.object_id()
            }) + "]");
            a.receivers_ = b
        })["catch"](function () {
            logger_1.logger.log(a.user_friendly_id() + ".getReceivers() didnt get response.");
            a.receivers_ =
                []
        });
        return this.receivers_
    };
    return b
}(proxyobject_1.ProxyObject);
exports.PeerConnection = PeerConnection;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:!0});var StatsReport=function(){function a(){this.items=[]}a.fromJSON=function(c){for(var b=new a,d=0;d<c.length;d++){var e=Stats.fromJSON(c[d]);b.items.push(e)}return b};a.prototype.toJSON=function(){return JSON.stringify(this.items)};a.prototype.result=function(){return this.items};return a}();exports.StatsReport=StatsReport;
var Stats=function(){function a(){this.names_=[];this.stat_=new Map;this.id="";this.timestamp=0;this.type=""}a.fromJSON=function(c){var b=new a;b.id=c.id||"";b.timestamp=c.timestamp||"";b.type=c.type||"";Object.keys(c).forEach(function(a){"id"!==a&&"timestamp"!==a&&"type"!==a&&(b.names_.push(a),b.stat_.set(a,c[a]))});return b};a.prototype.toJSON=function(){return JSON.stringify({id:this.id,timestamp:this.timestamp,type:this.type,stat:this.stat_})};a.prototype.names=function(){return this.names_};
a.prototype.stat=function(a){return this.stat_.get(a)};return a}();exports.Stats=Stats;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __extends=this&&this.__extends||function(){var d=function(c,a){d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,e){a.__proto__=e}||function(a,e){for(var c in e)e.hasOwnProperty(c)&&(a[c]=e[c])};return d(c,a)};return function(c,a){function b(){this.constructor=c}d(c,a);c.prototype=null===a?Object.create(a):(b.prototype=a.prototype,new b)}}();Object.defineProperty(exports,"__esModule",{value:!0});
var proxyobject_1=__webpack_require__(2),lib=__webpack_require__(1),logger_1=__webpack_require__(0),VideoRect=function(){return function(d){this.x=Math.round(d.x);this.y=Math.round(d.y);this.width=Math.round(d.width);this.height=Math.round(d.height)}}();exports.VideoRect=VideoRect;
var VideoElement=function(d){function c(){var a=d.call(this,null,lib.class_id_t.VideoElement,0,!1)||this;a.srcObject_=null;a.sinkId_="";a.videoWidth=0;a.videoHeight=0;a.isLoaded=!1;a.connectionState="disconnected";a.dispose_=!1;a.disposeTimer=null;return a}__extends(c,d);Object.defineProperty(c.prototype,"sinkId",{get:function(){return this.sinkId_},set:function(a){var b=this;this.waitUntilConnected("VideoElement.sinkId").then(function(){return b.remoteInvoke(!0,lib.method_id_VideoElement_t.sinkId,
a)}).then(function(){b.sinkId_=a})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".sinkId setter: failed to connect!")})},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"srcObject",{get:function(){return this.srcObject_},set:function(a){logger_1.logger.log(this.user_friendly_id()+".srcObject: set srcObject...");this.srcObject_!==a&&(!0===this.dispose_&&null!==this.disposeTimer&&(clearTimeout(this.disposeTimer),this.disposeTimer=null,this.dispose_=!1),null!==this.srcObject_&&
(null===a&&(this.dispose_=!0),this.disconnect(),this.isLoaded=!1),this.srcObject_=a,null!==this.srcObject_&&this.connectTo(this.srcObject_))},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"onconnectionstatechange",{get:function(){return this.onconnectionstatechange_},set:function(a){logger_1.logger.log(this.user_friendly_id()+".set_onconnectionstatechange() called.");this.onconnectionstatechange_=a},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"onloadedmetadata",
{set:function(a){logger_1.logger.log(this.user_friendly_id()+".set_onloadedmetadata() called.");this.onloadedmetadata_=a},enumerable:!0,configurable:!0});c.prototype.setupOnVideoFrameChanged=function(){var a=this,b=this.registerCallbacks(!1,!1,lib.method_id_VideoElement_t.onvideoframechanged);b.then(function(b){logger_1.logger.log(a.user_friendly_id()+".onvideoframechanged",b.params);a.videoWidth=b.params[0]||0;a.videoHeight=b.params[1]||0;a.isLoaded||(a.isLoaded=!0,a.onloadedmetadata_&&a.onloadedmetadata_())});
this.remoteInvoke(!0,lib.method_id_VideoElement_t.onvideoframechanged,b.success)};c.prototype.connectTo=function(a){var b=this;console.log(this.user_friendly_id()+".connectTo: connect media stream with id = "+a.object_id()+", clone_id = "+a.clone_state.clone_id);this.waitUntilConnected("VideoElement.connectTo").then(function(){b.setupOnVideoFrameChanged();return a.clone_state.synchronize(a)}).then(function(a){var c=b.registerCallbacks(!0,!1,lib.method_id_VideoElement_t.connectTo);return Promise.all([b.remoteInvoke(!1,
lib.method_id_VideoElement_t.connectTo,{oid:a.object_id()},c.success,c.fail),c.prom()])}).then(function(a){logger_1.logger.log(b.user_friendly_id()+".connectTo: remote media stream is connected!");b.onconnectionstatechange_&&(b.connectionState="connected",b.onconnectionstatechange_());b.updateTimer=setInterval(function(){b.ontimeupdate&&b.ontimeupdate()},250)})["catch"](function(a){logger_1.logger.log(b.user_friendly_id()+".connectTo: failed to connect! msg = ",a)})};c.prototype.disconnect=function(){var a=
this;logger_1.logger.log(this.user_friendly_id()+".disconnect: disconnect from current media stream");!0===this.dispose_&&(this.disposeTimer=setTimeout(function(){a.release()},5E3));this.waitUntilConnected("VideoElement.disconnect").then(function(){a.updateTimer&&clearInterval(a.updateTimer);a.onconnectionstatechange_&&(a.connectionState="disconnected",a.onconnectionstatechange_());var b=a.registerCallbacks(!1,!0,lib.method_id_VideoElement_t.onvideoframechanged);a.remoteInvoke(!0,lib.method_id_VideoElement_t.onvideoframechanged,
b.success);return a.remoteInvoke(!1,lib.method_id_VideoElement_t.disconnect)}).then(function(){logger_1.logger.log(a.user_friendly_id()+".disconnect: remote media stream is disconnected!")})["catch"](function(){logger_1.logger.log(a.user_friendly_id()+".disconnect: failed to connect!")})};c.prototype.setFrame=function(a){var b=this;logger_1.logger.log(this.user_friendly_id()+".setFrame: set video frame to",a.x,a.y,a.width,a.height);this.waitUntilConnected("VideoElement.setFrame").then(function(){var c=
new VideoRect(a);return b.remoteInvoke(!1,lib.method_id_VideoElement_t.setFrame,c)}).then(function(){logger_1.logger.log(b.user_friendly_id()+".setFrame: success!")})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".setFrame: failed to connect!")})};c.prototype.addClipRect=function(a){var b=this;logger_1.logger.log(this.user_friendly_id()+".addClipRect: ",JSON.stringify(a));this.waitUntilConnected("VideoElement.addClipRect").then(function(){var c=new VideoRect(a);return b.remoteInvoke(!1,
lib.method_id_VideoElement_t.addClipRect,c)})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".addClipRect failed!")})};c.prototype.removeClipRect=function(a){var b=this;logger_1.logger.log(this.user_friendly_id()+".removeClipRect: ",JSON.stringify(a));this.waitUntilConnected("VideoElement.removeClipRect").then(function(){var c=new VideoRect(a);return b.remoteInvoke(!1,lib.method_id_VideoElement_t.removeClipRect,c)})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".removeClipRect failed!")})};
return c}(proxyobject_1.ProxyObject);exports.VideoElement=VideoElement;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __extends=this&&this.__extends||function(){var c=function(b,a){c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return c(b,a)};return function(b,a){function d(){this.constructor=b}c(b,a);b.prototype=null===a?Object.create(a):(d.prototype=a.prototype,new d)}}();Object.defineProperty(exports,"__esModule",{value:!0});
var proxyobject_1=__webpack_require__(2),lib=__webpack_require__(1),logger_1=__webpack_require__(0),AudioElement=function(c){function b(){var a=c.call(this,null,lib.class_id_t.AudioElement,0,!1)||this;a.sinkId_="";a.srcObject_=null;return a}__extends(b,c);Object.defineProperty(b.prototype,"sinkId",{get:function(){return this.sinkId_},set:function(a){var b=this;logger_1.logger.log(this.user_friendly_id()+".sinkId: set sinkId to "+a);this.waitUntilConnected("AudioElement.sinkId").then(function(){return b.remoteInvoke(!0,
lib.method_id_AudioElement_t.sinkId,a)}).then(function(){b.sinkId_=a})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".sinkId setter: failed to connect!")})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"srcObject",{get:function(){return this.srcObject_},set:function(a){var b=this;logger_1.logger.log(this.user_friendly_id()+".srcObject: set srcObject to "+JSON.stringify(a));if(a!==this.srcObject_){var c=null!==a?a.object_id():"null";this.waitUntilConnected("AudioElement.srcObject").then(function(){return b.remoteInvoke(!0,
lib.method_id_AudioElement_t.srcObject,c)}).then(function(){b.srcObject_=a;null===a&&b.release()})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".srcObject setter: failed to connect!");null===a&&b.release()})}},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"src",{get:function(){return this.src_},set:function(a){var b=this;logger_1.logger.log(this.user_friendly_id()+".src: set src to "+a);this.src_=a;this.waitUntilConnected("AudioElement.src").then(function(){b.remoteInvoke(!0,
lib.method_id_AudioElement_t.src,a)})["catch"](function(){logger_1.logger.log(b.user_friendly_id()+".src setter: failed to connect!")})},enumerable:!0,configurable:!0});b.prototype.play=function(){var a=this;logger_1.logger.log(this.user_friendly_id()+".play() called.");this.waitUntilConnected("AudioElement.play").then(function(){a.remoteInvoke(!1,lib.method_id_AudioElement_t.play,[])})["catch"](function(){logger_1.logger.log(a.user_friendly_id()+".play: failed to connect!")})};b.prototype.pause=
function(){var a=this;logger_1.logger.log(this.user_friendly_id()+".pause() called.");this.waitUntilConnected("AudioElement.pause").then(function(){a.remoteInvoke(!1,lib.method_id_AudioElement_t.pause,[])})["catch"](function(){logger_1.logger.log(a.user_friendly_id()+".pause: failed to connect!")})};return b}(proxyobject_1.ProxyObject);exports.AudioElement=AudioElement;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:!0});
var logger_1=__webpack_require__(0),hdxms_1=__webpack_require__(3),FrameTracker=function(){function e(){var a=this;this.running_=!1;this.elements_=[];this.clipRects=new Set;var b=hdxms_1.getRedirector();Promise.all([(0,window.getWindowHandleAsHex)(),b.startRedirection(!1,"FrameTracker.ctor")]).then(function(a){logger_1.logger.log("FrameTracker: set window handle: "+a[0]);b.WSSendObject({v:"overlay",command:"window",windowHandle:a[0]})});this.observer_=new MutationObserver(function(b){a.updateAll()})}e.prototype.rectanglesIntersect=
function(a,b){return a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y?!0:!1};e.prototype.intersectingRect=function(a,b){var d=Math.max(a.left,b.left),c=Math.max(a.top,b.top);return new DOMRect(d,c,Math.min(a.right,b.right)-d,Math.min(a.bottom,b.bottom)-c)};e.prototype.pedigreeCount=function(a,b){for(var d=0,c=a.parentElement;null!=c&&c!=b;)d++,c=c.parentElement;return{isAncestor:null!=c,pedigree:d}};e.prototype.selectTopmost=function(a,b){var d=a.getBoundingClientRect(),c=b.getBoundingClientRect(),
d=this.intersectingRect(d,c),c=document.elementFromPoint(d.left+d.width/2,d.top+d.height/2);if(c==a)return a;if(c==b)return b;d=this.pedigreeCount(a,c);c=this.pedigreeCount(b,c);if(d.isAncestor&&c.isAncestor){if(d.pedigree<c.pedigree)return a;if(c.pedigree<d.pedigree)return b}else{if(d.isAncestor)return a;if(c.isAncestor)return b}};e.prototype.checkOverlappingVideos=function(a){var b=this,d=a.target.getBoundingClientRect();a.overlaps.forEach(function(b){a.target.remoteVideoElement.removeClipRect(b.rect)});
a.overlaps=[];this.elements_.forEach(function(c){if(c!=a){var e=c.overlaps.map(function(a){return a.element}).indexOf(a.target);-1!=e&&(e=c.overlaps.splice(e,1)[0],c.target.remoteVideoElement.removeClipRect(e.rect));e=c.target.getBoundingClientRect();if(b.rectanglesIntersect(d,e)){var f=b.selectTopmost(a.target,c.target);f==a.target?(c.overlaps.push({element:a.target,rect:d}),c.target.remoteVideoElement.addClipRect(d)):f==c.target&&(a.overlaps.push({element:c.target,rect:e}),a.target.remoteVideoElement.addClipRect(e))}}})};
e.prototype.updateAll=function(){var a=this;this.elements_.forEach(function(b){var d=b.target.getBoundingClientRect();if(void 0!==d){var c=b.clientRect;if(void 0===c||c.x!==d.x||c.y!==d.y||c.width!==d.width||c.height!==d.height)b.clientRect=d,b.callback(d),a.checkOverlappingVideos(b)}})};e.prototype.track=function(a,b){var d=this,c=a.getBoundingClientRect();logger_1.logger.log("Track element frame",a,JSON.stringify(c));console.log(a);this.elements_.push({target:a,clientRect:void 0,callback:b,overlaps:[]});
try{logger_1.logger.log("[HdxWebRTC.js] Initializing occlusion for new videoElement"),this.clipRects.forEach(function(b){d.applyOcclusion(a,JSON.parse(b))})}catch(e){logger_1.logger.log("[HdxWebRTC.js] addOcclusionInit failed! "+e)}this.running_||(logger_1.logger.log("Start FrameTracker observer..."),this.observer_.observe(document.body,{attributes:!0,childList:!0,subtree:!0}),this.running_=!0),this.updateAll()};e.prototype.untrack=function(a){logger_1.logger.log("Untrack element frame",a);var b=
-1;this.elements_.forEach(function(d,c){d.target===a&&(b=c)});0<=b&&(this.elements_.splice(b,1),0===this.elements_.length&&(logger_1.logger.log("Stop FrameTracker observer..."),this.observer_.disconnect(),this.running_=!1))};e.prototype.applyOcclusion=function(a,b){var d=a.getBoundingClientRect();this.rectanglesIntersect(b,d)&&void 0!==a.remoteVideoElement&&a.remoteVideoElement.addClipRect(b)};e.prototype.addOcclusion=function(a){var b=this;logger_1.logger.log("[HdxWebRTC.js] Adding occlusion "+JSON.stringify(a));
logger_1.logger.log("[HdxWebRTC.js] Tracking '"+this.elements_.length+"' elements.");this.clipRects.add(JSON.stringify(a));this.elements_.forEach(function(d){b.applyOcclusion(d.target,a)})};e.prototype.removeOcclusion=function(a){var b=this;logger_1.logger.log("[HdxWebRTC.js] Removing occlusion "+JSON.stringify(a));logger_1.logger.log("[HdxWebRTC.js] Tracking '"+this.elements_.length+"' elements.");this.clipRects["delete"](JSON.stringify(a));this.elements_.forEach(function(d){var c=d.target.getBoundingClientRect();
b.rectanglesIntersect(a,c)&&void 0!==d.target.remoteVideoElement&&d.target.remoteVideoElement.removeClipRect(a)})};return e}();exports.FrameTracker=FrameTracker;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:!0});var hdxms_1=__webpack_require__(3),webrpcclassinfo_1=__webpack_require__(1),enginecontrol_1=__webpack_require__(15),logger_1=__webpack_require__(0),RemoteType;(function(b){b[b.Unknown=0]="Unknown";b[b.Windows=1]="Windows";b[b.Linux=2]="Linux"})(RemoteType=exports.RemoteType||(exports.RemoteType={}));var SessionInfo=function(){return function(){}}();exports.SessionInfo=SessionInfo;
var VersionInfo=function(){return function(b,a){this.type=b;this.version=a}}();exports.VersionInfo=VersionInfo;
var RemoteSession=function(){function b(){var a=this;this.isremote_=!1;this.isremote_=!0;this.type_=RemoteType.Windows;this.address_="0.0.0.0";this.sessioninfo_=null;this.enginecontrol_=new enginecontrol_1.EngineControl;hdxms_1.getRedirector().setRemoteSessionInfoCb(function(){return a.remoteSessionInfo()})}b.prototype.release=function(){hdxms_1.getRedirector().setRemoteSessionInfoCb(null)};b.prototype.user_friendly_id=function(){return"[RemoteSession]"};b.prototype.getSessionInfo=function(){logger_1.logger.log(this.user_friendly_id()+
".getSessionInfo() called.");return null!=this.sessioninfo_?Promise.resolve(this.sessioninfo_):Promise.reject()};b.prototype.remoteSessionInfo=function(){var a=this;logger_1.logger.log(a.user_friendly_id()+".remoteSessionInfo() called.");return new Promise(function(b,g){a.enginecontrol_.syncBarrier().then(function(c){logger_1.logger.log(a.user_friendly_id()+"enginecontrol info received!");a.sessioninfo_=new SessionInfo;a.sessioninfo_.type_script=new VersionInfo(enginecontrol_1.VersionType.TypeScript,
webrpcclassinfo_1.HDXMS_VERSION);a.sessioninfo_.webrpc=new VersionInfo(enginecontrol_1.VersionType.Webrpc,c.version_.major.toString()+"."+c.version_.minor.toString()+"."+c.version_.revision.toString()+"."+c.version_.build.toString());if(void 0!=c.versions_&&null!=c.versions_){var e=0,f=0;for(c=c.versions_;f<c.length;f++){var d=c[f],d=d.major.toString()+"."+d.minor.toString()+"."+d.revision.toString()+"."+d.build.toString();switch(e){case enginecontrol_1.VersionType.Webrpc:a.sessioninfo_.webrpc=new VersionInfo(e,
d);break;case enginecontrol_1.VersionType.WebrtcCodecs:a.sessioninfo_.webrtc_codecs=new VersionInfo(e,d);break;case enginecontrol_1.VersionType.Receiver:a.sessioninfo_.receiver=new VersionInfo(e,d);break;case enginecontrol_1.VersionType.Vda:a.sessioninfo_.vda=new VersionInfo(e,d);break;case enginecontrol_1.VersionType.Endpoint:a.sessioninfo_.endpoint=new VersionInfo(e,d);break;default:logger_1.logger.log(a.user_friendly_id()+"Unknown version type!")}e++}}b(a.sessioninfo_);a.enginecontrol_.release()})["catch"](function(){hdxms_1.getRedirector().isPingActive()?
a.retrySessionInfo():(g(),a.enginecontrol_.release(),a.enginecontrol_=null)})})};b.prototype.retrySessionInfo=function(){var a=this;setTimeout(function(){logger_1.logger.log("checking if we are connected...");a.enginecontrol_.bind();hdxms_1.getRedirector().handleRemoteSessionInfo()},15E3)};return b}();exports.RemoteSession=RemoteSession;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __extends=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,a){d.__proto__=a}||function(d,a){for(var c in a)a.hasOwnProperty(c)&&(d[c]=a[c])};return a(b,d)};return function(b,d){function e(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(e.prototype=d.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});
var webrpcclassinfo_1=__webpack_require__(1),hdxms_1=__webpack_require__(3),proxyobject_1=__webpack_require__(2),logger_1=__webpack_require__(0),VersionType;(function(a){a[a.Webrpc=0]="Webrpc";a[a.WebrtcCodecs=1]="WebrtcCodecs";a[a.Receiver=2]="Receiver";a[a.Vda=3]="Vda";a[a.Endpoint=4]="Endpoint";a[a.TypeScript=5]="TypeScript";a[a.Max=6]="Max"})(VersionType=exports.VersionType||(exports.VersionType={}));
var EngineControl=function(a){function b(){return a.call(this,null,webrpcclassinfo_1.class_id_t.EngineControl,0,!1)||this}__extends(b,a);b.prototype.bind=function(){logger_1.logger.log(this.user_friendly_id()+".bind() called.");this.reconstructor(null,webrpcclassinfo_1.class_id_t.EngineControl,0)};b.prototype.syncBarrier=function(){var a=this;logger_1.logger.log(this.user_friendly_id()+".syncBarrier() called.");return new Promise(function(b,f){a.waitUntilConnected("EngineControl.syncBarrier").then(function(){return Promise.all([a.remoteInvoke(!1,
webrpcclassinfo_1.method_id_EngineControl_t.version,{major:0,minor:0,revision:0,build:0}),a.remoteInvoke(!1,webrpcclassinfo_1.method_id_EngineControl_t.feature_flags,[])])}).then(function(c){logger_1.logger.log(a.user_friendly_id()+"received webrpc version and supported feature list.");c=c.map(function(b){return a.param0(b)});a.version_=c[0];a.features_=c[1];hdxms_1.getRedirector().setFeatures(a.features_);c=0;for(var b=a.features_;c<b.length;c++){var e=b[c];if("ms_teams_desktop_sharing"===e.name&&
!0===e.value)return Promise.all([a.remoteInvoke(!1,webrpcclassinfo_1.method_id_EngineControl_t.version_info,[])])}}).then(function(c){void 0===c?logger_1.logger.log(a.user_friendly_id()+"release-1905 client."):(logger_1.logger.log(a.user_friendly_id()+"release-1906 or later client: received detailed client version list."),a.versions_=c.map(function(b){return a.param0(b)})[0]);b(a)})["catch"](function(){logger_1.logger.log(a.user_friendly_id()+"failure to retrieve version/feature related client info.");
f()})})};return b}(proxyobject_1.ProxyObject);exports.EngineControl=EngineControl;


/***/ })
/******/ ]);
});