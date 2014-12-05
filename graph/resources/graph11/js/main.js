(function() {
    addLinkAttributes = function(link) {
        link
        .attr("class", function(d) {
            return "link " + d.edge_group;
        }).style("stroke-width", function(d) {
            return (d.edge_threshold)?d.edge_threshold:1;
        }).style("stroke-dasharray", function(d) {
            if (d.source.type == "source" || d.target.type == "") {
                return "none";
            } else {
                return ("5, 5");
            }
        })
        .on("mouseover", function(d) {
            if (d.source.type == "source") {
                tooltip.show(
                    "<strong>Offer: " + d.source.name + "</strong>" + "<br/>" +
                    "<strong>Region: " + d.target.name + "</strong>" + "<br/>" +
                    "Price: $" + d.source.value);
            } else {
                tooltip.show("...");
            }
        })
        .on("mouseout", function(d) {
            tooltip.hide();
        });
    }

    addNodeAttributes = function(node) {
        node.attr("class", "node")
        .attr("id", function(d) {return d.id+"graph-node";})
        .on("dblclick", function(d) {
            if (d.isUni) {
                if (d.isCollapsed) {
                    result = GraphBuilder.drilldown(d, result.nodes, result.edges);
                    force.nodes(result.nodes);
                    force.links(result.edges);
                    buildNodesAndLinks(svg, force);
                    force.start();
                } else {
                    result = GraphBuilder.rollup(d, result.nodes, result.edges);
                    force.nodes(result.nodes);
                    force.links(result.edges);
                    buildNodesAndLinks(svg, force);
                    force.start();
                }
            }
        })
        .on("mouseover", function(d) {
            if (d.type == "source") {
                tooltip.show("#" + d.id + " <strong>" + d.name + "</strong>" + "<br/>" + d.desc + "<br/>Price: $" + d.value);
            } else {
                tooltip.show("<strong>" + d.name + "</strong>" + "<br/>" + d.desc + "<br/>Max Price: $" + d.maxValue);
            }

        })
        .on("mouseout", function(d) {
            tooltip.hide();
        })
        .call(force.drag)

        node.append("circle")
        .attr("r", function(d) {
            if (d.type == "source") {
                d.node_radius = 3;
            } else {
                d.node_radius = ((20-d.level*5)>10)?(20-d.level*5):10;;
            }
            return d.node_radius;
        }).attr("class", function(d) {
            return (d.type=="source")?d.priority:"target";
        });

        addPriorityPaths(node);
    }

    // adds priority paths to the target nodes
    addPriorityPaths = function(node) {
        if (!node) {
            throw ("Node is undefined");
        }

        for (var i=1; i<=3; i++) {
            // apply path
            node.append("path")
            .attr("d", function(d) {
                if (!d.type || d.type != "source") {
                    var priority = (i==1)?d.priorityGroups.green:((i==2)?d.priorityGroups.yellow:d.priorityGroups.red);
                    var sum = (d.priorityGroups.green + d.priorityGroups.yellow + d.priorityGroups.red);
                    var path = GraphBuilder.getPriorityPath(0, 0, d.node_radius, priority, sum, i);
                    var dString = "M "+path.ax+" "+path.ay+" A "+path.rx+" "+path.ry+" "+
                    path.x_axis_rotation + " " + path.large_arc_flag + " " + path.sweep_flag +
                    " " + path.x + " " + path.y;
                    return dString;
                } else {
                    return "";
                }
            })
            .attr("stroke", function(d) {
                if (!d.type || d.type != "source") {
                    var priority = (i==1)?d.priorityGroups.green:((i==2)?d.priorityGroups.yellow:d.priorityGroups.red);
                    var sum = (d.priorityGroups.green + d.priorityGroups.yellow + d.priorityGroups.red);
                    var path = GraphBuilder.getPriorityPath(0, 0, d.node_radius, priority, sum, i);
                    return path.stroke;
                } else {
                    return "";
                }
            })
            .attr("stroke-width", function(d) {
                if (!d.type || d.type != "source") {
                    var priority = (i==1)?d.priorityGroups.green:((i==2)?d.priorityGroups.yellow:d.priorityGroups.red);
                    var sum = (d.priorityGroups.green + d.priorityGroups.yellow + d.priorityGroups.red);
                    var path = GraphBuilder.getPriorityPath(0, 0, d.node_radius, priority, sum, i);
                    return path.strokeWidth;
                } else {
                    return "";
                }
            })
            .attr("fill", "transparent");
        }
        return false;
    }

    buildNodesAndLinks = function(svg, force) {
        svg.selectAll("*").remove();

        // prepare links
        var link = svg.selectAll(".link").data(force.links()).enter().append("line");
        addLinkAttributes(link);
        // prepare nodes
        var node = svg.selectAll(".node").data(force.nodes()).enter().append("g");
        addNodeAttributes(node);

        force.on("tick", function() {
            link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

            node
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    }

    // start...
    // build graph

    //console.log(data.default_value);
    GraphBuilder.setRValue(data.default_value);
    for (var i=0; i<data.targets.length; i++) {
        GraphBuilder.precalculatePriorities(data.sources, data.targets[i]);
    }

    var result = GraphBuilder.buildGraph(data.targets[0], data.sources);

    // prepare dimensions
    var width = 1100, height = 800;
    var color = d3.scale.category20();
    var force = d3.layout.force().gravity(0.1).charge(-2000).linkDistance(10).size([width, height])
    .friction(0.5)
    .distance(10)

    var svg = d3.select("#ga-graph").append("svg").attr("width", width).attr("height", height);
    force.nodes(result.nodes).links(result.edges).start();

    buildNodesAndLinks(svg, force);
})();
