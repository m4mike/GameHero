var utils = require("../utils")


exports.interestActions = {
    name: 'interestActions',
    description: 'List possible actions on interests',
    domain:"player",
    outputExample: null,
    
    run: function (api, action, next) {
      
        var collection = new utils.HyperJson();
        collection.link("Add interest to system", api.serverUrl + "/api/interests/add/:lang/:cat/:interest")
            .link("Delete interest from system", api.serverUrl + "-delete-/api/interests/:cat/:interest")
          //  .link("Add interest to player", api.serverUrl + "/api/interests/addtoplayer/:cat/:interest/:player")
            .link("Add interest to player", api.serverUrl + "/api/interests/addtoplayer/:lang/:cat/:interest/:player")
            .link("Remove interest from player", api.serverUrl + "/api/interests/removeFromPlayer/:lang/:cat/:interest/:player")
            .link("Remove interest from user", api.serverUrl + "/api/interests/removeFromPlayer/:lang/:cat/:interest/:player")
            .link("Add interest to user", api.serverUrl + "/api/interests/addtoUser/:lang/:cat/:interest/:user");
        
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.listCats = {
    name: 'listCats',
    description: 'List Categories for a language',
    outputExample: null,
    inputs: {
        lang: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        api.data.interests.listCats(action.params.lang, function (err, result) {
            if (err) return next(err);
            
            if (result == null) {
                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            }
            
            
            action.response = { ok: 1, result: result };
            next();
        })
            
    }
};


exports.interestsForCat = {
    name: 'interestsForCat',
    description: 'List interests for an Category',
    outputExample: null,
    inputs: {
        lang: {
            required: true,
            validator: null
        },
        cat: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        api.data.interests.getInterestsForCat(action.params.lang,
                                       action.params.cat,
                                       function (err, result) {
            if (err) return next(err);
            
            if (result == null) {
                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            }
            
            
            action.response = { ok: 1, result: result };
            next();
        })
            
    }   
};


exports.addInterest = {
    name: 'addInterest',
    description: 'Add interest to system',
    inputs: {
        lang: {
            required: true,
            validator: null
        },
        cat: {
            required: true,
            validator: null
        },
        interest: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        
        api.data.interests.addInterest(action.params.lang,
                                       action.params.cat,
                                       action.params.interest,  function (err, result) {
                if (err) return next(err);
            
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    return next(new Error("not found"));
                }
            
            
                action.response = { ok: 1, result: result };
                next();
        })
            
    }   

};
        
    
exports.deleteInterest = {
    name: 'deleteInterest',
    description: 'Delete interest from system',
    inputs: {
        lang: {
            required: true,
            validator: null
        },
        cat: {
            required: true,
            validator: null
        },
        interest: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        
        api.data.interests.removeInterest(action.params.lang,
                                       action.params.cat,
                                       action.params.interest,  function (err, result) {
            if (err) return next(err);
            
            if (result == null) {
                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            }
            
            
            action.response = { ok: 1, result: 'deleted' };
            next();
        })
            
    }

};