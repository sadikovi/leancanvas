function clearDrop(target) {
    DragUtil.hideDraggable();
    Util.removeClass(target, "target-empty");
    Util.removeClass(document.body, "noselect");
}

function changeDirectory(note, dir, targetDir, targetNote) {
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
            targetDir.shift(note, pos);
        } else {
            dir.remove(note.id);
            note.setParent(targetDir);
            pos = targetDir.getNotePosition(targetNote.id);
            targetDir.appendAtPos(note, pos);
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
    function(drag) {
        Util.addClass(drag, "draggable");
        Util.addClass(document.body, "noselect");
    }
);

Dragflix.setDrop(
    /* onDropAboveTarget */
    function(drag, target) {
        clearDrop(target);
        changeDirectory(drag.original.obj, drag.original.parentObj, target.parentObj, target.obj);
    },
    /* onDropMissed */
    function(drag, target) {
        clearDrop(target);
    }
);

Dragflix.setMoveOver(
    /* onTargetAbove */
    function(target) {
        Util.addClass(target, "target-empty");
    },
    /* onTargetLeave */
    function(target) {
        Util.removeClass(target, "target-empty");
    }
);
