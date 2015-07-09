var bluebird = require('bluebird');
var mongodb = require("mongodb");
var theDb = null; //singleton
var url = "";

module.exports.getDb = function (next) {
    if (theDb == null) {
        return initDb(next);
    }
    return next(null, theDb)
}

module.exports.getDbPromise = function (){ //returns theDb
    
    return bluebird.promisify(initDb);
}

var initDb = function (next) {
    if (theDb == null) {
        // connect to the database
        mongodb.MongoClient.connect(url, function (err, db) {
            
            if (err) {
                return next (err);
            } else {
                
                theDb = {
                    db: db,
                    url : url, 
                    apps: db.collection("apps"),
                    quests: db.collection("quests"),
                    missions : db.collection("missions"),
                    players: db.collection("players"),
                    users:db.collection("users")
                };

                return next(null, theDb);
            }
        });
    }
}

module.exports.init = function (api) {
    

    if (typeof api == 'string') url = api + "/gami";
    else {
        if (api == null) return module.exports;
        if (api.config == null) return module.exports;
        if (api.config.mongo == null) return module.exports;
        
        url = api.config.mongo + "/gami";
    }

   
    return module.exports;
}

