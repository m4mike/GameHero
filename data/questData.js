(function (data) //initialises module.exports
{
    
    var database = require("./database");
    
    data.getById = function (questId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.quests.findOne({ _id: questId }, next);
            }
        });
    };

    data.getQuestsForMissionId = function (missionid, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.quests.find({ mission_id: missionid }).toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };
    
    
    
    data.getAllQuests = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.quests.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };
    
      
    // gets a user profile, calls getQuestsFromUserProfile(userprofile, next);
    data.getQuestsForApp = function (appId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.quests.find({ "app": appId }).toArray(
                    function (err, qs) {
                    if (err) {
                        next(err);
                    } else {
                        //console.log(qs);
                        next(null, qs);
                    }
                }
                );
            }
        });
    };

   
   
   
    
}

)(module.exports);


//data.addNote = function (missionName, noteToInsert, next) {
//    database.getDb(function (err, db) {
//        if (err) {
//            next(err);
//        } else {
//            db.notes.update({ name: missionName }, { $push: { notes: noteToInsert } }, next);
//        }
//    });
//};

//data.createNewCategory = function (missionName, next) {
//    database.getDb(function (err, db) {
//        if (err) {
//            next(err);
//        } else {
//            db.notes.find({ name: missionName }).count(function (err, count) {

//                if (err) {
//                    next(err);
//                } else {

//                    if (count != 0) {
//                        next("Category already exists");
//                    } else {
//                        var cat = {
//                            name: missionName,
//                            notes: []
//                        };
//                        db.notes.insert(cat, function (err) {
//                            if (err) {
//                                next(err);
//                            } else {
//                                next(null);
//                            }
//                        });
//                    }
//                }
//            });
//        }
//    });
//};




