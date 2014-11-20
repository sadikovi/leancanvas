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

    this.generateDOM = function() {
        var tagclass = TagManager.classForTag(this.tag);
        var note = Util.createElement("div", this.id, "note " + tagclass +" hAlignLeft hMargined_normal vMargined_normal", null, null);

        // build note menu
        var noteMenu = Util.createElement("div", null, "hAlignRight", null, note);
        // do it manually without ContentManager
        // because we have to pass "this" object
        for (var i=0; i<this.content.buttons.length; i++) {
            var c = this.content.buttons[i];
            if (c.type == "button") {
                var hnd = c.handler;
                Util.createButton(c.id, c.isMini, c.class, c.text, noteMenu, ((hnd)?hnd.bind({this:this}):null), c.img);
            }
        }

        // build note text
        var noteText = Util.createElement("div", null, "hMargined_normal", null, note);
        var tspan = Util.createElement("p", null, "", Util.htmlspecialchars(this.getText(), null, null, false), noteText);

        return note;
    }

    this.generateJSON = function() {
        console.log("raw text: " + this.getText());
        console.log("json text: " + Util.replaceJSONSpecialChars(this.getText()));
        var res = "{ \"type\" : \"note\", \"id\" : \"" + this.id + "\", \"tag\" : \"" + this.tag
        + "\", \"text\" : \"" + Util.replaceJSONSpecialChars(this.getText()) + "\", \"children\" : [] }";

        console.log("full json: " + res);
        return res;
    }
}
