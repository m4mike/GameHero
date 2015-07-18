var database = null;

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.getById = function (iqQuest, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.quests.findOne({ _id: iqQuest }, next);
        }
    });
};

module.exports.forMission = function (idMission, next) {
    database.getDb(function (err, db) {
        if (err) {
            return next(err, null);
        } else {
            db.quests.find({ id_mission: idMission }).toArray(function (err, results) {
                if (err) {
                   return next(err, null);
                } else {
                    return  next(null, results);
                }
            });
        }
    });
};


module.exports.forApp = function (id, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.quests.find({ id_app: id }).toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};


module.exports.search = function (search, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.quests.find(search).toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};










