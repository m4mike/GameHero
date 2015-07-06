var utils = require("../utils")
var data = require("../data");
var logic = require("../logic");
//var auth = require("../auth");
var utils = require("../utils")

exports.quests = {
    name: 'questsActions',
    description: 'List possible actions on quests',
    outputExample: null,
    
    run: function (api, connection, next) {
        
        var collection = new utils.hyperJson();
        collection.link("All Quests", utils.host + "/api/quests/all")
            .link("For Mission", utils.host + "/api/quests/forMission/missionId")
            .link("For App", utils.host + "/api/quests/forApp/appId");
        
        connection.response = collection.toObject();
        connection.response.error = null;
        
        next();
    }
    
};

exports.questsForMission = {
    name: 'questsForMission',
    description: 'List possible quests for a mission',
    inputs: {
        missionId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, connection, next) {
        var missionId = connection.params.missionId;
        
        data.quests.getQuestsForMissionId(missionId, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        connection.rawConnection.responseHttpCode = "404";
                        next(new Error("Mission not found: " + missionId));
                        return;
                    }
                    var collection = new utils.hyperJson({
                        _items : result
                            
                    });
                    collection.addSelfIdsToItems(utils.host + "/api/quests/" , "_id");
                    connection.response = collection.toObject();
                    next();
                }
            }
        });
        
    }
};

exports.questsForMission = {
    name: 'questsForApp',
    description: 'List possible quests for a application',
    inputs: {
        appId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, connection, next) {
        var appId = connection.params.appId;
        
        data.quests.getQuestsForApp(appId, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    onnection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    var collection = new utils.hyperJson({
                        _items : result
                            
                    });
                    collection.addSelfIdsToItems(utils.host + "/api/quests/" , "_id");
                    connection.response = collection.toObject();
                    next();
                }
            }
        });
        
    }
};



