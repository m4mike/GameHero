var utils = require("../utils")

exports.missions = {
    name: 'missions',
    description: 'List all actions on missions',
    outputExample: null,
    
    run: function (api, action, next) {
        
        
        var collection = new utils.HyperJson();
        collection
            .link("By id", api.serverUrl + "/api/missions/byId/idMission")
            .link("For App", api.serverUrl + "/api/missions/forApp/idApp");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
};




exports.missionsForApp = {
    name: 'missionsForApp',
    description: 'List all missions for an Application, try app_mlg',
    outputExample: null,
    inputs: {
        idApp: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.idApp;
         api.data.missions.getMissionsForApp(id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null || result.length == 0) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                    return;
                }
                if (typeof result == 'object') result = [result];
                var collection = new utils.HyperJson({
                    ok:1, _result : result
                            
                });
                collection.addSelfIdsToItems(api.serverUrl + "/api/mission/byId/" , "_id");
                action.response = collection.toObject();
                next();
            }
        });
    }
};


exports.missionById = {
    name: 'missionById',
    description: 'Get mision by Id, try mmacarons',
    outputExample: null,
    inputs: {
        idMission: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        api.data.missions.getById(action.params.idMission, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null || result.length == 0) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                    return;
                }
                action.response = { ok: 1, _result: result };
                next();
            }
        });
    }
};

