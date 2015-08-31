var utils = require("../../utils")
var events = require('events');
var util = require('util');



exports.socialactions = {
    name: 'socialactions',
    description: 'List possible actions for social',
    outputExample: null,
    
    run: function (api, action, next) {
        
        
        var collection = new utils.HyperJson();
        collection.link("Get the wall of a player", api.serverUrl + "/api/social/wall/player/:playerId/:month")
            .link("Get the wall of a player by external id", api.serverUrl + "/api/social/wall/player/:playerId/:month");
           
        
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }

};


