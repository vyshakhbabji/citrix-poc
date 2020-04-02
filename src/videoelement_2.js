"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var proxyobject_1 = require("./proxyobject");
var lib = require("./webrpcclassinfo");
var logger_1 = require("./logger");
var VideoRect = /** @class */ (function () {
    function VideoRect(r) {
        this.x = Math.round(r.x);
        this.y = Math.round(r.y);
        this.width = Math.round(r.width);
        this.height = Math.round(r.height);
    }
    return VideoRect;
}());
exports.VideoRect = VideoRect;
var VideoElement = /** @class */ (function (_super) {
    __extends(VideoElement, _super);
    function VideoElement() {
        var _this = _super.call(this, null, lib.class_id_t.VideoElement, 0, false) || this;
        _this.srcObject_ = null;
        _this.sinkId_ = '';
        _this.videoWidth = 0;
        _this.videoHeight = 0;
        _this.isLoaded = false;
        _this.connectionState = "disconnected";
        _this.dispose_ = false;
        _this.disposeTimer = null;
        return _this;
    }
    Object.defineProperty(VideoElement.prototype, "sinkId", {
        get: function () {
            return this.sinkId_;
        },
        set: function (value) {
            var _this = this;
            this.waitUntilConnected('VideoElement.sinkId')
                .then(function () {
                return _this.remoteInvoke(true, lib.method_id_VideoElement_t.sinkId, value);
            })
                .then(function () {
                _this.sinkId_ = value;
            })
                .catch(function () {
                logger_1.logger.log(_this.user_friendly_id() + '.sinkId setter: failed to connect!');
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoElement.prototype, "srcObject", {
        get: function () {
            return this.srcObject_;
        },
        set: function (obj) {
            logger_1.logger.log(this.user_friendly_id() + '.srcObject: set srcObject...');
            // skip if srcObject the same as obj
            if (this.srcObject_ === obj) {
                return;
            }
            //if VideoElement is being reused cancel release
            if (this.dispose_ === true && this.disposeTimer !== null) {
                clearTimeout(this.disposeTimer);
                this.disposeTimer = null;
                this.dispose_ = false;
            }
            // disconnect first if needed
            if (this.srcObject_ !== null) {
                if (obj === null) {
                    // Teams may be done with the video element
                    this.dispose_ = true;
                }
                this.disconnect();
                this.isLoaded = false;
            }
            // update srcObject
            this.srcObject_ = obj;
            // connect new object if it is not null
            if (this.srcObject_ !== null) {
                this.connectTo(this.srcObject_);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoElement.prototype, "onconnectionstatechange", {
        get: function () {
            return this.onconnectionstatechange_;
        },
        set: function (cb) {
            logger_1.logger.log(this.user_friendly_id() + '.set_onconnectionstatechange() called.');
            this.onconnectionstatechange_ = cb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoElement.prototype, "onloadedmetadata", {
        set: function (cb) {
            logger_1.logger.log(this.user_friendly_id() + '.set_onloadedmetadata() called.');
            this.onloadedmetadata_ = cb;
        },
        enumerable: true,
        configurable: true
    });
    VideoElement.prototype.setupOnVideoFrameChanged = function () {
        var _this = this;
        // setup persistent callbacks for onvideoframechanged
        var handlers = this.registerCallbacks(false, false, lib.method_id_VideoElement_t.onvideoframechanged);
        handlers.then(function (obj) {
            logger_1.logger.log(_this.user_friendly_id() + '.onvideoframechanged', obj.params);
            _this.videoWidth = obj.params[0] || 0;
            _this.videoHeight = obj.params[1] || 0;
            // only fire onloadedmetadata the first time.
            if (!_this.isLoaded) {
                _this.isLoaded = true;
                _this.onloadedmetadata_ && _this.onloadedmetadata_();
            }
        });
        // set the callback.
        this.remoteInvoke(true, lib.method_id_VideoElement_t.onvideoframechanged, handlers.success);
    };
    VideoElement.prototype.connectTo = function (stream) {
        var _this = this;
        console.log(this.user_friendly_id() + '.connectTo: connect media stream with id = ' + stream.object_id() + ', clone_id = ' + stream.clone_state.clone_id);
        // await stable state for websocket communications.
        this.waitUntilConnected('VideoElement.connectTo')
            .then(function () {
            _this.setupOnVideoFrameChanged();
            // if stream is a clone, synchronize the local object with the remote object.
            return stream.clone_state.synchronize(stream);
        })
            .then(function (new_stream) {
            var callbacks = _this.registerCallbacks(true, false, lib.method_id_VideoElement_t.connectTo);
            // wait for either the success callback or failure callback to be received.
            return Promise.all([
                _this.remoteInvoke(false, lib.method_id_VideoElement_t.connectTo, { "oid": new_stream.object_id() }, callbacks.success, callbacks.fail),
                callbacks.prom()
            ]);
        })
            .then(function (results) {
            logger_1.logger.log(_this.user_friendly_id() + '.connectTo: remote media stream is connected!');
            // fire onconnected event
            if (_this.onconnectionstatechange_) {
                _this.connectionState = "connected";
                _this.onconnectionstatechange_();
            }
            // setup timeupdate timer.
            _this.updateTimer = setInterval(function () {
                _this.ontimeupdate && _this.ontimeupdate();
            }, 250);
        })
            .catch(function (msg) {
            logger_1.logger.log(_this.user_friendly_id() + '.connectTo: failed to connect! msg = ', msg);
        });
    };
    VideoElement.prototype.disconnect = function () {
        var _this = this;
        logger_1.logger.log(this.user_friendly_id() + '.disconnect: disconnect from current media stream');
        if (this.dispose_ === true) {
            //release videoElement after 5 secs
            this.disposeTimer = setTimeout(function () { /*_this.release();*/ }, 5000);
        }
        this.waitUntilConnected('VideoElement.disconnect')
            .then(function () {
            // release time update timer
            if (_this.updateTimer) {
                clearInterval(_this.updateTimer);
            }
            // fire onconnected event
            if (_this.onconnectionstatechange_) {
                _this.connectionState = "disconnected";
                _this.onconnectionstatechange_();
            }
            // remote invocer  
            var callbacks = _this.registerCallbacks(false, true, lib.method_id_VideoElement_t.onvideoframechanged);
            _this.remoteInvoke(true, lib.method_id_VideoElement_t.onvideoframechanged, callbacks.success);
            return _this.remoteInvoke(false, lib.method_id_VideoElement_t.disconnect);
        })
            .then(function () {
            logger_1.logger.log(_this.user_friendly_id() + '.disconnect: remote media stream is disconnected!');
        })
            .catch(function () {
            logger_1.logger.log(_this.user_friendly_id() + '.disconnect: failed to connect!');
        });
    };
    VideoElement.prototype.setFrame = function (r) {
        var _this = this;
        logger_1.logger.log(this.user_friendly_id() + '.setFrame: set video frame to', r.x, r.y, r.width, r.height);
        this.waitUntilConnected('VideoElement.setFrame')
            .then(function () {
            var vr = new VideoRect(r);
            return _this.remoteInvoke(false, lib.method_id_VideoElement_t.setFrame, vr);
        })
            .then(function () {
            logger_1.logger.log(_this.user_friendly_id() + '.setFrame: success!');
        })
            .catch(function () {
            logger_1.logger.log(_this.user_friendly_id() + '.setFrame: failed to connect!');
        });
    };
    VideoElement.prototype.addClipRect = function (r) {
        var _this = this;
        logger_1.logger.log(this.user_friendly_id() + '.addClipRect: ', JSON.stringify(r));
        this.waitUntilConnected('VideoElement.addClipRect')
            .then(function () {
            var vr = new VideoRect(r);
            return _this.remoteInvoke(false, lib.method_id_VideoElement_t.addClipRect, vr);
        })
            .catch(function () {
            logger_1.logger.log(_this.user_friendly_id() + '.addClipRect failed!');
        });
    };
    VideoElement.prototype.removeClipRect = function (r) {
        var _this = this;
        logger_1.logger.log(this.user_friendly_id() + '.removeClipRect: ', JSON.stringify(r));
        this.waitUntilConnected('VideoElement.removeClipRect')
            .then(function () {
            var vr = new VideoRect(r);
            return _this.remoteInvoke(false, lib.method_id_VideoElement_t.removeClipRect, vr);
        })
            .catch(function () {
            logger_1.logger.log(_this.user_friendly_id() + '.removeClipRect failed!');
        });
    };
    return VideoElement;
}(proxyobject_1.ProxyObject));
exports.VideoElement = VideoElement;
