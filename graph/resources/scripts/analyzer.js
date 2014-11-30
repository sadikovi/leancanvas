var Analyzer = (function() {
    return {
        isAvailable: function(a, groupType) {
            var isSource = false;
            var isTarget = false;

            for (var i=0; i<a.length; i++) {
                if (!isSource && a[i].type == "source") {
                    isSource = true;
                } else if (!isTarget && a[i].type == "target") {
                    isTarget = true;
                }

                if (isSource && isTarget)
                    break;
            }

            if (groupType == "source")
                return isSource;
            if (groupType == "target")
                return isTarget;
            if (groupType == "combined")
                return isSource && isTarget;

            return false;
        },
        buildChartOptions: function(options, selected, parent) {
            if (!options || !options.length) {
                throw ("Analyzer: options are undefined");
            } else if (!parent) {
                throw ("Analyzer: options parent is undefined");
            }
            var isSelected = function(id) {
                if (selected && selected.length) {
                    for (var i=0; i<selected.length; i++) {
                        if (selected[i].id == id)
                            return true;
                    }
                }

                return false;
            };

            parent.innerHTML = "";
            for (var i=0; i<options.length; i++) {
                var h5 = Util.createElement("h5", null, "", options[i].group, parent);
                var ul = Util.createElement("ul", null, "list-group", null, parent);
                var data = options[i].data;
                for (var j=0; j<data.length; j++) {
                    // build li
                    var li = Util.createElement("li", data[j].id, "list-group-item", null, ul);
                    // build checkbox
                    var ch = Util.createElement("input", data[j].id+"-select", "", null, li);
                    ch.setAttribute("type", "checkbox");
                    if (isSelected(data[j].id))
                        ch.setAttribute("checked", "checked");
                    // build label for checkbox
                    var chl = Util.createElement("label", null, "ga-input-label", null, li);
                    chl.setAttribute("for", ch.id);
                    chl.innerHTML = " " + data[j].name;
                    // build control
                    if (data[j].type == "slider") {

                    }
                }
            }

            return false;
        },
        collectChartOptions: function(options) {
            var selected = [];
            for (var i=0; i<options.length; i++) {
                for (var j=0; j<options[i].data.length; j++) {
                    var t = options[i].data[j];
                    var el = document.getElementById(t.id+"-select");
                    if (el.checked) {
                        var res = {id: t.id, type: t.type, name: t.name, chart: t.chart, group_type: options[i].type};
                        if (t.type == "slider") {
                            res.value = "10";
                        }
                        selected.push(res);
                    }
                }
            }

            return selected;
        },
        getDataFor: function(source, target, data) {
            for (var i=0; i<data.length; i++) {
                var t = data[i];
                var isTarget = (target)?(t.target == target):true;
                if (isTarget && t.source == source)
                    return t;
            }

            return null;
        },
        getItemById: function(graph, id) {
            for (var j=0; j<graph.nodes.length; j++) {
                if (graph.nodes[j].id == id) {
                    return graph.nodes[j];
                }
            }
            return null;
        },
        dispatchChart: function(t, parent) {
            if (t.chart == "time-line-chart") {
                var data = null;
                var format = null;
                var isCombined = false;

                if (t.id == "chart-source-101") {
                    data = revenueData;
                    format = "%Y";
                } else if (t.id == "chart-combined-101") {
                    data = priceData;
                    format = "%Y%m%d";
                    isCombined = true;
                }

                Analyzer.buildTimeLineChart(t.name, parent, data, graph, format, isCombined);
            } else if (t.chart == "bar-chart") {
                var data = null;
                if (t.id == "chart-source-102") {
                    data = aircraftData;
                } else if (t.id == "chart-source-103") {
                    data = personnelData;
                }

                Analyzer.buildBarChart(t.name, parent, data, graph);
            }

            return false;
        },
        buildBarChart: function(name, parent, data, graph) {
            if (!parent || !data || !graph)
                throw ("Analyzer: items are undefined");

            var div = Util.createElement("div", parent.id+Util.generateId()+"-container", "container", null, parent);
            var heading = Util.createElement("h4", null, "", name, div);
            var res = [];
            var sources = Selector.getSelectedSources();
            for (var i=0; i<sources.length; i++) {
                for (var j=0; j<data.length; j++) {
                    if (data[j].group == sources[i].name) {
                        res.push(data[j]);
                    }
                }
            }
            ChartBuilder.buildGroupedBarChart(div.id, 700, 300, res, true);
        },
        buildTimeLineChart: function(name, parent, data, graph, format, isCombined) {
            var vdata = null;
            if (isCombined) {
                vdata = Analyzer.getAnalysisData(Selector.getSelected(), data, name);
                console.log(vdata);
                var div = Util.createElement("div", parent.id+Util.generateId()+"-container", "container", null, parent);
                var heading = Util.createElement("h4", null, "", name, div);
                for (var i=0; i<vdata.length; i++) {
                    var d = Util.createElement("div", div.id+Util.generateId()+"-tchart", "container", null, div);
                    var h = Util.createElement("h5", null, "", vdata[i].target, d);
                    ChartBuilder.buildMultilineTimeChart(d.id, 700, 300, vdata[i].data, format);
                }
            } else {
                vdata = Analyzer.getAnalysisSourceData(Selector.getSelectedSources(), data, name);

                var div = Util.createElement("div", parent.id+Util.generateId()+"-container", "container", null, parent);
                var heading = Util.createElement("h4", null, "", name, div);
                ChartBuilder.buildMultilineTimeChart(div.id, 700, 300, vdata, format);
            }
        },
        getAnalysisData: function(a, data, mname) {
            if (!data)
                throw ("Analyzer: data is undefined");

            // select relevant data
            var relevantData = [];

            var sources = [];
            var targets = [];

            for (var i=0; i<a.length; i++) {
                if (a[i].type == "source") {
                    sources.push(a[i]);
                } else if (a[i].type == "target") {
                    targets.push(a[i]);
                }
            }

            // search relevant data
            for (var j=0; j<targets.length; j++) {
                var t = targets[j];
                var obj = {target: MainClosure.nameForId(t.id, graph.nodes), data: []};
                for (var k=0; k<sources.length; k++) {
                    var s = sources[k];
                    var res = Analyzer.getDataFor(s.id, t.id, data);
                    if (res && res != null) {
                        for (var l=0; l<res.data.length; l++) {
                            if (obj.data.length > 0) {
                                var added = false;
                                for (var i=0; i<obj.data.length; i++) {
                                    if (obj.data[i].group == res.data[l].date) {
                                        obj.data[i][MainClosure.nameForId(res.source, graph.nodes)] = res.data[l].value;
                                        added = true;
                                        break;
                                    }
                                }
                                if (!added) {
                                    var tobj = {group: res.data[l].date, measure: mname};
                                    tobj[MainClosure.nameForId(res.source, graph.nodes)] = res.data[l].value;
                                    obj.data.push(tobj);
                                }
                            } else {
                                var tobj = {group: res.data[l].date, measure: mname};
                                tobj[MainClosure.nameForId(res.source, graph.nodes)] = res.data[l].value;
                                obj.data.push(tobj);
                            }
                        }
                    }
                }

                relevantData.push(obj);
            }

            return relevantData;
        },

        // get data for source only
        getAnalysisSourceData: function(a, data, mname) {
            if (!data)
                throw ("Analyzer: data is undefined");

            // select relevant data
            var relevantData = [];
            var sources = a;
            for (var k=0; k<sources.length; k++) {
                var s = sources[k];
                var res = Analyzer.getDataFor(s.id, null, data);
                if (res && res != null) {
                    for (var l=0; l<res.data.length; l++) {
                        if (relevantData.length > 0) {
                            var added = false;
                            for (var i=0; i<relevantData.length; i++) {
                                if (relevantData[i].group == res.data[l].date) {
                                    relevantData[i][MainClosure.nameForId(res.source, graph.nodes)] = res.data[l].value;
                                    added = true;
                                    break;
                                }
                            }
                            if (!added) {
                                var tobj = {measure: mname, group: res.data[l].date};
                                tobj[MainClosure.nameForId(res.source, graph.nodes)] = res.data[l].value;
                                relevantData.push(tobj);
                            }
                        } else {
                            var tobj = {measure: mname, group: res.data[l].date};
                            tobj[MainClosure.nameForId(res.source, graph.nodes)] = res.data[l].value;
                            relevantData.push(tobj);
                        }
                    }
                }
            }

            return relevantData;
        }
    }
})();
