// build search bar and track changes with elements
var Search = Search || (function() {
    var groups = {};

    return {
        initializeSelected: function(group, default_value) {
            groups[group] = default_value;
        },

        setSelectedValue: function(group, value) {
            if (!groups.hasOwnProperty(group)) {
                throw ("Search - Group does not exist");
            }

            groups[group] = value;
        },

        getSelectedValue: function(group) {
            if (!groups.hasOwnProperty(group)) {
                throw ("Search - Group does not exist");
            }
            return groups[group];
        },

        getCore: function() {
            return groups;
        },

        buildDropdown: function(group, values, default_value) {
            if (!group || !values || !values.length) {
                throw ("Search - parameters are undefined");
            }

            default_value = (!default_value)?values[0]:default_value;
            Search.initializeSelected(group, default_value);

            var list = Util.createElement("li", null, "dropdown", null, null);
            var a = Util.createElement("a", null, "dropdown-toggle", group+" "+"("+default_value+")"+" ", list);
            Util.createElement("span", null, "caret", null, a);
            a.setAttribute("href", "javascript:void();");
            a.setAttribute("data-toggle", "dropdown");
            a.setAttribute("role", "button");
            a.setAttribute("aria-expanded", "false");
            var ul = Util.createElement("ul", null, "dropdown-menu", null, list);
            ul.setAttribute("role", "menu");

            for (var i=0; i<values.length; i++) {
                var li = Util.createElement("li", null, "", null, ul);
                var lia = Util.createElement("a", null, "", values[i], li);
                lia.setAttribute("href", "javascript:void(0);");
                lia.value = values[i];
                Util.addEventListener(lia, "click", function(e) {
                    Search.setSelectedValue(group, this.value);
                    /*** TODO Change that!!! ***/
                    a.innerHTML = group+" ("+this.value+") ";
                    Util.createElement("span", null, "caret", null, a);
                });
            }

            return list;
        },

        buildInput: function(group, placeholder, default_value) {
            if (!group) {
                throw ("Search - parameters are undefined");
            }

            default_value = (!default_value)?"":default_value;
            Search.initializeSelected(group, default_value);

            var u = Util.createElement("input", null, "form-control", null, null);
            u.setAttribute("name", "price");
            u.setAttribute("type", "text");
            u.setAttribute("value", default_value);
            if (placeholder) {
                u.setAttribute("placeholder", placeholder);
            }

            Util.addEventListener(u, "keyup", function(e) {
                Search.setSelectedValue(group, this.value);
            });

            return u;
        },

        buildSubmenuDropdown: function(group, values, recurParam) {
            if (!group || !values || !values.length || !recurParam) {
                throw ("Search - parameters are undefined");
            }

            // assume that value is an object with required fields "id" and "name"
            default_value = values[0].name
            Search.initializeSelected(group, values[0].id);

            var list = Util.createElement("li", null, "dropdown", null, null);
            var a = Util.createElement("a", null, "dropdown-toggle", group+" "+"("+default_value+")"+" ", list);
            Util.createElement("span", null, "caret", null, a);
            a.setAttribute("href", "javascript:void(0);");
            a.setAttribute("data-toggle", "dropdown");
            a.setAttribute("role", "button");
            a.setAttribute("aria-expanded", "false");
            Search.recurBuildDropdown(group, values, recurParam, list, a);
            return list;
        },

        recurBuildDropdown: function(group, values, recurParam, parent, global) {
            var ul = Util.createElement("ul", null, "dropdown-menu", null, parent);
            for (var i=0; i<values.length; i++) {
                var li = Util.createElement("li", null, "menu-item", null, ul);
                var lia = Util.createElement("a", null, "", values[i].name, li);
                lia.setAttribute("href", "javascript:void(0);");
                lia.value = values[i].id;
                lia.desc = values[i].name
                Util.addEventListener(lia, "click", function(e) {
                    Search.setSelectedValue(group, this.value);
                    global.innerHTML = group + " ("+this.desc+") ";
                    Util.createElement("span", null, "caret", null, global);
                });
                if (values[i][recurParam] && values[i][recurParam].length > 0) {
                    Util.addClass(li, "dropdown dropdown-submenu");
                    lia.setAttribute("data-toggle", "dropdown");
                    lia.setAttribute("role", "button");
                    lia.setAttribute("aria-expanded", "false");
                    Search.recurBuildDropdown(group, values[i][recurParam], recurParam, li, global);
                }
            }
        }
    }
})();

var SearchBar = SearchBar || (function() {
    return {
        buildSearchBar: function(elements, callback) {
            var a = Util.createElement("div", null, "collapse navbar-collapse", null, null);
            var ul = Util.createElement("ul", null, "nav navbar-nav", null, a);
            var form = Util.createElement("form", null, "navbar-form navbar-left", null, a);

            for (var i=0; i<elements.length; i++) {
                if (elements[i].type == "dropdown") {
                    var b = Search.buildDropdown(elements[i].group, elements[i].values);
                    ul.appendChild(b);
                } else if (elements[i].type == "dropdown_submenu") {
                    var c = Search.buildSubmenuDropdown(elements[i].group, elements[i].values, elements[i].recurParam);
                    ul.appendChild(c);
                } else if (elements[i].type == "input") {
                    var d = Search.buildInput(elements[i].group, elements[i].placeholder, elements[i].value);
                    form.appendChild(d);
                }
            }

            Util.createElement("span", null, "", "&nbsp;&nbsp;", form);
            var sub = Util.createElement("button", null, "btn btn-default pull-right", "Search", form);
            Util.addEventListener(sub, "click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (callback) {
                    callback.call(this);
                }
            });

            return a;
        }
    }
})();

var searchBarElements = [
    {group: "Bedrooms", type: "dropdown", values: ["Any", "1", "2", "3", "4", "5", "6+"]},
    {group: "Bathrooms", type: "dropdown", values: ["Any", "1", "2", "3+"]},
    {group: "Regions", type: "dropdown_submenu", values: data.targets, recurParam: "children"},
    {group: "Price", type: "input", value: data.default_value, placeholder: "Price/week"}
];
