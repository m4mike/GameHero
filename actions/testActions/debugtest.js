var utils = require("../../utils")

var _ = require('lodash');

exports.debugtest = {
    name: 'debugtest',
    description: 'just to debug ',
    outputExample: null,
    authenticated:true,
    
    run: function (api, action, done) {
        
     
            api.data.interests.getRandomInterestsForCat('fr',"Autres",5, function (err, data) {
            console.log(JSON.stringify(data));
            
                   action.response = { ok: 1, _result: data };
             
               done();
            })
    }
           
               
                  
               
        
         
    
    
};
