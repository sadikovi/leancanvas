function buildGraph(graph_target, graph_sources, price) {
    messageForTargetNode = function(d) {
        // message for target when it is hovered
        var msg = "<strong>"+d.name+"</strong>";
        msg += "<div><span><div class=\"tag alert-green\"></div> "+d.priorityGroups.green
        +"</span>&nbsp;&nbsp;<span><div class=\"tag alert-yellow\"></div> "+d.priorityGroups.yellow
        +"</span>&nbsp;&nbsp;<span><div class=\"tag alert-red\"></div> "+d.priorityGroups.red+"</span></div>";
        return msg;
    }

    messageForSourceNode = function(d) {
        var msg = "<div>#" + d.id + " <strong>" + d.name + "</strong>" + "</div>"
        + "<p>"+d.desc+"<p/>"
        +"<div>Price: $" + d.value + "</div>"
        +"<div>Bedrooms: " + d.properties.bedrooms + "</div>"
        +"<div>Bathrooms: " + d.properties.bathrooms + "</div>";
        return msg;
    }

    messageForEdge = function(d) {
        var msg = "<strong>Offer: " + d.source.name + "</strong>" + "<br/>" +
                    "<strong>Region: " + d.target.name + "</strong>" + "<br/>" +
                    "Price: $" + d.source.value;
        return msg;
    }

    // add link attributes
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
                tooltip.show(messageForEdge(d));
            } else {
                tooltip.show("...");
            }
        })
        .on("mouseout", function(d) {
            tooltip.hide();
        });
    }

    // add node attributes
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

                // hide tooltip
                tooltip.hide();
            }
        })
        .on("mouseover", function(d) {
            if (d.type == "source") {
                tooltip.show(messageForSourceNode(d));
            } else {
                tooltip.show(messageForTargetNode(d));
            }
        })
        .on("mouseout", function(d) {
            tooltip.hide();
        })
        .on("click", function(d) {
            if (d.type == "source" && d.properties["link"]) {
                window.open(d.properties.link, "_blank");
            }
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

        // append bigger circle to hover the source
        node.append("circle")
        .attr("r", function(d) {
            return (d.node_radius)?d.node_radius*3:0;
        }).attr("class", function(d) {
            var className = (d.type=="source")?d.priority:"target";
            return ((d.type=="source")?"source-callout": "target-callout")+" "+className;
        }).attr("fill", function(d) {

        });

        addPriorityPaths(node);
    }

    // adds priority paths to the target nodes
    addPriorityPaths = function(node) {
        if (!node) {
            throw ("Node is undefined");
        }

        // we apply only 3 indexes, according to 3 priorities
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
            .attr("class", function(d) {
                if (!d.type || d.type != "source") {
                    var priority = (i==1)?d.priorityGroups.green:((i==2)?d.priorityGroups.yellow:d.priorityGroups.red);
                    var sum = (d.priorityGroups.green + d.priorityGroups.yellow + d.priorityGroups.red);
                    var path = GraphBuilder.getPriorityPath(0, 0, d.node_radius, priority, sum, i);
                    return path.class;
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
            });
        }

        return false;
    }

    // build nodes for svg canvas
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
    var parentStat = document.getElementById("ga-statistics");
    parentStat.innerHTML = "";
    var parentGraph = document.getElementById("ga-graph");
    parentGraph.innerHTML = "";

    GraphBuilder.setRValue(price);
    // precalculate priorities for the nodes
    GraphBuilder.precalculatePriorities(graph_sources, graph_target);


    // build graph
    if (graph_target && graph_sources && graph_sources.length > 0) {
        var result = GraphBuilder.buildGraph(graph_target, graph_sources);
        /**************************/
        /*** Collect statistics ***/
        Statistics.reset();
        Statistics.setStatistics("group1", "Offers overall", StatisticsType.Default);
        Statistics.setStatistics("group2", "Minimum price", StatisticsType.Primary, "price");
        Statistics.setStatistics("group2", "Average price", StatisticsType.Primary, "price");
        Statistics.setStatistics("group2", "Maximum price", StatisticsType.Primary, "price");
        Statistics.setStatistics("group3", "Acceptable", StatisticsType.Green);
        Statistics.setStatistics("group3", "Considerable", StatisticsType.Yellow);
        Statistics.setStatistics("group3", "Expensive", StatisticsType.Red);

        if (result.nodes.length > 0) {
            var cnt = 0;
            var t_max = null;
            var t_min = null;
            var t_avg_sum = 0;
            for (var i=0; i<result.nodes.length; i++) {
                if (result.nodes[i].type == "source") {
                    if (!t_max || t_max < result.nodes[i].value) {
                        t_max = result.nodes[i].value;
                    }
                    if (!t_min || t_min > result.nodes[i].value) {
                        t_min = result.nodes[i].value;
                    }
                    cnt++;
                    t_avg_sum += result.nodes[i].value;
                } else {
                    Statistics.addStatistics("group3", "Acceptable", result.nodes[i].priorityGroups.green);
                    Statistics.addStatistics("group3", "Considerable", result.nodes[i].priorityGroups.yellow);
                    Statistics.addStatistics("group3", "Expensive", result.nodes[i].priorityGroups.red);
                }
            }
            Statistics.addStatistics("group1", "Offers overall", cnt);
            Statistics.addStatistics("group2", "Minimum price", t_min);
            Statistics.addStatistics("group2", "Average price", Math.floor(t_avg_sum/cnt));
            Statistics.addStatistics("group2", "Maximum price", t_max);
        }
        parentStat.appendChild(Statistics.htmlCore());
        /**************************/

        // prepare dimensions
        var width = 1100, height = 400;
        var color = d3.scale.category20();
        var force = d3.layout.force().gravity(0.1).charge(-2000).linkDistance(10).size([width, height])
        .friction(0.5)
        .distance(10)

        var svg = d3.select("#ga-graph").append("svg").attr("width", width).attr("height", height);
        force.nodes(result.nodes).links(result.edges).start();

        buildNodesAndLinks(svg, force);
    }
}

