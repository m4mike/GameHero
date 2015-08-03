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
            .link("List all apps", api.serverUrl + "/api/apps/all")
            .link("Find app by id", api.serverUrl + "/api/apps/byId/:idApp")
            .link("Find app by id", api.serverUrl + "api/apps/byId/:idApp")
        
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
                _items: result

            });
            collection.addSelfIdsToItems(api.serverUrl + "/api/apps/byId/", "_id");
            action.response = collection.toObject();
            next();

        });

    }
};

exports.appById = {
    name: 'appById',
    description: 'Get an App by Id, try app_mlg',
    inputs: {
        id: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.id;
        
        api.data.apps.getById(id, function (err, result) {
            if (err) next(err);
            else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    
                    var hj = new utils.HyperJson({
                        ok: 1,    
                        _result : result
                    
                    });
                    
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};


/****
 * 
 * 
 * appCreatePlayer logic
 * 
 * 
 */


//exports.appCreatePlayer = {
//    name: 'appCreatePlayer',
//    description: 'Create player for an appl',
//    inputs: {
//        idApp: {
//            required: true,
//            validator: null
//        },
//        idUser: {
//            required: false, validator: null, description: 'optional'
//        }
//    },
    
//    run: function (api, action, next) {
        
//        var events = require('events');
//        var util = require('util');
        
//        var state = {
//            user: null, 
//            player: null, 
//            idApp: action.params.idApp, 
//            idUser: action.params.idUser, abort: false, err: null
//        };
        
//        var EventEmitter = require('events').EventEmitter;
//        var emitter = new EventEmitter();
        
//        //binding the events
//        //   getapp -> getuser 
//        //               -user-    ->getplayerforuser  
//        //                           -no player-     -> createplayerforuser
//        //                           -player-        -> ready
//        //               -no user- ->createplayerforuser
//        //                            - new player-  -> savePlayer
//        //                saveplayer -> ready                   
        
//        emitter.on('getApp', function () {
//            if (state.abort) return;
//            api.data.apps.getById(state.idApp, function (err, theApp) {
//                if (err) {
//                    state.err = new Error('App not found');
//                    state.abort = true; emitter.emit('error');
                        
//                } else {
//                    state.app = theApp;
//                    emitter.emit('getUser');
//                }
//            })
//        });
        
//        emitter.on('getUser' , function () {
//            if (action.params.idUser != null && action.params.idUser.indexOf("{idUser}") < 0) {
//                api.data.users.searchOne({ "_id": action.params.idUser }, { "_id": 1, "apps": 1 }, function (err, result) {
//                    if (err || result == null || result.length == 0) {
//                        // the given user did not exist -> create player and new user 
//                        emitter.emit('getPlayer')
//                    } else {
//                        state.user = result;
                            
//                    }
//                    emitter.emit('getPlayerForUser')
//                });
//            } else
//                emitter.emit('createPlayer')
//        })
        
//        emitter.on('getPlayerForUser', function () {
//            //needed: user
//            if (state.abort) return;
//            if (state.user == null) emitter.emit('error');
            
//            var selected = _.where(state.user.apps, { "id_app": state.idApp });
//            if (selected.length > 0) {
//                state.idPlayer = selected[0].id_player;
//                api.data.players.getById(state.idPlayer, function (err, result) {
//                    // check if player has that app
//                    state.player = result;
//                    if (state.player.id_app != state.idApp) {
//                        //seems player does not play that app ?!
//                        api.data.apps.addPlayerToApp(state.idApp, state.player._id, _.noop);
//                    }
//                    emitter.emit('ready') // player is ready
                        
//                });
//            } else return emitter.emit('createPlayer')
//        });
        
//        emitter.on('createAndSaveUserFromPlayerAndApp', function () {
//            var u = api.data.users.getProto();
//            u.apps.push({ "id_app": state.idApp, "id_player": state.player._id });
//            state.player.id_user = u._id;
//            api.data.users.save(u, function (err, res) {
//                if (err) {
//                    state.err = err; state.abort = true;
//                    emitter.emit('error'); 
//                }
//                else emitter.emit('savePlayer');
//            });
//        });
        
        
//        emitter.on('createPlayer', function () {
//            if (state.abort) return;
//            state.player = api.data.players.getProto();
//            if (state.app != null && state.app.counters != null)
//                state.player.counters = _.clone(state.app.counters);
//            if (state.app == null) {
//                state.player == null,
//                    state.err = new Error("app not found");
//                return emitter.emit('error');
                    
//            }
//            state.player.id_app = state.app._id;
//            if (state.user == null) {
//                //create user from player and app
//                emitter.emit('createAndSaveUserFromPlayerAndApp');
                    
//            } else {
//                //add this player to the user
//                state.player.id_user = state.user._id;
//                return emitter.emit('savePlayer');;
//            }
//        });
        
//        emitter.on('savePlayer', function () {
//            if (state.abort) return;
//            //save player
//            api.data.players.save(state.player, function (err, p) {
//                emitter.emit('ready');
//            });
           
//        });
        
//        emitter.on('abort', function () {
//            if (state.player != null) emitter.emit('ready');
//            else emitter.emit('error');
//        });
        
        
        
//        emitter.on('ready', function () {
//            action.response = { ok: 1 , _result: state.player };
//            next(null, state.player);
//        });
        
//        emitter.on('error', function () {
//            action.response = state.err;
//            action.connection.rawConnection.responseHttpCode = "404";
//            next(state.err);
//        });
        
//        emitter.emit('getApp');
        
//    }//run
//}//action





