process.env.FAKEREDIS = 'false';

var redis = require("redis");
 var  client = redis.createClient();
var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(client);

var results = [];
 


// All your redis commands return promises now.
client.keysAsync("urn:Cat*")
    .then(function(keys){
        console.log(keys);
        for (var i = 0, len = keys.length; i < len; i++) {
            client.smembersAsync(keys[i]).then(function(members){
            var o = { Cat: keys[i], items: members };
            console.log(" delayed" + keys[i]);
                results.push(o);
            }).catch(function(ee){
                console.log(ee)})
        };
    console.log('result');
    console.log(JSON.stringify(results));


    })
    
        
    .catch(function(err){
        console.log(err)});
 
 console.log(4)

 
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

 
   



