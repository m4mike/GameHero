var _ = require('lodash');
var moment = require('moment');

module.exports = {
    startPriority: 1200,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        
      
        
        var client = api.redis.client;
        
        var key;
        client.keys("resque:worker:*", function (err, kk) {
            
           
            client.get(kk, function (err, val) {
                console.log("Worker : " + kk + " val :" + val);
                var d = new moment(val,'MMM D YYYY MM:mm:ss');
                var td = new moment();

                console.log('started : ' + d.fromNow());
                if (d.diff(td, 'days') < -1) {
                    console.log('deleting');
                }
            })

          

        });
        
        
        next();
    }
}