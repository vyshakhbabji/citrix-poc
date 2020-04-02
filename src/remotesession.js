Object.defineProperty(exports, "__esModule", { value: !0 }); var hdxms_1 = require("./hdxms"), webrpcclassinfo_1 = require("./webrpcclassinfo"), enginecontrol_1 = require("./enginecontrol"), logger_1 = require("./logger"), RemoteType; (function (b) { b[b.Unknown = 0] = "Unknown"; b[b.Windows = 1] = "Windows"; b[b.Linux = 2] = "Linux" })(RemoteType = exports.RemoteType || (exports.RemoteType = {})); var SessionInfo = function () { return function () { } }(); exports.SessionInfo = SessionInfo;
var VersionInfo = function () { return function (b, a) { this.type = b; this.version = a } }(); exports.VersionInfo = VersionInfo;
var RemoteSession = function () {
    function b() { var a = this; this.isremote_ = !1; this.isremote_ = !0; this.type_ = RemoteType.Windows; this.address_ = "0.0.0.0"; this.sessioninfo_ = null; this.enginecontrol_ = new enginecontrol_1.EngineControl; hdxms_1.getRedirector().setRemoteSessionInfoCb(function () { return a.remoteSessionInfo() }) } b.prototype.release = function () { hdxms_1.getRedirector().setRemoteSessionInfoCb(null) }; b.prototype.user_friendly_id = function () { return "[RemoteSession]" }; b.prototype.getSessionInfo = function () {
        logger_1.logger.log(this.user_friendly_id() +
            ".getSessionInfo() called."); return null != this.sessioninfo_ ? Promise.resolve(this.sessioninfo_) : Promise.reject()
    }; b.prototype.remoteSessionInfo = function () {
        var a = this; logger_1.logger.log(a.user_friendly_id() + ".remoteSessionInfo() called."); return new Promise(function (b, g) {
            a.enginecontrol_.syncBarrier().then(function (c) {
                logger_1.logger.log(a.user_friendly_id() + "enginecontrol info received!"); a.sessioninfo_ = new SessionInfo; a.sessioninfo_.type_script = new VersionInfo(enginecontrol_1.VersionType.TypeScript,
                    webrpcclassinfo_1.HDXMS_VERSION); a.sessioninfo_.webrpc = new VersionInfo(enginecontrol_1.VersionType.Webrpc, c.version_.major.toString() + "." + c.version_.minor.toString() + "." + c.version_.revision.toString() + "." + c.version_.build.toString()); if (void 0 != c.versions_ && null != c.versions_) {
                        var e = 0, f = 0; for (c = c.versions_; f < c.length; f++) {
                            var d = c[f], d = d.major.toString() + "." + d.minor.toString() + "." + d.revision.toString() + "." + d.build.toString(); switch (e) {
                                case enginecontrol_1.VersionType.Webrpc: a.sessioninfo_.webrpc = new VersionInfo(e,
                                    d); break; case enginecontrol_1.VersionType.WebrtcCodecs: a.sessioninfo_.webrtc_codecs = new VersionInfo(e, d); break; case enginecontrol_1.VersionType.Receiver: a.sessioninfo_.receiver = new VersionInfo(e, d); break; case enginecontrol_1.VersionType.Vda: a.sessioninfo_.vda = new VersionInfo(e, d); break; case enginecontrol_1.VersionType.Endpoint: a.sessioninfo_.endpoint = new VersionInfo(e, d); break; default: logger_1.logger.log(a.user_friendly_id() + "Unknown version type!")
                            }e++
                        }
                    } b(a.sessioninfo_); a.enginecontrol_.release()
            })["catch"](function () {
                hdxms_1.getRedirector().isPingActive() ?
                a.retrySessionInfo() : (g(), a.enginecontrol_.release(), a.enginecontrol_ = null)
            })
        })
    }; b.prototype.retrySessionInfo = function () { var a = this; setTimeout(function () { logger_1.logger.log("checking if we are connected..."); a.enginecontrol_.bind(); hdxms_1.getRedirector().handleRemoteSessionInfo() }, 15E3) }; return b
}(); exports.RemoteSession = RemoteSession;
