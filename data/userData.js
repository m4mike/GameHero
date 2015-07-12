var database = null;
var utils = require("../utils");

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.searchOne = function (search, projection, next) {
    database.getDb(function (err, db) {
        db.users.findOne(search, projection, next);
    });
};

module.exports.add = function (user, next) {
    database.getDb(function (err, db) {
        if (err) {
            console.log("Failed to seed database: " + err);
        } else {
            db.users.insert(user, next);
        }
    });
}; //adduser


module.exports.getById = function (idUser, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.users.findOne({ _id: idUser }, next);
        }
    });
};//getuser

module.exports.getAll = function (next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.users.find().toArray(function (err, results) {
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
            db.users.find().toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};

module.exports.save = function (user, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.users.save(user, function (err, res) {
                if (err)
                    next(new Error('unable to save user'))
                else
                    next(null,user);
            
            })
        }
    })
}


module.exports.createAndSaveUserFromPlayerAndApp = function (idApp, player, next){
    if (id_app == null) return next(new Error("idApp was null"));
    if (player == null) return next(new Error("player was null"));
    var u = module.exports.getProto();
    u._id = "u" + player._id.str.slice(1);
    u.apps.push({ "id_app": idApp, "id_player": player._id });
    api.data.users.save(u, next);
}

module.exports.getProto = function () {
    return {
        "_id" : "u" + utils.randomId(7),
        "apps" :[]
    }
}







