/*
 * Column object
 * Provides methods for representation in DOM and as JSON
 *
 */

var Column = function(id, parent) {
    if (!id || !parent)
        throw ("column arguments are not defined");

    this.id = id;
    this.parent = parent;
    this.children = [];

    this.append = function(directory) {
        if (!directory || !directory.id)
            throw ("directory is undefined");
        this.children[this.children.length] = directory;
    }

    this.remove = function(id) {
        for (i=0; i<this.children.length; i++)
            if (this.children[i] === id) {
                this.children.splice(i, 1);
                return;
            }
    }

    this.exists = function(id) {
        if (id && this.getDirectory(id) != null)
            return true;
        else
            return false;
    }

    this.getDirectory = function(id) {
        for (i=0; i<this.children.length; i++)
            if (this.children[i].id === id)
                return this.children[i];
        return null;
    }

    this.generateDOM = function() {
        var main = Util.createElement("table", null, "gTable column vMargined_small", null, null);

        for (var j=0; j<this.children.length; j++) {
            var tr = Util.createElement("tr", null, "", null, main);
            var td = Util.createElement("td", null, "column-content hAlignCenter", null, tr);

            var n = this.children[j];
            td.appendChild(n.generateDOM());
        }

        return main;
    }

    this.generateJSON = function() {
        var res = "{ \"type\" : \"column\", \"id\" : \"" + this.id
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
