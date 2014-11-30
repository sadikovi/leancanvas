var ChartBuilder = ChartBuilder || (function() {
    var chartMargin = {top: 20, right: 100, bottom: 30, left: 40};
    return {
        // build grouped bar chart
        buildGroupedBarChart: function(parentId, w, h, data, isLegend) {
            // error checking
            var prefix = "Grouped Bar Chart: ";
            if (!parentId) { throw (prefix+"Parent id is undefined"); }
            if (!w || !h) { throw (prefix+"Dimensions are undefined"); }
            if (!data || !data.length) { throw (prefix+"Data is undefined or has wrong format"); }
            if (data.length <= 0) {
                console.log(prefix+"Data has no-positive length, no chart will be built");
                return;
            }

            // everything is ok, go on...
            // size and margin of the graph
            var margin = chartMargin;
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            // color
            var color = d3.scale.category10();

            // x axes
            var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);
            var x1 = d3.scale.ordinal();
            var xAxis = d3.svg.axis().scale(x0).orient("bottom");

            // y axis
            var y = d3.scale.linear().range([height, 0]);
            var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".2s"));

            // create basis svg object
            // add width, height, and add "g" element
            var svg = d3.select("#"+parentId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // define x0 bar groups
            var groups = d3.keys(data[0]).filter(function(key) { return (key !== "group" && key !== "measure" && key !== "values"); });
            // we assume that all the data is numerical, thus we parse it
            data.forEach(function(d) {
                d.values = groups.map(function(name) { return {name: name, value: +d[name]}; });
            });

            // set domain range (how long axes are)
            // for x0 axis we return group names
            x0.domain(data.map(function(d) { return d.group; }));
            // for x1 axis we return values inside that group
            x1.domain(groups).rangeRoundBands([0, x0.rangeBand()]);
            // for y axis we return values for a particular group and set
            y.domain([0, d3.max(data, function(d) { return d3.max(d.values, function(d) { return d.value; }); })]);


            /* next stage is to add axes and legend */
            // add x axis
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

            svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)")
            .attr("y", 6).attr("dy", ".71em").attr("class", "chart-text")
            .style("text-anchor", "end").text(data[0].measure);

            // add bars for the chart
            var state = svg.selectAll(".bar-group-chart").data(data).enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x0(d.group) + ",0)"; });

            // ...
            state.selectAll("rect")
            .data(function(d) { return d.values; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .style("fill", function(d) { return color(d.name); });

            // BONUS - add legend
            if (!isLegend) {
                return;
            }

            var legend = svg.selectAll(".legend")
            .data(groups.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            // hard-coded dimensions for legend
            legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

            legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .attr("class", "chart-text")
            .text(function(d) { return d; });
        },

        buildMultilineTimeChart: function(parentId, w, h, data, format) {
            // error checking
            var prefix = "Multiline Time Chart: ";
            if (!parentId) { throw (prefix+"Parent id is undefined"); }
            if (!w || !h) { throw (prefix+"Dimensions are undefined"); }
            if (!data || !data.length) { throw (prefix+"Data is undefined or has wrong format"); }
            if (data.length <= 0) {
                console.log(prefix+"Data has no-positive length, no chart will be built");
                return;
            }
            // redefine format
            format = (!format)?"%Y-%m-%d":format;

            // everything is okay, go on...
            // set dimensions of the chart
            var margin = chartMargin;
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            // set color scheme for the chart
            var color = d3.scale.category10();

            // define x axis
            var x = d3.time.scale().range([0, width]);
            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            // define y axis
            var y = d3.scale.linear().range([height, 0]);
            var yAxis = d3.svg.axis().scale(y).orient("left");

            // convert each group string value into date
            data.forEach(function(d) {
                d.group = d3.time.format(format).parse(d.group);
            });

            // select groups
            color.domain(d3.keys(data[0]).filter(function(key) { return (key !== "measure" && key !== "group" && key !=="values"); }));

            // set array of values (group and value pairs)
            // notice that we convert values to numbers here
            var groups = color.domain().map(function(name) {
                return {
                    name: name,
                    values: data.map(function(d) {
                        return {group: d.group, value: +d[name]};
                    })
                };
            });

            // ... after that set domain scale for axes
            // x axis
            x.domain(d3.extent(data, function(d) { return d.group; }));
            // y axis
            y.domain([
                d3.min(groups, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
                d3.max(groups, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
            ]);

            // set up chart visualisation
            var svg = d3.select("#"+parentId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // create and set up line (group - value)
            var line = d3.svg.line().interpolate("linear").x(function(d) { return x(d.group); }).y(function(d) { return y(d.value);});
            // add x axis
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
            // add y axis
            svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6)
            .attr("dy", ".71em").attr("class", "chart-text").style("text-anchor", "end").text(data[0].measure);

            // add line for each group
            var group = svg.selectAll(".line-chart-group").data(groups).enter().append("g").attr("class", "g");
            group.append("path").attr("class", "line").attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.name); });

            // add text label with group name
            group.append("text")
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.group) + "," + y(d.value.value) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .attr("class", "chart-text")
            .text(function(d) { return d.name; });
        }
    }
})();
