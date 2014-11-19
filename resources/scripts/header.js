var Header = function() {
    var parent, changer, controls;

    return {
        display: function(elem, content) {
            if (!elem)
                throw ("Parent is not specified");

            if (!content)
                throw ("Content is not specified");
            parent = elem;
            var table = Util.createElement("table", parent.id+"&htable", "gTable", null, parent);
            var tr = Util.createElement("tr", null, "", null, table);
            changer = Util.createElement("td", null, "hAlignLeft", null, tr);
            controls = Util.createElement("td", null, "hAlignRight", null, tr);

            // load title
            ContentManager.loadContentArray(changer, content.title);
            // load buttons
            ContentManager.loadContentArray(controls, content.buttons);
        }
    }
}();
