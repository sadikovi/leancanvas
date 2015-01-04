function buildGraph(graph_target, graph_sources, price) {
    messageForTargetNode = function(d) {
        var msg = "<strong>"+d.name+"</strong>";
        msg += "<div><span><div class=\"tag alert-green\"></div> "+d.priorityGroups.green
        +"</span>&nbsp;&nbsp;<span><div class=\"tag alert-yellow\"></div> "+d.priorityGroups.yellow
        +"</span>&nbsp;&nbsp;<span><div class=\"tag alert-red\"></div> "+d.priorityGroups.red+"</span></div>";
        return msg;
    }

    messageForSourceNode = function(d) {
        var msg = "<table><tr>";

        msg += "<td class=\"tooltip-col\">";
        msg += "<img class=\"thumbnail-image\" src=\""+d.properties.thumbnail+"\"</img>";
        msg += "</td>";

        msg += "<td class=\"tooltip-col\">";
        msg += "<div class=\"tooltip-name\">"+"#"+d.id+" "+d.name+"</div>"
                +"<p>"+d.desc+"</p>"+"<div>Price: $"+d.properties.price+"</div>"
                +"<div>Bedrooms: "+d.properties.bedrooms+"</div>"+"<div>Bathrooms: "+d.properties.bathrooms+"</div>"
        msg += "</td>";

        msg += "</tr></table>";
        return msg;
    }

    messageForEdge = function(d) {
        var msg = "<strong>Offer: " + d.source.name + "</strong>" + "<br/>" +
                    "<strong>Region: " + d.target.name + "</strong>" + "<br/>" +
                    "Price: $" + d.source.value;
        return msg;
    }

    // open link in new tab
    openlink = function(link) {
        window.open(link, "_blank");
    }
    // drill down functin
    drilldown = function(d) {
        result = GraphBuilder.drilldown(d, result.nodes, result.edges);
        updateDisplay();
    }
    // roll up function
    rollup = function(d) {
        result = GraphBuilder.rollup(d, result.nodes, result.edges);
        updateDisplay();
    }
    // zoom in function
    zoomin = function(d) {
        result = GraphBuilder.zoomIn(d, graph_sources);
        updateDisplay();
        updateBreadcrumbs();
    }
    // zoom out function
    zoomout = function(d, step) {
        result = GraphBuilder.zoomOut(graph_sources, step);
        updateDisplay();
        updateBreadcrumbs();
    }
    // update display
    updateDisplay = function() {
        force.nodes(result.nodes);
        force.links(result.edges);
        buildNodesAndLinks(svg, force);
        force.start();
        // hide tooltip
        tooltip.hide();
    }
    // update breadcrumbs
    updateBreadcrumbs = function() {
        Breadcrumbs.updateBreadcrumbs(breadcrumbs, GraphBuilder.getStack(), function(d, step) {
            zoomout.call(this, null, step);
        });
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
            if (d.type == "source" && d.properties["link"]) {
                openlink(d.properties.link);
            } else if (d.isUni) {
                if (d.isCollapsed) {
                    drilldown(d);
                } else {
                    rollup(d);
                }
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
            GraphBuilder.select(d);
            var actions = [];
            // add actions to display
            if (d.type == "source" && d.properties["link"]) {
                actions.push({name:"Open link", action: function(){openlink.call(this, d.properties.link);}});
            } else if (d.type != "source") {
                if (d.isCollapsed) {
                    actions.push({name:"Drill down", action: function(){drilldown.call(this, d);}});
                } else {
                    actions.push({name:"Roll up", action: function(){rollup.call(this, d);}});
                }
                if (GraphBuilder.canZoomIn(d)) {
                    actions.push({name:"Zoom in", action: function(){zoomin.call(this, d);}});
                }
                if (GraphBuilder.canZoomOut(d)) {
                    actions.push({name:"Zoom out", action: function(){zoomout.call(this, d);}});
                }
            }
            Actions.showActions(GraphBuilder.getSelected(), actions, actionsParent);
            d3.event.stopPropagation();
        })
        .call(force.drag)

        node.append("circle")
        .attr("r", function(d) {
            d.selectable = this;
            if (d.type == "source") {
                d.node_radius = 3;
            } else {
                d.selectable = this;
                d.node_radius = ((20-d.level*5)>10)?(20-d.level*5):10;
            }
            return d.node_radius;
        }).attr("class", function(d) {
            return (d.type=="source")?d.priority:"target";
        });

        // append bigger circle to hover the source
        node.append("circle")
        .attr("r", function(d) {
            if (d.type == "source") {
                d.selectable = this;
            }
            return (d.node_radius)?d.node_radius*3:0;
        }).attr("class", function(d) {
            var className = (d.type=="source")?d.priority:"target";
            return ((d.type=="source")?"source-callout": "target-callout")+" "+className;
        });
        // add priority paths for node
        addPriorityPaths(node);
    }

    // get path for index priority and node
    getPathForIndexPriority = function(i, d) {
        var priority = (i==1)?d.priorityGroups.green:((i==2)?d.priorityGroups.yellow:d.priorityGroups.red);
        var sum = (d.priorityGroups.green + d.priorityGroups.yellow + d.priorityGroups.red);
        return GraphBuilder.getPriorityPath(0, 0, d.node_radius, priority, sum, i);
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
                    var path = getPathForIndexPriority(i, d);
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
                    var path = getPathForIndexPriority(i, d);
                    return path.class;
                } else {
                    return "";
                }
            })
            .attr("stroke-width", function(d) {
                if (!d.type || d.type != "source") {
                    var path = getPathForIndexPriority(i, d);
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
        Actions.hideActions(actionsParent);

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
    var actionsParent = document.getElementById("ga-actions");
    actionsParent.innerHTML = "";
    var breadcrumbs = document.getElementById("ga-breadcrumbs");
    breadcrumbs.innerHTML = "";
    GraphBuilder.initStack();

    GraphBuilder.setRValue(price);
    // precalculate priorities for the nodes
    GraphBuilder.precalculatePriorities(graph_sources, graph_target);

    // build graph
    if (graph_target && graph_sources && graph_sources.length > 0) {
        //var result = GraphBuilder.buildGraph(graph_target, graph_sources);
        var result = GraphBuilder.zoomIn(graph_target, graph_sources);
        updateBreadcrumbs();
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
                    if (!t_max || t_max < result.nodes[i].properties.price) {
                        t_max = result.nodes[i].properties.price;
                    }
                    if (!t_min || t_min > result.nodes[i].properties.price) {
                        t_min = result.nodes[i].properties.price;
                    }
                    cnt++;
                    t_avg_sum += result.nodes[i].properties.price;
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
        var ht = document.getElementById("toggle-statistics");
        toggleStats = function(ht, toggle) {
            ht.innerHTML = "";
            var on = toggle && (!Util.hasClass(parentStat, "hidden") || Util.hasClass(parentStat, "show"));
            var a = null;
            if (on) {
                Util.addClass(parentStat, "hidden");
                Util.removeClass(parentStat, "show");
                a = Util.createElement("span", null, "", "Show statistics", ht);
            } else {
                Util.addClass(parentStat, "show");
                Util.removeClass(parentStat, "hidden");
                a = Util.createElement("span", null, "", "Hide statistics", ht);

            }
            Util.addEventListener(a, "click", function(e) {
                toggleStats.call(this, ht, true);
            });
        }
        toggleStats(ht, false);
        /**************************/

        // prepare dimensions
        var width = 1100, height = 500;
        var color = d3.scale.category20();
        var force = d3.layout.force().gravity(0.1).charge(-2000).linkDistance(10).size([width, height])
        .friction(0.5)
        .distance(10)

        var svg = d3.select("#ga-graph").append("svg").attr("width", width).attr("height", height).on("click", function() {
            GraphBuilder.deselect();
            Actions.hideActions(actionsParent);
        });
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
    var isAdaptiveSearch = Search.getSelectedValue("Adaptivesearch");

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

    if (isAdaptiveSearch) {
        var a = (!parseInt(searchParameters["Price"]))?data.default_value:parseInt(searchParameters["Price"]);
        var b = beds = parseInt(searchParameters["Bedrooms"]);
        var c = baths = parseInt(searchParameters["Bathrooms"]);

        AdaptiveSearch.initDefaultValuesOnly(a, ((b>0)?b:1), ((c>0)?c:1));

        for (var i=0; i<data.sources.length; i++) {
            var source = data.sources[i];
            source.value = AdaptiveSearch.estimateValue(source.properties.price, source.properties.bedrooms, source.properties.bathrooms);
        }

        buildGraph(graph_target, data.sources, AdaptiveSearch.getMidPoint());
    } else {
        var price = (!parseInt(searchParameters["Price"]))?data.default_value:parseInt(searchParameters["Price"]);
        // there was graph_target before I added adaptive search
        var graph_sources = [];

        beds = parseInt(searchParameters["Bedrooms"]);
        baths = parseInt(searchParameters["Bathrooms"]);
        for (var i=0; i<data.sources.length; i++) {
            // reset value as a price
            data.sources[i].value = data.sources[i].properties.price;
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
}
