var database = require('./index.js');
var utils = require("../utils");
var api = null;

module.exports.init = function (theapi) {
    api = theapi;
    client = api.redis.client;
    return module.exports;
}


module.exports.byId = function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.games.findOne({ _id: id },  function (err, data) {
            if (err) return next(err);
            return next(null, data);
        });
    });
};//byId


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

module.exports.playGame = function playGame( state,next){
    var gp = require('./gameplay.js');
    var fun = gp[state.game._id];
    fun(api, state, next);
}


/*saveDelayedGameMoves({
    game: 'g_mld', 
    player: state.player, 
    data: { defence : state.defence, attack: state.attack }
    */
module.exports.saveGameData = function (idGame, idPlayer, data, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        //update game data into player profile
        //todo: won't work
        db.gamedata.save( gameDataProto(idGame,idPlayer,data), function (err, nothing) {
            if(err && next) return next(err);
            if(next) return next();
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

function gameDataProto(idGame, idPlayer, data) {
    return {
        _id: idgame + "_" + idPlayer,
        id_game: idGame,
        id_player: idPlayer,
        data:data
    }
}