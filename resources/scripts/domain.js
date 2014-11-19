/*
 * Domain object
 * Provides methods for generating DOM and as JSON
 *
 */

var Domain = function(id, parent) {
    if (!id || !parent)
        throw ("Id or parent are undefined");

    this.id = id;
    this.parent = parent;
    this.isActive = true;
    this.children = [];

    this.append = function(column) {
        if (!column || !column.id)
            throw ("column is undefined");
        this.children[this.children.length] = column;
    }

    this.remove = function(id) {
        for (i=0; i<this.children.length; i++)
            if (this.children[i].id === id) {
                this.children.splice(i, 1);
                return;
            }
    }

    this.exists = function(id) {
        if (id && this.getColumn(id) != null)
            return true;
        else
            return false;
    }

    this.getColumn = function(id) {
        for (i=0; i<this.children.length; i++)
            if (this.children[i].id === id)
                return this.children[i];
        return null;
    }

    this.generateDOM = function() {
        var main = Util.createElement("table", null, "gTable", null, null);
        var tr = Util.createElement("tr", null, "", null, main);

        for (var i=0; i<this.children.length; i++) {
            var td = Util.createElement("td", null, "domain content", null, tr);
            // hack to line them up horizontally
            td.style.width = (100.0/this.children.length) + "%";
            var span = Util.createElement("span", null, "", null, td);

            var n = this.children[i];
            span.appendChild(n.generateDOM());
        }

        return main;
    }

    this.generateJSON = function() {
        var res = "{ \"type\" : \"domain\", \"id\" : \"" + this.id
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
