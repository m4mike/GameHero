(function (data) //initialises module.exports
{
    
    var database = require("./database");
    var utils = require("../utils");
    
    data.add = function (player, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed database: " + err);
            } else {
                db.players.insert(player, next);
            }
        });
    }; //addplayer
    
    data.getByplayerName = function (playername, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.players.findOne({ playername: playername }, next);
            }
        });
    };//getplayer
    
    data.getById = function (playerId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.players.findOne({ _id: playerId }, next);
            }
        });
    };//getplayer
    
    data.deleteById = function (playerId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.players.remove({ _id: playerId }, next);
            }
        });
    };//getplayer

    
    data.getAll = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.players.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };
    
    data.getAllPaged = function (next, paging) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.players.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };
    
    data.save = function (player,next){
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.players.save(player, { w: 1 }, next);
            }
        });
    }

    data.newplayer = function () {
        return {
            _id : utils.randomId(),
            id_external:null,
            counters: {
                "diamonds": 10,
                "exp": 0,
                "level": 1,
                "energy": 0,
                "money": 0,
                "health": 0
            }, 
            "apps": [],
            "items": [],
            "badges": [],
            "quests": []
        }
    }
  
})(module.exports);




