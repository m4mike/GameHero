var database = require('./index.js');
var utils = require("../utils");
var api = null;

module.exports.init = function (theapi) {
    api = theapi;
    client = api.redis.client;
    return module.exports;
}

module.exports.gamesForApp = function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        //todo
        db.apps.findOne({ _id: id }, { _id: 1, games:1 },function (err, pl) {
            if (err) return next(err);
            return next(null, pl.games);
                
        });
        
    });
};//gamesForApp

module.exports.getAll = function (next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        //todo
        db.games.find({}).toArray( function (err, pl) {
            if (err) return next(err);
            return next(null, pl);

        });

    });
};//gamesForApp




