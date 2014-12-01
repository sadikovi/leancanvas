var GraphBuilder = GraphBuilder || (function() {
    var prefix = "GraphBuilder: ";

    return {
        // simple linear search
        util_linear: function(a, id) {
            if (a && a.length) {
                for (var i=0; i<a.length; i++) {
                    if (a[i].id === id) {
                        return a[i];
                    }
                }
            }

            return null;
        },

        // helper function to get nodes for a particular level and parent
        // if parent is null then we return all the children for that level
        getChildrenForLevel: function(array, parent, level, arrayToCollect) {
            var a = (parent)?parent.children:array;

            level = (level && level >=0)?level:0;
            var children = arrayToCollect || [];

            for (var i=0; i<a.length; i++) {
                var el = a[i];
                if (el && el.level < level && el.leaf == false) {
                    GraphBuilder.getChildrenForLevel(el.children, el, level, children);
                } else if (el && el.level == level) {
                    children.push(el);
                }
            }

            return children;
        },

        // helper function to check whether node/its childre has got a particular id
        checkIdRecursively: function(node, id) {
            if (node && id > 0) {
                if (node.id == id) {
                    return true;
                } else if (node.leaf == false) {
                    var yep = false;
                    for (var i=0; i<node.children.length; i++) {
                        yep = yep || GraphBuilder.checkIdRecursively(node.children[i], id);
                    }

                    return yep;
                }
            }

            return false;
        },

        // 0. Start with this function for the first time
        // build graph function
        buildGraph: function(sources, targets, level) {
            // fool check
            if (!sources || !targets) {
                throw (prefix + "buildGraph - parameters are undefined");
            }

            // prepare level
            level = (level && level >= 0)?level:0;

            // prepare array of nodes
            var nodes = [];
            // ... and edges
            var edges = [];

            // 1. add all sources into nodes
            for (var i=0; i<sources.length; i++) {
                nodes.push(sources[i]);
            }

            // 2. find targets for a particular level
            var relTargets = GraphBuilder.getChildrenForLevel(targets, null, 0, null);
            // 2a. build links as well
            for (var i=0; i<nodes.length; i++) {
                var node = nodes[i];
                for (var j=0; j<relTargets.length; j++) {
                    var relt = relTargets[j];
                    // find out whether relt has got children with node.target's id
                    var ifHas = GraphBuilder.checkIdRecursively(relt, node.target);
                    if (ifHas) {
                        // create link and add target as node
                        var link = {"source": node, "target": relt};

                        /***************************/
                        /* test: add edge threshold and priority */
                        var edge_data = GraphBuilder.calculateEdgePriority(node.value, relt.maxValue);
                        link.edge_threshold = edge_data.edge_threshold;
                        link.edge_group = edge_data.edge_group;
                        /***************************/

                        edges.push(link);
                    }
                }
            }
            // 2b. add targets into nodes
            for (var i=0; i<relTargets.length; i++) {
                nodes.push(relTargets[i]);
            }

            // drill down until we get to the level we need
            var result = {nodes: nodes, edges: edges};
            for (var i=1; i<=level; i++) {
                result = GraphBuilder.drilldown(GraphBuilder.getChildrenForLevel(targets, null, i-1, null)[0], result.nodes, result.edges);
            }

            // 3. return result
            return result;
        },

        drilldown: function(node, nodes, edges) {
            // simple parameters check
            if (!node || !nodes || !edges) {
                throw (prefix+"drilldown - " + "parameters are undefined");
            }

            // check whether node is leaf
            // if it is then do not bother with browsing through its children
            if (!node.leaf && node.children.length > 0) {
                // make node to be expanded
                node.isCollapsed = false;

                var connectedBefore = [];
                var newEdges = [];
                for (var i=0; i<edges.length; i++) {
                    if ((edges[i].target.id != node.parent && edges[i].source.id != node.parent)
                        && (edges[i].target == node || edges[i].source == node)) {
                        var aim = (edges[i].target == node)?edges[i].source:edges[i].target;
                        // add to connected before
                        connectedBefore.push(aim);
                    } else {
                        // add only edges that do not connected to related nodes
                        newEdges.push(edges[i]);
                    }
                }
                edges = newEdges;

                // get children of the node
                var nodesToAdd = node.children;
                // build new edges from parent to children
                for (var i=0; i<nodesToAdd.length; i++) {
                    var edge = {"source" :node, "target": nodesToAdd[i]};
                    // add edge
                    edges.push(edge);
                    // add node
                    nodes.push(nodesToAdd[i]);
                }
                // now build links with connectedBefore

                for (var i=0; i<connectedBefore.length; i++) {
                    var node = connectedBefore[i];
                    for (var j=0; j<nodesToAdd.length; j++) {
                        var cnode = nodesToAdd[j];
                        // find out whether cnode has got children with node.target's id
                        var ifHas = GraphBuilder.checkIdRecursively(cnode, node.target);
                        if (ifHas) {
                            // create link and add target as node
                            var edge = {"source": node, "target": cnode};

                            /***************************/
                            /* test: add edge threshold and priority */
                            var edge_data = GraphBuilder.calculateEdgePriority(node.value, cnode.maxValue);
                            edge.edge_threshold = edge_data.edge_threshold;
                            edge.edge_group = edge_data.edge_group;
                            /***************************/

                            edges.push(edge);
                        }
                    }
                }
            }

            // return result of modified nodes and edges
            return {nodes: nodes, edges: edges};
        },

        rollup: function(node, nodes, edges) {
            // simple parameters check
            if (!node || !nodes || !edges) {
                throw (prefix+"rollup - " + "parameters are undefined");
            }

            node.isCollapsed = true;
            // rollup children of the node
            for (var i=0; i<node.children.length; i++) {
                var child = node.children[i];
                if (!child.isCollapsed && !child.leaf) {
                    var res = GraphBuilder.rollup(child, nodes, edges);
                    nodes = res.nodes;
                    edges = res.edges;
                }
            }

            // go again through children
            for (var i=0; i<node.children.length; i++) {
                var child = node.children[i];
                var newEdges = [];
                // remove edges that connected child with parent
                for (var j=0; j<edges.length; j++) {
                    if (edges[j].source === child || edges[j].target === child) {
                        if (edges[j].source == node || edges[j].target == node) {
                            continue;
                        }
                    }
                    newEdges.push(edges[j]);
                }
                edges = newEdges;

                // remove and collect nodes connected before
                var connectedBefore = [];
                var newEdges = [];
                for (var j=0; j<edges.length; j++) {
                    if (edges[j].source == child || edges[j].target == child) {
                        var cnode = (edges[j].source == child)?edges[j].target:edges[j].source;
                        connectedBefore.push(cnode);
                    } else {
                        newEdges.push(edges[j]);
                    }
                }
                edges = newEdges;

                // connect nodes with parent
                for (var k=0; k<connectedBefore.length; k++) {
                    var edge = {"source": connectedBefore[k], "target": node};

                    /***************************/
                    /* test: add edge threshold and priority */
                    var edge_data = GraphBuilder.calculateEdgePriority(connectedBefore[k].value, node.maxValue);
                    edge.edge_threshold = edge_data.edge_threshold;
                    edge.edge_group = edge_data.edge_group;
                    /***************************/

                    edges.push(edge);
                }

                // delete child node from nodes
                var newNodes = [];
                for (var l=0; l<nodes.length; l++) {
                    if (nodes[l] != child) {
                        newNodes.push(nodes[l]);
                    }
                }
                nodes = newNodes;
            }

            // return result of modified nodes and edges
            return {nodes: nodes, edges: edges};
        },

        // function to calculate edge threshold and group
        calculateEdgePriority: function(value, maxValue) {
            var a = ((maxValue-value) / maxValue) * 100;
            if (a >= 60) {
                // priority high
                return { edge_group: "priority-high", edge_threshold: 11 + Math.floor(Math.sqrt(a-60))};
            } else if (a >= 50) {
                // priority one
                return { edge_group: "priority-one", edge_threshold: 9 + Math.floor(Math.sqrt(a-50))};
            } else if (a >= 30) {
                // priority two
                return { edge_group: "priority-two", edge_threshold: 7 + Math.floor(Math.sqrt(a-30))};
            } else if (a >= 20) {
                // priority three
                return { edge_group: "priority-three", edge_threshold: 5 + Math.floor(Math.sqrt(a-20))};
            } else if (a >= 10) {
                // priority four
                return { edge_group: "priority-one", edge_threshold: 3 + Math.floor(Math.sqrt(a-10))};
            } else {
                // priority normal
                return { edge_group: "priority-normal", edge_threshold: 1 + ((a>0)?Math.floor(Math.sqrt(a)):0)};
            }
        },

        // function to find max value
        findMaxValue: function(group) {
            if (group && group.length && group.length > 0) {
                var max = group[0].value;
                for (var i=1; i<group.length; i++) {
                    if (max < group[i].value) {
                        max = group[i].value;
                    }
                }

                return max;
            }
        },

        // global precalculation of max value
        precalculateMaxValue: function(sources, targets) {
            // check
            if (!sources || !targets) {
                throw (prefix + "precalculateMaxValue - parameters are undefined");
            }

            var max_t = null;
            for (var i=0; i<targets.length; i++) {
                if (!targets[i].leaf && targets[i].children) {
                    targets[i].maxValue = GraphBuilder.precalculateMaxValue(sources, targets[i].children);
                } else if (targets[i].leaf) {
                    var max = null;
                    for (var j=0; j<sources.length; j++) {
                        if (sources[j].target == targets[i].id) {
                            if (!max || max < sources[j].value) {
                                max = sources[j].value;
                            }
                        }
                    }
                    targets[i].maxValue = max;
                }

                if (!max_t || max_t < targets[i].maxValue) {
                    max_t = targets[i].maxValue;
                }
            }

            return max_t;
        }
    }
})();
