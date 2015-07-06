(function (missionData) //initialises module.exports
{

    var database = require("./database");

    missionData.getMissions = function(next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                db.missions.find().toArray(function(err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    missionData.getMission = function(missionid, next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.missions.findOne({ _id: missionid }, next);
            }
        });
    };

    
})(module.exports);


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
    
   
    

