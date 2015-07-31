var database = null;
var utils = require("../utils");

module.exports.init = function (db) {
    database = db;
    return module.exports;
}

module.exports.playerExists =  function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.players.findOne({ _id: id }, { _id: 1 }, function (err, pl) {
            if (err) return next(err);
            var exists = true;
            if (pl == null) exists = false;
            if (pl._id == null) exists = false;
            return next(null, exists);        
                
        });
        
    });
};//playerExists

module.exports.playersForApp = function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.players.find({ id_app: id }, { _id: 1 }).toArray( function (err, pl) {
            if (err) return next(err);
            return next(null, pl);
                
        });
        
    });
};//playersForApp

module.exports.addPlayer = function (player, next) {
       database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
          
          db.players.insert(player, next);
       }
    });
}; //addplayer


module.exports.getByIdExt = function (idExt, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ id_ext: idExt },{_id:1,id_user:1,id_ext:1,dispname:1,id_app:1,counters:1}, next);
        }
    });
};//getplayer

module.exports.getByIdExtFull = function (idExt, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ id_ext: idExt }, next);
        }
    });
};//getplayer

module.exports.getById = function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.players.findOne({ _id: id },{_id:1,id_user:1,id_ext:1,dispname:1,id_app:1,counters:1}, next);
    });
};//getById

module.exports.getByIdFull = function (playerId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ _id: playerId }, next);
        }
    });
};//getplayer

module.exports.getSelectedInfoById = function (playerId,selected, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ _id: playerId }, selected, next);
        }
    });
};//getplayer

module.exports.getBaseInfoById = function (playerId,  next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ _id: playerId }, {_id:1,id_user:1,id_ext:1,id_app:1,dispname:1}, next);
        }
    });
};//getplayer

module.exports.getBaseInfoByIdExt = function (playerId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.players.findOne({ id_ext: playerId }, { _id: 1, id_user: 1, id_ext: 1, id_app: 1, dispname: 1 }, next);
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
                return next(null,data);
            });
        }
       
    });
}


module.exports.update = function (idPlayer,setField, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            return db.players.update({ _id: idPlayer }, { $set: setField }, function (err, data) {
                if (err && next) return next(new Error("unable to update player"))
                if (next) return next(null, data);
            });
        }

    });
}


module.exports.getProto = function () {
    return {
        _id : "p"+utils.randomId(7),
        id_ext: null,
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





