process.env.FAKEREDIS = 'false';

var redis = require("redis");
var client = redis.createClient();
var fs = require('fs');

var async = require('async');

var results = [];
 

 
 
var oKeys;

var getMembers = function (key, doneCallback) {
    setTimeout(function () {
        //console.log('getting', key);
        
        client.smembers(key, function (err2, members) {
            //console.log("members in for key ", key);
            return doneCallback(null, {"cat":key, "items":members});
        });
    }, 20 * Math.random());
};

var sRes;
async.series(
    [
        function (cb) {
            client.keys("urn:Cat*", function (err, keys) {
                //console.log('step1');

                oKeys = keys;
                cb();
                return;
            });

        },
        function (cb) {
            console.log('step2');
           // Square each number in the array [1, 2, 3, 4]
            async.map(oKeys, getMembers, function (err, results) {
                // Square has been called on each of the numbers
                // so we're now done!
                console.log("Finished!");
                console.log(results);
                sRes = JSON.stringify(results);
                cb();
            });
            console.log('could be before the end after step2'); 
           
            //  async.each(oKeys, function iterator(item, callback) {
            //      client.smembers(item, function (err2, members){
            //            console.log("members for " + item);
            //      });
            //      callback();
            //  },function(error_or_done){
            //      console.log('should be after step2');
            //      cb(); 
            //  });
        },
        function (cb) {
            console.log('step3'); 
            
            if(sRes == null)
                console.log("result is empty")
            else
                console.log("result lenth : ", sRes.length);
            
            fs.writeFile("./test3.json", sRes , function (err) {
                   console.log("after writefile");
            });
            cb();
        }
    ], function (err) {
        console.log('all done')
    });
 
 
//  
//  function runSample(){
//     client.keys("urn:Cat*", function (err, keys) {
//       if (err) {
//        console.log(err);
//        return
//       }
// 
//       for (var i = 0, len = keys.length; i < len; i++) {
//         var o = { Cat: keys[i], items: [] };
//         result.push();
//         console.log(keys[i]);
//         client.smembers(keys[i], function (err2, members) {
//           for (var j = 0, len2 = members.length; j < len2; j++) {
//             o.items.push(members[j]);
//           }
//           console.log(o);
//           result.push(o);
//         })
//       };
//     });
//     
//      fs.writeFile("./test2.json", JSON.stringify(result), function (err) {
//       if (err) { return console.log(err); }
//       console.log("The file was saved!");
//     });
//     
//  }
//    

 
   



