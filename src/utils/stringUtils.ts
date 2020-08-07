export default {
    isNullOrUndefined(prop) {
        if (prop == null || prop == undefined || !prop) {
            return true;
        }

        return false;
    },
    split: function(symbol) {
        let str = this;
        let arr = [];

        if (typeof str != 'string') {
            return arr;
        }

        if (!str) {
            return arr;
        }

        str = str.trim();

        if (!str) {
            return arr;
        }
        try {
            str = str.split(symbol);

            str.map(d => {
                d = d.trim();

                if (d && arr.indexOf(d) == -1) {
                    arr.push(d);
                }
            });

            return arr;
        } catch (e) {
            return [];
        }
    },
};
