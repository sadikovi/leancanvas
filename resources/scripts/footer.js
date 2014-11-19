var Footer = function() {
    var parent, left, right;

    return {
        display: function(elem, content) {
            if (!elem)
                throw ("Parent is not specified");

            if (!content)
                throw ("Content is not specified");

            parent = elem;
            var table = Util.createElement("table", parent.id+"&htable", "gTable", null, parent);
            var tr = Util.createElement("tr", null, "", null, table);
            left = Util.createElement("td", null, "hAlignLeft", null, tr);
            right = Util.createElement("td", null, "hAlignRight", null, tr);

            // load left side
            ContentManager.loadContentArray(left, content.left);
            // load right side
            ContentManager.loadContentArray(right, content.right);
        }
    }
}();
