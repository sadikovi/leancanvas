// data
var data = {
    sources: [
        {id: 1001, name: "Avondale, 4 bedrooms", desc: "4 bedroom townhouse with 2 bathrooms.", type: "source", value: 210, target: 111, isUni: false, properties:{
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1002, name: "Avondale, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 150, target: 111, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1003, name: "Avondale, 5 bedrooms", desc: "5 bedroom house with 1 bathroom.", type: "source", value: 100, target: 111, isUni: false, properties: {
            bedrooms: 5,
            bathrooms: 1,
            link: "https://angel.co"
        }},

        {id: 1004, name: "City Centre, 1 bedroom", desc: "1 bedroom apartment with 1 bathroom.", type: "source", value: 80, target: 112, isUni: false, properties: {
            bedrooms: 1,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1005, name: "City Centre, 3 bedrooms", desc: "3 bedroom apartment with 2 bathrooms.", type: "source", value: 275, target: 112, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1006, name: "City Centre, 2 bedrooms", desc: "2 bedroom apartment with 2 bathrooms.", type: "source", value: 120, target: 112, isUni: false, properties: {
            bedrooms: 2,
            bathrooms: 2,
            link: "https://angel.co"
        }},

        {id: 1007, name: "Greenlane, 4 bedrooms", desc: "4 bedroom house with 1 bathroom.", type: "source", value: 180, target: 113, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1008, name: "Greenlane, 5 bedrooms", desc: "5 bedroom house with 2 bathrooms.", type: "source", value: 150, target: 113, isUni: false, properties: {
            bedrooms: 5,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1009, name: "Greenlane, 3 bedrooms", desc: "3 bedroom house with 2 bathrooms.", type: "source", value: 180, target: 113, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},

        {id: 1010, name: "Albany, 5 bedrooms", desc: "5 bedroom house with 3 bathrooms.", type: "source", value: 135, target: 121, isUni: false, properties: {
            bedrooms: 5,
            bathrooms: 3,
            link: "https://angel.co"
        }},
        {id: 1011, name: "Albany, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 210, target: 121, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1012, name: "Albany, 5 bedrooms", desc: "5 bedroom house with 3 bathrooms.", type: "source", value: 150, target: 121, isUni: false, properties: {
            bedrooms: 5,
            bathrooms: 3,
            link: "https://angel.co"
        }},

        {id: 1013, name: "Birkenhead, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 160, target: 122, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1014, name: "Birkenhead, 3 bedrooms", desc: "3 bedroom townhouse with 1 bathroom.", type: "source", value: 150, target: 122, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1015, name: "Birkenhead, 3 bedrooms", desc: "3 bedroom house with 2 bathrooms.", type: "source", value: 275, target: 122, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},

        {id: 1016, name: "Glenfield, 3 bedrooms", desc: "3 bedroom house with 2 bathrooms.", type: "source", value: 180, target: 123, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1017, name: "Glenfield, 4 bedrooms", desc: "4 bedroom house with 1 bathroom.", type: "source", value: 130, target: 123, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1018, name: "Glenfield, 3 bedrooms", desc: "3 bedroom house with 2 bathrooms.", type: "source", value: 150, target: 123, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},

        {id: 1019, name: "Addington, 3 bedrooms", desc: "3 bedroom unit with 1 bathroom.", type: "source", value: 150, target: 211, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1020, name: "Addington, 4 bedrooms", desc: "4 bedroom house with 1 bathroom.", type: "source", value: 165, target: 211, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1021, name: "Addington, 3 bedrooms", desc: "3 bedroom townhouse with 2 bathrooms.", type: "source", value: 160, target: 211, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},

        {id: 1022, name: "City Centre, 2 bedrooms", desc: "2 bedroom unit with 1 bathroom.", type: "source", value: 190, target: 212, isUni: false, properties: {
            bedrooms: 2,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1023, name: "City Centre, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 160, target: 212, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1024, name: "City Centre, 3 bedrooms", desc: "3 bedroom townhouse with 3 bathrooms.", type: "source", value: 100, target: 212, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 3,
            link: "https://angel.co"
        }},

        {id: 1025, name: "Ilam, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 160, target: 213, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1026, name: "Ilam, 3 bedrooms", desc: "3 bedroom house with 1 bathroom.", type: "source", value: 170, target: 213, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1027, name: "Ilam, 4 bedrooms", desc: "4 bedroom house with 1 bathroom.", type: "source", value: 100, target: 213, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 1,
            link: "https://angel.co"
        }},

        {id: 1028, name: "Lincoln, 2 bedrooms", desc: "2 bedroom lifestyle block with 1 bathroom.", type: "source", value: 140, target: 221, isUni: false, properties: {
            bedrooms: 2,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1029, name: "Lincoln, 4 bedrooms", desc: "4 bedroom house with 1 bathroom.", type: "source", value: 138, target: 221, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1030, name: "Lincoln, 3 bedrooms", desc: "3 bedroom house with 1 bathroom.", type: "source", value: 120, target: 221, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 1,
            link: "https://angel.co"
        }},

        {id: 1031, name: "Prebbleton, 6+ bedrooms", desc: "6 or more bedroom lifestyle block with 3 bathrooms.", type: "source", value: 130, target: 222, isUni: false, properties: {
            bedrooms: 6,
            bathrooms: 3,
            link: "https://angel.co"
        }},
        {id: 1032, name: "Prebbleton, 3 bedrooms", desc: "3 bedroom house with 1 bathroom.", type: "source", value: 130, target: 222, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 1,
            link: "https://angel.co"
        }},
        {id: 1033, name: "Prebbleton, 3 bedrooms", desc: "3 bedroom house with 1 bathroom.", type: "source", value: 160, target: 222, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 1,
            link: "https://angel.co"
        }},

        {id: 1034, name: "Rolleston, 3 bedrooms", desc: "3 bedroom house with 2 bathrooms.", type: "source", value: 160, target: 223, isUni: false, properties: {
            bedrooms: 3,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1035, name: "Rolleston, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 135, target: 223, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }},
        {id: 1036, name: "Rolleston, 4 bedrooms", desc: "4 bedroom house with 2 bathrooms.", type: "source", value: 180, target: 223, isUni: false, properties: {
            bedrooms: 4,
            bathrooms: 2,
            link: "https://angel.co"
        }}
    ],
    targets: [
        {id: 0, name: "All regions", desc: "...", parent: null, level: 0, leaf: false, isUni: true, isCollapsed: true, children: [
                {id: 1, name: "Auckland", desc: "...", parent: 0, level: 1, leaf: false, isUni: true, isCollapsed: true, children: [
                        {id: 11, name: "Auckland City", desc: "...", parent: 1, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 111, name: "Avondale", desc: "...", parent: 11, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 112, name: "City Centre", desc: "...", parent: 11, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 113, name: "Greenlane", desc: "...", parent: 11, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        },
                        {id: 12, name: "North Shore City", desc: "...", parent: 1, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 121, name: "Albany", desc: "...", parent: 12, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 122, name: "Birkenhead", desc: "...", parent: 12, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 123, name: "Glenfield", desc: "...", parent: 12, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        }
                    ]
                },
                {id: 2, name: "Canterbury", desc: "...", parent: 0, level: 1, leaf: false, isUni: true, isCollapsed: true, children: [
                        {id: 21, name: "Chrishchurch City", desc: "...", parent: 2, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 211, name: "Addington", desc: "...", parent: 21, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 212, name: "City Centre", desc: "...", parent: 21, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 213, name: "Ilam", desc: "...", parent: 21, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        },
                        {id: 22, name: "Selwyn", desc: "...", parent: 2, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 221, name: "Lincoln", desc: "...", parent: 22, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 222, name: "Prebbleton", desc: "...", parent: 22, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 223, name: "Rolleston", desc: "...", parent: 22, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// default level of graph is 0
data.defaultLevel = 0;

// default relative value
data.default_value = 150;

// contain array of all the nodes in the graph
data.arrayOfNodes = data.arrayOfNodes || (function() {
    if (!data.sources || !data.targets) {
        throw ("Data: sources or targets array is not defined");
    }

    // have to copy array (! is not a good idea at all)
    var result = [];
    for (var i=0; i<data.sources.length; i++) {
        result.push(data.sources[i]);
    }

    // transform targets
    var recurReading = function(array, node) {
        if (node == null) {
            return false;
        }

        array.push(node);
        if (node.leaf || node.children.length == 0) {
            return false;
        }

        var children = node.children;
        for (var i=0; i<children.length; i++) {
            recurReading(array, children[i]);
        }
    }

    // fill result with targets
    for (var j=0; j<data.targets.length; j++) {
        recurReading(result, data.targets[j]);
    }

    return result;
})();
