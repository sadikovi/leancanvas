var GraphBuilder = GraphBuilder || (function() {
    var prefix = "GraphBuilder: ";
    var rValue = 0;

    var P_GREEN = "alert-green";
    var P_YELLOW = "alert-yellow";
    var P_RED = "alert-red";
    var P_UNDEFINED = "alert-undefined";

    return {
        // set rValue
        setRValue: function(value) {
            if (!value || value < 0) {
                throw (prefix + "setRValue - value is wrong");
            }
            rValue = value;
        },

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
        buildGraph: function(target, sources) {
            if (!sources || !target) {
                throw (prefix + "buildGraph - parameters are undefined");
            }

            // prepare array of nodes
            var nodes = [];
            // ... and edges
            var edges = [];

            // 1. confirm target and add all the related sources to the "nodes"
            nodes.push(target);
            for (var i=0; i<sources.length; i++) {
                if (GraphBuilder.checkIdRecursively(target, sources[i].target)) {
                    nodes.push(sources[i]);
                    // build edges and calculate priority
                    var edge = {"source": sources[i], "target": target};

                    /***************************/
                    /* test: add edge threshold and priority */
                    var edge_data = GraphBuilder.calculateNodePriority(sources[i].value, rValue);
                    edge.edge_threshold = edge_data.threshold;
                    edge.edge_group = edge_data.priority;
                    /***************************/

                    edges.push(edge);
                }
            }

            return {nodes: nodes, edges: edges};
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
                            var edge_data = GraphBuilder.calculateNodePriority(node.value, rValue);
                            edge.edge_threshold = edge_data.threshold;
                            edge.edge_group = edge_data.priority;
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
                    var edge_data = GraphBuilder.calculateNodePriority(connectedBefore[k].value, rValue);
                    edge.edge_threshold = edge_data.threshold;
                    edge.edge_group = edge_data.priority;
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
        calculateNodePriority: function(value, rValue) {
            var a = (rValue - value);
            var ACC_RATE = 0.25; // acceptance percentage

            var groupPriority = function(value, rValue) {
                var max = Math.max(value, rValue);
                var diff = Math.abs(value - rValue)*1.0/max;

                var MIN_RATE = 0.2;
                var MAX_RATE = 0.5;

                if (diff <= MIN_RATE) {
                    return 1;
                } else if (diff < MAX_RATE) {
                    return 3;
                } else {
                    return 5;
                }
            }

            var res = {};

            if (a <= 0) {
                res.priority = P_GREEN;
            } else if (a > 0 && value*(1+ACC_RATE) <= rValue) {
                res.priority = P_YELLOW;
            } else if (a > 0) {
                res.priority = P_RED;
            } else {
                res.priority = P_UNDEFINED;
            }
            // assign group priority
            res.threshold = groupPriority(value, rValue);

            return res;
        },

        // function to find max value
        findMaxValue: function(group) {
            var max = group[0].value;
            for (var i=1; i<group.length; i++) {
                if (max < group[i].value) {
                    max = group[i].value;
                }
            }

            return max;
        },
        // function to find average value
        findAvgValue: function(group) {
            var sum = 0;
            for (var i=0; i<group.length; i++) {
                sum += group[i].value;
            }

            return (sum/group.length);
        },
        // function to find min value
        findMinValue: function(group) {
            var min = group[0].value;
            for (var i=1; i<group.length; i++) {
                if (min > group[i].value) {
                    min = group[i].value;
                }
            }

            return min;
        },

        // global precalculation of priorities
        precalculatePriorities: function(sources, target) {
            if (!sources || !target || !rValue) {
                throw (prefix + "precalculateMaxValue - parameters are undefined");
            }

            var pp = {"green": 0, "yellow": 0, "red": 0, "undefined": 0};
            if (target.leaf || target.children.length == 0) {
                for (var j=0; j<sources.length; j++) {
                    if (sources[j].target == target.id) {
                        var res = GraphBuilder.calculateNodePriority(sources[j].value, rValue);
                        sources[j].priority = res.priority;
                        if (res.priority == P_GREEN) {
                            pp.green++;
                        } else if (res.priority == P_YELLOW) {
                            pp.yellow++;
                        } else if (res.priority == P_RED) {
                            pp.red++;
                        } else {
                            pp.undefined++;
                        }
                    }
                }
            } else if (!target.leaf && target.children) {
                for (var i=0; i<target.children.length; i++) {
                    var p = GraphBuilder.precalculatePriorities(sources, target.children[i], rValue);
                    pp.green += p.green;
                    pp.yellow += p.yellow;
                    pp.red += p.red;
                    pp.undefined += p.undefined;
                }
            }

            target.priorityGroups = pp;
            return pp;
        },

        constructPath: function(x, y, r, angle) {
            var path = {};
            //rx ry x-axis-rotation large-arc-flag sweep-flag x y

            // beginning of the arc
            path.ax = x -r;
            path.ay = y;

            // radius of the circles
            path.rx = r;
            path.ry = r;

            // arc parameters
            path.x_axis_rotation = 0;
            path.large_arc_flag = 0;
            if (angle > Math.PI) {
                path.large_arc_flag = 1;
            }
            path.sweep_flag = 1;

            // end point of the arc
            path.x = path.ax + r*(1 - Math.cos(angle));
            path.y = path.ay - r*Math.sin(angle);

            return path;
        },

        // build priority bars using x, y and radius of the parent circle
        getPriorityPath: function(x, y, r, value, sum, index) {
            var angle = value*1.0 / sum;
            var strokeWidth = 4;
            var delta = 5;
            var rad = r + index*delta;

            var path = GraphBuilder.constructPath(x, y, rad, angle*Math.PI*2);

            if (index <= 1) {
                path.stroke = "green";
            } else if (index == 2) {
                path.stroke = "orange";
            } else if (index == 3) {
                path.stroke = "red";
            } else {
                path.stroke = "transparent";
            }

            path.strokeWidth = strokeWidth;

            return path;
        }
    }
})();
