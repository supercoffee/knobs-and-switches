/**
 * Created by ben on 7/8/16.
 */

(function() {

    NodeList.prototype.forEach =
    HTMLCollection.prototype.forEach =
    TouchList.prototype.forEach =
    Array.prototype.forEach;

    Math.radiansToDegrees = function (radians) {
        return radians * (180/Math.PI);
    };

    Object.defineProperties(TouchEvent.prototype, {
        clientX: {
            get: function() {
                return this.targetTouches[0].clientX;
            }
        },
        clientY: {
            get: function() {
                return this.targetTouches[0].clientY;
            }
        }
    });

    var Vector = function (x, y) {
        this.x = x;
        this.y = y;
    };

    /**
     *
     * @param vector {Vector}
     * @returns {Vector}
     */
    Vector.prototype.offsetFromHere = function (vector) {
        // reverse y to switch "graphics" coords to normal cartesian
        return new Vector(vector.x - this.y, - (vector.y - this.y));
    };

    Object.defineProperties(Vector.prototype, {
        length: {
            get: function () {
                return Math.sqrt(
                    Math.pow(this.x, 2) + Math.pow(this.y, 2)
                );
            }
        },
        angle: {
            get: function () {
                return Math.atan2(this.x, this.y);
            }
        }
    });

    function Knob (element) {
        this.element = element;
        this.activated = false;
        this.center = new Vector(element.offsetWidth, element.offsetHeight);

        var boundedActivate     = this.activate.bind(this),
            boundedDeactivate   = this.deactivate.bind(this),
            boundedDrag         = this.drag.bind(this);

        // Mouse events
        element.addEventListener("mousemove", boundedDrag);
        element.addEventListener('mousedown', boundedActivate);
        element.addEventListener('mouseup', boundedDeactivate);
        element.addEventListener('mouseleave', boundedDeactivate);
        // Touch events
        element.addEventListener('touchmove', boundedDrag);
        element.addEventListener('touchstart', boundedActivate);
        element.addEventListener('touchend', boundedDeactivate);
    }

    Knob.prototype.deactivate = function(e) {
        this.active = false;
        console.log('deactivated');
    };

    Knob.prototype.activate = function(e) {
        this.active = true;
        console.log('activated');
    };

    Knob.prototype.drag = function(e) {
        e.preventDefault();
        if (!this.active) {
            return;
        }
        var mouseAbsPosition = new Vector(e.clientX, e.clientY),
            offset = this.center.offsetFromHere(mouseAbsPosition);
        var degrees = Math.radiansToDegrees(offset.angle);

        this.element.style.transform = "rotate(" + degrees + "deg)";
    };
    var knobs = document.getElementsByClassName("dial");

    knobs.forEach(function(element, index) {
        new Knob(element);
    });
})();
