var database = null;

module.exports.init = function (db) {
    database = db;
    return module.exports;
}



module.exports.add = function (player, next) {
    database.getDb(function (err, db) {
        if (err) {
            console.log("Failed to seed database: " + err);
        } else {
            db.players.insert(player, next);
        }
    });
}; //addplayer

module.exports.getByplayerName = function (playername, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ playername: playername }, next);
        }
    });
};//getplayer

module.exports.getById = function (playerId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ _id: playerId }, next);
        }
    });
};//getplayer

module.exports.deleteById = function (playerId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.remove({ _id: playerId }, next);
        }
    });
};//getplayer


module.exports.getAll = function (next) {
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

module.exports.getAllPaged = function (next, paging) {
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

module.exports.save = function (player, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.players.save(player, { w: 1 }, next);
        }
    });
}

var utils = require("../utils");
module.exports.newplayer = function () {
    return {
        _id : utils.randomId(),
        id_external: null,
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





