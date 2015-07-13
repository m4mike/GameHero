var _ = require('lodash');

module.exports = {
    startPriority: 700,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        api.log("Initialisation of api data");
        api.data = require("../data").init(api);
        
        
      
        
        var client = api.redis.client;
        
        var key;
        client.keys("urn:cat:fr:*", function (err, kk) {
            
            if (kk == null || !_.isArray(kk) || kk.length == 0) {
                api.log("Seeding interests to redis");
                var interests = require('../data/seedInterests.js');
                interests.interests.forEach(function (item) {
                    var urn = "urn:cat:fr:"  + item.cat
                    client.sadd(urn, item.items);
                    item.items.forEach(function (i) {
                        client.sadd("urn:tag:fr:" + i, item.cat)
                    });
        
                });

            }

        });
            
   
        next();
    }
}