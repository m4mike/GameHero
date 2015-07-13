var database = null;
var utils = require("../utils");
var _ = require('lodash');

module.exports.init = function (db) {
    database = db;
    return module.exports;
}


module.exports.addInterest = function (idUser, lang, cat, interest, next) {
    database.getDb(function (err, db) {
        var inter = "interests_" + lang.trim()
        var command = {
            "$addToSet": 
            {
                
            }
        };
        command.$addToSet[inter] = { "c": cat, "i": interest };
        db.users.update( { _id: idUser }, command  , next);
    });
};

module.exports.hasInterest = function (idUser, lang, cat, interest, next) {
    //example query:
    /*
     * db.getCollection('users').find(
            {   _id:"u3",
                "interests_fr" :   { "$elemMatch" : { c: "test", i:"ii"} }
            }
        )
     * 
     * */
    
    database.getDb(function (err, db) {
        
        var command = { "_id" : idUser };
        command["interests_" + lang.trim()] = {
            $elemMatch: {c: cat, i:interest}
        };
        
        db.users.findOne(command, { _id: 1 }  , function (err, u) {
            if (u == null)
                next(null, false)
            else
                next(null, true);
        });
    });
};

module.exports.removeInterest = function (idUser, lang, cat, interest, next) {
    //get user, remove interest, save interest field back
    
    database.getDb(function (err, db) {
        var proj = {}; proj["interests_" + lang] = 1;
        db.users.findOne({_id:idUser}, proj, function (err, u) {
            var unter = u["interests_" + lang];
            if (unter == null) next(null, 0);
            var elem =_.remove(unter, function (int) {
                return int.c == cat && int.i == interest;
            });
            if (elem == null) next(null, 0);
            var updateCommand = {};
            updateCommand["interests_" + lang] = unter;
            

            db.users.update({ _id: u._id }, { $set : updateCommand, $currentDate: { lastModified: true } }, function (err1, r2) { 
                next(null, r2.result);
            });
        
        });//findone
       
    });
};



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
                    next(null, user);
            
            })
        }
    })
}


module.exports.createAndSaveUserFromPlayerAndApp = function (idApp, player, next) {
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
        "apps" : []
    }
}







