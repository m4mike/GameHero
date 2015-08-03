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

/*saveDelayedGameMoves({
    game: 'MYLITTLEDUEL', 
    player: state.player, 
    data: { defence : state.defence, attack: state.attack }
    */
module.exports.saveGameData = function (data, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        //update game data into player profile
        db.gamedata.save( data, function (err, nothing) {
            if (err) return next(err);
            return next();

        });

    });
};//saveGameData


module.exports.getGameData = function (id_game, id_player, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        //update game data into player profile
        db.gamedata.findOne({ _id: id_game + '_' + id_player }, function (err, res) {
            if (err) return next(err);
            return next(null, res);
        });

    });
};//getGameData

