(function() {
    // declare functions
    var newLabel = function(d, obj, gs) {
        var cl = "";
        if (d.type == "source") {
            cl = "label-success";
        } else if (d.type == "target") {
            cl = "label-warning";
        }

        var ll = Util.createElement("span", d.id+"&label", "label ga-label "+cl, null, gs);
        var lt = Util.createElement("span", d.id+"&label&text", "ga-label-text ", d.name, ll);
        var lb = Util.createElement("button", null, "ga-close", null, ll);
        lb.setAttribute("type", "button");
        var ls = Util.createElement("span", null, "", null, lb);
        ls.setAttribute("aria-hidden", "true");
        ls.innerHTML = "&times;";
        var lc = Util.createElement("span", null, "sr-only", null, lb);
        lc.innerHTML = "Close";

        Util.addEventListener(lb, "click", function(e) {
            Selector.selectNode.call(this, d, obj);
            obj.active = false;
            obj.label = null;
            gs.removeChild(ll);
            e.preventDefault();
        });

        return ll;
    }

    // set up stuff
    var st = document.getElementById("ga-select-toggle");
    var si = document.getElementById("ga-select-indicator");
    var sm = document.getElementById("ga-select-indicator-msg");
    var gs = document.getElementById("ga-graph-selected");
    var nc = document.getElementById("ga-notification-center");

    // toggle selection
    Util.addEventListener(st, "click", function(e) {
        if (Selector) {
            Selector.turnOn(!Selector.getStatus());

            if (Selector.getStatus()) {
                Util.removeClass(si, "ga-indicator-off");
                Util.addClass(si, "ga-indicator-on");
                sm.innerHTML = "On";
            } else {
                Util.removeClass(si, "ga-indicator-on");
                Util.addClass(si, "ga-indicator-off");
                sm.innerHTML = "Off";

                if (svg) {
                    svg.selectAll(".node").attr("class", function(d) {
                        if (this.label) {
                            gs.removeChild(this.label);
                        }
                        if (this.active) {
                            this.active = false;
                        }
                        return "node";
                    });
                }
            }
        }
        e.preventDefault();
    });

    // global selected charts
    var ga_selectedCharts = [];
    // show chart options
    var chartOptions = document.getElementById("bs-modal-chart-options-sm");
    var chartsDialogBody = document.getElementById("ga-graph-analysis-chart-options");
    Util.addEventListener(chartOptions, "click", function(e) {
        Analyzer.buildChartOptions(chart_options, ga_selectedCharts, chartsDialogBody);
    });

    // confirm selected charts
    var modalviewConfirm = document.getElementById("bs-modal-chart-options-confirm");
    var chartOptionsBody = document.getElementById("ga-chart-options");
    Util.addEventListener(modalviewConfirm, "click", function(e) {
        ga_selectedCharts = Analyzer.collectChartOptions(chart_options);
        chartOptionsBody.innerHTML = "";
        for (var i=0; i<ga_selectedCharts.length; i++) {
            Util.createElement("span", null, "label ga-label label-default", ga_selectedCharts[i].name, chartOptionsBody);
        }
    });

    // show selected charts in modal view
    var showChartsButton = document.getElementById("bs-modal-analysis-sm");
    Util.addEventListener(showChartsButton, "click", function(e) {
        if (!Selector.getSelected() || Selector.getSelected().length == 0 || !ga_selectedCharts || ga_selectedCharts.length==0) {
            console.log("selected charts or objects are empty");
            return;
        }

        var parent = document.getElementById("ga-graph-analysis-charts");
        parent.innerHTML = "";
        for (var i=0; i<ga_selectedCharts.length; i++) {
            var t = ga_selectedCharts[i];
            if (Analyzer.isAvailable(Selector.getSelected(), t.group_type)) {
                Analyzer.dispatchChart(t, parent);
            } else {
                console.log(t.name + " is not available");
            }
        }
    });

    // graph
    var width = 1000, height = 500;
    var color = d3.scale.category20();
    var force = d3.layout.force().gravity(0.1).charge(-2500).linkDistance(200).size([width, height])
    .friction(0.5)
    .distance(150)

    var svg = d3.select("#ga-graph").append("svg").attr("width", width).attr("height", height);

    // recalculate links
    var connections = MainClosure.calculateConnections(graph.links);
    graph.links = connections.links;
    graph.nodes = MainClosure.modifyNodes(graph.nodes, connections);

    var edges = [];
    graph.links.forEach(function(e) {
        var sourceNode = graph.nodes.filter(function(n) { return n.id === e.source; })[0];
        var targetNode = graph.nodes.filter(function(n) { return n.id === e.target; })[0];

        // Add the edge to the array
        edges.push({source: sourceNode, target: targetNode, group: e.group, threshold: e.threshold, price: e.price});
    });

    console.log(edges);

    graph.links = edges;
    force.nodes(graph.nodes).links(graph.links).start();

    var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", function(d) {return "link " + d.group; })
    .style("stroke-width", function(d) {return d.threshold; })
    .on("mouseover", function(d) {
        tooltip.show("Airline: "+d.source.name+"<br/>Route: "+d.target.name+"<br/>Price: $"+d.price);
    })
    .on("mouseout", function(d) {
        tooltip.hide();
    });

    var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .attr("id", function(d) {return d.id+"graph-node";})
    .call(force.drag)
    .on("click", function(d) {
        if (Selector.getStatus()) {
            var obj = this;
            var ac = Selector.selectNode.call(this, d, obj);
            if (ac) {
                var la = newLabel(d, obj, gs);
                obj.label = la;
            } else {
                if (obj.label && obj.label != null) {
                    gs.removeChild(obj.label);
                    obj.label = null;
                }
            }
        }
    })
    .on("mouseover", function(d) {
        tooltip.show(d.desc||d.name);
    })
    .on("mouseout", function(d) {
        tooltip.hide();
    });

    node.append("circle")
    .attr("r", function(d) {return d.radius;})
    .attr("class", function(d) {return d.type;})
    .attr("id", function(d) {return d.id;});

    node.append("text")
    .attr("class", "text")
    .attr("dx", function(d) {return (d.radius/10) + "em"})
    .attr("dy", function(d) {return (-d.radius/10) + "em"})
    .text(function(d) { return d.name; });

    force.on("tick", function() {
        link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        node
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
})();
