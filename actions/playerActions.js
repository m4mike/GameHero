var utils = require("../utils")
var events = require('events');
var util = require('util');

exports.players = {
    name: 'playerActions',
    description: 'List possible actions on players',
    domain: "player",
    outputExample: null,
    
    run: function (api, action, next) {
        
        var collection = new utils.HyperJson();
        collection.link("Find player by id", api.serverUrl + "/api/players/byId/:playerId")
            .link("Delete player", api.serverUrl + "-delete-/api/players/:playerId");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.playerById = {
    name: 'playerById',
    description: 'Get player by Id',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.playerId;
        
        api.data.players.getById(id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    //var collection = new utils.HyperJson({
                    //    _items : result
                    
                    //});
                    //collection.addSelfIdsToItems(api.serverUrl + "/api/players/getById/" , "_id");
                    action.response = result;
                    next();
                }
            }
        });
        
    }
};

exports.playersForApp = {
    name: 'playersForApp',
    description: 'get all players for an app',
    inputs: {
        idApp: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.idApp;
        
        api.data.players.playersForApp(id, function (err, result) {
            if (err) return next(err);
            if (result == null) {
                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            } else {
                if (result.length == 0) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    return next(new Error("not found: " + id));
                    
                }
                var collection = new utils.HyperJson({
                    _items : result
                    
                });
                collection.addSelfIdsToItems(api.serverUrl + "/api/players/byId/" , "_id");
                action.response = result;
                next();
            }
            
        });
        
    }
};



exports.playerDelete = {
    name: 'playerDelete',
    description: 'Delete player by Id',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        var id = action.params.playerId;
        
        api.data.players.deleteById(id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    action.response = result.result;
                    next();
                }
            }
        });
        
    }
};


/*
 * Creates a player if given an external id and an app.. the user is created too
 * 
 * */
exports.createPlayerExt = {
    name: 'createPlayerExt',
    description: 'Creates a player if given an external id, </br>if a player with that external id is found, it is returned (even if the app is different)<br/>',
    inputs: {
        idApp: {
            required: true,
            validator: null
        },
        idExt: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        

       var state = {
            app: null,
            user: null, 
            player: null, 
            idApp: action.params.idApp, 
            idExt : action.params.idExt,
            idUser: null, 
            abort: false, err: null
        };
        
        if (state.idExt == '{idExt}') return next(new Error('idExt is required'));
        var EventEmitter = require('events').EventEmitter;
        var emitter = new EventEmitter();
        
        
        /*
         * binding the events
         * start
         *    -> getapp get the app (app must exist)
         * 
         * */
        emitter.on('start', function () { 
            emitter.emit('maybeplayer');
        });
        
        //test: maybe the player exists
        emitter.on('maybeplayer', function () {
            api.data.players.getIdByidExt(state.idExt, function (err, player) {
                if (!err && player !=null) {
                    if (player.id_ext === state.idExt) {
                        state.player = player;
                        state.abort = true;
                        emitter.emit('ready');
                    } else {
                        emitter.emit('getapp');
                    }
                } else { // proabably no player found
                    emitter.emit('getapp');
                }
           
            }); 
        });

        // find the app: it has to exist
        emitter.on('getapp', function () {
           
            api.data.apps.getById(state.idApp, function (err, theApp) {
                if (err || theApp == null) {
                    state.err = new Error('App not found');
                    state.abort = true; emitter.emit('error');
                        
                } else {
                    state.app = theApp;
                    emitter.emit('createPlayer');
                }
            })
        });

       
        emitter.on('createPlayer', function () {
            if (state.abort) return;
            state.player = api.data.players.getProto();
            if (state.app != null && state.app.counters != null)
                state.player.counters = _.clone(state.app.counters);
            if (state.app == null) {
                state.player == null,
                    state.err = new Error("app not found");
                return emitter.emit('error');
                    
            }
            state.player.id_app = state.app._id;
            state.player.id_ext = state.idExt;
            if (state.user == null) {
                //create user from player and app
                emitter.emit('createAndSaveUserFromPlayerAndApp');
                    
            } else {
                //add this player to the user
                state.player.id_user = state.user._id;
                return emitter.emit('savePlayer');;
            }
        });
        
        emitter.on('savePlayer', function () {
            if (state.abort) return;
            //save player
            api.data.players.save(state.player, function (err, p) {
                if (err) {
                    state.err = new Error('Unable to create player:' + err);
                    state.abort = true; emitter.emit('error');
                }
                else emitter.emit('ready');
            });
           
        });
        
        emitter.on('createAndSaveUserFromPlayerAndApp', function () {
            var u = api.data.users.getProto();
            u.apps.push({ "id_app": state.idApp, "id_player": state.player._id });
            state.player.id_user = u._id;
            api.data.users.save(u, function (err, res) {
                if (err) {
                    state.err = err; state.abort = true;
                    emitter.emit('error');
                }
                else emitter.emit('savePlayer');
            });
        });
        
        emitter.on('ready', function () {
            action.response = state.player;
            next(null, state.player);
        });
        
        emitter.on('error', function () {
            action.response = state.err;
            action.connection.rawConnection.responseHttpCode = "404";
            next(state.err);
        });

        emitter.emit('start');
        
    }
};


