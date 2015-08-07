var database = require('./index.js');
var utils = require("../utils");
var api = null;

module.exports.init = function (theapi) {
    api = theapi;
    client = api.redis.client;
    return module.exports;
}

module.exports.byId = function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.apiusers.findOne({ _id: id }, { _id: 1, id_user: 1, id_ext: 1, dispname: 1, id_app: 1, counters: 1 }, next);
    });
};//byId

module.exports.getByUserName = function (search, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.apiusers.findOne({ login: search }, next)
    })
}

module.exports.getApiKey = function (userName, password, next) {
    database.getDb(function (err, db) {
        if (err) return next(err)
        db.apiusers.findOne({ login: userName }, function (err, apiuser) {
            if (err || apiuser == null) return next(new Error('User not found'))
            api.jwtauth.generateToken(userName, function (err, data) {
                next(null, data)
            })
        })
    })
}
