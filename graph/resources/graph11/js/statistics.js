/**
 *
 * Collects statistics.
 * Value must be numeric only.
 *
 **/

var Statistics = Statistics || (function() {
    var a = {};

    return {
        getCore: function() {
            return a;
        },

        getStatisticsFor: function(group, title) {
            if (a[group] && a[group][title]) {
                return a[group][title]["value"];
            } else {
                return null;
            }
        },

        setStatistics: function(group, title, type, datatype) {
            if (!a[group]) {
                a[group] = {};
            }

            if (!a[group][title]) {
                a[group][title] = {};
                a[group][title]["type"] = type;
                a[group][title]["value"] = 0;
                a[group][title]["datatype"] = datatype;
            }
        },

        addStatistics: function(group, title, value) {
            Statistics.setStatistics(group, title, null);
            a[group][title]["value"] += value;
        },

        convertValue: function(value, datatype) {
            if (datatype == "price") {
                return "$"+value;
            }
            return value;
        },

        /* get html for statistics */
        htmlTile: function(group, title, type) {
            var value = Statistics.getStatisticsFor(group, title);
            var p = Util.createElement("div", null, "ga-statistics "+a[group][title]["type"], null, null);
            Util.createElement("div", null, "ga-value", Statistics.convertValue(value, a[group][title]["datatype"]), p);
            Util.createElement("div", null, "ga-title", title, p);
            return p;
        },

        htmlGroup: function(group) {
            var keys = Object.keys(a[group]);
            var p = Util.createElement("div", group, "ga-group", null, null);
            for (var i=0; i<keys.length; i++) {
                p.appendChild(Statistics.htmlTile(group, keys[i], null));
            }
            return p;
        },

        htmlCore: function() {
            var keys = Object.keys(a);
            var p = Util.createElement("div", null, "", null, null);
            for (var i=0; i<keys.length; i++) {
                p.appendChild(Statistics.htmlGroup(keys[i]));
            }
            return p;
        }
    }
})();
