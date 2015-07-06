// missionController.js
(function (myController) {
    
    var data = require("../data");
    var logic = require("../logic");
    //var auth = require("../auth");
    var utils = require("../utils")
    
    myController.init = function (app) {
        
        app.get("/api/quests",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
            var collection = new utils.hyperJson({
                _links : {}
                       
            });
            collection.link("All Quests", utils.host + "/api/quests/all")
            .link("For Mission", utils.host + "/api/quests/forMission/missionId")
            .link("For App", utils.host + "/api/quests/forApp/appId");
            res.send(collection.toObject());
            
        });

        

        app.get("/api/quests/formission/:missionId",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
            var missionId = req.params.missionId;
            
            data.quests.getQuestsForMissionId(missionId, function (err, result) {
                if (err) {
                    res.send(400, err);
                } else {
                    if (result == null) {
                        res.send(400, "not found");
                    } else {
                        if (result.length == 0) {
                            utils.responses.notFoundError(req, res, "Mission not found: " + missionId);
                            return;
                        }
                        var collection = new utils.hyperJson({
                            _items : result
                            
                        });
                        collection.addSelfIdsToItems(utils.host + "/api/quests/" , "_id");
                        res.send(collection.toObject());
                    }
                }
            });
            
        });
        
        app.get("/api/quests/forapp/:appId",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
        });
        
        app.get("/api/quests/foruser/:userId",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            logic.quests.getValidQuestsForUser(req.params.userId, function (err, result) {
                if (err) {
                    res.send(400, err);
                } else {
                    if (result == null) {
                       
                            utils.responses.notFoundError(req, res, "Quests not found for user: " + req.params.userId);
                            return;
                        
                    } else {
                        var collection = new utils.hyperJson({
                            _items : result
                            
                        });
                        collection.addSelfIdsToItems(utils.host + "/api/quests/byId/" , "_id");
                        res.send(collection.toObject());
                    }
                }
            });
        });
        
        app.get("/api/quests/byId/:questId",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            data.quests.getById(req.params.questId, function (err, result) {
                if (err) {
                    res.send(400, err);
                } else {
                    if (result == null) {
                        res.send(400, "not found");
                    } else {
                        res.send(result);
                    }
                }
            });
        });
        

        
      

        /**
         * @api {get} /api/quests Request User information
         * @apiName GetUser
         * @apiGroup User
         *
         * @apiParam {Number} id Users unique ID.
         *
         * @apiSuccess {String} firstname Firstname of the User.
         * @apiSuccess {String} lastname  Lastname of the User.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "firstname": "John",
         *       "lastname": "Doe"
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "error": "UserNotFound"
         *     }
         */
        app.get("/api/quests/all",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
            data.quests.getAllQuests(function (err, results) {
                if (err) {
                    res.send(400, err);
                } else {
                    
                    var collection = new utils.hyperJson({
                        _items : results
                       
                    });
                    collection.addSelfIdsToItems(utils.host + "/api/quests/" , "_id");
                    res.send(collection.toObject());

                }
            });
            
        });



    };
    
  

    
})(module.exports);