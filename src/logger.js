Object.defineProperty(exports, "__esModule", {value: !0});
var Logger = function () {
    function c(a) {
        this.tracing = !1;
        this.mslogger_ = void 0;
        this.tag = a;
        this.enabled = !0
    }

    c.prototype.setMSLogger = function (a) {
        this.mslogger_ = a
    };
    c.prototype.log = function () {
        for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
        this.enabled && (void 0 != this.mslogger_ ? this.mslogger_.info(this.tag + " " + a) : console.log(this.tag + " " + a))
    };
    c.prototype.trace = function () {
        for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
        this.tracing && this.log.apply(this, a)
    };
    return c
}();
exports.Logger = Logger;
exports.logger = new Logger("[HdxWebRTC.js]");
exports.logger.enabled = !0;
