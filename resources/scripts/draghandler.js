function clearDrop(item, target) {
    item.style.width = "";
    item.style.height = "";
    item.style.top = "";
    item.style.left = "";

    Util.removeClass(item, "draggable");
    Util.removeClass(target, "target-above");
    Util.removeClass(target, "target-below");
    Util.removeClass(document.body, "noselect");
}

function changeDirectory(note, dir, targetDir, targetNote, isAbove) {
    if (!note || !dir || !targetDir) {
        return;
    }

    if (targetNote == null) {
        dir.remove(note.id);
        note.setParent(targetDir);
        targetDir.append(note);
    } else {
        if (targetDir == dir) {
            pos = targetDir.getNotePosition(targetNote.id);
            if (isAbove)
                targetDir.shift(note, pos);
            else
                targetDir.shift(note, pos+1);
        } else {
            dir.remove(note.id);
            note.setParent(targetDir);
            pos = targetDir.getNotePosition(targetNote.id);
            if (isAbove)
                targetDir.appendAtPos(note, pos);
            else
                targetDir.appendAtPos(note, pos+1);
        }
    }
}

Dragflix.setActionEnded(
    function() {
        updateDOM();
    }
);

Dragflix.setDrag(
    /* onDrag */
    function(item) {
        item.style.width = (item.clientWidth) + "px";
        item.style.height = (item.clientHeight) + "px";
        Util.addClass(item, "draggable");
        Util.addClass(document.body, "noselect");

        Dragflix.removeDropTarget(item);
    }
);

Dragflix.setDrop(
    /* onDropAboveTarget */
    function(item, target) {
        clearDrop(item, target);
        changeDirectory(item.obj, item.parentObj, target.parentObj, target.obj, true);
    },
    /* onDropBelowTarget */
    function(item, target) {
        clearDrop(item, target);
        changeDirectory(item.obj, item.parentObj, target.parentObj, target.obj, false);
    },
    /* onDropMissed */
    function(item, target) {
        clearDrop(item, target);
    }
);

Dragflix.setMoveOver(
    /* onTargetAbove */
    function(target) {
        if (target.obj) {
            Util.removeClass(target, "target-below");
            Util.addClass(target, "target-above");
        } else {
            Util.removeClass(target, "target-above");
            Util.addClass(target, "target-above");
        }
    },
    /* onTargetBelow */
    function(target) {
        if (target.obj) {
            Util.removeClass(target, "target-above");
            Util.addClass(target, "target-below");
        } else {
            Util.removeClass(target, "target-above");
            Util.addClass(target, "target-above");
        }
    },
    /* onTargetLeave */
    function(target) {
        Util.removeClass(target, "target-above");
        Util.removeClass(target, "target-below");
    }
);
