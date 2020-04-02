var __extends = this && this.__extends || function () { var a = function (b, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, a) { d.__proto__ = a } || function (d, a) { for (var c in a) a.hasOwnProperty(c) && (d[c] = a[c]) }; return a(b, d) }; return function (b, d) { function e() { this.constructor = b } a(b, d); b.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e) } }(); Object.defineProperty(exports, "__esModule", { value: !0 });
var webrpcclassinfo_1 = require("./webrpcclassinfo"), hdxms_1 = require("./hdxms"), proxyobject_1 = require("./proxyobject"), logger_1 = require("./logger"), VersionType; (function (a) { a[a.Webrpc = 0] = "Webrpc"; a[a.WebrtcCodecs = 1] = "WebrtcCodecs"; a[a.Receiver = 2] = "Receiver"; a[a.Vda = 3] = "Vda"; a[a.Endpoint = 4] = "Endpoint"; a[a.TypeScript = 5] = "TypeScript"; a[a.Max = 6] = "Max" })(VersionType = exports.VersionType || (exports.VersionType = {}));
var EngineControl = function (a) {
    function b() { return a.call(this, null, webrpcclassinfo_1.class_id_t.EngineControl, 0, !1) || this } __extends(b, a); b.prototype.bind = function () { logger_1.logger.log(this.user_friendly_id() + ".bind() called."); this.reconstructor(null, webrpcclassinfo_1.class_id_t.EngineControl, 0) }; b.prototype.syncBarrier = function () {
        var a = this; logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called."); return new Promise(function (b, f) {
            a.waitUntilConnected("EngineControl.syncBarrier").then(function () {
                return Promise.all([a.remoteInvoke(!1,
                    webrpcclassinfo_1.method_id_EngineControl_t.version, { major: 0, minor: 0, revision: 0, build: 0 }), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_EngineControl_t.feature_flags, [])])
            }).then(function (c) {
                logger_1.logger.log(a.user_friendly_id() + "received webrpc version and supported feature list."); c = c.map(function (b) { return a.param0(b) }); a.version_ = c[0]; a.features_ = c[1]; hdxms_1.getRedirector().setFeatures(a.features_); c = 0; for (var b = a.features_; c < b.length; c++) {
                    var e = b[c]; if ("ms_teams_desktop_sharing" === e.name &&
                        !0 === e.value) return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_EngineControl_t.version_info, [])])
                }
            }).then(function (c) { void 0 === c ? logger_1.logger.log(a.user_friendly_id() + "release-1905 client.") : (logger_1.logger.log(a.user_friendly_id() + "release-1906 or later client: received detailed client version list."), a.versions_ = c.map(function (b) { return a.param0(b) })[0]); b(a) })["catch"](function () {
                logger_1.logger.log(a.user_friendly_id() + "failure to retrieve version/feature related client info.");
                f()
            })
        })
    }; return b
}(proxyobject_1.ProxyObject); exports.EngineControl = EngineControl;
