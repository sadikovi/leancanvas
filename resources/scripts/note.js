/*
 * Note object
 * Provides methods for representation in DOM and as JSON
 *
 */

var Note = function(noteId, text, tag, directory, content) {
    if (!noteId || !directory)
        throw ("Note arguments are not initialised properly");

    this.id = noteId;
    this.text = text;
    this.parent = directory;
    this.content = content;
    this.tag = tag;
    this.children = [];

    this.modify = function(text, tag) {
        this.text = text;
        this.tag = tag;
    }

    this.getText = function() {
        return this.text;
    }

    this.getTag = function() {
        return this.tag;
    }

    this.append = function(obj) {
        return;
    }

    this.setParent = function(directory) {
        this.parent = directory;
    }

    this.generateDOM = function() {
        var tagclass = TagManager.classForTag(this.tag);
        var note = Util.createElement("div", this.id, "note " + tagclass +" hAlignLeft hMargined_normal vMargined_normal", null, null);

        // build note menu
        var noteMenu = Util.createElement("div", null, "", null, note);
        var nmt = Util.createElement("table", null, "gTable", null, noteMenu);
        var nmtr = Util.createElement("tr", null, "", null, nmt);
        var nmtdl = Util.createElement("td", null, "hAlignLeft", null, nmtr);
        var nmtdr = Util.createElement("td", null, "hAlignRight", null, nmtr);
        // do it manually without ContentManager
        // because we have to pass "this" object

        // left part of the menu
        var dragButton = null;
        for (var i=0; i<this.content.buttons.left.length; i++) {
            var c = this.content.buttons.left[i];
            if (c.type == "button") {
                var hnd = c.handler;
                var tm = Util.createButton(c.id, c.isMini, c.class, c.text, nmtdl, ((hnd)?hnd.bind({this:this}):null), c.img);
                if (Util.hasClass(tm, "isDraggable"))
                    dragButton = tm;
            }
        }

        // right part of the menu
        for (var i=0; i<this.content.buttons.right.length; i++) {
            var c = this.content.buttons.right[i];
            if (c.type == "button") {
                var hnd = c.handler;
                Util.createButton(c.id, c.isMini, c.class, c.text, nmtdr, ((hnd)?hnd.bind({this:this}):null), c.img);
            }
        }

        // build note text
        var noteText = Util.createElement("div", null, "hMargined_normal", null, note);
        var tspan = Util.createElement("p", null, "", Util.htmlspecialchars(this.getText(), null, null, false), noteText);


        // for drag'n'drop
        if (dragButton) {
            dragButton.note = note;
            note.obj = this;
            note.parentObj = this.parent;
            Dragflix.makeDraggable(dragButton, note);
        }

        return note;
    }

    this.generateJSON = function() {
        var res = "{ \"type\" : \"note\", \"id\" : \"" + this.id + "\", \"tag\" : \"" + this.tag
        + "\", \"text\" : \"" + Util.replaceJSONSpecialChars(this.getText()) + "\", \"children\" : [] }";
        return res;
    }
}
