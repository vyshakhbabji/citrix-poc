Object.defineProperty(exports, "__esModule", {value: !0});
var hdxms_1 = require("./hdxms"), logger_1 = require("./logger"), wsjsonutil_1 = require("./wsjsonutil"),
    garbagecollector_1 = require("./garbagecollector"), webrpcclassinfo_1 = require("./webrpcclassinfo"),
    deferred_action = function () {
        function a(c, b, a) {
            this.resolve = c;
            this.reject = b;
            this.name = a
        }

        a.prototype.post = function (c) {
            1 == c ? (logger_1.logger.log('deferred_action.post(): resolving "' + this.name + '"'), this.resolve()) : (logger_1.logger.log('deferred_action.post(): rejecting "' + this.name + '"'), this.reject())
        };
        return a
    }();
exports.deferred_action = deferred_action;
var rpc_callback = function () {
    return function (a, c) {
        this.id = a;
        this.is_null = c
    }
}();
exports.rpc_callback = rpc_callback;
var callback = function () {
    function a(c, b, a) {
        this.success = new rpc_callback(c << 16, b);
        this.fail = new rpc_callback(c << 16 | 1, b);
        this.id = c;
        this.oneShot = a
    }

    a.prototype.resolve = function (c) {
        logger_1.logger.trace("callback.resolve() called. [id=" + this.id + "]");
        null != this.handler && this.handler(c)
    };
    a.prototype.reject = function () {
        null != this.err_handler && this.err_handler()
    };
    a.prototype.then = function (c) {
        this.handler = c
    };
    a.prototype.prom = function () {
        var c = this;
        return new Promise(function (a, d) {
            c.handler = a;
            c.err_handler = d
        })
    };
    return a
}();
exports.callback = callback;
var ProxyReadyState;
(function (a) {
    a[a.NotConfigured = 0] = "NotConfigured";
    a[a.Configured = 1] = "Configured";
    a[a.Error = 2] = "Error";
    a[a.Destroyed = 3] = "Destroyed"
})(ProxyReadyState || (ProxyReadyState = {}));
var ProxyObject = function () {
    function a(c, b, d, e) {
        for (var h = [], f = 4; f < arguments.length; f++) h[f - 4] = arguments[f];
        var g = this;
        this.hdxms = hdxms_1.getRedirector();
        this.iid = b;
        this.oid = d;
        this.state = ProxyReadyState.NotConfigured;
        this.deferredActions = [];
        this.cbs = new Map;
        0 == e ? (f = !1, this.iid === webrpcclassinfo_1.class_id_t.EngineControl && (f = !0), this.hdxms.startRedirection(f, this.user_friendly_id()).then(function () {
            g.oid = a.nextId++;
            var c = webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(b, 0);
            return g.hdxms.WSSendObjectWrapper(c,
                b, 0, wsjsonutil_1.WsJsonUtil.createMessageByid.apply(wsjsonutil_1.WsJsonUtil, [!1, !1, wsjsonutil_1.ws_msg_type_t.req, b, 0, g.oid].concat(h)))
        }).then(function (a) {
            logger_1.logger.trace("ProxyObject: setting state to configured. (iid: " + g.iid + " oid: " + g.oid + ")");
            g.state = ProxyReadyState.Configured;
            g.oid = g.param0(a);
            g.onConnected();
            garbagecollector_1.gc.trackObject(g, c)
        })["catch"](function () {
            g.state = ProxyReadyState.Error;
            g.onConnected()
        })) : (this.state = ProxyReadyState.Configured, garbagecollector_1.gc.trackObject(this,
            c))
    }

    a.prototype.reconstructor = function (c, a, d) {
        for (var e = this, h = [], f = 3; f < arguments.length; f++) h[f - 3] = arguments[f];
        this.state = ProxyReadyState.NotConfigured;
        this.deferredActions = [];
        f = webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(a, 0);
        this.hdxms.WSSendObjectWrapper(f, a, 0, wsjsonutil_1.WsJsonUtil.createMessageByid.apply(wsjsonutil_1.WsJsonUtil, [!1, !1, wsjsonutil_1.ws_msg_type_t.req, a, 0, this.oid].concat(h))).then(function (a) {
            logger_1.logger.trace("ProxyObject: setting state to configured. (iid: " +
                e.iid + " oid: " + e.oid + ")");
            e.state = ProxyReadyState.Configured;
            e.oid = e.param0(a);
            e.onConnected();
            garbagecollector_1.gc.trackObject(e, c)
        })["catch"](function () {
            e.state = ProxyReadyState.Error;
            e.onConnected()
        })
    };
    a.prototype.setParent = function (a) {
        garbagecollector_1.gc.setParent(this, a)
    };
    a.prototype.release = function () {
        logger_1.logger.log(this.user_friendly_id() + ".release() called.");
        garbagecollector_1.gc.releaseObject(this)
    };
    a.prototype.destroy = function () {
        this.state = ProxyReadyState.Destroyed;
        var a = webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(this.iid,
            0);
        this.hdxms.WSSendObjectWrapper(a, this.iid, 0, wsjsonutil_1.WsJsonUtil.createMessageByid(!1, !0, wsjsonutil_1.ws_msg_type_t.req, this.iid, 0, this.oid))
    };
    a.prototype.onConnected = function () {
        for (; this.deferredActions && 0 < this.deferredActions.length;) this.deferredActions.shift().post(this.state == ProxyReadyState.Configured)
    };
    a.prototype.checkState = function (a, b) {
        var d = this;
        0 >= a ? (logger_1.logger.log("ProxyObject.checkState() timeout waiting for connection response! failed. (iid: " + d.iid + " oid: " + d.oid + ")"), d.onConnected()) :
            setTimeout(function () {
                if (d.state == ProxyReadyState.Configured) d.onConnected(); else if (d.state == ProxyReadyState.Error) d.onConnected(); else if (d.state == ProxyReadyState.Destroyed) d.onConnected(); else logger_1.logger.log('ProxyObject.checkState(): count= "' + a + '". (iid: ' + d.iid + " oid: " + d.oid + ")"), d.checkState(--a, b)
            }, b)
    };
    a.prototype.waitUntilConnected = function (a) {
        var b = this;
        return new Promise(function (d, e) {
            logger_1.logger.trace("ProxyObject.waitUntilConnected(): readyState=" + b.state + ". (iid: " + b.iid + " oid: " +
                b.oid + ")");
            b.state == ProxyReadyState.Destroyed && (b.onConnected(), e("Object already destroyed :" + b.user_friendly_id()));
            b.state == ProxyReadyState.Configured ? (b.onConnected(), d()) : b.state == ProxyReadyState.Error ? (logger_1.logger.trace("ProxyObject.waitUntilConnected(): readyState=" + b.state + ". (iid: " + b.iid + " oid: " + b.oid + ")"), b.onConnected(), e()) : (logger_1.logger.log('ProxyObject.waitUntilConnected(): deferring action "' + a + '". (iid: ' + b.iid + " oid: " + b.oid + ")"), b.deferredActions.push(new deferred_action(d,
                e, a)), b.checkState(20, 1E3))
        })
    };
    a.prototype.remoteInvoke = function (a, b) {
        for (var d = [], e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
        if (this.state == ProxyReadyState.Destroyed) return Promise.reject("Cannot invoke destroyed object :" + this.user_friendly_id());
        e = webrpcclassinfo_1.WebrpcClassLibInfoUtil.getMethodFeatureByid(this.iid, b);
        return this.hdxms.WSSendObjectWrapper(e, this.iid, b, wsjsonutil_1.WsJsonUtil.createMessageByid.apply(wsjsonutil_1.WsJsonUtil, [a, !1, wsjsonutil_1.ws_msg_type_t.req, this.iid, b, this.oid].concat(d)))
    };
    a.prototype.registerCallbacks = function (c, b, d) {
        this.unregisterCallbacks(d);
        var e = a.nextcbid++, h = new callback(e, b, c);
        b || (c || this.cbs.set(d, e), this.hdxms.registerHandler(this.iid, this.oid, h));
        return h
    };
    a.prototype.unregisterCallbacks = function (a) {
        this.cbs.has(a) ? (this.hdxms.unregisterHandler(this.iid, this.oid, this.cbs.get(a)), this.cbs["delete"](a)) : (logger_1.logger.log("ProxyObject: Cant find callback handler registration for mid: " + a), logger_1.logger.trace(this.cbs))
    };
    a.prototype.object_id = function () {
        return this.oid
    };
    a.prototype.param0 = function (a) {
        return a.params[0]
    };
    a.prototype.isNullCallback = function (a) {
        return void 0 == a || null == a
    };
    a.prototype.user_friendly_id = function () {
        return this.constructor.name + "[" + this.oid + "]"
    };
    a.prototype.isRedirected = function () {
        return this.hdxms.isRedirected()
    };
    a.nextId = 0;
    a.nextcbid = 0;
    return a
}();
exports.ProxyObject = ProxyObject;
