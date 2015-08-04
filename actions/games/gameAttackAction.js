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

var utils = require("../../utils")
var events = require('events');
var util = require('util');
var async = require('async');




/*
 * A player attacks another player
 * 
 */
exports.game_attack_single = {
    name: 'game_attack_single',
    description: 'A player attacks another player: example with internal ids: (for external, replace id by id_ext)<br/> ' + JSON.stringify({
        "app": "app_mlg",
        "from": {
            "id": "p11"
        },
        "to": {
            "id": "p12",
        },
        "game":"MYLITTLEDUEL",
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
            description: "winner, can be 'from' or 'to'",
            required: true,
            validator: null
        },
        detail: {
            description: 'the details of the attack example :<br/>' + JSON.stringify({
                "detail": {
                    "game": "MYLITTLEDUEL",
                    "a_health": "10",
                    "d_health": "8",
                    "a_score": "6",
                    "d_score": "0",
                    "item_transfer": {
                        "id_item": "--MLG id of item -",
                        "name": "name of item to display"
                    }
                }
            }),
            required: true,
            validator: null
        },
        post: {
            details: "An optional post to the wall : ex {msg:'i got you'} or a string with the message",
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
            detail : action.params.detail,
            winner : action.params.winner,
            err: null
        };
        
        var EventEmitter = require('events').EventEmitter;
        var emitter = new EventEmitter();
        
        
        //binding the events
        //   start -> getting players from player id's
        //            checkPlayerFrom - playerFrom -
        //            checkPlayerTo   - playerTO -
        //   post -> create task to post, reply
        
        emitter.on('start', function () {
            var nextEmit = 'internal';
            
            if (typeof state.playerFrom === 'object') {
                if (state.playerFrom.id_ext != null) {
                    nextEmit = 'external';
                    state.playerFrom = state.playerFrom.id_ext;
                    state.playerTo = state.playerTo.id_ext;
                } else {
                    
                    state.playerFrom = state.playerFrom.id;
                    state.playerTo = state.playerTo.id;
                }
            }
            
            
            
            emitter.emit(nextEmit);
        });
        
        emitter.on('internal', function () { emitter.emit('getplayers') });
        emitter.on('external', function () { emitter.emit('getplayersext') });
        emitter.on('getplayers', function () {
            //check both players then emit post
            
            async.parallel([
                function (cb) {
                    api.data.players.getBaseInfoById(state.playerFrom, function (err, p1) {
                        if (p1 == null) { state.playerFromCheck = false; }
                        else {
                            state.playerFrom = p1;
                            state.playerFromCheck = true;
                        }
                        cb();
                    })
                },
                function (cb) {
                    api.data.players.getBaseInfoById(state.playerTo, function (err, p2) {
                        if (p2 == null) { state.playerToCheck = false; }
                        else {
                            state.playerTo = p2;
                            state.playerToCheck = true;
                        }
                        cb();
                    })
                }]
                , function (err) {
                emitter.emit('post');
            
            });
            
            
        });
        
        emitter.on('getplayersext', function () {
            //check both players from external id then emit post
            
            async.parallel([
                function (cb) {
                    api.data.players.getBaseInfoByIdExt(state.playerFrom, function (err, p1) {
                        if (p1 == null) { state.playerFromCheck = false; }
                        else {
                            state.playerFrom = p1;
                            state.playerFromCheck = true;
                        }
                        cb();
                    })
                },
                function (cb) {
                    api.data.players.getBaseInfoByIdExt(state.playerTo, function (err, p2) {
                        if (p2 == null) { state.playerToCheck = false; }
                        else {
                            state.playerTo = p2;
                            state.playerToCheck = true;
                        }
                        cb();
                    })
                }]
                , function (err) {
                emitter.emit('post');
            
            });
            
            
        });
        
        
        emitter.on('post', function () {
            if (!state.playerFromCheck) {
                state.err = new Error('player from not found'); return emitter.emit('error');
            }
            if (!state.playerToCheck) {
                state.err = new Error('player to not found'); return emitter.emit('error');
            }
            
            if (typeof state.post == 'string') {
                var msg = state.post
                state.post = {};
                state.post.msg = msg;
            }
            
            api.tasks.enqueue("socialattack", state, 'default', function (err, toRun) {
                state.resp = {
                    ok: 1,
                    state: 'queued'
                };
                return emitter.emit('counters');
            });
            
            
        });
        
        emitter.on('counters', function () {
            var actions = [state.action];
            if (state.winner == 'from') actions.push('attack-win');
            api.logic.counters.updateCounters(state.playerFrom._id, state.idApp, actions, function (err, update) {
                state.resp = update;
                emitter.emit('ready');
            })
        });
        
        emitter.on('ready', function () {
            action.response = state.resp;
            return next();
        });
        
        emitter.on('error', function () {
            action.error = state.err;
            action.connection.rawConnection.responseHttpCode = "404";
            return next(state.err);
        });
        
        
        emitter.emit('start');

    }

};
