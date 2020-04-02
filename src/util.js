Object.defineProperty(exports, "__esModule", { value: !0 });
var logger_1 = require("./logger"), Util = function () {
    function e() { } e.stringifyArray = function (a) { for (var b = "[", c = 0; c < a.length; ++c)0 != c && (b += ","), b += this.stringify(a[c]); return b + "]" }; e.stringifyObject = function (a) { var b = "{", c = !0, d; for (d in a) c ? c = !1 : b += ",", b = b + '"' + d + '":', b = a[d] instanceof Array ? b + this.stringifyArray(a[d]) : "object" == typeof a[d] ? b + this.stringifyObject(a[d]) : b + JSON.stringify(a[d]); return b + "}" }; e.stringify = function (a) {
        return "object" == typeof a ? "[object Array]" == Object.prototype.toString.call(a) ?
            this.stringifyArray(a) : this.stringifyObject(a) : JSON.stringify(a)
    }; e.GetObjectPropertyDescriptor = function (a, b) { for (var c = void 0; a != Object.prototype;) { c = Object.getOwnPropertyDescriptor(a, b); if (void 0 !== c) break; a = a.__proto__ } return c }; e.sendEvent = function (a, b) { try { var c = document.createEvent("Event"); c.initEvent(b, !0, !0); a.dispatchEvent(c) } catch (d) { logger_1.logger.log('sendEvent(): exception dispatching "' + b + '" event: ' + d.message) } }; return e
}(); exports.Util = Util;
