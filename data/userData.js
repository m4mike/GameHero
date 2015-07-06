(function (data) //initialises module.exports
{
    
    var database = require("./database");
    var utils = require("../utils");
    
    data.add = function (user, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed database: " + err);
            } else {
                db.users.insert(user, next);
            }
        });
    }; //adduser
    
    data.getByUserName = function (username, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({ username: username }, next);
            }
        });
    };//getuser
    
    data.getById = function (userId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({ _id: userId }, next);
            }
        });
    };//getuser
    
    data.getAll = function (next) {
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
    
    data.getAllPaged = function (next, paging) {
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
    
    data.save = function (user,next){
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.users.save(user, { w: 1 }, next);
            }
        });
    }

    data.newUser = function () {
        return {
            _id : utils.randomId(),
            id_external:null,
            counters: {
                "diamonds": 10,
                "exp": 0,
                "level": 1,
                "energy": 0,
                "money": 0,
                "health": 0
            }, 
            "apps": [],
            "items": [],
            "badges": [],
            "quests": []
        }
    }
  
})(module.exports);




