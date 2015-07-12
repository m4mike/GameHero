var database = null;

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.list = function (next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.apps.find().toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};

module.exports.getById = function (idApp, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.apps.findOne({ _id: idApp }, next);
        }
    });
}



module.exports.addPlayerToApp = function (idApp, idPlayer, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.apps.update(
                { _id: "app_follow" },
                { $addToSet: { players: idPlayer } }
    
            ,next);
            
        }
    });
}

module.exports.removePlayerFromApp = function (idApp, idPlayer, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.apps.update(
                { _id: idApp },
                { $pull: { 'players': idPlayer} }, next
            );
            
        }
    });
}
