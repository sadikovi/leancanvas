var graph = graph || {
    nodes: [
        /* airlines */
        { id: 102, name: "Air France", type: "source", radius: 10 },
        { id: 103, name: "British Airways", type: "source", radius: 10 },
        { id: 105, name: "Emirates", type: "source", radius: 10 },
        { id: 106, name: "Jet Airways", type: "source", radius: 10 },
        { id: 109, name: "Virgin Atlantic", type: "source", radius: 10 },
        { id: 110, name: "Air Canada", type: "source", radius: 10 },
        { id: 111, name: "US Airways", type: "source", radius: 10 },

        /* routes */
        { id: 201, name: "LHR-DXB", desc: "London Heathrow (LHR) to Dubai (DXB)", type: "target", radius: 15 },
        { id: 202, name: "SFO-LHR", desc: "San Francisco International (SFO) to London Heathrow (LHR)", type: "target", radius: 15 },
        { id: 203, name: "JFK-CDG", desc: "New York John F. Kennedy (JFK) to Paris Charles de Gaulle (CDG)", type: "target", radius: 15 },
        { id: 204, name: "CDG-AUH", desc: "Paris Charles de Gaulle (CDG) to Abu Dhabi International (AUH)", type: "target", radius: 15 },
        { id: 205, name: "DXB-BKK", desc: "Dubai (DXB) to Bangkok Suvarnabhumi (BKK)", type: "target", radius: 15 },
        { id: 206, name: "CAI-HKG", desc: "Cairo (CAI) to Hong Kong International (HKG)", type: "target", radius: 15 }
    ],
    links: [
        { source:105, target:201, price: 926 },
        { source:106, target:201, price: 1551 },
        { source:109, target:201, price: 2556 },

        { source:102, target:206, price: 5926 },
        { source:103, target:206, price: 2887 },
        { source:105, target:206, price: 499 },

        { source:103, target:205, price: 2986 },
        { source:105, target:205, price: 837 },
        { source:106, target:205, price: 420 },

        { source:103, target:204, price: 2557 },

        { source:110, target:202, price: 2175 },
        { source:102, target:202, price: 2576 },
        { source:103, target:202, price: 2388 },
        { source:109, target:202, price: 2369 },
        { source:111, target:202, price: 1755 },

        { source:110, target:203, price: 2746 },
        { source:102, target:203, price: 2452 },
        { source:103, target:203, price: 2780 },
        { source:111, target:203, price: 3007 }
    ]
};

