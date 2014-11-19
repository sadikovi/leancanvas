/*
 * Directory object
 * Provides methods for generating DOM and as JSON
 *
 */

var Directory = function(id, name, parent, content) {
    if (!id || !name || !parent)
        throw ("directory arguments are not initialised properly");

    this.id = id;
    this.name = name;
    this.children = [];
    this.parent = parent;
    this.content = content;
    this.placeholder = ""; // shown when there is no notes

    this.setPlaceholder = function(text) {
        this.placeholder = text;
    }

    this.append = function(note) {
        if (!note || !note.id)
            throw ("note is undefined");
        this.children[this.children.length] = note;
    }

    this.remove = function(id) {
        for (i=0; i<this.children.length; i++)
            if (this.children[i].id === id) {
                this.children.splice(i, 1);
                return;
            }
    }

    this.exists = function(id) {
        if (id && this.getNote(id) != null)
            return true;
        else
            return false;
    }

    this.getNote = function(id) {
        for (i=0; i<this.children.length; i++)
            if (this.children[i].id === id)
                return this.children[i];

        return null;
    }

    this.generateDOM = function() {
        var d = Util.createElement("div", this.id, "directory hMargined_small vMargined_small", null, null);
        var dm = Util.createElement("div", null, "directory menu", null, d);

        var ta = Util.createElement("table", null, "gTable", null, dm);
        var tr = Util.createElement("tr", null, "", null, ta);
        var tdl = Util.createElement("td", null, "hAlignLeft", null, tr);
        var tdr = Util.createElement("td", null, "hAlignRight", null, tr);

        var txt = Util.createElement("span", null, "hMargined_small", this.name, tdl);
        if  (this.content) {
            // do it manually without ContentManager
            // because we have to pass "this" object
            for (var i=0; i<this.content.buttons.length; i++) {
                var c = this.content.buttons[i];
                if (c.type == "button") {
                    var hnd = c.handler; var pa = this;
                    Util.createButton(c.id, c.isMini, c.class, c.text, tdr, ((hnd)?hnd.bind({this:this}):null), c.img);
                }
            }
        }

        var dc = Util.createElement("div", null, "directory content", null, d);
        var ctb = Util.createElement("table", null, "gTable", null, dc);

        if (this.children.length > 0) {
            for (var k=0; k<this.children.length; k++) {
                var tr = Util.createElement("tr", null, "", null, ctb);
                var td = Util.createElement("td", null, "", null, tr);

                var n = this.children[k].generateDOM();
                td.appendChild(n);
            }
        } else {
            var tr = Util.createElement("tr", null, "", null, ctb);
            var td = Util.createElement("td", null, "", null, tr);
            var p = Util.createElement("p", null, "placeholder hAlignLeft hMargined_large", this.placeholder, td);
        }

        return d;
    }

    this.generateJSON = function() {
        var res = "{ \"type\" : \"directory\", \"id\" : \"" + this.id
            + "\", \"name\" : \"" + Util.replaceJSONSpecialChars(this.name)
            + "\", \"placeholder\" : \"" + Util.replaceJSONSpecialChars(this.placeholder)
            + "\", \"children\" : "
            + "[ ";

        var a = [];
        for (var i=0; i<this.children.length; i++) {
            var n = this.children[i];
            a.push(n.generateJSON());
        }

        return res + a.join(", ") + " ] }";
    }
}
