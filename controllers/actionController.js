(function (myController) {
    
    var data = require("../data")(api);
    //var auth = require("../auth");
    var _ = require("lodash");
    
    myController.init = function (app) {
        
       
        
        app.post("/api/action/",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
            var action = req.body;
            var quests = data.quests;
            
            res.set("Content-Type", "application/json");
            res.send("201", { data: "hello" });

         });
        


    };
    
  

    //app.post("/api/missions/:missionName", 
    //  auth.ensureApiAuthenticated,
    //  function (req, res) {

    //    var missionName = req.params.missionName;

    //    var noteToInsert = {
    //      note: req.body.note,
    //      color: req.body.color,
    //      author: "Shawn Wildermuth"
    //    };

    //    data.addNote(missionName, noteToInsert, function (err) {
    //      if (err) { 
    //        res.send(400, "Failed to add note to data store");
    //      } else {
    //        res.set("Content-Type", "application/json");
    //        res.send(201, noteToInsert);
    //      }
    //    });

    //  });

    //};

})(module.exports);