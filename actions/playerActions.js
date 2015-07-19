var utils = require("../utils")


exports.players = {
    name: 'playerActions',
    description: 'List possible actions on players',
    domain:"player",
    outputExample: null,
    
    run: function (api, action, next) {
      
        var collection = new utils.HyperJson();
        collection.link("Find player by id", api.serverUrl + "/api/players/byId/:playerId")
            .link("Delete player", api.serverUrl + "-delete-/api/players/:playerId");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.playerById = {
    name: 'playerById',
    description: 'Get player by Id',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.playerId;
        
        api.data.players.getById(id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    //var collection = new utils.HyperJson({
                    //    _items : result
                            
                    //});
                    //collection.addSelfIdsToItems(api.serverUrl + "/api/players/getById/" , "_id");
                    action.response = result;
                    next();
                }
            }
        });
        
    }
};

exports.playersForApp = {
    name: 'playersForApp',
    description: 'get all players for an app',
    inputs: {
        idApp: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.idApp;
        
        api.data.players.playersForApp(id, function (err, result) {
            if (err)  return next(err); 
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
                collection.addSelfIdsToItems(api.serverUrl + "/api/players/byId/" , "_id");
                action.response = result;
                next();
            }
            
        });
        
    }
};



exports.playerDelete = {
    name: 'playerDelete',
    description: 'Delete player by Id',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        var id = action.params.playerId;
        
        api.data.players.deleteById(id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    action.response = result.result;
                    next();
                }
            }
        });
        
    }
};





