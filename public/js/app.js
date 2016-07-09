/**
 * Created by ben on 7/8/16.
 */

(function() {

    NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

    Knob.prototype.deactivate = function(e) {
        this.active = false;
        console.log('deactivated');
    };

    Knob.prototype.activate = function(e) {
        this.active = true;
        console.log('activated');
    };

    Knob.prototype.drag = function(e) {
        var x = e.clientX,
            y = e.clientY;

        console.log("X: " + x + ", Y: " + y);
    };

    function Knob (element) {
        this.element = element;
        this.activated = false;

        element.addEventListener("mousemove", this.drag);
        element.addEventListener('mousedown', this.activate);
        element.addEventListener('mouseup', this.deactivate);
        element.addEventListener('mouseleave', this.deactivate);
    }

    var knobs = document.getElementsByClassName("dial");

    knobs.forEach(function(element, index) {
        new Knob(element);
    });
})();
