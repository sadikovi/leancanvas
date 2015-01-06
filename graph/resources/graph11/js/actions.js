var Actions = (function() {
    var actions = [
        {
            "id":"drilldown",
            "name": "Drill down",
            "action": null
        },
        {
            "id":"rollup",
            "name": "Roll up",
            "action": null
        },
        {
            "id":"zoomin",
            "name": "Zoom in",
            "action": null
        },
        {
            "id":"zoomout",
            "name": "Zoom out",
            "action": null
        }
    ];

    return {
        showActions: function(selected, actions, parent) {
            if (!parent) {
                throw ("Actions: Parent is undefined");
            }
            if (!actions) {
                throw ("Actions: actions are undefined");
            }
            if (!selected) {
                throw ("Actions: Selected is undefined");
            }
            Actions.hideActions(parent);
            Util.createElement("span", null, "ga-action text-muted", selected.name, parent);
            for (var i=0; i<actions.length; i++) {
                var a = Util.createElement("span", null, "ga-action text-muted", null, parent);
                a.action = actions[i].action;
                var b = Util.createElement("a", null, "", actions[i].name, a);
                b.href = "javascript:void(null);";
                Util.addEventListener(a, "click", function(e) {
                    if (this.action) {
                        this.action.call(this);
                    }
                });
            }
        },
        hideActions: function(parent) {
            if (!parent) {
                throw ("Actions: Parent is undefined");
            }
            parent.innerHTML = "";
        }
    }
})();
