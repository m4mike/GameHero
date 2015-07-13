var utils = require("../utils")

var _ = require('lodash');

exports.debugtest = {
    name: 'debugtest',
    description: 'just to debug ',
    outputExample: null,
    
    run: function (api, action, done) {
        
     
            api.data.interests.getRandomInterestsForCat('fr',"Autres",5, function (err, data) {
            console.log(JSON.stringify(data));
            
                   action.response = data;
             
               done();
            })
    }
           
               
                  
               
        
         
    
    
};
