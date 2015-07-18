var database = null;
var utils = require("../utils");

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.addPlayer = function (player, next) {
       database.getDb(function (err, db) {
        if (err) {
            next(err);
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

module.exports.getIdByExtId = function (extId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ id_external: extId },{_id:1}, next);
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
            return db.players.save(player, { w: 1 }, function (err, data) {
                if (err) return next(new Error("unable to save player"))
                return next(data);
            });
        }
       
    });
}



module.exports.getProto = function () {
    return {
        _id : "p"+utils.randomId(7),
        id_external: null,
        counters: {
           
            "exp": 0,
            "level": 1,
         
        }, 
        "id_app": null,
        "items": [],
        "badges": [],
        "quests": []
    }
}





