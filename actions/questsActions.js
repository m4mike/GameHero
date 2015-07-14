var utils = require("../utils")



exports.quests = {
    name: 'questsActions',
    description: 'List possible actions on quests',
    outputExample: null,

    run: function (api, action, next) {

        var collection = new utils.HyperJson();
        collection
            .link("For Mission", api.serverUrl + "/api/quests/forMission/idMission")
            .link("For App", api.serverUrl + "/api/quests/forApp/idApp");

        action.response = collection.toObject();
        action.response.error = null;

        next();
    }

};

exports.questsForMission = {
    name: 'questsForMission',
    description: 'List possible quests for a mission',
    inputs: {
        idMission: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {
         api.data.quests.forMission(action.params.idMission, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("Mission not found: " + action.params.idMission));
                        return;
                    }
                    var collection = new utils.HyperJson({
                        _items: result

                    });
                    collection.addSelfIdsToItems(api.serverUrl + "/api/quests/", "_id");
                    action.response = collection.toObject();
                    next();
                }
            }
        });

    }
};

exports.questsForApp = {
    name: 'questsForApp',
    description: 'List possible quests for a application',
    inputs: {
        idApp: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {
        api.data.quests.forApp(action.params.idApp, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    var collection = new utils.HyperJson({
                        _items: result

                    });
                    collection.addSelfIdsToItems(api.serverUrl + "/api/quests/", "_id");
                    action.response = collection.toObject();
                    next();
                }
            }
        });

    }
};


exports.questSearch = {
    name: 'questsSearch',
    description: 'Searches quests based on mongo search condition',
    inputs: {
        search: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        api.data.quests.search(action.params.search, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    var collection = new utils.HyperJson({
                        _items: result

                    });
                    collection.addSelfIdsToItems(api.serverUrl + "/api/quests/", "_id");
                    action.response = collection.toObject();
                    next();
                }
            }
        });

    }
};


