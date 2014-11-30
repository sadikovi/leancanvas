// help with all select actions

var Selector = Selector || function() {
    var isOn = false;
    var selected = [];
    return {
        turnOn: function(on) {
            isOn = on;
            if (!isOn) {
                selected = [];
            }
        },
        makeActive: function(node, setActive) {
            if (!node) {
                throw ("Selector: node is undefined");
            }

            if (!isOn)
                return;

            var className = node.getAttribute('class');
            if (setActive) {
                var a = className.split(" ");
                var ex = false;
                for (var i=0; i<a.length; i++) {
                    if (a[i] == "selected") {
                        ex = true;
                    }
                }

                if (!ex) {
                    className += " selected";
                }
                node.setAttribute('class', className);
            } else {
                var a = className.split(" ");
                var b = [];
                for (var i=0; i<a.length; i++) {
                    if (a[i] != "selected")
                        b.push(a[i]);
                }

                node.setAttribute('class', b.join(" "));
            }

        },
        selectNode: function(d, node) {
            if (!node || !d)
                throw ("Selector: Node or object is undefined");

            if (!isOn)
                return;

            if (node.active && node.active == true) {
                // select as inactive
                node.active = false;
                Selector.makeActive(node, false);
                for (var i=0; i<selected.length; i++) {
                    if (selected[i] === d) {
                        selected.splice(i, 1);
                        break;
                    }
                }

                return false;
            } else {
                // select as active
                node.active = true;
                Selector.makeActive(node, true);
                selected.push(d);

                return true;
            }
        },
        getSelected: function() {
            return selected;
        },
        getSelectedSources: function() {
            var res = [];
            for (var i=0; i<selected.length; i++) {
                if (selected[i].type == "source") {
                    res.push(selected[i]);
                }
            }
            return res;
        },
        getStatus: function() {
            return isOn;
        }
    }
}();
