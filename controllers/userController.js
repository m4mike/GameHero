// missionController.js
(function (myController) {
    
    var data = require("../data")(api);
    var logic = require("../logic");
    //var auth = require("../auth");
    var utils = require("../utils");
    var _ = require("lodash");
    
    myController.init = function (app) {
        
        app.get("/api/users",
            //auth.ensureApiAuthenticated,
            function (req, res) {
            
            var collection = new utils.hyperJson({
                _links : {}
                       
            });
            collection.link("All Users", utils.host + "/api/users/all")
            .link("Create User", utils.host + "/api/users/new/:externaluserId");
            res.send(collection.toObject());
            
        });
        
        
        
        app.get("/api/users/all",
            function (req, res) {
            var page = parseInt(req.query.page),
                size = parseInt(req.query.size),
                skip = page > 0 ? ((page - 1) * size) : 0;
            data.users.getAll(function (err, result) {
                if (err) {
                    return utils.responses.internalServerError(req, res, err);
                }
                
                var collection = new utils.hyperJson({
                    _items : result
                });
                collection.addSelfIdsToItems(utils.host + "/api/users/byId/" , "_id");
                res.send(collection.toObject());

               
                    
            });
        });
        
        app.get("/api/users/byId/:userId",
            function (req, res) {
            data.users.getById(req.params.userId, function (err, user) {
                if (err) {
                    res.send(400, err);
                } else {
                    if (user == null) {
                        utils.responses.notFoundError(req, res, err);
                    } else {
                        var u = new utils.hyperJson(user)
                        .link("self", utils.host + "/api/users/byid/" + user._id)
                        .link("valid_quests", utils.host + "/api/quests/foruser/" + user._id);
                        
                        
                        res.send(201, u.toObject());
                    }
                }
            });
        });
        
        
        app.get("/api/users/new/:externalId", 
        //auth.ensureApiAuthenticated,
        function (req, res) {
            if (_.startsWith( req.params.externalId,":")) {
                utils.responses.badRequestError(req, res, ":externalid should be an id");
                return;
            }
            
            var user = data.users.newUser();
            user.id_external = req.params.externalId;
            
            data.users.save(user, function (err, result) {
                if (err) {
                    utils.responses.internalServerError(req, res, err);
                    return;
                } else {
                    var u = new utils.hyperJson(user)
                        .link("self", utils.host + "/api/users/byid/" + user._id)
                        .link("valid_quests", utils.host + "/api/quests/foruser/" + user._id);
                    

                    res.send(201, u.toObject());
                }
            });

        });

    };







})(module.exports);