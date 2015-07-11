(function (expo) //initialises module.exports
{
    
    var async = require("async");
    var data = new require("../data")(api);
    var users = require("../data/seedData.js").users;
    var _ = require("lodash");
    
      
    
    expo.init = function (api) {
     expo.user = {};
        expo.user.getCounterValue = function (user,counter) {
            return user.counters[counter];
        };
        expo.something = {};
        

    

    }//init
})(module.exports);