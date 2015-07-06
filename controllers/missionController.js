// missionController.js
(function (missionController) {
    
    var data = require("../data");
    //var auth = require("../auth");
    
    missionController.init = function (app) {
     /**
     * @api {get} /api/missions/:missionName
     * @apiParam {missionName} id Users unique ID.
     */
     app.get("/api/missions/:missionName",
                //auth.ensureApiAuthenticated,
                function (req, res) {
            
            var missionName = req.params.missionName;
            if (missionName != null) {
                data.missions.getMission(missionName, function (err, mission) {
                    if (err) {
                        res.send(400, err);
                    } else {
                        if (mission == null) {
                            res.send(400, "not found");
                        } else {
                            res.set("Content-Type", "application/json");
                            res.send(mission);
                        }
                    }
                });
            } else {
                data.missions.getMissions(function (err, missions) {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.set("Content-Type", "application/json");
                        res.send(missions);
                    }
                });
            }
        });
        
        app.get("/api/missions",
                //auth.ensureApiAuthenticated,
                function (req, res) {
            
            data.missions.getMissions(function (err, missions) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(missions);
                }
            });

        });
        
        app.post("/api/missions/:missionName",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
            var missionName = req.params.missionName;
            res.set("Content-Type", "application/json");
            res.send(200, "hello" + missionName);
        });


    };
})(module.exports);