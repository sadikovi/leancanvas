var AdaptiveSearch = (function() {
    // default obj with values, their magnitudes and polarization
    var obj = {
        a: 1,   ma: 0.6,    pa: -1,
        b: 1,   mb: 0.25,   pb: 1,
        c: 1,   mc: 0.15,   pc: 1
    };

    var A = 0.95; // [0.8 ... 1], every standard magnitude in obj has to be less than A
    var B = 0.05; // [0.001 ... 0.1]
    var C = 10; // [1 ... 10]

    return {
        // at the start call either "init" or "initDefaultValuesOnly"
        // init with an object
        init: function(a) {
            obj = a;
            return false;
        },

        // init with default values only
        initDefaultValuesOnly: function(a, b, c) {
            obj.a = a;
            obj.b = b;
            obj.c = c;
            return false;
        },

        rel: function(a, aa) {
            return (aa*1.0/a);
        },

        polarize: function(p, rel) {
            return (p>0) ? (1/rel) : rel;
        },

        magnitude: function(m, x) {
            if (x > B && x < 1) {
                return (m*(A*(1 - B)/(A - m)))/(x - ((A*B - m)/(A - m)));
            } else if (x == 1) {
                return m;
            } else if (x > 1 && x < C) {
                return ((A - m)/(C*C - 1))*x*x + (m*C*C - A)/(C*C - 1);
            } else {
                // x <= B || x >= C
                return A;
            }
        },

        func: function(x) {
            return 2*x*x + 1;
        },

        estimateValue: function(aa, bb, cc) {
            var x = AdaptiveSearch.polarize(obj.pa, AdaptiveSearch.rel(obj.a, aa));
            var y = AdaptiveSearch.polarize(obj.pb, AdaptiveSearch.rel(obj.b, bb));
            var z = AdaptiveSearch.polarize(obj.pc, AdaptiveSearch.rel(obj.c, cc));

            var ma = obj.ma, mb = obj.mb, mc = obj.mc;
            if (ma >= mb && ma >= mc) {
                ma = AdaptiveSearch.magnitude(ma, x);
                mc = (1-ma)/(1+(mb/mc));
                mb = 1 - ma - mc;
            } else if (mb >= ma && mb >= mc) {
                mb = AdaptiveSearch.magnitude(mb, x);
                mc = (1-mb)/(1+(ma/mc));
                ma = 1 - mb - mc;
            } else {
                mc = AdaptiveSearch.magnitude(mc, x);
                ma = (1-mc)/(1+(mb/ma));
                mb = 1 - ma - mc;
            }

            var Fa = AdaptiveSearch.func(x), Fb = AdaptiveSearch.func(y), Fc = AdaptiveSearch.func(z);
            var v = (ma*Fa + mb*Fb + mc*Fc)/3;
            return Math.round(v*1000)/1000;
        },

        getMidPoint: function() {
            return AdaptiveSearch.estimateValue(obj.a, obj.b, obj.c);
        }
    }
})();
