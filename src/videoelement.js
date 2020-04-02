var __extends = this && this.__extends || function () { var d = function (c, a) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, e) { a.__proto__ = e } || function (a, e) { for (var c in e) e.hasOwnProperty(c) && (a[c] = e[c]) }; return d(c, a) }; return function (c, a) { function b() { this.constructor = c } d(c, a); c.prototype = null === a ? Object.create(a) : (b.prototype = a.prototype, new b) } }(); Object.defineProperty(exports, "__esModule", { value: !0 });
var proxyobject_1 = require("./proxyobject"), lib = require("./webrpcclassinfo"), logger_1 = require("./logger"), VideoRect = function () { return function (d) { this.x = Math.round(d.x); this.y = Math.round(d.y); this.width = Math.round(d.width); this.height = Math.round(d.height) } }(); exports.VideoRect = VideoRect;
var VideoElement = function (d) {
    function c() { var a = d.call(this, null, lib.class_id_t.VideoElement, 0, !1) || this; a.srcObject_ = null; a.sinkId_ = ""; a.videoWidth = 0; a.videoHeight = 0; a.isLoaded = !1; a.connectionState = "disconnected"; a.dispose_ = !1; a.disposeTimer = null; return a } __extends(c, d); Object.defineProperty(c.prototype, "sinkId", {
        get: function () { return this.sinkId_ }, set: function (a) {
            var b = this; this.waitUntilConnected("VideoElement.sinkId").then(function () {
                return b.remoteInvoke(!0, lib.method_id_VideoElement_t.sinkId,
                    a)
            }).then(function () { b.sinkId_ = a })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".sinkId setter: failed to connect!") })
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(c.prototype, "srcObject", {
        get: function () { return this.srcObject_ }, set: function (a) {
            logger_1.logger.log(this.user_friendly_id() + ".srcObject: set srcObject..."); this.srcObject_ !== a && (!0 === this.dispose_ && null !== this.disposeTimer && (clearTimeout(this.disposeTimer), this.disposeTimer = null, this.dispose_ = !1), null !== this.srcObject_ &&
                (null === a && (this.dispose_ = !0), this.disconnect(), this.isLoaded = !1), this.srcObject_ = a, null !== this.srcObject_ && this.connectTo(this.srcObject_))
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(c.prototype, "onconnectionstatechange", { get: function () { return this.onconnectionstatechange_ }, set: function (a) { logger_1.logger.log(this.user_friendly_id() + ".set_onconnectionstatechange() called."); this.onconnectionstatechange_ = a }, enumerable: !0, configurable: !0 }); Object.defineProperty(c.prototype, "onloadedmetadata",
        { set: function (a) { logger_1.logger.log(this.user_friendly_id() + ".set_onloadedmetadata() called."); this.onloadedmetadata_ = a }, enumerable: !0, configurable: !0 }); c.prototype.setupOnVideoFrameChanged = function () {
            var a = this, b = this.registerCallbacks(!1, !1, lib.method_id_VideoElement_t.onvideoframechanged); b.then(function (b) { logger_1.logger.log(a.user_friendly_id() + ".onvideoframechanged", b.params); a.videoWidth = b.params[0] || 0; a.videoHeight = b.params[1] || 0; a.isLoaded || (a.isLoaded = !0, a.onloadedmetadata_ && a.onloadedmetadata_()) });
            this.remoteInvoke(!0, lib.method_id_VideoElement_t.onvideoframechanged, b.success)
        }; c.prototype.connectTo = function (a) {
            var b = this; console.log(this.user_friendly_id() + ".connectTo: connect media stream with id = " + a.object_id() + ", clone_id = " + a.clone_state.clone_id); this.waitUntilConnected("VideoElement.connectTo").then(function () { b.setupOnVideoFrameChanged(); return a.clone_state.synchronize(a) }).then(function (a) {
                var c = b.registerCallbacks(!0, !1, lib.method_id_VideoElement_t.connectTo); return Promise.all([b.remoteInvoke(!1,
                    lib.method_id_VideoElement_t.connectTo, { oid: a.object_id() }, c.success, c.fail), c.prom()])
            }).then(function (a) { logger_1.logger.log(b.user_friendly_id() + ".connectTo: remote media stream is connected!"); b.onconnectionstatechange_ && (b.connectionState = "connected", b.onconnectionstatechange_()); b.updateTimer = setInterval(function () { b.ontimeupdate && b.ontimeupdate() }, 250) })["catch"](function (a) { logger_1.logger.log(b.user_friendly_id() + ".connectTo: failed to connect! msg = ", a) })
        }; c.prototype.disconnect = function () {
            var a =
                this; logger_1.logger.log(this.user_friendly_id() + ".disconnect: disconnect from current media stream"); !0 === this.dispose_ && (this.disposeTimer = setTimeout(function () { a.release() }, 5E3)); this.waitUntilConnected("VideoElement.disconnect").then(function () {
                    a.updateTimer && clearInterval(a.updateTimer); a.onconnectionstatechange_ && (a.connectionState = "disconnected", a.onconnectionstatechange_()); var b = a.registerCallbacks(!1, !0, lib.method_id_VideoElement_t.onvideoframechanged); a.remoteInvoke(!0, lib.method_id_VideoElement_t.onvideoframechanged,
                        b.success); return a.remoteInvoke(!1, lib.method_id_VideoElement_t.disconnect)
                }).then(function () { logger_1.logger.log(a.user_friendly_id() + ".disconnect: remote media stream is disconnected!") })["catch"](function () { logger_1.logger.log(a.user_friendly_id() + ".disconnect: failed to connect!") })
        }; c.prototype.setFrame = function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".setFrame: set video frame to", a.x, a.y, a.width, a.height); this.waitUntilConnected("VideoElement.setFrame").then(function () {
                var c =
                    new VideoRect(a); return b.remoteInvoke(!1, lib.method_id_VideoElement_t.setFrame, c)
            }).then(function () { logger_1.logger.log(b.user_friendly_id() + ".setFrame: success!") })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".setFrame: failed to connect!") })
        }; c.prototype.addClipRect = function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".addClipRect: ", JSON.stringify(a)); this.waitUntilConnected("VideoElement.addClipRect").then(function () {
                var c = new VideoRect(a); return b.remoteInvoke(!1,
                    lib.method_id_VideoElement_t.addClipRect, c)
            })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".addClipRect failed!") })
        }; c.prototype.removeClipRect = function (a) { var b = this; logger_1.logger.log(this.user_friendly_id() + ".removeClipRect: ", JSON.stringify(a)); this.waitUntilConnected("VideoElement.removeClipRect").then(function () { var c = new VideoRect(a); return b.remoteInvoke(!1, lib.method_id_VideoElement_t.removeClipRect, c) })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".removeClipRect failed!") }) };
    return c
}(proxyobject_1.ProxyObject); exports.VideoElement = VideoElement;
