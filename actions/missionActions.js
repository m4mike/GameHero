var utils = require("../ils")

exports.missions = {
    name: 'missionsList',
    description: 'List all missions',
    outputExample: null,
    
    run: function (api, action, next) {
        var data = new require("../data").init(api);

        data.missions.getMissions(function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null || result.length == 0) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                    return;
                }
                var collection = new utils.HyperJson({
                    _items : result
                            
                });
                collection.addSelfIdsToItems(utils.host + "/api/mission/byId/" , "_id");
                action.response = collection.toObject();
                next();
            }
        });
     }
};


exports.missionsForApp = {
    name: 'missionsForApp',
    description: 'List all missions for an Application',
    outputExample: null,
    inputs: {
        appId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.appId;
        var data = require('../data').init(api);
        data.missions.getMissionsForApp(id, function (err, result) {
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
                    _items : result
                            
                });
                collection.addSelfIdsToItems(utils.host + "/api/mission/byId/" , "_id");
                action.response = collection.toObject();
                next();
            }
        });
    }
};

