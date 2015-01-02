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
                var a = Util.createElement("a", null, "ga-action", actions[i].name, parent);
                a.href = "javascript:void(null);";
                a.action = actions[i].action;
                Util.addEventListener(a, "click", function(e) {
                    if (this.action) {
                        this.action.call();
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
