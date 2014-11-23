var TagManager = function() {
    // array of tags, matches note classes
    var t = {
        tags: [
            { name: "blue",     class: "tag-blue",      note_class: "note-blue"     },
            { name: "orange",   class: "tag-orange",    note_class: "note-orange"   },
            { name: "red",      class: "tag-red",       note_class: "note-red"      },
            { name: "green",    class: "tag-green",     note_class: "note-green"    },
            { name: "magenta",  class: "tag-magenta",   note_class: "note-magenta"  }
        ]
    };

    return {
        classForTag: function(tag) {
            for (var i=0; i<t.tags.length; i++)
                if (t.tags[i].name == tag)
                    return t.tags[i].note_class;

            return t.tags[0].note_class;
        },
        showTagPanel: function(parent, tagname) {
            var elems = [];

            var hlp = Util.createElement("span", null, "centered", "Select tag: ", parent);
            var tb = Util.createElement("table", null, "centered", null, parent);
            var tr = Util.createElement("tr", null, "", null, tb);

            tagname = (TagManager.tagExists(tagname))?tagname: t.tags[0].name;

            for (var i=0; i<t.tags.length; i++) {
                var selected = "";
                if (tagname == t.tags[i].name)
                    selected = "selected";

                var td = Util.createElement("td", null, "tag-container " + selected, null, tr);
                td.tag = t.tags[i];
                td.selected = false;
                elems.push(td);

                Util.addEventListener(td, "click", function() {
                    TagManager.selectTag(elems, this.tag.name);
                });

                Util.createElement("div", null, "tag" + " " + t.tags[i].class + " " + "centered", null, td);
            }

            return elems;
        },
        tagExists: function(tagname) {
            if (!tagname)
                return false;
            for (var i=0; i<t.tags.length; i++)
                if (tagname == t.tags[i].name)
                    return true;
            return false;
        },
        selectTag: function(elems, tagname) {
            if (!TagManager.tagExists(tagname))
                tagname = t.tags[0].name;

            for (var j=0; j<elems.length; j++) {
                Util.removeClass(elems[j],  "selected");
                elems[j].selected = false;
            }

            for (var j=0; j<elems.length; j++) {
                if (elems[j].tag.name == tagname) {
                    Util.addClass(elems[j], "selected");
                    elems[j].selected = true;
                }
            }
        },
        getSelectedTag: function(elems) {
            for (var j=0; j<elems.length; j++)
                if (elems[j].selected == true)
                    return elems[j].tag.name;

            return t.tags[0].name;
        }
    }
}();
