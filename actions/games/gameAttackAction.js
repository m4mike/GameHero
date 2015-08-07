/*
 * Attack types:
-	Outside : [outside] only the result of the attack is sent to the system. 
Ex: player 1 plays a puzzle game to steal an item from player2, after the game, the system is updated with the game result and the item is transferred from player1 to player 2.
-	SingleAttack: [single]  the attacker, player1  receives a challenge from player 2 and tries to win the challenge without player2 to participate in the attack. 
Ex: attacker tries to guess preferences from player 2. When the attack is initiated, a set of preferences from player 2 is extracted and player 1 tries to guess them. If he wins, the system is updated with the win, and the item is transfered.
-	MultiAttack: [multi]the attacker and the defender play multiple turns to find out who will win. 
Example: a game of tic tac toe against both players. The attacker initiates an attack with a tictactoe challenge and player 2 receives an invitation to defend. He does so by playing a move. Player 1 receives an invitation to continue until the game finishes and a winner is known.
-	MultiAttack AI : [ai] tha attacker initiates an attack with a multiplayer game, but player 1 does not play this game and an ai adversary is available to play. The AI will defend player 1. 
Example:  a game of tictactoe against an ai adversary. 
*/

var utils = require("../../utils");
var actionUtils = require("../../utils/actionUtils.js");
var events = require('events');
var util = require('util');
var async = require('async');

/*
 * A player attacks another player
 * 
 */
exports.game_attack = {
    name: 'game_attack',
    description: 'A player attacks another player: example with internal ids: (for external, replace id by id_ext)<br/> ' + JSON.stringify({
        "app": "app_mlg",
        "from": {
            "id": "p11"
        },
        "to": {
            "id": "p12",
        },
        "game": "g_mld",
        "data": {},
        "post": {
            "msg": "voila pour ta poire"
        }
    }),
    
    inputs: {
        
        app: {
            required: true,
            validator: null,
            description: 'the application, ex app_mlg',
        },
        from: {
            description: 'the player who attacks, either a sting: internal player, either an object {id_ext: external id } or {id:internal id}',
            required: true,
            validator: null
        },
        to: {
            description: 'the player who defends, same rules as from',
            required: true,
            validator: null
        },
        winner: {
            description: "winner, can be empty, 'from' , 'to' or 'draw' ",
            required: false,
            validator: null
        },
        game: {
            description: 'what game is played ex: g_mld ' ,
            required: true,
            validator: null
        },
        data: {
            description: 'not required. the details of the attack<br/> example :<br/>' + JSON.stringify({
                "data": {
                    "from": { health: 10, score: 6 },
                    "to": { health: 10, score: 6 },
                    "item_transfer": {
                        "id_item": "--MLG id of item -",
                        "name": "name of item to display"
                    }
                }
            }),
            required: false,
            validator: null
        },
        post: {
            description: "An optional post to the wall : ex {msg:'i got you'} or 'i got you!'",
            required: false,
            validator: null
        },

    },
    
    
    run: function (api, action, next) {
        
        var state = {
            action : 'attack',
            playerFrom: action.params.from, 
            playerTo: action.params.to, 
            playerFromCheck : false,
            playerToCheck : false,
            idApp: action.params.app, 
            post: action.params.post, 
            data : action.params.data,
            winner : action.params.winner,
            game : action.params.game,
            hasPosted:false,
            fromData: null,
            toData : null,
            resp:{},
            err: null
        };
        
        var EventEmitter = require('events').EventEmitter;
        var emitter = new EventEmitter();
        
        emitter.on('start', function () {
            //get players and game and test app
            async.parallel([
                function (cb) { 
                    actionUtils.getPlayers(api, state, function (err) {
                        if (err) state.err = err; 
                        return cb();
                    })
                },
                function (cb) {
                    api.data.games.byId(state.game, function (err, game) {
                        if (err) state.err = err;
                        if (game == null) state.err = "unknown game";
                        if (state.err)
                            return cb();
                        state.game = game;
                        return cb();
                    })
                },
                function (cb) {
                    api.data.apps.byId(state.idApp, function (err, app) {
                        if (err) state.err = err;
                        if (app == null) state.err = "unknown app";
                        cb();
                    })
                }], 

                function (err) {
                    if (err) { state.err = err; }
                    if (state.err) return emitter.emit('error');
                    if (!state.playerFromCheck) {
                        state.err = new Error('player from not found'); return emitter.emit('error');
                    }
                    if (!state.playerToCheck) {
                        state.err = new Error('player to not found'); return emitter.emit('error');
                    }
                    if (state.winner == 'from' || state.winner == 'to') {
                        emitter.emit('post');
                        state.hasPosted = true;
                    } 
                    return emitter.emit('getgamedata');
                });
        });
        
        emitter.on('getgamedata', function getGames() {
            async.parallel({
                one:function(cb) {
                    if (state.data == null || state.data['from'] == null) {
                        api.data.games.getGameData(state.game._id, state.playerFrom._id, function (err, res) {
                            if (err) { state.err = err }
                            if (res == null) state.err = new Error('from player has no data for the attack');
                            if (state.err) return cb() 
                            state.fromData = res.data;
                            return cb();
                        });
                    } else {
                        state.fromData = state.detail.from;
                        api.data.games.saveGameData(state.game._id, state.playerFrom._id, state.fromData);
                        return cb();
                    };
                   
                },
                two:  function (cb) {
                    if (state.data == null || state.data['to'] == null) {
                        api.data.games.getGameData(state.game._id, state.playerTo._id, function (err, res) {
                            if (err) { state.err = err }
                            if (res == null) state.err = new Error('to player has no data for the attack');
                            if (state.err)
                                return cb() 
                            state.toData = res.data;
                            return cb();
                        });
                    } else {
                        state.toData = state.detail.to;
                        api.data.games.saveGameData(state.game._id, state.playerto._id, state.toData);
                        return cb();
                    };
                    
                }}, 
                function (err,result) {
                    if (err) { state.err = err; }
                    if (state.err) return emitter.emit('error');
                    if (!state.fromData) {
                        state.err = new Error('no game date for from player'); return emitter.emit('error');
                    }
                    if (!state.toData) {
                        state.err = new Error('no game data for to player'); return emitter.emit('error');
                    }
                    return emitter.emit('game');
                });
        });
        

        emitter.on('game', function doGame() {
            if (state.winner == 'from' || state.winner == 'to') { // winner is allready known
                return emitter.emit('counters');
            } 
            api.data.games.playGame(state
                , function (err, newState) {
                    if (err) { state.err = err; emitter.emit('error') }
                    //state = newState;
                    if (!state.hasPosted) emitter.emit('post');
                    emitter.emit('counters');
                }
            );
        });

        

        emitter.on('post', function () {
            if (typeof state.post == 'string') {
                var msg = state.post
                state.post = {};
                state.post.msg = msg;
            }
            // enqueues the writing to the walls
            api.tasks.enqueue("socialattack", state, 'default', function (err, toRun) {});
        });
        
        emitter.on('counters', function () {
            var actions = [state.action];
            if (state.winner == 'from') actions.push('attack-win');
            api.logic.counters.updateCounters(state.playerFrom._id, state.idApp, actions, function (err, update) {
                state.resp.notification = update;
                emitter.emit('ready');
            })
        });
        
        emitter.on('ready', function () {
            
            state.resp.ok = 1;
            state.resp.result = {
                winner: state.winner,
                moves: state.moves
            };
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
