var database = null;

module.exports.init = function (api) {
    database = require("./database").init(api);
    return module.exports;
}

module.exports.addAction = function (o, next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err);
        } else {
            db.actions.insert(o , next);
        }
    });
};