var bar = document.getElementById("ga-navbar");
bar.appendChild(SearchBar.buildSearchBar(searchBarElements, function(e) {
    searchCallback.call(this);
}));
searchCallback();

function searchCallback() {
    var searchParameters = Search.getCore();
    var price = (!parseInt(searchParameters["Price"]))?data.default_value:parseInt(searchParameters["Price"]);
    var recurTarget = function(temp, id) {
        if (temp == null || temp.id == id) {
            return temp;
        } else if (!temp.children || temp.children.length == 0) {
            return null;
        } else {
            var res = null;
            for (var i=0; i<temp.children.length; i++) {
                res = res || recurTarget(temp.children[i], id);
            }

            return res;
        }
    }

    var graph_target = recurTarget(data.targets[0], searchParameters["Regions"]);
    var graph_sources = [];

    beds = parseInt(searchParameters["Bedrooms"]);
    baths = parseInt(searchParameters["Bathrooms"]);
    for (var i=0; i<data.sources.length; i++) {
        var bedsMatch = false;
        var bathsMatch = false;

        if (searchParameters["Bedrooms"] == "Any") {
            bedsMatch = true;
        } else if (searchParameters["Bedrooms"].indexOf("+") > 0) {
            if (data.sources[i].properties.bedrooms >= beds) {
                bedsMatch = true;
            }
        } else {
            if (data.sources[i].properties.bedrooms == beds) {
                bedsMatch = true;
            }
        }

        if (searchParameters["Bathrooms"] == "Any") {
            bathsMatch = true;
        } else if (searchParameters["Bathrooms"].indexOf("+") > 0) {
            if (data.sources[i].properties.bathrooms >= baths) {
                bathsMatch = true;
            }
        } else {
            if (data.sources[i].properties.bathrooms == baths) {
                bathsMatch = true;
            }
        }
        if (bathsMatch && bedsMatch) {
            graph_sources.push(data.sources[i]);
        }
    }
    buildGraph(graph_target, graph_sources, price);
}
