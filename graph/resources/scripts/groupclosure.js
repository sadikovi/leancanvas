var GroupClosure = function() {
    return {
        getGroup: function(price, maxPrice) {
            var a = ((maxPrice-price) / maxPrice) * 100;
            if (a >= 60) {
                // priority high
                return { group: "priority-high", threshold: 11 + Math.floor(Math.sqrt(a-60))};
            } else if (a >= 50) {
                // priority one
                return { group: "priority-one", threshold: 9 + Math.floor(Math.sqrt(a-50))};
            } else if (a >= 30) {
                // priority two
                return { group: "priority-two", threshold: 7 + Math.floor(Math.sqrt(a-30))};
            } else if (a >= 20) {
                // priority three
                return { group: "priority-three", threshold: 5 + Math.floor(Math.sqrt(a-20))};
            } else if (a >= 10) {
                // priority four
                return { group: "priority-one", threshold: 3 + Math.floor(Math.sqrt(a-10))};
            } else {
                // priority normal
                return { group: "priority-normal", threshold: 1 + ((a>0)?Math.floor(Math.sqrt(a)):0)};
            }
        },

        calculateGroup: function(links) {
            if (links == null || !links.length)
                return links;

            var max = links[0];
            for (var i=1; i<links.length; i++) {
                if (links[i].price > max.price) {
                    max = links[i];
                }
            }

            var res = [];
            for (var i=0; i<links.length; i++) {
                var l = links[i];
                var temp = GroupClosure.getGroup(l.price, max.price);
                l.group = temp.group;
                l.threshold = temp.threshold;
                res.push(l);
            }

            return res;
        }
    }
}();
