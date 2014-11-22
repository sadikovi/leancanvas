// util functions to measure coordinates
var DragUtil = function() {
    return {
        mouseCoords: function(e) {
            if(e.pageX || e.pageY) {
                return {
                    x : e.pageX,
                    y : e.pageY
                };
            } else {
                    return {
                        x : (ev.clientX + document.body.scrollLeft - document.body.clientLeft),
                        y : (ev.clientY + document.body.scrollTop  - document.body.clientTop)
                    };
            }
        },

        getPosition: function(e) {
            var left = 0;
            var top = 0;

            while (e.offsetParent) {
                left += e.offsetLeft;
                top += e.offsetTop;
                e = e.offsetParent;
            }

            left += e.offsetLeft;
            top  += e.offsetTop;

            return { x : left, y : top};
        },

        getMouseOffset: function(target, e) {
            e = e || window.event;
            var docPos = DragUtil.getPosition(target);
            var mousePos = DragUtil.mouseCoords(e);
            return { x : (mousePos.x - docPos.x), y : (mousePos.y - docPos.y) };
        }
    }
}();

var Dragflix = function() {
    var drag = null;
    var offset = null;
    var dropTargets = [];
    var ondrag = null, ondropabove = null, ondropbelow = null;
    var ontargetabove = null, ontargetbelow = null, ontargetleave = null;
    var onactionended = null;
    return {
        setActionEnded: function(onActionEnded) {
            onactionended = onActionEnded;
        },

        setDrag: function(onDrag) {
            ondrag = onDrag;
        },

        setDrop: function(onDropAboveTarget, onDropBelowTarget, onDropMissed) {
            ondropabove = onDropAboveTarget;
            ondropbelow = onDropBelowTarget;
            ondropmissed = onDropMissed;
        },

        setMoveOver: function(onTargetAbove, onTargetBelow, onTargetLeave) {
            ontargetabove = onTargetAbove;
            ontargetbelow = onTargetBelow;
            ontargetleave = onTargetLeave;
        },

        startup: function() {
            if (document.body) {
                Util.addEventListener(document.body, "mousemove", Dragflix.mouseMove);
                Util.addEventListener(document.body, "mouseup", Dragflix.mouseUp);
                return true;
            } else {
                return false;
            }
        },

        cleanup: function() {
            if (document.body) {
                Util.removeEventListener(document.body, "mousemove", Dragflix.mouseMove);
                Util.removeEventListener(document.body, "mouseup", Dragflix.mouseUp);
                return true;
            } else {
                return false;
            }
        },

        targetFound: function(mousePos, onTargetAbove, onTargetBelow, onTargetLeave) {
            for (var i=0; i<dropTargets.length; i++) {
                var target = dropTargets[i];
                var targPos = DragUtil.getPosition(target);
                var targWidth = parseInt(target.getBoundingClientRect().width);
                var targHeight = parseInt(target.getBoundingClientRect().height);

                // check if mouse in upper or lower half of target
                if (
                    (mousePos.x>targPos.x) && (mousePos.x<(targPos.x+targWidth/2)) &&
                    (mousePos.y>targPos.y) && (mousePos.y<(targPos.y+targHeight/2))) {
                    if (onTargetAbove)
                        onTargetAbove.call(this, target);
                } else if (
                    (mousePos.x>targPos.x) && (mousePos.x<(targPos.x+targWidth)) &&
                    (mousePos.y>targPos.y+targHeight/2) && (mousePos.y<(targPos.y+targHeight))) {
                        if (onTargetBelow)
                            onTargetBelow.call(this, target);
                } else {
                    if (onTargetLeave)
                        onTargetLeave.call(this, target);
                }
            }
        },

        mouseMove: function(e) {
            e = e || window.event;
            var mousePos = DragUtil.mouseCoords(e);

            if (drag) {
                drag.style.top = (mousePos.y - offset.y)+"px";
                drag.style.left = (mousePos.x - offset.x)+"px";
                Dragflix.targetFound(mousePos,
                    function(target) {
                        if (ontargetabove)
                            ontargetabove.call(this, target);
                    },
                    function(target) {
                        if (ontargetbelow)
                            ontargetbelow.call(this, target);
                    },
                    function(target) {
                        if (ontargetleave)
                            ontargetleave.call(this, target);
                    }
                );
            }

            e.preventDefault();
            e.stopPropagation();
            return false;
        },

        mouseUp: function(e) {
            e = e || window.event;
            var mousePos = DragUtil.mouseCoords(e);

            if (drag) {
                drag.style.top = (mousePos.y - offset.y)+"px";
                drag.style.left = (mousePos.x - offset.x)+"px";
                Dragflix.targetFound(mousePos,
                    function(target) {
                        if (ondropabove)
                            ondropabove.call(this, drag, target);
                    },
                    function(target) {
                        if (ondropbelow)
                            ondropbelow.call(this, drag, target);
                    },
                    function(target) {
                        if (ondropmissed)
                            ondropmissed.call(this, drag, target);
                    }
                );
            }

            drag = null;
            Dragflix.cleanup();

            // when action ended, call this function
            if (onactionended)
                onactionended.call(this);

            e.preventDefault();
            e.stopPropagation();

            return false;
        },

        // makes item draggable
        makeDraggable: function(firer, item) {
            if (!item || !firer)
                return;

            Util.addEventListener(firer, "mousedown", function(e) {
                if (e.button == 0) {
                    Dragflix.startup();
                    drag = item;
                    if (ondrag) {
                        ondrag.call(this, drag);
                    }
                    offset = DragUtil.getMouseOffset(drag, e);
                }

                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        },

        // adds drop target
        addDropTarget: function(dropTarget) {
            dropTargets.push(dropTarget);
        },

        // remove from targets
        removeDropTarget: function(dropTarget) {
            for (var i=0; i<dropTargets.length; i++)
                if (dropTargets[i] === dropTarget)
                    dropTargets.splice(i, 1);
        }
    }
}();
