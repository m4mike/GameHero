'use strict';
var database = null;
var utils = require("../utils");

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.list = function (apiuser,next) {
    database.getDb(function (err, db) {
        if (err) {
            next(err, null);
        } else {
            db.apps.find({api_user:apiuser}).toArray(function (err, results) {
                if (err) {
                    next(err, null);
                } else {
                    next(null, results);
                }
            });
        }
    });
};

module.exports.byId = function (id, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
                   db.apps.findOne({ _id: id }, next);
        
    });
}


module.exports.createApp = function (apiuser, name, next) {
    database.getDb(function (err, db) {
        if (err && next) return next(err);
        var app = module.exports.getProto();
        app.name = name;
        app.api_user = apiuser;
               
        
        db.apps.insert(app, function (err, data) {
            if (err && next) return next(new Error('Unable to create app'));
            if (data) return next(null, app);
        });
        
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


module.exports.getProto = function () {
    return {
        _id : "app" + utils.randomId(5),
        name: null,
        api_user: null,
        counters : {
            "exp" : 0,
            "level" : 1
        },
        profile : {},
        games: [],
        actions:[]
    }
}




