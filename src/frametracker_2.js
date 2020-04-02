"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var hdxms_1 = require("./hdxms");
const remote = require('electron').remote;
let win = remote.getCurrentWindow();

var FrameTracker = /** @class */ (function () {
    function FrameTracker() {
        var _this = this;
        this.running_ = false;
        this.elements_ = [];
        this.clipRects = new Set(); // active clip rectangles
        var hdxms = hdxms_1.getRedirector();
		console.log(win.getNativeWindowHandle());
        var getWindowHandle = window['getWindowHandleAsHex'];
        Promise.all([
//			new Promise(function(resolve,reject){
//				var uint8String = "";
//				var uint8 = win.getNativeWindowHandle();
//				uint8.forEach(function(element) {
//				  if(element < 16){
//					uint8String = uint8String.concat("0")
//				  }
//				  uint8String = uint8String.concat(element.toString(16));
//				});
//				console.log(uint8String);
//				resolve(uint8String);
//			}),
            getWindowHandle(),
            hdxms.startRedirection(false, 'FrameTracker.ctor')
        ]).then(function (results) {
            logger_1.logger.log('FrameTracker: set window handle: ' + results[0]);
			console.log(results);
            // tell WebSocketAgent about our window so it can start tracking it.
            hdxms.WSSendObject({
                /**@nocollapse*/ v: 'overlay',
                /**@nocollapse*/ command: 'window',
                /**@nocollapse*/ windowHandle: results[0]
            });
        });
        this.observer_ = new MutationObserver(function (mutations) {
            _this.updateAll();
        });
    }
    /// returns true iff the two rectangles intersect each other.
    FrameTracker.prototype.rectanglesIntersect = function (r1, r2) {
        if (r1.x < r2.x + r2.width &&
            r1.x + r1.width > r2.x &&
            r1.y < r2.y + r2.height &&
            r1.y + r1.height > r2.y) {
            return true;
        }
        return false;
    };
    /// return the intersection of rectangles assuming that they actually do intersect.
    FrameTracker.prototype.intersectingRect = function (r1, r2) {
        var r = {
            left: Math.max(r1.left, r2.left),
            right: Math.min(r1.right, r2.right),
            top: Math.max(r1.top, r2.top),
            bottom: Math.min(r1.bottom, r2.bottom)
        };
        return new DOMRect(r.left, r.top, r.right - r.left, r.bottom - r.top);
    };
    /// figure out how close the specified element is to the specified ancestor.
    FrameTracker.prototype.pedigreeCount = function (element, ancestor) {
        var pedigree = 0;
        var parent = element.parentElement;
        while (parent != null && parent != ancestor) {
            pedigree++;
            parent = parent.parentElement;
        }
        return {
            'isAncestor': (parent != null),
            'pedigree': pedigree
        };
    };
    /// return whichever of the two elements is on top of the other.
    FrameTracker.prototype.selectTopmost = function (itemA, itemB) {
        var rA = itemA.getBoundingClientRect();
        var rB = itemB.getBoundingClientRect();
        // compute the intersecting rectangle.
        var rect = this.intersectingRect(rA, rB);
        // compute the center of the intersecting rectangle.
        var pt = {
            x: (rect.left + (rect.width / 2)),
            y: (rect.top + (rect.height / 2))
        };
        // do a hit-test to see which one is on top.
        var topmost = document.elementFromPoint(pt.x, pt.y);
        if (topmost == itemA) {
            return itemA;
        }
        else if (topmost == itemB) {
            return itemB;
        }
        // this happens sometimes. see if we can resolve it by checking the parent.
        var pedigreeA = this.pedigreeCount(itemA, topmost);
        var pedigreeB = this.pedigreeCount(itemB, topmost);
        if (pedigreeA['isAncestor'] && pedigreeB['isAncestor']) {
            // both itemA and itemB are children of topmost.
            // see if one of them is a closer relative.
            if (pedigreeA['pedigree'] < pedigreeB['pedigree']) {
                return itemA;
            }
            else if (pedigreeB['pedigree'] < pedigreeA['pedigree']) {
                return itemB;
            }
        }
        else if (pedigreeA['isAncestor']) {
            // itemA is a child of topmost and itemB is not.
            return itemA;
        }
        else if (pedigreeB['isAncestor']) {
            // itemB is a child of topmost and itemA is not.
            return itemB;
        }
        return undefined;
    };
    FrameTracker.prototype.checkOverlappingVideos = function (item) {
        var _this = this;
        var currentRect = item.target.getBoundingClientRect();
        // purge (invalidate) any clip rects for item
        item.overlaps.forEach(function (o) { item.target['remoteVideoElement'].removeClipRect(o['rect']); });
        item.overlaps = [];
        // check if this new position overlaps another video.
        this.elements_.forEach(function (el) {
            // skip ourselves.
            if (el != item) {
                // check if this element used to overlap and clear clip rectangle if so.
                var overlappingElements = el.overlaps.map(function (o) { return o['element']; });
                var idx = overlappingElements.indexOf(item.target);
                if (idx != -1) {
                    var ovlp = el.overlaps.splice(idx, 1)[0];
                    el.target['remoteVideoElement'].removeClipRect(ovlp['rect']);
                }
                // get the bounding rectangle for this element.
                var elRect = el.target.getBoundingClientRect();
                // if it intersects the current element...
                if (_this.rectanglesIntersect(currentRect, elRect)) {
                    // ...check which one is on top.
                    var topmost = _this.selectTopmost(item.target, el.target);
                    if (topmost == item.target) {
                        // cache the rect so we can clear the clip rect when it moves to another spot.
                        el.overlaps.push({ 'element': item.target, 'rect': currentRect });
                        // add the occlusion
                        el.target['remoteVideoElement'].addClipRect(currentRect);
                    }
                    else if (topmost == el.target) {
                        // the item is being added or moved into a spot which contains an overlapping
                        // element which should appear on top.
                        item.overlaps.push({ 'element': el.target, 'rect': elRect });
                        item.target['remoteVideoElement'].addClipRect(elRect);
                    }
                }
            }
        });
    };
    FrameTracker.prototype.updateAll = function () {
        var _this = this;
        this.elements_.forEach(function (item) {
            var currentRect = item.target.getBoundingClientRect();
            if (currentRect === undefined) {
                return;
            }
            var lastRect = item.clientRect;
            if (lastRect === undefined
                || lastRect.x !== currentRect.x
                || lastRect.y !== currentRect.y
                || lastRect.width !== currentRect.width
                || lastRect.height !== currentRect.height) {
                item.clientRect = currentRect;
                item.callback(currentRect);
                _this.checkOverlappingVideos(item);
            }
        });
    };
    FrameTracker.prototype.track = function (element, cb) {
        var _this = this;
        var rect = element.getBoundingClientRect();
        logger_1.logger.log('Track element frame', element, JSON.stringify(rect));
        console.log(element);
        this.elements_.push({
            target: element,
            clientRect: undefined,
            callback: cb,
            overlaps: []
        });
        // initialize clip rectangles for the new video Element
        try {
            logger_1.logger.log('[HdxWebRTC.js] Initializing occlusion for new videoElement');
            this.clipRects.forEach(function (r) { _this.applyOcclusion(element, JSON.parse(r)); });
        }
        catch (error) {
            logger_1.logger.log('[HdxWebRTC.js] addOcclusionInit failed! ' + error);
        }
        if (!this.running_) {
            logger_1.logger.log('Start FrameTracker observer...');
            this.observer_.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true
            });
            this.running_ = true;
            this.updateAll();
        }
    };
    FrameTracker.prototype.untrack = function (element) {
        logger_1.logger.log('Untrack element frame', element);
        var idx = -1;
        this.elements_.forEach(function (item, index) {
            if (item.target === element) {
                idx = index;
                return;
            }
        });
        if (idx >= 0) {
            this.elements_.splice(idx, 1);
            if (this.elements_.length === 0) {
                logger_1.logger.log('Stop FrameTracker observer...');
                this.observer_.disconnect();
                this.running_ = false;
            }
        }
    };
    FrameTracker.prototype.applyOcclusion = function (element, rect) {
        var r1 = rect;
        var r2 = element.getBoundingClientRect();
        if (this.rectanglesIntersect(r1, r2)) {
            if (element.remoteVideoElement !== undefined) {
                element.remoteVideoElement.addClipRect(r1);
            }
        }
    };
    /// add an occlusion that is global (applies to all video elements)
    FrameTracker.prototype.addOcclusion = function (rect) {
        var _this = this;
        logger_1.logger.log('[HdxWebRTC.js] Adding occlusion ' + JSON.stringify(rect));
        logger_1.logger.log("[HdxWebRTC.js] Tracking '" + this.elements_.length + "' elements.");
        this.clipRects.add(JSON.stringify(rect));
        this.elements_.forEach(function (e) {
            _this.applyOcclusion(e.target, rect);
        });
    };
    /// remove a global occlusion.
    FrameTracker.prototype.removeOcclusion = function (rect) {
        var _this = this;
        logger_1.logger.log('[HdxWebRTC.js] Removing occlusion ' + JSON.stringify(rect));
        logger_1.logger.log("[HdxWebRTC.js] Tracking '" + this.elements_.length + "' elements.");
        this.clipRects.delete(JSON.stringify(rect));
        this.elements_.forEach(function (e) {
            var r1 = rect;
            var r2 = e.target.getBoundingClientRect();
            if (_this.rectanglesIntersect(r1, r2)) {
                if (e.target.remoteVideoElement !== undefined) {
                    e.target.remoteVideoElement.removeClipRect(r1);
                }
            }
        });
    };
    return FrameTracker;
}());
exports.FrameTracker = FrameTracker;
