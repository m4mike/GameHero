module.exports.missions = null;
module.exports.quests = null;
module.exports.players = null;
module.exports.users = null;
module.exports.database = this;
module.exports.interests = require("./interestData.js");

var cachedApi = null;
var database = null;
var isSeeded = false;

var bluebird = require('bluebird');
var theDb = null; //singleton
var url = "";

module.exports.getDb = function (next) {
    if (theDb == null) {
        return initDb(next);
    }
    return next(null, theDb)
}

module.exports.getDbPromise = function () { //returns theDb
    
    return bluebird.promisify(initDb);
}

var initDb = function (next) {
    if (theDb == null) {
        // connect to the database
        cachedApi.mongo.getDb(function (err, db) {
            
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
                    users: db.collection("users")
                };
                
                return next(null, theDb);
            }
        });
    }
}


module.exports.init = function (api) {
    
    if (cachedApi == null) {
        cachedApi = api; // save the reference once
        console.log("initialising data");
        module.exports.missions = require("./missionData").init(this);
        module.exports.quests = require("./questData.js").init(this);
        module.exports.players = require("./playerData.js").init(this);
        module.exports.users = require("./userData.js").init(this);
        module.exports.interests = require("./interestData.js").init(cachedApi);
        
    }
    
    return module.exports;
}

module.exports.seed = function () {
    seedDatabase();
}

var async = require("async");
var seedData = require("./seedData");
var seedresult = { db: null, toSeed: false };

var seedDatabase = function () {
    async.series([
            // 
        function (callback) {
            module.exports.getDb(function (err, db) {
                if (err) {
                    console.log("Failed to seed database: " + err);
                } else {
                    seedresult.db = db;
                    return callback();
                }
            });//getdb
                
        },
            //count missions
        function (callback) {
            seedresult.db.missions.count(function (err, count) {
                if (err) {
                    console.log("Failed to retrieve database count");
                } else {
                    if (count == 0) {
                        seedresult.toSeed = true;
                        console.log("Database needs seeding");
                    } else {
                        //console.log("Database already seeded");
                        seedresult.toSeed = false;
                    }
                    return callback();
                }
            });
                
        }
    ], function (err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        if (seedresult.toSeed) {
            
            console.log("Seeding the Database...");
            async.parallel([
                    //insert users
                function (callback) {
                    seedData.users.forEach(function (item) {
                        seedresult.db.users.insert(item, function (err) {
                            if (err)
                                console.log("Failed to insert user into database: " + err);
                                
                        });
                    });
                    console.log("users seeded");
                    callback();
                    
                },
                //insert players
                function (callback) {
                    seedData.players.forEach(function (item) {
                        seedresult.db.players.insert(item, function (err) {
                            if (err)
                                console.log("Failed to insert player into database: " + err);
                                
                        });
                    });
                    console.log("players seeded");
                    callback();
                    
                },
                //insert missions
                function (callback) {
                    seedData.missions.forEach(function (item) {
                        seedresult.db.missions.insert(item, function (err) {
                            if (err)
                                console.log("Failed to insert mission into database: " + err);
                               
                        });
                            
                    });
                    console.log("missions seeded");
                    callback();
                    
                },
                    //insert apps
                function (callback) {
                    seedData.apps.forEach(function (item) {
                        seedresult.db.apps.insert(item, function (err) {
                            if (err)
                                console.log("Failed to insert app into database: " + err);
                               
                        });
                            
                    });
                    console.log("missions seeded");
                    callback();
                    
                },
                //insert quests
                function (callback) {
                    seedData.quests.forEach(function (item) {
                        seedresult.db.quests.insert(item, function (err) {
                            if (err) console.log("Failed to insert quests into database");
                                
                        });
                    });
                    console.log("Quests seeded");
                    callback();
                }
            ],
                function (err) { //This function gets called after the two tasks have called their "task callbacks"
                return;
            });
        }//if
    });//err
}//seeddatabase







