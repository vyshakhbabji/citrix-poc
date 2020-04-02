var __extends = this && this.__extends || function () { var c = function (b, a) { c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) }; return c(b, a) }; return function (b, a) { function d() { this.constructor = b } c(b, a); b.prototype = null === a ? Object.create(a) : (d.prototype = a.prototype, new d) } }(); Object.defineProperty(exports, "__esModule", { value: !0 });
var proxyobject_1 = require("./proxyobject"), lib = require("./webrpcclassinfo"), logger_1 = require("./logger"), AudioElement = function (c) {
    function b() { var a = c.call(this, null, lib.class_id_t.AudioElement, 0, !1) || this; a.sinkId_ = ""; a.srcObject_ = null; return a } __extends(b, c); Object.defineProperty(b.prototype, "sinkId", {
        get: function () { return this.sinkId_ }, set: function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".sinkId: set sinkId to " + a); this.waitUntilConnected("AudioElement.sinkId").then(function () {
                return b.remoteInvoke(!0,
                    lib.method_id_AudioElement_t.sinkId, a)
            }).then(function () { b.sinkId_ = a })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".sinkId setter: failed to connect!") })
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(b.prototype, "srcObject", {
        get: function () { return this.srcObject_ }, set: function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".srcObject: set srcObject to " + JSON.stringify(a)); if (a !== this.srcObject_) {
                var c = null !== a ? a.object_id() : "null"; this.waitUntilConnected("AudioElement.srcObject").then(function () {
                    return b.remoteInvoke(!0,
                        lib.method_id_AudioElement_t.srcObject, c)
                }).then(function () { b.srcObject_ = a; null === a && b.release() })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".srcObject setter: failed to connect!"); null === a && b.release() })
            }
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(b.prototype, "src", {
        get: function () { return this.src_ }, set: function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".src: set src to " + a); this.src_ = a; this.waitUntilConnected("AudioElement.src").then(function () {
                b.remoteInvoke(!0,
                    lib.method_id_AudioElement_t.src, a)
            })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".src setter: failed to connect!") })
        }, enumerable: !0, configurable: !0
    }); b.prototype.play = function () { var a = this; logger_1.logger.log(this.user_friendly_id() + ".play() called."); this.waitUntilConnected("AudioElement.play").then(function () { a.remoteInvoke(!1, lib.method_id_AudioElement_t.play, []) })["catch"](function () { logger_1.logger.log(a.user_friendly_id() + ".play: failed to connect!") }) }; b.prototype.pause =
        function () { var a = this; logger_1.logger.log(this.user_friendly_id() + ".pause() called."); this.waitUntilConnected("AudioElement.pause").then(function () { a.remoteInvoke(!1, lib.method_id_AudioElement_t.pause, []) })["catch"](function () { logger_1.logger.log(a.user_friendly_id() + ".pause: failed to connect!") }) }; return b
}(proxyobject_1.ProxyObject); exports.AudioElement = AudioElement;
