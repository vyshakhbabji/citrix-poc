var vdishim = require("./peerconnection"), rmshim = require("./remotemedia"), videoelem = require("./videoelement"),
    audioelem = require("./audioelement"), frametracker = require("./frametracker"),
    logger = require("./logger").logger, remotesession = require("./remotesession"),
    garbagecollector = require("./garbagecollector").gc, remoteDevices = new rmshim.RemoteDevices;
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
            logger.log("onVMEvent(): exception: " + c.message)
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
