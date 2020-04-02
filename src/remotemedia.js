var $jscomp = { scope: {}, getGlobal: function (a) { return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a } }; $jscomp.global = $jscomp.getGlobal(this); $jscomp.initSymbol = function () { $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol); $jscomp.initSymbol = function () { } }; $jscomp.symbolCounter_ = 0; $jscomp.Symbol = function (a) { return "jscomp_symbol_" + a + $jscomp.symbolCounter_++ };
$jscomp.initSymbolIterator = function () { $jscomp.initSymbol(); $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")); $jscomp.initSymbolIterator = function () { } }; $jscomp.makeIterator = function (a) { $jscomp.initSymbolIterator(); if (a[$jscomp.global.Symbol.iterator]) return a[$jscomp.global.Symbol.iterator](); var b = 0; return { next: function () { return b == a.length ? { done: !0 } : { done: !1, value: a[b++] } } } };
$jscomp.arrayFromIterator = function (a) { for (var b, c = []; !(b = a.next()).done;)c.push(b.value); return c }; $jscomp.arrayFromIterable = function (a) { return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a)) };
$jscomp.inherits = function (a, b) { function c() { } c.prototype = b.prototype; a.prototype = new c; a.prototype.constructor = a; for (var e in b) if ($jscomp.global.Object.defineProperties) { var d = $jscomp.global.Object.getOwnPropertyDescriptor(b, e); d && $jscomp.global.Object.defineProperty(a, e, d) } else a[e] = b[e] }; $jscomp.array = $jscomp.array || {}; $jscomp.array.done_ = function () { return { done: !0, value: void 0 } };
$jscomp.array.arrayIterator_ = function (a, b) { a instanceof String && (a = String(a)); var c = 0; $jscomp.initSymbol(); $jscomp.initSymbolIterator(); var e = {}, d = (e.next = function () { if (c < a.length) { var e = c++; return { value: b(e, a[e]), done: !1 } } d.next = $jscomp.array.done_; return $jscomp.array.done_() }, e[Symbol.iterator] = function () { return d }, e); return d };
$jscomp.array.findInternal_ = function (a, b, c) { a instanceof String && (a = String(a)); for (var e = a.length, d = 0; d < e; d++) { var f = a[d]; if (b.call(c, f, d, a)) return { i: d, v: f } } return { i: -1, v: void 0 } };
$jscomp.array.from = function (a, b, c) { b = void 0 === b ? function (a) { return a } : b; var e = []; $jscomp.initSymbol(); $jscomp.initSymbolIterator(); if (a[Symbol.iterator]) { $jscomp.initSymbol(); $jscomp.initSymbolIterator(); a = a[Symbol.iterator](); for (var d; !(d = a.next()).done;)e.push(b.call(c, d.value)) } else { d = a.length; for (var f = 0; f < d; f++)e.push(b.call(c, a[f])) } return e }; $jscomp.array.of = function (a) { for (var b = [], c = 0; c < arguments.length; ++c)b[c - 0] = arguments[c]; return $jscomp.array.from(b) };
$jscomp.array.entries = function () { return $jscomp.array.arrayIterator_(this, function (a, b) { return [a, b] }) }; $jscomp.array.entries$install = function () { Array.prototype.entries || (Array.prototype.entries = $jscomp.array.entries) }; $jscomp.array.keys = function () { return $jscomp.array.arrayIterator_(this, function (a) { return a }) }; $jscomp.array.keys$install = function () { Array.prototype.keys || (Array.prototype.keys = $jscomp.array.keys) }; $jscomp.array.values = function () { return $jscomp.array.arrayIterator_(this, function (a, b) { return b }) };
$jscomp.array.values$install = function () { Array.prototype.values || (Array.prototype.values = $jscomp.array.values) }; $jscomp.array.copyWithin = function (a, b, c) { var e = this.length; a = Number(a); b = Number(b); c = Number(null != c ? c : e); if (a < b) for (c = Math.min(c, e); b < c;)b in this ? this[a++] = this[b++] : (delete this[a++], b++); else for (c = Math.min(c, e + b - a), a += c - b; c > b;)--c in this ? this[--a] = this[c] : delete this[a]; return this }; $jscomp.array.copyWithin$install = function () { Array.prototype.copyWithin || (Array.prototype.copyWithin = $jscomp.array.copyWithin) };
$jscomp.array.fill = function (a, b, c) { null != c && a.length || (c = this.length || 0); c = Number(c); for (b = Number((void 0 === b ? 0 : b) || 0); b < c; b++)this[b] = a; return this }; $jscomp.array.fill$install = function () { Array.prototype.fill || (Array.prototype.fill = $jscomp.array.fill) }; $jscomp.array.find = function (a, b) { return $jscomp.array.findInternal_(this, a, b).v }; $jscomp.array.find$install = function () { Array.prototype.find || (Array.prototype.find = $jscomp.array.find) };
$jscomp.array.findIndex = function (a, b) { return $jscomp.array.findInternal_(this, a, b).i }; $jscomp.array.findIndex$install = function () { Array.prototype.findIndex || (Array.prototype.findIndex = $jscomp.array.findIndex) }; $jscomp.Map = function (a) { a = void 0 === a ? [] : a; this.data_ = {}; this.head_ = $jscomp.Map.createHead_(); this.size = 0; if (a) { a = $jscomp.makeIterator(a); for (var b = a.next(); !b.done; b = a.next())b = b.value, this.set(b[0], b[1]) } };
$jscomp.Map.checkBrowserConformance_ = function () { var a = $jscomp.global.Map; if (!a || !a.prototype.entries || !Object.seal) return !1; try { var b = Object.seal({ x: 4 }), c = new a($jscomp.makeIterator([[b, "s"]])); if ("s" != c.get(b) || 1 != c.size || c.get({ x: 4 }) || c.set({ x: 4 }, "t") != c || 2 != c.size) return !1; var e = c.entries(), d = e.next(); if (d.done || d.value[0] != b || "s" != d.value[1]) return !1; d = e.next(); return d.done || 4 != d.value[0].x || "t" != d.value[1] || !e.next().done ? !1 : !0 } catch (f) { return !1 } };
$jscomp.Map.createHead_ = function () { var a = {}; return a.previous = a.next = a.head = a }; $jscomp.Map.getId_ = function (a) { if (!(a instanceof Object)) return String(a); $jscomp.Map.key_ in a || a instanceof Object && Object.isExtensible && Object.isExtensible(a) && $jscomp.Map.defineProperty_(a, $jscomp.Map.key_, ++$jscomp.Map.index_); return $jscomp.Map.key_ in a ? a[$jscomp.Map.key_] : " " + a };
$jscomp.Map.prototype.set = function (a, b) { var c = this.maybeGetEntry_(a), e = c.id, d = c.list, c = c.entry; d || (d = this.data_[e] = []); c ? c.value = b : (c = { next: this.head_, previous: this.head_.previous, head: this.head_, key: a, value: b }, d.push(c), this.head_.previous.next = c, this.head_.previous = c, this.size++); return this };
$jscomp.Map.prototype["delete"] = function (a) { var b = this.maybeGetEntry_(a); a = b.id; var c = b.list, e = b.index; return (b = b.entry) && c ? (c.splice(e, 1), c.length || delete this.data_[a], b.previous.next = b.next, b.next.previous = b.previous, b.head = null, this.size--, !0) : !1 }; $jscomp.Map.prototype.clear = function () { this.data_ = {}; this.head_ = this.head_.previous = $jscomp.Map.createHead_(); this.size = 0 }; $jscomp.Map.prototype.has = function (a) { return !!this.maybeGetEntry_(a).entry };
$jscomp.Map.prototype.get = function (a) { return (a = this.maybeGetEntry_(a).entry) && a.value }; $jscomp.Map.prototype.maybeGetEntry_ = function (a) { var b = $jscomp.Map.getId_(a), c = this.data_[b]; if (c) for (var e = 0; e < c.length; e++) { var d = c[e]; if (a !== a && d.key !== d.key || a === d.key) return { id: b, list: c, index: e, entry: d } } return { id: b, list: c, index: -1, entry: void 0 } }; $jscomp.Map.prototype.entries = function () { return this.iter_(function (a) { return [a.key, a.value] }) }; $jscomp.Map.prototype.keys = function () { return this.iter_(function (a) { return a.key }) };
$jscomp.Map.prototype.values = function () { return this.iter_(function (a) { return a.value }) }; $jscomp.Map.prototype.forEach = function (a, b) { for (var c = $jscomp.makeIterator(this.entries()), e = c.next(); !e.done; e = c.next())e = e.value, a.call(b, e[1], e[0], this) };
$jscomp.Map.prototype.iter_ = function (a) { var b = this, c = this.head_; $jscomp.initSymbol(); $jscomp.initSymbolIterator(); var e = {}; return e.next = function () { if (c) { for (; c.head != b.head_;)c = c.previous; for (; c.next != c.head;)return c = c.next, { done: !1, value: a(c) }; c = null } return { done: !0, value: void 0 } }, e[Symbol.iterator] = function () { return this }, e }; $jscomp.Map.index_ = 0; $jscomp.Map.defineProperty_ = Object.defineProperty ? function (a, b, c) { Object.defineProperty(a, b, { value: String(c) }) } : function (a, b, c) { a[b] = String(c) };
$jscomp.Map.Entry_ = function () { }; $jscomp.Map.ASSUME_NO_NATIVE = !1; $jscomp.Map$install = function () { $jscomp.initSymbol(); $jscomp.initSymbolIterator(); !$jscomp.Map.ASSUME_NO_NATIVE && $jscomp.Map.checkBrowserConformance_() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.key_ = Symbol("map-id-key")); $jscomp.Map$install = function () { } }; $jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function (a) { a = Number(a) >>> 0; if (0 === a) return 32; var b = 0; 0 === (a & 4294901760) && (a <<= 16, b += 16); 0 === (a & 4278190080) && (a <<= 8, b += 8); 0 === (a & 4026531840) && (a <<= 4, b += 4); 0 === (a & 3221225472) && (a <<= 2, b += 2); 0 === (a & 2147483648) && b++; return b }; $jscomp.math.imul = function (a, b) { a = Number(a); b = Number(b); var c = a & 65535, e = b & 65535; return c * e + ((a >>> 16 & 65535) * e + c * (b >>> 16 & 65535) << 16 >>> 0) | 0 }; $jscomp.math.sign = function (a) { a = Number(a); return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1 };
$jscomp.math.log10 = function (a) { return Math.log(a) / Math.LN10 }; $jscomp.math.log2 = function (a) { return Math.log(a) / Math.LN2 }; $jscomp.math.log1p = function (a) { a = Number(a); if (.25 > a && -.25 < a) { for (var b = a, c = 1, e = a, d = 0, f = 1; d != e;)b *= a, f *= -1, e = (d = e) + f * b / ++c; return e } return Math.log(1 + a) }; $jscomp.math.expm1 = function (a) { a = Number(a); if (.25 > a && -.25 < a) { for (var b = a, c = 1, e = a, d = 0; d != e;)b *= a / ++c, e = (d = e) + b; return e } return Math.exp(a) - 1 }; $jscomp.math.cosh = function (a) { a = Number(a); return (Math.exp(a) + Math.exp(-a)) / 2 };
$jscomp.math.sinh = function (a) { a = Number(a); return 0 === a ? a : (Math.exp(a) - Math.exp(-a)) / 2 }; $jscomp.math.tanh = function (a) { a = Number(a); if (0 === a) return a; var b = Math.exp(2 * -Math.abs(a)), b = (1 - b) / (1 + b); return 0 > a ? -b : b }; $jscomp.math.acosh = function (a) { a = Number(a); return Math.log(a + Math.sqrt(a * a - 1)) }; $jscomp.math.asinh = function (a) { a = Number(a); if (0 === a) return a; var b = Math.log(Math.abs(a) + Math.sqrt(a * a + 1)); return 0 > a ? -b : b };
$jscomp.math.atanh = function (a) { a = Number(a); return ($jscomp.math.log1p(a) - $jscomp.math.log1p(-a)) / 2 };
$jscomp.math.hypot = function (a, b, c) {
    for (var e = [], d = 2; d < arguments.length; ++d)e[d - 2] = arguments[d]; a = Number(a); b = Number(b); for (var f = Math.max(Math.abs(a), Math.abs(b)), h = $jscomp.makeIterator(e), d = h.next(); !d.done; d = h.next())f = Math.max(f, Math.abs(d.value)); if (1E100 < f || 1E-100 > f) { a /= f; b /= f; h = a * a + b * b; e = $jscomp.makeIterator(e); for (d = e.next(); !d.done; d = e.next())d = d.value, d = Number(d) / f, h += d * d; return Math.sqrt(h) * f } f = a * a + b * b; e = $jscomp.makeIterator(e); for (d = e.next(); !d.done; d = e.next())d = d.value, d = Number(d), f +=
        d * d; return Math.sqrt(f)
}; $jscomp.math.trunc = function (a) { a = Number(a); if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a; var b = Math.floor(Math.abs(a)); return 0 > a ? -b : b }; $jscomp.math.cbrt = function (a) { if (0 === a) return a; a = Number(a); var b = Math.pow(Math.abs(a), 1 / 3); return 0 > a ? -b : b }; $jscomp.number = $jscomp.number || {}; $jscomp.number.isFinite = function (a) { return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a };
$jscomp.number.isInteger = function (a) { return $jscomp.number.isFinite(a) ? a === Math.floor(a) : !1 }; $jscomp.number.isNaN = function (a) { return "number" === typeof a && isNaN(a) }; $jscomp.number.isSafeInteger = function (a) { return $jscomp.number.isInteger(a) && Math.abs(a) <= $jscomp.number.MAX_SAFE_INTEGER }; $jscomp.number.EPSILON = Math.pow(2, -52); $jscomp.number.MAX_SAFE_INTEGER = 9007199254740991; $jscomp.number.MIN_SAFE_INTEGER = -9007199254740991; $jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function (a, b) { for (var c = [], e = 1; e < arguments.length; ++e)c[e - 1] = arguments[e]; c = $jscomp.makeIterator(c); for (e = c.next(); !e.done; e = c.next())if (e = e.value) for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d]); return a }; $jscomp.object.is = function (a, b) { return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b }; $jscomp.Set = function (a) { a = void 0 === a ? [] : a; this.map_ = new $jscomp.Map; if (a) { a = $jscomp.makeIterator(a); for (var b = a.next(); !b.done; b = a.next())this.add(b.value) } this.size = this.map_.size };
$jscomp.Set.checkBrowserConformance_ = function () { var a = $jscomp.global.Set; if (!a || !a.prototype.entries || !Object.seal) return !1; var b = Object.seal({ x: 4 }), a = new a($jscomp.makeIterator([b])); if (a.has(b) || 1 != a.size || a.add(b) != a || 1 != a.size || a.add({ x: 4 }) != a || 2 != a.size) return !1; var a = a.entries(), c = a.next(); if (c.done || c.value[0] != b || c.value[1] != b) return !1; c = a.next(); return c.done || c.value[0] == b || 4 != c.value[0].x || c.value[1] != c.value[0] ? !1 : a.next().done };
$jscomp.Set.prototype.add = function (a) { this.map_.set(a, a); this.size = this.map_.size; return this }; $jscomp.Set.prototype["delete"] = function (a) { a = this.map_["delete"](a); this.size = this.map_.size; return a }; $jscomp.Set.prototype.clear = function () { this.map_.clear(); this.size = 0 }; $jscomp.Set.prototype.has = function (a) { return this.map_.has(a) }; $jscomp.Set.prototype.entries = function () { return this.map_.entries() }; $jscomp.Set.prototype.values = function () { return this.map_.values() };
$jscomp.Set.prototype.forEach = function (a, b) { var c = this; this.map_.forEach(function (e) { return a.call(b, e, e, c) }) }; $jscomp.Set.ASSUME_NO_NATIVE = !1; $jscomp.Set$install = function () { !$jscomp.Set.ASSUME_NO_NATIVE && $jscomp.Set.checkBrowserConformance_() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.Map$install(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values); $jscomp.Set$install = function () { } }; $jscomp.string = $jscomp.string || {};
$jscomp.string.noRegExp_ = function (a, b) { if (a instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression"); };
$jscomp.string.fromCodePoint = function (a) { for (var b = [], c = 0; c < arguments.length; ++c)b[c - 0] = arguments[c]; for (var c = "", b = $jscomp.makeIterator(b), e = b.next(); !e.done; e = b.next()) { e = e.value; e = +e; if (0 > e || 1114111 < e || e !== Math.floor(e)) throw new RangeError("invalid_code_point " + e); 65535 >= e ? c += String.fromCharCode(e) : (e -= 65536, c += String.fromCharCode(e >>> 10 & 1023 | 55296), c += String.fromCharCode(e & 1023 | 56320)) } return c };
$jscomp.string.repeat = function (a) { var b = this.toString(); if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value"); a |= 0; for (var c = ""; a;)if (a & 1 && (c += b), a >>>= 1) b += b; return c }; $jscomp.string.repeat$install = function () { String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat) };
$jscomp.string.codePointAt = function (a) { var b = this.toString(), c = b.length; a = Number(a) || 0; if (0 <= a && a < c) { a |= 0; var e = b.charCodeAt(a); if (55296 > e || 56319 < e || a + 1 === c) return e; a = b.charCodeAt(a + 1); return 56320 > a || 57343 < a ? e : 1024 * (e - 55296) + a + 9216 } }; $jscomp.string.codePointAt$install = function () { String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt) };
$jscomp.string.includes = function (a, b) { b = void 0 === b ? 0 : b; $jscomp.string.noRegExp_(a, "includes"); return -1 !== this.toString().indexOf(a, b) }; $jscomp.string.includes$install = function () { String.prototype.includes || (String.prototype.includes = $jscomp.string.includes) };
$jscomp.string.startsWith = function (a, b) { b = void 0 === b ? 0 : b; $jscomp.string.noRegExp_(a, "startsWith"); var c = this.toString(); a += ""; for (var e = c.length, d = a.length, f = Math.max(0, Math.min(b | 0, c.length)), h = 0; h < d && f < e;)if (c[f++] != a[h++]) return !1; return h >= d }; $jscomp.string.startsWith$install = function () { String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith) };
$jscomp.string.endsWith = function (a, b) { $jscomp.string.noRegExp_(a, "endsWith"); var c = this.toString(); a += ""; void 0 === b && (b = c.length); for (var e = Math.max(0, Math.min(b | 0, c.length)), d = a.length; 0 < d && 0 < e;)if (c[--e] != a[--d]) return !1; return 0 >= d }; $jscomp.string.endsWith$install = function () { String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith) };
var __extends = this && this.__extends || function () { var a = function (b, c) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c } || function (a, c) { for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]) }; return a(b, c) }; return function (b, c) { function e() { this.constructor = b } a(b, c); b.prototype = null === c ? Object.create(c) : (e.prototype = c.prototype, new e) } }(), __awaiter = this && this.__awaiter || function (a, b, c, e) {
    return new (c || (c = Promise))(function (d, f) {
        function h(a) { try { k(e.next(a)) } catch (c) { f(c) } }
        function g(a) { try { k(e["throw"](a)) } catch (c) { f(c) } } function k(a) { a.done ? d(a.value) : (new c(function (c) { c(a.value) })).then(h, g) } k((e = e.apply(a, b || [])).next())
    })
}, __generator = this && this.__generator || function (a, b) {
    function c(a) { return function (c) { return e([a, c]) } } function e(c) {
        if (f) throw new TypeError("Generator is already executing."); for (; d;)try {
            if (f = 1, h && (g = c[0] & 2 ? h["return"] : c[0] ? h["throw"] || ((g = h["return"]) && g.call(h), 0) : h.next) && !(g = g.call(h, c[1])).done) return g; if (h = 0, g) c = [c[0] & 2, g.value]; switch (c[0]) {
                case 0: case 1: g =
                    c; break; case 4: return d.label++, { value: c[1], done: !1 }; case 5: d.label++; h = c[1]; c = [0]; continue; case 7: c = d.ops.pop(); d.trys.pop(); continue; default: if (!(g = d.trys, g = 0 < g.length && g[g.length - 1]) && (6 === c[0] || 2 === c[0])) { d = 0; continue } if (3 === c[0] && (!g || c[1] > g[0] && c[1] < g[3])) d.label = c[1]; else if (6 === c[0] && d.label < g[1]) d.label = g[1], g = c; else if (g && d.label < g[2]) d.label = g[2], d.ops.push(c); else { g[2] && d.ops.pop(); d.trys.pop(); continue }
            }c = b.call(a, d)
        } catch (e) { c = [6, e], h = 0 } finally { f = g = 0 } if (c[0] & 5) throw c[1]; return {
            value: c[0] ?
                c[1] : void 0, done: !0
        }
    } var d = { label: 0, sent: function () { if (g[0] & 1) throw g[1]; return g[1] }, trys: [], ops: [] }, f, h, g, k; $jscomp.initSymbol(); $jscomp.initSymbol(); $jscomp.initSymbolIterator(); return k = { next: c(0), "throw": c(1), "return": c(2) }, "function" === typeof Symbol && (k[Symbol.iterator] = function () { return this }), k
}; Object.defineProperty(exports, "__esModule", { value: !0 });
var webrpcclassinfo_1 = require("./webrpcclassinfo"), proxyobject_1 = require("./proxyobject"), logger_1 = require("./logger"), SimpleEvent = function () { return function (a, b) { this.type = a; this.target = b } }(), CloneState = function () {
    function a() { this.is_local_clone = !1; this.clone_id = this.clone_count = 0 } a.prototype.clone = function () { this.clone_count++; var b = new a; b.is_local_clone = !0; b.clone_id = this.clone_count; return b }; a.prototype.synchronize = function (a) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this,
                function (c) { return this.is_local_clone ? [2, a.asyncClone()] : [2, a] })
        })
    }; return a
}(), RemoteMediaTrack = function (a) {
    function b(c, b) { var d = a.call(this, c, webrpcclassinfo_1.class_id_t.MediaStreamTrack, b, !0) || this; d.refCount_ = 0; d.refCount_++; d.clone_state = new CloneState; return d } __extends(b, a); Object.defineProperty(b.prototype, "refcount", { get: function () { return this.refCount_ }, enumerable: !0, configurable: !0 }); b.prototype.addRef = function () {
        this.refCount_++; logger_1.logger.log(this.user_friendly_id() + ".addRef() called. [id=" +
            this.id + "] refcount=" + this.refCount_)
    }; Object.defineProperty(b.prototype, "onended", {
        get: function () { logger_1.logger.log(this.user_friendly_id() + ".get_onended() called. [id=" + this.id + "]"); return this.onended_ }, set: function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".set_onended() called. [id=" + this.id + "]"); this.onended_ = a; this.waitUntilConnected("MediaStreamTrack.onended").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_MediaStreamTrack_t.onended);
                d.then(function (a) { logger_1.logger.log(b.user_friendly_id() + "onended event received!!!"); a = new SimpleEvent("ended", b); b.readyState_ = "ended"; b.onended_(a) }); return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.onended, d.success)
            })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".onended failed!!!") })
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(b.prototype, "onmute", {
        get: function () {
            logger_1.logger.log(this.user_friendly_id() + ".get_onmute() called. [id=" + this.id +
                "]"); return this.onmute_
        }, set: function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".set_onmute() called. [id=" + this.id + "]"); this.onmute_ = a; this.waitUntilConnected("MediaStreamTrack.onmute").then(function () {
                var d = b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_MediaStreamTrack_t.onmute); d.then(function (a) { logger_1.logger.log(b.user_friendly_id() + "onmute event received!!!"); a = new SimpleEvent("mute", b); b.muted = !0; b.onmute_(a) }); return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.onmute,
                    d.success)
            })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".onmute failed!!!") })
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(b.prototype, "onunmute", {
        get: function () { logger_1.logger.log(this.user_friendly_id() + ".get_onunmute() called. [id=" + this.id + "]"); return this.onunmute_ }, set: function (a) {
            var b = this; logger_1.logger.log(this.user_friendly_id() + ".set_onunmute() called. [id=" + this.id + "]"); this.onunmute_ = a; this.waitUntilConnected("MediaStreamTrack.onunmute").then(function () {
                var d =
                    b.registerCallbacks(!1, b.isNullCallback(a), webrpcclassinfo_1.method_id_MediaStreamTrack_t.onunmute); d.then(function (a) { logger_1.logger.log("onunmute event received!!!"); a = new SimpleEvent("unmute", b); b.muted = !1; b.onunmute_(a) }); return b.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.onunmute, d.success)
            })["catch"](function () { logger_1.logger.log(b.user_friendly_id() + ".onunmute failed!!!") })
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(b.prototype, "onstop", {
        set: function (a) {
            this.onstop_ =
                a
        }, enumerable: !0, configurable: !0
    }); Object.defineProperty(b.prototype, "enabled", { get: function () { logger_1.logger.log(this.user_friendly_id() + ".get_enabled() called. [id=" + this.id + ", value=" + this.enabled_ + "]"); return this.enabled_ }, set: function (a) { logger_1.logger.log(this.user_friendly_id() + ".set_enabled() called. [id=" + this.id + ", value=" + a + "]"); this.enabled_ = a; this.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaStreamTrack_t.enabled, a) }, enumerable: !0, configurable: !0 }); Object.defineProperty(b.prototype,
        "readyState", { get: function () { logger_1.logger.log(this.user_friendly_id() + ".get_readyState() called. [id=" + this.id + "]"); return this.readyState_ }, enumerable: !0, configurable: !0 }); b.prototype.asyncClone = function () {
            return __awaiter(this, void 0, void 0, function () {
                var a, e, d; return __generator(this, function (f) {
                    switch (f.label) {
                        case 0: return [4, this.waitUntilConnected("RemoteMediaTrack.asyncClone")]; case 1: return f.sent(), [4, this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.clone, [])]; case 2: return a =
                            f.sent(), e = this.param0(a), d = new b(this, e.oid), [2, d.syncBarrier()]
                    }
                })
            })
        }; b.prototype.clone = function () { logger_1.logger.log(this.user_friendly_id() + ".clone() called. [id=" + this.id + "]"); var a = this.clone_state.clone(), e = new b(this, this.object_id()); e.id = this.id + "." + a.clone_id.toString(); e.label = this.label; e.kind = this.kind; e.enabled_ = this.enabled_; e.muted = this.muted; e.readyState_ = this.readyState_; e.trackSettings_ = this.trackSettings_; e.clone_state = a; return e }; b.prototype.stop = function () {
            var a = this; logger_1.logger.log(this.user_friendly_id() +
                ".stop() called. [id=" + this.id + "] refcount=" + this.refCount_); this.readyState_ = "ended"; if (0 < this.refCount_ && (this.refCount_--, 0 === this.refCount_ && (logger_1.logger.log(this.user_friendly_id() + ".stop() called. [id=" + this.id + "] remote invoking..."), this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.stop)["catch"](function (b) { logger_1.logger.log(a.user_friendly_id() + ".stop() failed with:" + b) }), null !== this.onstop_))) this.onstop_()
        }; b.prototype.getCapabilities = function () {
            logger_1.logger.log(this.user_friendly_id() +
                ".getCapabilities() called. [id=" + this.id + "]")
        }; b.prototype.getConstrains = function () { logger_1.logger.log(this.user_friendly_id() + ".getConstrains() called. [id=" + this.id + "]") }; b.prototype.getSettings = function () { return "audio" == this.kind ? function (a) { return { deviceId: a.deviceId, echoCancellation: a.echoCancellation } }(this.trackSettings_) : function (a) { return { aspectRatio: a.aspectRatio, deviceId: a.deviceId, frameRate: a.frameRate, height: a.height, width: a.width } }(this.trackSettings_) }; b.prototype.applyConstraints =
            function (a) { var b = this; logger_1.logger.log("MediaStreamTrack.applyConstraints() called."); return new Promise(function (d, f) { b.waitUntilConnected("MediaStreamTrack.applyConstraints").then(function () { return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.applyConstraints, a) }).then(function () { d() })["catch"](function () { f({ name: "OverconstrainedError", message: "Failed to apply constraints." }) }) }) }; b.convertReadyState = function (a) { return 0 == a ? "live" : "ended" }; b.prototype.syncBarrier = function () {
                var a =
                    this; logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called."); return new Promise(function (e, d) {
                        a.waitUntilConnected("MediaStreamTrack.syncBarrier").then(function () {
                            return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.kind, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.id, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.label, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.enabled, !1), a.remoteInvoke(!1,
                                webrpcclassinfo_1.method_id_MediaStreamTrack_t.muted, !1), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.readyState, 0), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamTrack_t.getSettings)])
                        }).then(function (d) { var h = 0; d = d.map(function (b) { return a.param0(b) }); a.kind = d[0]; a.id = d[1]; a.label = d[2]; a.enabled_ = d[3]; a.muted = d[4]; h = d[5]; a.trackSettings_ = d[6]; a.readyState_ = b.convertReadyState(h); e(a) })["catch"](function () { d() })
                    })
            }; return b
}(proxyobject_1.ProxyObject);
exports.RemoteMediaTrack = RemoteMediaTrack;
var StreamInfo = function () { return function () { } }(), RemoteStream = function (a) {
    function b(c, b) { var d = a.call(this, c, webrpcclassinfo_1.class_id_t.MediaStream, b, !0) || this; d.clone_state = new CloneState; return d } __extends(b, a); b.prototype.dumpTrackInfo = function () { logger_1.logger.log(this.user_friendly_id() + ".dumpTrackInfo() called. [id=" + this.id + "]"); for (var a = 0, b = this.tracks_; a < b.length; a++) { var d = b[a]; logger_1.logger.log(d.user_friendly_id() + " [id=" + d.id + "] refcount=" + d.refcount) } }; b.prototype.toJSON = function () {
        var a =
            new StreamInfo; a.id = this.id; a.active = this.active; a.oid = this.object_id(); return "RemoteStream:" + JSON.stringify(a)
    }; b.prototype.getAudioTracks = function () { logger_1.logger.log(this.user_friendly_id() + ".getAudioTracks() called. [id=" + this.id + "]"); for (var a = [], b = 0, d = this.tracks_; b < d.length; b++) { var f = d[b]; "audio" == f.kind && a.push(f) } return a }; b.prototype.getVideoTracks = function () {
        logger_1.logger.log(this.user_friendly_id() + ".getVideoTracks() called. [id=" + this.id + "]"); for (var a = [], b = 0, d = this.tracks_; b < d.length; b++) {
            var f =
                d[b]; "video" == f.kind && a.push(f)
        } return a
    }; b.prototype.getTracks = function () { logger_1.logger.log(this.user_friendly_id() + ".getTracks() called. [id=" + this.id + "]"); return this.tracks_ }; b.prototype.getTrackById = function (a) { logger_1.logger.log(this.user_friendly_id() + ".getTrackById() called. [id=" + this.id + "]"); for (var b = 0, d = this.tracks_; b < d.length; b++) { var f = d[b]; if (f.id == a) return f } }; b.prototype.addTrack = function (a) {
        logger_1.logger.log(this.user_friendly_id() + ".addTrack() called. [id=" + this.id + "]"); this.tracks_.push(a);
        this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.addTrack, { oid: a.object_id() })
    }; b.prototype.removeTrack = function (a) { logger_1.logger.log(this.user_friendly_id() + ".removeTrack() called. [id=" + this.id + "]"); var b = this.tracks_.indexOf(a); this.tracks_.splice(b, 1); this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.removeTrack, { oid: a.object_id() }) }; b.prototype.asyncClone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a, e, d; return __generator(this, function (f) {
                switch (f.label) {
                    case 0: return logger_1.logger.log(this.user_friendly_id() +
                        ".asyncClone() called. [id=" + this.id + "]"), [4, this.waitUntilConnected("asyncClone")]; case 1: return f.sent(), [4, this.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.clone, [])]; case 2: return a = f.sent(), console.log(a), e = this.param0(a), d = new b(this, e.oid), [2, d.syncBarrier()]
                }
            })
        })
    }; b.prototype.clone = function () {
        logger_1.logger.log(this.user_friendly_id() + ".clone() called. [id=" + this.id + "]"); var a = this.clone_state.clone(), e = new b(this, this.object_id()); e.id = this.id + "." + a.clone_id.toString(); this.tracks_.forEach(function (a) { a.addRef() });
        e.tracks_ = this.tracks_; e.clone_state = a; return e
    }; b.prototype.syncBarrier = function () {
        var a = this; logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called. [id=" + this.id + "]"); return new Promise(function (b, d) {
            a.waitUntilConnected("MediaStream.syncBarrier").then(function () {
                return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.id, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.active, !1), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStream_t.getTracks,
                    [])])
            }).then(function (b) { b = b.map(function (b) { return a.param0(b) }); a.id = b[0]; a.active = b[1]; b = b[2]; for (var e = [], d = 0; d < b.length; d++) { var k = new RemoteMediaTrack(a, b[d].oid); e.push(k.syncBarrier()) } return Promise.all(e) }).then(function (d) { a.tracks_ = []; d.forEach(function (b) { b.onstop = function () { var b = !0; a.tracks_.forEach(function (a) { "ended" != a.readyState && (b = !1) }); b && a.release() }; a.tracks_.push(b) }); b(a) })["catch"](function () { d() })
        })
    }; return b
}(proxyobject_1.ProxyObject); exports.RemoteStream = RemoteStream;
var RemoteStreamEvent = function (a) {
    function b(b, e) { return a.call(this, b, webrpcclassinfo_1.class_id_t.MediaStreamEvent, e, !0) || this } __extends(b, a); b.prototype.syncBarrier = function () {
        var a = this; logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called."); return new Promise(function (b, d) {
            a.waitUntilConnected("MediaStreamEvent.syncBarrier").then(function () { return a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaStreamEvent_t.stream, { oid: 0 }) }).then(function (b) { return (new RemoteStream(a, b.params[0].oid)).syncBarrier() }).then(function (d) {
                a.stream =
                    d; b(a)
            })["catch"](function () { d() })
        })
    }; return b
}(proxyobject_1.ProxyObject); exports.RemoteStreamEvent = RemoteStreamEvent;
var RemoteDeviceInfo = function (a) {
    function b(b) { return a.call(this, null, webrpcclassinfo_1.class_id_t.MediaDeviceInfo, b, !0) || this } __extends(b, a); b.prototype.convertKind = function (a) { return 0 == a ? "audioinput" : 1 == a ? "audiooutput" : "videoinput" }; b.prototype.syncBarrier = function () {
        var a = this; logger_1.logger.log(this.user_friendly_id() + ".syncBarrier() called."); return new Promise(function (b, d) {
            a.waitUntilConnected("RemoteDeviceInfo.syncBarrier").then(function () {
                return Promise.all([a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.deviceId,
                    ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.kind, 0), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.label, ""), a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDeviceInfo_t.groupId, "")])
            }).then(function (d) { a.kind = a.convertKind(a.param0(d.splice(1, 1)[0])); d = d.map(function (b) { return a.param0(b) }); a.deviceId = d[0]; a.label = d[1]; a.groupId = d[2]; b(a) })["catch"](function () { logger_1.logger.log(a.user_friendly_id() + ".syncBarrier(): rejected."); d() })
        })
    }; return b
}(proxyobject_1.ProxyObject);
exports.RemoteDeviceInfo = RemoteDeviceInfo;
var RemoteDevices = function (a) {
    function b() { var b = a.call(this, null, webrpcclassinfo_1.class_id_t.MediaDevices, 0, !1) || this; b.devices_ = []; b.setDeviceChangeCallback(); return b } __extends(b, a); b.prototype.enumerateDevices = function () {
        var a = this; logger_1.logger.log(this.user_friendly_id() + ".enumerateDevices() called"); return new Promise(function (b, d) {
            a.waitUntilConnected("RemoteDevices.enumerateDevices").then(function () { return a.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDevices_t.enumerateDevices, []) }).then(function (b) {
                var d =
                    []; b.params[0].forEach(function (b) { var e = a.devices_.find(function (a) { return a.object_id() === b.oid }); void 0 === e ? (e = new RemoteDeviceInfo(b.oid), d.push(e.syncBarrier())) : d.push(e) }); return Promise.all(d)
            }).then(function (d) { logger_1.logger.log(a.user_friendly_id() + ".enumerateDevices: returning enumerated devices with ids [" + d.map(function (a) { return a.object_id() }) + "]"); b(d); a.devices_.forEach(function (a) { for (var b = !0, c = 0; c < d.length; c++)if (a === d[c]) { b = !1; break } b && a.release() }); a.devices_ = d })["catch"](function () {
                logger_1.logger.log(a.user_friendly_id() +
                    ".enumerateDevices() didnt get response."); a.devices_ = []; d()
            })
        })
    }; b.prototype.getDisplayMedia = function (a) {
        var b = this; return new Promise(function (d, f) {
            b.waitUntilConnected("RemoteDevices.getDisplayMedia").then(function () { return b.remoteInvoke(!1, webrpcclassinfo_1.method_id_MediaDevices_t.getDisplayMedia, a) }).then(function (a) { return (new RemoteStream(null, a.params[0].oid)).syncBarrier() }).then(function (a) { d(a) })["catch"](function () {
                logger_1.logger.log(b.user_friendly_id() + ".getDisplayMedia() returned an error.");
                f(new DOMException("Unable to get a display stream.", "NotReadableError"))
            })
        })
    }; b.prototype.setDeviceChangeCallback = function () {
        var a = this; logger_1.logger.log(this.user_friendly_id() + ".set_DeviceChangeCallback() called."); this.waitUntilConnected("MediaDevices.ondevicechange").then(function () {
            var b = a.registerCallbacks(!1, !1, webrpcclassinfo_1.method_id_MediaDevices_t.ondevicechange); b.then(function () { logger_1.logger.log(a.user_friendly_id() + ".ondevicechange(): callback received!!!"); navigator.mediaDevices.dispatchEvent(new CustomEvent("devicechange")) });
            return a.remoteInvoke(!0, webrpcclassinfo_1.method_id_MediaDevices_t.ondevicechange, b.success)
        })["catch"](function () { logger_1.logger.log(a.user_friendly_id() + ".set_ondevicechange(): failed.") })
    }; return b
}(proxyobject_1.ProxyObject); exports.RemoteDevices = RemoteDevices;
var NavigatorUserMedia = function (a) {
    function b() { return a.call(this, null, webrpcclassinfo_1.class_id_t.NavigatorUserMedia, 0, !1) || this } __extends(b, a); b.prototype.webkitGetUserMedia = function (a, b, d) { this.getUserMedia(a, b, d) }; b.prototype.getUserMedia = function (a, b, d) {
        var f = this; logger_1.logger.log(this.user_friendly_id() + ".getUserMedia() called: " + JSON.stringify(a)); this.waitUntilConnected("NavigatorUserMedia.getUserMedia").then(function () {
            var b = f.registerCallbacks(!0, !1, webrpcclassinfo_1.method_id_NavigatorUserMedia_t.getUserMedia);
            "undefined" !== typeof a.audio && 0 == Object.keys(a.audio).length && (a.audio = { dummy: 1 }); if ("undefined" !== typeof a.video) { var d = a.video; void 0 == d.mandatory.maxFrameRate && (d.mandatory.maxFrameRate = 30); void 0 == d.mandatory.minWidth && (d.mandatory.minWidth = 360); void 0 == d.mandatory.maxWidth && (d.mandatory.maxWidth = 1920); void 0 == d.mandatory.minHeight && (d.mandatory.minHeight = 180); void 0 == d.mandatory.maxHeight && (d.mandatory.maxHeight = 1080) } f.remoteInvoke(!1, webrpcclassinfo_1.method_id_NavigatorUserMedia_t.getUserMedia,
                a, b.success, b.fail); return b.prom()
        }).then(function (a) { logger_1.logger.log(f.user_friendly_id() + ".getUserMedia: received success callback!"); return (new RemoteStream(null, f.param0(a).oid)).syncBarrier() }).then(function (a) {
            logger_1.logger.log(f.user_friendly_id() + ".getUserMedia: MediaStream ready to deliver", JSON.stringify(a)); 0 == a.getTracks().length ? (logger_1.logger.log(f.user_friendly_id() + ".getUserMedia: reporting no tracks as error."), d({ constraintName: "", name: "ConstraintNotSatisfiedError", message: "" })) :
                b(a)
        })["catch"](function (a) { logger_1.logger.log(a); d({ constraintName: "", name: "ConstraintNotSatisfiedError", message: "" }) })
    }; return b
}(proxyobject_1.ProxyObject); exports.NavigatorUserMedia = NavigatorUserMedia;
