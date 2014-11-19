/*
 * Content manager provides API to load content
 * Content is a json object with special attributes
 * Each content object has a number of properties
 *      Button: type, isMini, class, text, handler, img
 *      MButton: type, isMini, class, text, content
 *      Link: type, class, text, url, target
 *      Input: type, class, placeholder, parent
 *      Text: type, class, text
 *      Image: type, class, src
 *      Domain
 *      Column
 *      Directory
 *      Note
 *
 */

var ContentManager = function() {
    var pageLayout = { data : []};
    return {
        getPageLayout: function() {
            return pageLayout;
        },
        append: function(obj) {
            pageLayout.data.push(obj);
        },
        generateDOM: function() {
            var div = Util.createElement("div", null, "", null, null);
            for (var i=0; i<pageLayout.data.length; i++) {
                var n = pageLayout.data[i];
                div.appendChild(n.generateDOM());
            }

            return div;
        },
        generateJSON: function() {
            var json = "{ \"data\" : [ ";
            var a = [];
            for (var i=0; i<pageLayout.data.length; i++) {
                var n = pageLayout.data[i];
                a.push(n.generateJSON());
            }

            return json + a.join(", ") + "] }";
        },
        createContentObject: function(c, parent) {
            if (c.type == "button") {
                return Util.createButton(c.id, c.isMini, c.class, c.text, parent, c.handler, c.img);
            } else if (c.type == "mbutton") {
                return Util.createModalButton(c.id, c.isMini, c.class, c.text, parent, c.content);
            } else if (c.type == "input") {
                return Util.createTextfield(c.id, c.class, c.placeholder, parent);
            } else if (c.type == "link") {
                return Util.createLink(c.id, c.class, c.text, c.url, c.target, parent);
            } else if (c.type == "text") {
                return Util.createElement("span", c.id, c.class, c.text, parent);
            } else if (c.type == "image") {
                return Util.createImage(c.id, c.class, c.src, c.title, parent);
            } else if (c.type == "note") {
                var t = new Note(c.id, c.text, parent, CONTENT_LAYOUT.note());
                parent.append(t);
                return t;
            } else if (c.type == "directory") {
                var d = new Directory(c.id, c.name, parent, CONTENT_LAYOUT.directory());
                d.setPlaceholder(c.placeholder);
                parent.append(d);
                return d;
            } else if (c.type == "column") {
                var cl = new Column(c.id, parent);
                parent.append(cl);
                return cl;
            } else if (c.type == "domain") {
                var dm = new Domain(c.id, parent);
                parent.append(dm);
                return dm;
            } else {
                return null;
            }
        },
        loadContentArray: function(parent, array) {
            if (!parent)
                throw ("Content: Parent is not specified");

            if (!array || Util.isArray(array) == false)
                throw ("Content array is undefined or invalid");

            for (var i=0; i<array.length; i++) {
                var c = array[i];
                ContentManager.createContentObject(c, parent);
            }
        },
        loadPageLayout: function(parent, content) {
            if (!parent || !content || Util.isArray(content) == false)
                return;

            for (var i=0; i<content.length; i++) {
                var c = content[i];
                var p = ContentManager.createContentObject(c, parent);
                ContentManager.loadPageLayout(p, c.children);
            }
        },
        buildPageLayout: function(content) {
            pageLayout = { data : []};
            ContentManager.loadPageLayout(ContentManager, content);
        }
    }
}();
