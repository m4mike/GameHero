(function (data) {
    
    var seedData = require("./seedData");
    var database = require("./database");
    var async = require("async");
    
    data.missions = require("./missionData");
    data.quests = require("./questData.js");
    data.players = require("./playerData.js");
    
   
    
    
    var seedresult = { db: null, toSeed: false };

    function seedDatabase() {
        async.series([
            // 
            function (callback) {
                database.getDb(function (err, db) {
                    if (err) {
                        console.log("Failed to seed database: " + err);
                    } else {
                        seedresult.db = db;
                        callback();
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
                        } else {
                            console.log("Database already seeded");
                            seedresult.toSeed = false;
                        }
                        callback();
                    }
                });
                
            }
        ], function (err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err);
            if(  seedresult.toSeed){
               
                console.log("Seeding the Database...");
                async.parallel([
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
                //insert quests
                    function (callback) {
                        seedData.quests.forEach(function (item) {
                            seedresult.db.quests.insert(item, function (err) {
                                if (err) console.log("Failed to insert quests into database");
                                
                            });
                        });
                        console.log("QUESTS seeded");
                        callback();
                    }
                ],
                function (err) { //This function gets called after the two tasks have called their "task callbacks"
                    return;
                });
            }//if
        });//err
        

    }
    
    seedDatabase();

})(module.exports);



