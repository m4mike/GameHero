var database = null;

module.exports.init = function (api) {
    database = require("./database").init(api);
    return module.exports;
}



module.exports.getById = function (questId, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.quests.findOne({ _id: questId }, next);
        }
    });
};

module.exports.getQuestsForMission = function (missionid, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.quests.find({ id_missiond: missionid }).toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};


module.exports.getQuestsForApp = function (id, next) {
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


module.exports.getQuests = function (search, next) {
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










