module.exports = {
    startPriority: 200,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        api.log("Initialisation of api data");
        api.data = require("../data").init(api);
        next();
    }
}