// price data
var priceData = priceData || [
    { source: 105, target: 201, data: [
        { date: "20140301", value: Math.floor(Math.random() * 960) + 920},
        { date: "20140302", value: Math.floor(Math.random() * 960) + 920},
        { date: "20140303", value: Math.floor(Math.random() * 960) + 920},
        { date: "20140304", value: Math.floor(Math.random() * 960) + 920},
        { date: "20140305", value: Math.floor(Math.random() * 960) + 920},
        { date: "20140306", value: Math.floor(Math.random() * 960) + 920},
        { date: "20140307", value: 926}
    ]},
    { source: 106, target: 201, data: [
        { date: "20140301", value: Math.floor(Math.random() * 1600) + 1500},
        { date: "20140302", value: Math.floor(Math.random() * 1600) + 1500},
        { date: "20140303", value: Math.floor(Math.random() * 1600) + 1500},
        { date: "20140304", value: Math.floor(Math.random() * 1600) + 1500},
        { date: "20140305", value: Math.floor(Math.random() * 1600) + 1500},
        { date: "20140306", value: Math.floor(Math.random() * 1600) + 1500},
        { date: "20140307", value: 1551}
    ]},
    { source: 109, target: 201, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2700) + 2500},
        { date: "20140302", value: Math.floor(Math.random() * 2700) + 2500},
        { date: "20140303", value: Math.floor(Math.random() * 2700) + 2500},
        { date: "20140304", value: Math.floor(Math.random() * 2700) + 2500},
        { date: "20140305", value: Math.floor(Math.random() * 2700) + 2500},
        { date: "20140306", value: Math.floor(Math.random() * 2700) + 2500},
        { date: "20140307", value: 2556}
    ]},

    { source: 102, target: 206, data: [
        { date: "20140301", value: Math.floor(Math.random() * 5930) + 5926},
        { date: "20140302", value: Math.floor(Math.random() * 5930) + 5926},
        { date: "20140303", value: Math.floor(Math.random() * 5930) + 5926},
        { date: "20140304", value: Math.floor(Math.random() * 5930) + 5926},
        { date: "20140305", value: Math.floor(Math.random() * 5930) + 5926},
        { date: "20140306", value: Math.floor(Math.random() * 5930) + 5926},
        { date: "20140307", value: 5926}
    ]},
    { source: 103, target: 206, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2890) + 2887},
        { date: "20140302", value: Math.floor(Math.random() * 2890) + 2887},
        { date: "20140303", value: Math.floor(Math.random() * 2890) + 2887},
        { date: "20140304", value: Math.floor(Math.random() * 2890) + 2887},
        { date: "20140305", value: Math.floor(Math.random() * 2890) + 2887},
        { date: "20140306", value: Math.floor(Math.random() * 2890) + 2887},
        { date: "20140307", value: 2887}
    ]},
    { source: 105, target: 206, data: [
        { date: "20140301", value: Math.floor(Math.random() * 550) + 499},
        { date: "20140302", value: Math.floor(Math.random() * 550) + 499},
        { date: "20140303", value: Math.floor(Math.random() * 550) + 499},
        { date: "20140304", value: Math.floor(Math.random() * 550) + 499},
        { date: "20140305", value: Math.floor(Math.random() * 550) + 499},
        { date: "20140306", value: Math.floor(Math.random() * 550) + 499},
        { date: "20140307", value: 499}
    ]},

    { source: 103, target: 205, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2990) + 2970},
        { date: "20140302", value: Math.floor(Math.random() * 2990) + 2970},
        { date: "20140303", value: Math.floor(Math.random() * 2990) + 2970},
        { date: "20140304", value: Math.floor(Math.random() * 2990) + 2970},
        { date: "20140305", value: Math.floor(Math.random() * 2990) + 2970},
        { date: "20140306", value: Math.floor(Math.random() * 2990) + 2970},
        { date: "20140307", value: 2986}
    ]},
    { source: 105, target: 205, data: [
        { date: "20140301", value: Math.floor(Math.random() * 900) + 830},
        { date: "20140302", value: Math.floor(Math.random() * 900) + 830},
        { date: "20140303", value: Math.floor(Math.random() * 900) + 830},
        { date: "20140304", value: Math.floor(Math.random() * 900) + 830},
        { date: "20140305", value: Math.floor(Math.random() * 900) + 830},
        { date: "20140306", value: Math.floor(Math.random() * 900) + 830},
        { date: "20140307", value: 837}
    ]},
    { source: 106, target: 205, data: [
        { date: "20140301", value: Math.floor(Math.random() * 450) + 420},
        { date: "20140302", value: Math.floor(Math.random() * 450) + 420},
        { date: "20140303", value: Math.floor(Math.random() * 450) + 420},
        { date: "20140304", value: Math.floor(Math.random() * 450) + 420},
        { date: "20140305", value: Math.floor(Math.random() * 450) + 420},
        { date: "20140306", value: Math.floor(Math.random() * 450) + 420},
        { date: "20140307", value: 420}
    ]},

    { source: 103, target: 204, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2560) + 2557},
        { date: "20140302", value: Math.floor(Math.random() * 2560) + 2557},
        { date: "20140303", value: Math.floor(Math.random() * 2560) + 2557},
        { date: "20140304", value: Math.floor(Math.random() * 2560) + 2557},
        { date: "20140305", value: Math.floor(Math.random() * 2560) + 2557},
        { date: "20140306", value: Math.floor(Math.random() * 2560) + 2557},
        { date: "20140307", value: 2557}
    ]},

    { source: 110, target: 202, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2200) + 2175},
        { date: "20140302", value: Math.floor(Math.random() * 2200) + 2175},
        { date: "20140303", value: Math.floor(Math.random() * 2200) + 2175},
        { date: "20140304", value: Math.floor(Math.random() * 2200) + 2175},
        { date: "20140305", value: Math.floor(Math.random() * 2200) + 2175},
        { date: "20140306", value: Math.floor(Math.random() * 2200) + 2175},
        { date: "20140307", value: 2175}
    ]},
    { source: 102, target: 202, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2600) + 2580},
        { date: "20140302", value: Math.floor(Math.random() * 2600) + 2580},
        { date: "20140303", value: Math.floor(Math.random() * 2600) + 2580},
        { date: "20140304", value: Math.floor(Math.random() * 2600) + 2580},
        { date: "20140305", value: Math.floor(Math.random() * 2600) + 2580},
        { date: "20140306", value: Math.floor(Math.random() * 2600) + 2580},
        { date: "20140307", value: 2576}
    ]},
    { source: 103, target: 202, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2400) + 2388},
        { date: "20140302", value: Math.floor(Math.random() * 2400) + 2388},
        { date: "20140303", value: Math.floor(Math.random() * 2400) + 2388},
        { date: "20140304", value: Math.floor(Math.random() * 2400) + 2388},
        { date: "20140305", value: Math.floor(Math.random() * 2400) + 2388},
        { date: "20140306", value: Math.floor(Math.random() * 2400) + 2388},
        { date: "20140307", value: 2388}
    ]},
    { source: 109, target: 202, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2400) + 2100},
        { date: "20140302", value: Math.floor(Math.random() * 2400) + 2100},
        { date: "20140303", value: Math.floor(Math.random() * 2400) + 2100},
        { date: "20140304", value: Math.floor(Math.random() * 2400) + 2100},
        { date: "20140305", value: Math.floor(Math.random() * 2400) + 2100},
        { date: "20140306", value: Math.floor(Math.random() * 2400) + 2100},
        { date: "20140307", value: 2369}
    ]},
    { source: 111, target: 202, data: [
        { date: "20140301", value: Math.floor(Math.random() * 1770) + 1700},
        { date: "20140302", value: Math.floor(Math.random() * 1770) + 1700},
        { date: "20140303", value: Math.floor(Math.random() * 1770) + 1700},
        { date: "20140304", value: Math.floor(Math.random() * 1770) + 1700},
        { date: "20140305", value: Math.floor(Math.random() * 1770) + 1700},
        { date: "20140306", value: Math.floor(Math.random() * 1770) + 1700},
        { date: "20140307", value: 1755}
    ]},

    { source: 110, target: 203, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2750) + 2746},
        { date: "20140302", value: Math.floor(Math.random() * 2750) + 2746},
        { date: "20140303", value: Math.floor(Math.random() * 2750) + 2746},
        { date: "20140304", value: Math.floor(Math.random() * 2750) + 2746},
        { date: "20140305", value: Math.floor(Math.random() * 2750) + 2746},
        { date: "20140306", value: Math.floor(Math.random() * 2750) + 2746},
        { date: "20140307", value: 2746}
    ]},
    { source: 102, target: 203, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2502) + 2452},
        { date: "20140302", value: Math.floor(Math.random() * 2502) + 2452},
        { date: "20140303", value: Math.floor(Math.random() * 2502) + 2452},
        { date: "20140304", value: Math.floor(Math.random() * 2502) + 2452},
        { date: "20140305", value: Math.floor(Math.random() * 2502) + 2452},
        { date: "20140306", value: Math.floor(Math.random() * 2502) + 2452},
        { date: "20140307", value: 2452}
    ]},
    { source: 103, target: 203, data: [
        { date: "20140301", value: Math.floor(Math.random() * 2870) + 2780},
        { date: "20140302", value: Math.floor(Math.random() * 2870) + 2780},
        { date: "20140303", value: Math.floor(Math.random() * 2870) + 2780},
        { date: "20140304", value: Math.floor(Math.random() * 2870) + 2780},
        { date: "20140305", value: Math.floor(Math.random() * 2870) + 2780},
        { date: "20140306", value: Math.floor(Math.random() * 2870) + 2780},
        { date: "20140307", value: 2780}
    ]},
    { source: 111, target: 203, data: [
        { date: "20140301", value: Math.floor(Math.random() * 3500) + 2900},
        { date: "20140302", value: Math.floor(Math.random() * 3500) + 2900},
        { date: "20140303", value: Math.floor(Math.random() * 3500) + 2900},
        { date: "20140304", value: Math.floor(Math.random() * 3500) + 2900},
        { date: "20140305", value: Math.floor(Math.random() * 3500) + 2900},
        { date: "20140306", value: Math.floor(Math.random() * 3500) + 2900},
        { date: "20140307", value: 3007}
    ]},
];

