var utils = require("../utils")
var async = require('async');
var _ = require('lodash');

exports.appActions = {
    name: 'appActions',
    description: 'List possible actions on apps',
    domain: "App",
    outputExample: null,
    
    run: function (api, action, next) {
        
        
        var collection = new utils.HyperJson();
        collection
            .link("List all apps", utils.host + "/api/apps/all")
            .link("Find app by id", utils.host + "api/apps/byId/:idApp");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.appList = {
    name: 'appList', //todo
    description: 'Get a list of applications',
    
    run: function (api, action, next) {
        
        api.data.apps.list(function (err, result) {
            
            var collection = new utils.HyperJson({
                _items : result
        
            });
            collection.addSelfIdsToItems(utils.host + "/api/apps/byId/", "_id");
            action.response = collection.toObject();
            next();

        });
        
    }
};


exports.appCreatePlayer = {
    name: 'appCreatePlayer',
    description: 'Create player for an appl',
    documentation: 'ddd',
    inputs: {
        idApp: {
            required: true,
            validator: null
        },
        idUser: {
            required: false, validator: null, description: 'optional'
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.idApp;
        
        
        
        
        var createAndSaveUserFromPlayerAndApp = function (player, idApp, nn) {
            var u = api.data.users.getProto();
            u.apps.push({ "id_app": idApp, "id_player": player._id });
            player.id_user = u._id;
            api.data.users.save(u, function (err, res) {
                if (err) nn(err)
                else nn(null, u)
            });
        }
        
        
        var temp = { user : null, player: null, idApp: action.params.idApp, abort: false, err: null };
        //
        async.series(
            [
             //get user
                function (cb) {
                    if (action.params.idUser != null && action.params.idUser.indexOf( "{idUser}") <0) {
                        api.data.users.searchOne({ "_id" : action.params.idUser }, { "_id": 1, "apps": 1 }, function (err, result) {
                            if (err || result == null || result.length == 0) {
                                // the given user did not exist -> create player and new user 
                                return cb();
                            } else {
                                temp.user = result;
                                return cb();
                            }
                        });
                    }else  return cb();
               
                },
            //get player if it exists
                function (cb) {
                    if (temp.abort) return cb();
                    if (temp.user == null) return cb();
                    
                    var selected = _.where(temp.user.apps, { "id_app" : temp.idApp });
                    if (selected.length > 0) {
                        temp.idPlayer = selected[0].id_player;
                        api.data.players.getById(temp.idPlayer, function (err, result) {
                            // check if player has that app
                            temp.player = result;
                            if (temp.player.id_app != temp.idApp) {
                                //seems player does not play that app ?!
                                api.data.apps.addPlayerToApp(temp.idApp, temp.player._id, _.noop);
                            }
                            temp.abort = true; // player is ready
                            return cb();
                        });
                    } else  return cb();
                    
                },
            //create player  - and user if it was empty
            //get app data for making player counters
                function (cb) {
                    if (temp.abort) return cb();
                    
                    
                    api.data.apps.getById(action.params.idApp, function (err, theApp) {
                        if (err) {
                            temp.err = new Error('App not found');
                            temp.abort = true;
                            return cb();
                        }
                        temp.app = theApp;
                        return cb();
                    });
                    
                },
             //create player
                function (cb) {
                    if (temp.abort) return cb();
                    temp.player = api.data.players.getProto();
                    if (temp.app != null && temp.app.counters != null)
                        temp.player.counters = _.clone(temp.app.counters);
                    if (temp.app == null) {
                        temp.player == null,
                        temp.err = "app not found";
                        temp.abort = true;
                        return cb();
                    }
                    temp.player.id_app = temp.app._id;
                    if (temp.user == null) {
                        //create user from player and app
                        createAndSaveUserFromPlayerAndApp(temp.player, temp.idApp, function (err, u) {
                            return cb();
                        })
                    } else {
                        //add this player to the user
                        temp.player.id_user = temp.user._id;
                        return cb();
                    }
                    
                
                },
                //save player
                function (cb) {
                    if (temp.abort) return cb();
                    //save player
                    api.data.players.save(temp.player, _.noop);
                    temp.abort = true;
                    cb();
                }
            ]
        , function (err) {
                //console.log(JSON.stringify(temp.player));
                if (temp.err) {
                    action.response = temp.err;
                    action.connection.rawConnection.responseHttpCode = "404";
                    throw (new Error(temp.err));
                }
                else {
                    action.response = temp.player;
                    next();
                }
            });
    }
};





