(function (data) //initialises module.exports
{
    
    var database = require("./database");
    
    data.addAction = function (o, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.actions.insert(o , next);
            }
        });
    };
  
    
})(module.exports);




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




