// uses a combination of mongo and redis
var _ = require('lodash');
var Promise = require('bluebird');

var client; // for redis
var database; // for mongo
var api = null;

module.exports.init = function (theapi) {
    //api.log("initialising interests");
    api = theapi;
    client = api.redis.client;
    database = require('./index.js');
    return module.exports;
}

module.exports.getPlayerWall = function (idPlayer, month, next) {
    database.getDb(function (err, db) {
        if (err) {
            return next(err);
        } else {
            var imonth = Number(month);
            return db.walls.find({ id_player: idPlayer, month: imonth }).toArray(next);

        }
    });
}; //getPlayerWall

module.exports.getExtPlayerWall = function (extId, month, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        api.data.players.getIdByExtId(extId,function(err,idPlayer){
            if (err) return next(err);
            if (idPlayer == null) return next(new Error("Ext Id not found"));
            var imonth = Number(month);
            return db.walls.find({ id_player: idPlayer._id, month: imonth }).toArray(next);
        })
    })
}; //getPlayerWall



module.exports.getLogById = function (idLog, next) {
    database.getDb(function (err, db) {
        if (err) {
            return next(err);
        } else {
            return db.social.find({ id_player: idPlayer, month: imonth }).toArray(next);

        }
    });
}; //getPlayerWall
