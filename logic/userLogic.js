(function (expo) //initialises module.exports
{
    
    var async = require("async");
    var data = require("../data");
    var users = require("../data/seedData.js").users;
    var _ = require("lodash");
    
      
    
    expo.init = function (logic) {
        
             
       
        logic.user = {};
        logic.user.getCounterValue = function (user,counter) {
            return user.counters[counter];
        };

        

    

    }//init
})(module.exports);