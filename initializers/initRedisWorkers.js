//var _ = require('lodash');
//var moment = require('moment');

//module.exports = {
//    startPriority: 1200,
//    stopPriority: 1000,
//    loadPriority: 1000,
//    initialize: function (api, next) {
        
      
        
//        var client = api.redis.client;
        
//        var key;
//        client.keys("resque:worker:*", function (err, kk) {
            
//            _.forEach(kk, function (k) {
//                client.get(k, function (err, val) {
//                    console.log("Worker : " + k.slice(0, 20));
//                    var d = new moment(val, 'ddd MMM D YYYY HH:mm:ss GMT+DDYY (UTC)');
//                    var td = new moment();
//                    var kar = k.split(':');
//                    var kkk = kar[2]+":"+kar[3];
//                    console.log('started : ' + d.fromNow() + 'diff:' + d.diff(td, 'hours'));
                    
//                    if (d.diff(td, 'hours') < -1) {
//                        client.del(k, function (err, res) {
//                            client.srem('resque:workers', kkk, function (err, sres) {
//                                console.log('deleted key');
//                            })
//                        })
//                    }
//                    else
//                        console.log('...worker is current')
//                })

//            })

//        });
        
        
//        next();
//    }
//}