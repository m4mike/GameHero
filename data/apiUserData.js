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
        db.apiUsers.findOne({ _id: id }, { _id: 1, id_user: 1, id_ext: 1, dispname: 1, id_app: 1, counters: 1 }, next);
    });
};//byId

module.exports.getByUserName = function (login, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        db.apiUsers.findOne({ login: login }, next)
    })
}

module.exports.getApiKey = function (userName, password, next) {
    database.getDb(function (err, db) {
        if (err) return next(err)
        db.apiUsers.findOne({ login: userName }, function (err, apiuser) {
            if (err || apiuser == null) return next(new Error('User not found'))
            api.jwtauth.generateToken(apiuser._id, function (err, data) {
                next(null, data)
            })
        })
    })
}

module.exports.createApiUser = function createApiUser(login, password, next) {
    if (login == null || login == '') return next(new Error("login cannot be empty"));
    if (password == null || password == '') return next(new Error("password cannot be empty"));
    database.getDb(function (err, db) {
        if (err) return next(err)
        //first find out if it exixts
        db.apiUsers.findOne({ login: login }, function (err, res) {
            if (err) return next(err)
            if (res != null) return next(new Error("Api login exists"));

            var apiuser = module.exports.getProto();
            apiuser.login = login;
            utils.passwordHash(password, function (err, hash) {
                if (err) return next(err);
                apiuser.hash = hash;
                db.apiUsers.insert(apiuser,function(err,data){
                if (err) return next(err);
                return api.jwtauth.generateToken(apiuser._id, function (err, data) {
                        next(null, data)
                    })
                })
            })
       })
    })
}

module.exports.deactivateApiUser = function deactivateApiUser(login, next) {
    if (login == null || login == '') return next(new Error("login cannot be empty"));


    database.getDb(function (err, db) {
        if (err) return next(err)
        return db.apiUsers.update({ login: login }, { $set: { deleted: true } }, function (err, data) {
            if (err && next)
                return next(new Error("unable to update apiuser"))
            if (next) return next(null, data);
        });

    })
}

module.exports.deleteApiUser = function deleteApiUser(login, next) {
    if (login == null || login == '') return next(new Error("login cannot be empty"));


    database.getDb(function (err, db) {
        if (err) return next(err)
        return db.apiUsers.remove({ login: login },  function (err, data) {
            if (err && next)
                return next(new Error("unable to update apiuser"))
            if (next) return next(null, data);
        });

    })
}


module.exports.getProto = function getProto () {
    return {
        _id: "api" + utils.randomId(7),
        login: null,
        hash: null,
        deleted:null
    }
}
