var chart_options = [
    {
        group: "Source charts", type: "source", data: [
            {id: "chart-source-101", type: "slider", name: "Revenue, $B", min: "1", max: "10", "default": "1", unit: "Number of weeks", chart: "time-line-chart"},
            {id: "chart-source-102", type: "default", name: "Fleet", chart: "bar-chart"},
            {id: "chart-source-103", type: "default", name: "Personnel", chart: "bar-chart"}
        ]
    },
    {
        group: "Combined charts", type: "combined", data: [
            {id: "chart-combined-101", type: "slider", name: "Price (1 adult economy class)", min: "1", max: "10", "default": "1", unit: "Number of weeks", chart: "time-line-chart"}
        ]
    }
];
