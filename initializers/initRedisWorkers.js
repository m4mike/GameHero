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
                console.log("Worker : " + kk.slice(0,20) );
                var d = new moment(val,'ddd MMM D YYYY HH:mm:ss GMT+DDYY (UTC)');
                var td = new moment();

                console.log('started : ' + d.fromNow() + 'diff:'  + d.diff(td, 'days'));

                if (d.diff(td, 'days') < -1) {
                    console.log('...deleting');
                }
                else
                    console.log('...worker is current')
            })

          

        });
        
        
        next();
    }
}