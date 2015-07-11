module.exports = {
    startPriority: 200,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        api.data = require("../data").init(api);
        api.data.interests = require("../data/interestData.js").init(api);
        api.data.seed();
        
        //var bluebird = require('bluebird');
        //bluebird.promisifyAll(api.redis.client);

        next();
    }
}