// value data
var revenueData = [
    { source: 102, data: [
        { date: "2008", value: Math.floor(Math.random() * 33) + 28},
        { date: "2009", value: Math.floor(Math.random() * 33) + 28},
        { date: "2010", value: Math.floor(Math.random() * 33) + 28},
        { date: "2011", value: Math.floor(Math.random() * 33) + 28},
        { date: "2012", value: Math.floor(Math.random() * 33) + 28},
        { date: "2013", value: Math.floor(Math.random() * 33) + 28},
        { date: "2014", value: 31.74}
    ]},

    { source: 103, data: [
        { date: "2008", value: Math.floor(Math.random() * 24) + 22},
        { date: "2009", value: Math.floor(Math.random() * 24) + 22},
        { date: "2010", value: Math.floor(Math.random() * 24) + 22},
        { date: "2011", value: Math.floor(Math.random() * 24) + 22},
        { date: "2012", value: Math.floor(Math.random() * 24) + 22},
        { date: "2013", value: Math.floor(Math.random() * 24) + 22},
        { date: "2014", value: 23.15}
    ]},
    { source: 105, data: [
        { date: "2008", value: Math.floor(Math.random() * 28) + 22},
        { date: "2009", value: Math.floor(Math.random() * 28) + 22},
        { date: "2010", value: Math.floor(Math.random() * 28) + 22},
        { date: "2011", value: Math.floor(Math.random() * 28) + 22},
        { date: "2012", value: Math.floor(Math.random() * 28) + 22},
        { date: "2013", value: Math.floor(Math.random() * 28) + 22},
        { date: "2014", value: Math.floor(Math.random() * 28) + 22}
    ]},
    { source: 106, data: [
            { date: "2008", value: Math.floor(Math.random() * 28) + 22},
            { date: "2009", value: Math.floor(Math.random() * 28) + 22},
            { date: "2010", value: Math.floor(Math.random() * 28) + 22},
            { date: "2011", value: Math.floor(Math.random() * 28) + 22},
            { date: "2012", value: Math.floor(Math.random() * 28) + 22},
            { date: "2013", value: Math.floor(Math.random() * 28) + 22},
            { date: "2014", value: Math.floor(Math.random() * 28) + 22}
        ]
    },
    { source: 109, data: [
        { date: "2008", value: Math.floor(Math.random() * 28) + 22},
        { date: "2009", value: Math.floor(Math.random() * 28) + 22},
        { date: "2010", value: Math.floor(Math.random() * 28) + 22},
        { date: "2011", value: Math.floor(Math.random() * 28) + 22},
        { date: "2012", value: Math.floor(Math.random() * 28) + 22},
        { date: "2013", value: Math.floor(Math.random() * 28) + 22},
        { date: "2014", value: Math.floor(Math.random() * 28) + 22}
        ]
    },
    { source: 110, data: [
        { date: "2008", value: Math.floor(Math.random() * 28) + 22},
        { date: "2009", value: Math.floor(Math.random() * 28) + 22},
        { date: "2010", value: Math.floor(Math.random() * 28) + 22},
        { date: "2011", value: Math.floor(Math.random() * 28) + 22},
        { date: "2012", value: Math.floor(Math.random() * 28) + 22},
        { date: "2013", value: Math.floor(Math.random() * 28) + 22},
        { date: "2014", value: Math.floor(Math.random() * 28) + 22}
        ]
    },
    { source: 111, data: [
        { date: "2008", value: Math.floor(Math.random() * 28) + 22},
        { date: "2009", value: Math.floor(Math.random() * 28) + 22},
        { date: "2010", value: Math.floor(Math.random() * 28) + 22},
        { date: "2011", value: Math.floor(Math.random() * 28) + 22},
        { date: "2012", value: Math.floor(Math.random() * 28) + 22},
        { date: "2013", value: Math.floor(Math.random() * 28) + 22},
        { date: "2014", value: Math.floor(Math.random() * 28) + 22}
        ]
    }
];

