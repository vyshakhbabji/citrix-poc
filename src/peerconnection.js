var $jscomp = {
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
var remotemedia_1 = require("./remotemedia"), proxyobject_1 = require("./proxyobject"),
    webrpcclassinfo_1 = require("./webrpcclassinfo"), logger_1 = require("./logger"), stats_1 = require("./stats");

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
