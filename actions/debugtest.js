var utils = require("../utils")
var async = require('async');
var _ = require('lodash');

exports.debugtest = {
    name: 'debugtest',
    description: 'just to debug ',
    outputExample: null,
    
    run: function (api, action, done) {
        
        
        api.data.users.addInterest("u3", "fr", "test", "iii", function (err, data) {
            console.log(data);
            
            api.data.users.removeInterest("u3", "fr", "test", "iii", function (err1, data1) {
                
                
               
                    action.response = data1;
                    done();
               
            });
         });
    }
    
};