// personnel data
var personnelData = [
    { measure: "Number of", group: "Airflot", Employees: 30328},
    { measure: "Number of", group: "Air France", Employees: 69553},
    { measure: "Number of", group: "British Airways", Employees: 40563},
    { measure: "Number of", group: "EgyptAir", Employees: 16890},
    { measure: "Number of", group: "Emirates", Employees: 55342},
    { measure: "Number of", group: "Jet Airways", Employees: 13945},
    { measure: "Number of", group: "Kuwait Airways", Employees: 3207},
    { measure: "Number of", group: "Qantas", Employees: 10234},
    { measure: "Number of", group: "Virgin Atlantic", Employees: 2120},
    { measure: "Number of", group: "Air Canada", Employees: 27000},
    { measure: "Number of", group: "US Airways", Employees: 72000}
];

// aircrafts data
var aircraftData = [
    { measure: "Number of", group: "Airflot", "Boeing 777": 10, "Boeing 767": 1, "Airbus 320": 63},
    { measure: "Number of", group: "Air France", "Boeing 777": 37, "Airbus 320": 53, "Airbus 380": 10},
    { measure: "Number of", group: "British Airways", "Boeing 777": 12, "Boeing 767": 21, "Airbus 320": 57, "Airbus 380": 8},
    { measure: "Number of", group: "EgyptAir", "Boeing 777": 6, "Airbus 320": 7},
    { measure: "Number of", group: "Emirates", "Boeing 777": 101, "Airbus 380": 55},
    { measure: "Number of", group: "Jet Airways", "Boeing 777": 10, "Airbus 320": 8},
    { measure: "Number of", group: "Kuwait Airways", "Boeing 777": 2, "Airbus 320": 3},
    { measure: "Number of", group: "Qantas", "Boeing 767": 6, "Airbus 380": 12},
    { measure: "Number of", group: "Virgin Atlantic", "Boeing 777": 1, "Airbus 320": 4},
    { measure: "Number of", group: "Air Canada", "Boeing 777": 17, "Boeing 767": 21, "Airbus 320": 41},
    { measure: "Number of", group: "US Airways", "Boeing 767": 5, "Airbus 320": 64}
];
