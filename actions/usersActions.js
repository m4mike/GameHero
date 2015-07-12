var utils = require("../utils")
var Promise = require('bluebird');
var async = require('async');

exports.users = {
    name: 'userActions',
    description: 'List possible actions on users',
    domain:"User",
    outputExample: null,
    
    run: function (api, action, next) {
       

        var collection = new utils.HyperJson();
        collection.link("Find User by id", utils.host + "/api/users/byId/:idUser")
            .link(" DELETE Delete user, will delete its players", utils.host + "-delete-/api/users/:idUser")
            .link("Create player for App", utils.host + "/api/users/:idUser/addPlayer/:idPlayer/:app")
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.userById = {
    name: 'userById',
    description: 'Get user by Id',
    inputs: {
        idUser: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        api.data.users.getById(action.params.idUser, function (err, result) {
            if (err || result == null || result.length == 0) {
                
                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            } else {
                
                action.response = result;
                next();
            }
             
        })
    }
    
};

exports.createPlayerForApp = {
    name: 'createPlayerForApp',
    description: 'Create a player for an app attached to this user',
    inputs: {
        idUser: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        // get the user adn his apps
        //  if the user already plays the app -> return player 
        // create a player for the app
        // -> return player
        
        var temp = { user : null, abort: false, err: null };
        
        async.series(
            [
                //get user
                function (cb) {
                    api.data.users.searchOne({ "_id" : action.params.idUser }, { "_id": 1, "apps": 1 }, function (err, result) {
                        if (err || result == null || result.length == 0) {
                            temp.err = new Error('user not found');
                            temp.abort = true;
                            return cb();
                        }
                        temp.user = result;
                        
                        return cb();
                    });
                },
                function (cb) {
                    if (temp.abort) return cb();
                    var selected = _.where(temp.users, { "apps.idapp" : action.params.idApp });
                        
                    
                }
            ]
            , function (err) {
                next();
            });
    }
};

exports.userDelete = {
    name: 'userDelete',
    description: 'Delete user by Id',
    inputs: {
        idUser: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
         api.data.users.deleteById(action.params.idUser, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + action.params.idUser));
                        return;
                    }
                    //var collection = new utils.hyperJson({
                    //    _items : result
                    
                    //});
                    //collection.addSelfIdsToItems(utils.host + "/api/users/getById/" , "_id");
                    action.response = result.result;
                    next();
                }
            }
        });
        
    }
};
