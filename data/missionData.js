var database = null;

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.getMissions = function (next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.missions.find().toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};

module.exports.getById = function (missionid, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.missions.findOne({ _id: missionid }, next);
        }
    });
}

module.exports.getMissionsForApp = function (appId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.missions.findOne({ id_app: appId }, next);
        }
    });
};


