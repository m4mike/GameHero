var Promise = require('bluebird');

module.exports.database = this;
module.exports.social = null;
module.exports.players = null;
module.exports.games = null;

var api = null;

var isSeeded = false;


var theDb = null; //singleton
var url = "";



module.exports.getDb = function (next) {
    if (theDb == null) {
        return initDb(next);
    }
    return next(null, theDb)
}

module.exports.getDBAsync =  Promise.promisify(module.exports.getDb);

var initDb = function (next) {
    if (theDb == null) {
        // connect to the database
        api.mongo.getDb(function (err, db) {
            
            if (err) {
                return next(err);
            } else {
                
                theDb = {
                    db: db,
                    url : url, 
                    apps: db.collection("apps"),
                    quests: db.collection("quests"),
                    missions : db.collection("missions"),
                    players: db.collection("players"),
                    games:db.collection("games"),
                    users: db.collection("users"),
                    interests: db.collection("interests"),
                    social : db.collection("social"),
                    walls : db.collection("walls")
                };
                
                return next(null, theDb);
            }
        });
    }
}


module.exports.init = function (a) {
    
    if (api == null) {
        api = a; // save the reference once
        
        module.exports.apps = require("./appData").init(this);
        module.exports.missions = require("./missionData").init(this);
        module.exports.quests = require("./questData.js").init(this);
        module.exports.players = require("./playerData.js").init(this);
        module.exports.users = require("./userData.js").init(this);
        module.exports.social = require("./socialData.js").init(api);
        module.exports.interests = require("./interestData.js").init(api);
        module.exports.games = require("./gameData.js").init(api);

    }
    return module.exports;
}

module.exports.seed = function () {
    seedMongo();
  
}

var async = require("async");
var seedData = require("./seedData");
var seedresult = { db: null, toSeed: false };

var seedMongo = function (next) {
    api.log('Mong Seed check');
    async.series([
            // 
        function (callback) {
            module.exports.getDb(function (err, db) {
                if (err) {
                    api.log("Failed to seed database: " + err);
                } else {
                    seedresult.db = db;
                    
                }
                return callback();
            });//getdb
                
        },
            //count missions
        function (callback) {
            seedresult.db.users.count(function (err, count) {
                if (err) {
                    api.log("Failed to retrieve database count");
                } else {
                    if (count == 0) {
                        seedresult.toSeed = true;
                        api.log("Database needs seeding");
                    } else {
                       api.log("Mongo already seeded");
                        seedresult.toSeed = false;
                    }
                    
                }
                return callback();
            });
                
        }
    ], function (err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        if (seedresult.toSeed) {
            
            api.log("Seeding the Database...");
            async.parallel([
                    //insert users
                function (callback) {
                    seedData.users.forEach(function (item) {
                        seedresult.db.users.insert(item, function (err) {
                            if (err)
                                api.log("Failed to insert user into database: " + err);
                                
                        });
                    });
                    api.log("users seeded");
                    return callback();
                    
                },
                //insert players
                function (callback) {
                    seedData.players.forEach(function (item) {
                        seedresult.db.players.insert(item, function (err) {
                            if (err)
                                api.log("Failed to insert player into database: " + err);
                            
                        });
                    });
                    api.log("players seeded");
                    return callback();
                    
                },
                //insert missions
                function (callback) {
                    seedData.missions.forEach(function (item) {
                        seedresult.db.missions.insert(item, function (err) {
                            if (err)
                                api.log("Failed to insert mission into database: " + err);
                               
                        });
                            
                    });
                    api.log("missions seeded");
                    return callback();
                    
                },
                    //insert apps
                function (callback) {
                    seedData.apps.forEach(function (item) {
                        seedresult.db.apps.insert(item, function (err) {
                            if (err)
                                api.log("Failed to insert app into database: " + err);
                               
                        });
                            
                    });
                    api.log("missions seeded");
                    return callback();
                    
                },
                //insert quests
                function (callback) {
                    seedData.quests.forEach(function (item) {
                        seedresult.db.quests.insert(item, function (err) {
                            if (err) api.log("Failed to insert quests into database");
                                
                        });
                    });
                    api.log("Quests seeded");
                    return callback();
                },
                 //insert interests
                function (callback) {
                    require('./seedInterests').interests.forEach(function (item) {
                        item._id = "urn:cat:" + item.lang + ":" + item.cat;
                        seedresult.db.interests.insert(item,function(err){
                             if (err) api.log("Failed to insert interests into mongo",'error');
                        })
                    });
                    api.log("Interests seeded");
                    return callback();
                },
                 //insert logitems
                function (callback) {
                    require('./seedActionLog.js').logs.forEach(function (item) {
                        
                        
                        seedresult.db.social.insert(item, function (err) {
                            if (err) api.log("Failed to insert interests into mongo", 'error');
                        })
                    });
                    api.log("Social logs seeded");
                    return callback();
                },
                 //insert walls
                function (callback) {
                    require('./seedActionLog.js').walls.forEach(function (item) {
                        
                        seedresult.db.walls.insert(item, function (err) {
                            if (err) api.log("Failed to insert interests into mongo", 'error');
                        })
                    });
                    api.log("Social wallw seeded");
                    return callback();
                },
                   //insert games
                function (callback) {
                    seedData.games.forEach(function (item) {

                        seedresult.db.games.insert(item, function (err) {
                            if (err) api.log("Failed to insert games into mongo", 'error');
                        })
                    });
                    api.log("Games seeded");
                    return callback();
                }
                
            ],
                function (err) { 
                    if (err) api.log(err,'error');
                    if(next)  return next();
                    return;
           });
        }//if
    });//err
}//seedMongo







