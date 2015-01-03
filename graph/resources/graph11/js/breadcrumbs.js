var Breadcrumbs = (function() {
    var id = "breadcrumbs-core-62345", core = null;
    return {
        updateBreadcrumbs: function(parent, breadcrumbs, callback) {
            Breadcrumbs.clear();
            core = Util.createElement("ol", id, "breadcrumb", null, parent);
            core.parent = parent;
            for (var i=0; i<breadcrumbs.length; i++) {
                var name = (breadcrumbs[i].name)?breadcrumbs[i].name:i+"";
                if (i == breadcrumbs.length-1) {
                    var b = Util.createElement("li", null, "active", name, core);
                } else {
                    var b = Util.createElement("li", null, "", null, core);
                    var c = Util.createElement("a", null, "", name, b);
                    c.href = "javascript:void(null);";
                    c.step = i;
                    Util.addEventListener(c, "click", function(e) {
                        if (callback) {
                            callback.call(this, this, this.step);
                        }
                    });
                }
            }
        },

        clear: function() {
            if (core && core.parent && core.parent.hasChildNodes(core)) {
                console.log(core);
                console.log(core.parent);
                core.parent.removeChild(core);
            }

            return false;
        }
    }
})();
