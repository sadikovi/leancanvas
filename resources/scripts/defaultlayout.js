/*
 * Default layout for body wrapper [columns-directories-notes]
 *
 */

var DEFAULT_LAYOUT = {
    "data": [
        {
            "type": "domain",
            "id": "domain1",
            "children": [
                {
                    "type": "column",
                    "id": "column1",
                    "children": [
                        {
                            "type": "directory",
                            "id": "canvas_problem",
                            "name": "Problem",
                            "placeholder": "Top 3 problems...",
                            "children": []
                        }
                    ]
                },
                {
                    "type": "column",
                    "id": "column2",
                    "children": [
                        {
                            "type": "directory",
                            "id": "canvas_solution",
                            "name": "Solution",
                            "placeholder": "Top 3 features...",
                            "children": []
                        },
                        {
                            "type": "directory",
                            "id": "canvas_key_metrics",
                            "name": "Key metrics",
                            "placeholder": "Key activities you measure...",
                            "children": []
                        }
                    ]
                },
                {
                    "type": "column",
                    "id": "column3",
                    "children": [
                        {
                            "type": "directory",
                            "id": "canvas_unique_value_proposition",
                            "name": "Unique value proposition",
                            "placeholder": "Single, clear, compelling message that states why you are different and worth buying...",
                            "children": []
                        }
                    ]
                },
                {
                    "type": "column",
                    "id": "column4",
                    "children": [
                        {
                            "type": "directory",
                            "id": "canvas_unfair_advantage",
                            "name": "Unfair advantage",
                            "placeholder": "Cannot be easily copied or bought...",
                            "children": []
                        },
                        {
                            "type": "directory",
                            "id": "canvas_channels",
                            "name": "Channels",
                            "placeholder": "Path to customers...",
                            "children": []
                        }
                    ]
                },
                {
                    "type": "column",
                    "id": "column5",
                        "children": [
                        {
                            "type": "directory",
                            "id": "canvas_customer_segments",
                            "name": "Customer segments",
                            "placeholder": "Target customers...",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "type": "domain",
            "id": "domain1",
            "children": [
                {
                    "type": "column",
                    "id": "column1b",
                    "children": [
                        {
                            "type": "directory",
                            "id": "canvas_cost_structure",
                            "name": "Cost structure",
                            "placeholder": "Customer Acquisition Costs\r\nDistribution Costs\r\nHosting\r\nPeople, etc...",
                            "children": []
                        }
                    ]
                },
                {
                    "type": "column",
                    "id": "column2b",
                    "children": [
                        {
                            "type": "directory",
                            "id": "canvas_revenue_streams",
                            "name": "Revenue streams",
                            "placeholder": "Revenue Model\r\nLife Time Value\r\nRevenue\r\nGross Margin...",
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
};
