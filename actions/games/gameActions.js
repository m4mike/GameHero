var utils = require("../../utils")
//var events = require('events');
//var util = require('util');

exports.games = {
    name: 'gameActions',
    description: 'List possible actions on games',
    outputExample: null,
    
    run: function (api, action, next) {
        
        var collection = new utils.HyperJson();
        collection.link("all games", api.serverUrl + "/api/games/all")
            .link("list games for an app", api.serverUrl + "/api/games/forApp");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.allGames = {
    name: 'allGames',
    description: 'Get all games',
   
    
    run: function (api, action, next) {
               
        api.data.games.getAll( function (err, result) {
            if (err)  next(err);
            else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("500 : not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("500 : not found: " + id));
                        return;
                    }
                    var hj = new utils.HyperJson({
                        ok:1,            
                        _items : result
                    
                    });
                    hj.addSelfIdsToItems(api.serverUrl + "/api/games/byId/" , "_id");
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};

exports.gamesForApp = {
    name: 'gamesForApp',
    description: 'get all games for an app, try appId : app_mlg',
    inputs: {
        idApp: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.idApp;
        
        api.data.games.gamesForApp(id, function (err, result) {
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
                collection.addSelfIdsToItems(api.serverUrl + "/api/games/byId/" , "");
                action.response = collection.toObject();
                next();
            }
            
        });
        
    }
};


exports.MLDSave = {
    name: 'savegamedata',
    description: 'Save a player data for a game. For example:  moves for MyLittleDuel: ( id can be replaced by id_ext)<br/> ' + JSON.stringify({
        "app": "app_mlg",
        "game":"MYLITTLEDUEL",
        "player": {
            "id": "p11"
        },
        data: {
            "defence" : "LMH",
            "attack": "HHH"
        }
    }),
    
    inputs: {
        
        app: {
            required: true,
            validator: null,
            description: 'the application, ex app_mlg',
        },
        player: {
            description: 'the player to save, either a sting: internal player, either an object {id_ext: external id } or {id:internal id}',
            required: true,
            validator: null
        },
        game: {
            description: "A string with the game id",
            required: true,
            validator: null
        },
        data: {
            description: "An object representting the data for the game, for example mylittledueal has an attack and defence string  consisting of letter H (high), M (Middle), L (Low)",
            required: true,
            validator: null
        }
    },
    
    
    run: function (api, action, next) {
        
        var state = {
            player: action.params.player, 
            data: action.params.data, 
            game:action.params.game,
            playerCheck : false,
            app: action.params.app, 
            err: null
        };
        
        var EventEmitter = require('events').EventEmitter;
        var emitter = new EventEmitter();
        
        emitter.on('start', function () {
            var nextEmit = 'internal';
            
            if (typeof state.player === 'object') {
                if (state.player.id_ext != null) {
                    nextEmit = 'external';
                    state.player = state.player.id_ext;
                } else {
                    state.player = state.player.id;
                }
            }
            emitter.emit(nextEmit);
        });
        
        emitter.on('internal', function () {
            api.data.players.getBaseInfoById(state.player, function (err, p1) {
                if (p1 == null) { state.playerCheck = false; }
                else {
                    state.player = p1;
                    state.playerCheck = true;
                }
                emitter.emit('post');
            });
        });
        
        emitter.on('external', function () {
            api.data.players.getBaseInfoByIdExt(state.player, function (err, p1) {
                if (p1 == null) { state.playerCheck = false; }
                else {
                    state.player = p1;
                    state.playerCheck = true;
                }
                emitter.emit('save');
            })
        });
        
        emitter.on('save', function () {
            if (!state.playerCheck) {
                state.err = new Error('player not found'); return emitter.emit('error');
            }
            api.data.games.saveGameData({
                app:state.app,
                game: state.game, 
                player: state.player, 
                data: state.data,
            }, function (err, res) {
                state.resp = res;
                emitter.emit('ready');
            })
        });
        
        emitter.on('ready', function () {
            action.response = state.resp;
            return next();
        });
        
        emitter.on('error', function () {
            action.error = state.err;
            action.connection.rawConnection.responseHttpCode = "500";
            return next(state.err);
        });
        
        
        emitter.emit('start');

    }

};

