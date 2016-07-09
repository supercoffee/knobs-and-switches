/**
 * Created by ben on 7/8/16.
 */

(function() {

    NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

    Math.radiansToDegrees = function (radians) {
        return radians * (180/Math.PI);
    };

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
        return new Vector(vector.x - this.y, this.y - vector.y);
    };

    Object.defineProperty(Vector.prototype, 'length', {
        get: function () {
            return Math.sqrt(
                Math.pow(this.x, 2) + Math.pow(this.y, 2)
            );
        }
    });

    Object.defineProperty(Vector.prototype, 'angle', {
        get: function () {
            return Math.atan2(this.x, this.y)
        }
    });

    function Knob (element) {
        this.element = element;
        this.activated = false;
        this.center = new Vector(element.offsetWidth, element.offsetHeight);
        element.addEventListener("mousemove", this.drag.bind(this));
        element.addEventListener('mousedown', this.activate);
        element.addEventListener('mouseup', this.deactivate);
        element.addEventListener('mouseleave', this.deactivate);
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
        var mouseAbsPosition = new Vector(e.clientX, e.clientY),
            offset = this.center.offsetFromHere(mouseAbsPosition);
        var degrees = Math.radiansToDegrees(offset.angle);
        console.log(offset.length);
        console.log(offset.angle, degrees);
        this.element.style.transform = "rotate(" + degrees + "deg)";
    };
    var knobs = document.getElementsByClassName("dial");

    knobs.forEach(function(element, index) {
        new Knob(element);
    });
})();
