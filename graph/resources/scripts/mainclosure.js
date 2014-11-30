var MainClosure = function() {
    return {
        exists: function(c, l) {
            for (var j=0; j<c.length; j++) {
                if (c[j].target && c[j].target == l.target) {
                    return j;
                }
            }

            return -1;
        },

        calculateConnections: function(links) {
            var c = [];
            for (var i=0; i<links.length; i++) {
                var l = links[i];
                var j = MainClosure.exists(c, l);
                if (j >=0) {
                    c[j].data.push(l);
                } else {
                    c.push({target:l.target, data: [l]});
                }
            }

            // apply group parsing
            var newLinks = [];
            var newPorts = [];
            for (var k=0; k<c.length; k++) {
                var s = GroupClosure.calculateGroup(c[k].data);
                newLinks = newLinks.concat(s);
                newPorts.push({target: c[k].target, connections: c[k].data.length});
            }

            return {links: newLinks, ports: newPorts};
        },

        modifyNodes: function(nodes, connections) {
            if (!nodes || !connections)  {
                throw ("nodes or connections are undefined");
            }

            for (var i=0; i<nodes.length; i++) {
                var node = nodes[i];
                for (var j=0; j<connections.ports.length; j++) {
                    var port = connections.ports[j];
                    if (port.target === node.id) {
                        node.radius += Math.pow(port.connections, 1);
                        break;
                    }
                }
            }

            return nodes;
        },

        nameForId: function(id, nodes) {
            if (!nodes)
                throw ("MainClosure: nodes is undefined");

            for (var i=0; i<nodes.length; i++) {
                if (nodes[i].id == id)
                    return nodes[i].name;
            }

            return null;
        }
    }
}();
