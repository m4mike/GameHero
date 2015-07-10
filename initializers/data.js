module.exports = {
    startPriority: 1001,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        api.data = require("../data").init(api);
        api.data.seed();
        next();
    }
}