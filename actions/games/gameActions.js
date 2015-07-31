var utils = require("../../utils")
//var events = require('events');
//var util = require('util');

exports.games = {
    name: 'gameActions',
    description: 'List possible actions on games',
    outputExample: null,
    
    run: function (api, action, next) {
        
        var collection = new utils.HyperJson();
        collection.link("all games", api.serverUrl + "/api/games/all")
            .link("list games for an app", api.serverUrl + "/api/games/forApp");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.allGames = {
    name: 'allGames',
    description: 'Get all games',
   
    
    run: function (api, action, next) {
               
        api.data.games.getAll( function (err, result) {
            if (err)  next(err);
            else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    var hj = new utils.HyperJson({
                        ok:1,            
                        _items : result
                    
                    });
                    hj.addSelfIdsToItems(api.serverUrl + "/api/games/byId/" , "_id");
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};

exports.gamesForApp = {
    name: 'gamesForApp',
    description: 'get all games for an app, try appId : app_mlg',
    inputs: {
        idApp: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.idApp;
        
        api.data.games.gamesForApp(id, function (err, result) {
            if (err) return next(err);
            if (result == null) {
                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            } else {
                if (result.length == 0) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    return next(new Error("not found: " + id));
                    
                }
                var collection = new utils.HyperJson({
                    _items : result
                    
                });
                collection.addSelfIdsToItems(api.serverUrl + "/api/games/byId/" , "");
                action.response = collection.toObject();
                next();
            }
            
        });
        
    }
};




