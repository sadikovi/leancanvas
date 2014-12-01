// data
var data = {
    sources: [
        {id: 1001, name: "Alex", desc: "...", type: "source", value: 140, target: 21, isUni: false},
        {id: 1002, name: "Brian", desc: "...", type: "source", value: 200, target: 21, isUni: false},
        {id: 1003, name: "Cody", desc: "...", type: "source", value: 900, target: 22, isUni: false}
    ],
    targets: [
        {id: 0, name: "All subdivisions", desc: "...", parent: null, level: 0, leaf: false, isUni: true, isCollapsed: true, children: [
                {id: 1, name: "Subdivision A", desc: "...", parent: 0, level: 1, leaf: false, isUni: true, isCollapsed: true, children: [
                        {id: 11, name: "District A1", desc: "...", parent: 1, level: 2, leaf: true, isUni: true, isCollapsed: true, children: []},
                        {id: 12, name: "District A2", desc: "...", parent: 1, level: 2, leaf: true, isUni: true, isCollapsed: true, children: []}
                    ]
                },
                {id: 2, name: "Subdivision B", desc: "...", parent: 0, level: 1, leaf: false, isUni: true, isCollapsed: true, children: [
                        {id: 21, name: "District B1", desc: "...", parent: 2, level: 2, leaf: true, isUni: true, isCollapsed: true, children: []},
                        {id: 22, name: "District B2", desc: "...", parent: 2, level: 2, leaf: true, isUni: true, isCollapsed: true, children: []}
                    ]
                }
            ]
        }
    ]
};

// default level of graph is 0
var defaultLevel = 0;
