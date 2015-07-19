var utils = require("../utils")
var events = require('events');
var util = require('util');
var async = require('async');

var standardInputs = {
    actiontype: {
        required: true,
        validator: null
    },
    ts: {
        required: true,
        validator: null
    },
    app: {
        required: true,
        validator: null
    },
    from: {
        required: true,
        validator: null
    },
    to: {
        required: true,
        validator: null
    },
    detail: {
        required: false,
        validator: null
    },
    post: {
        required: false,
        validator: null
    },
};


exports.socialactions = {
    name: 'socialactions',
    description: 'List possible actions for social',
    outputExample: null,
    
    run: function (api, action, next) {
        
        
        var collection = new utils.HyperJson();
        collection.link("Find User by id", api.serverUrl + "/api/users/byId/:idUser")
            .link(" DELETE Delete user, will delete its players", api.serverUrl + "-delete-/api/users/:idUser")
            .link("Create player for App", api.serverUrl + "/api/users/:idUser/addPlayer/:idPlayer/:app")
            .link("Add interest to user", api.serverUrl + "/api/users/:idUser/addInterest/:lang/:cat/:interest")
            .link("Remove interest from user", api.serverUrl + "/api/users/:idUser/removeInterest/:lang/:cat/:interest")
            .link("check if user has interest", api.serverUrl + "/api/users/:idUser/hasInterest/:lang/:cat/:interest")
        
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }

};

/*
 * Posts a message to a players wall
 * 
 */
exports.socialpost = {
    name: 'socialpost',
    description: 'post on a players wall',
    outputExample: {
        
        app: "app_mlg",
        from: "p1",
        to: "p2",
        post: {
            msg: 'hello from Beatrice'
        },
    },
    inputs: {
        
        app: {
            required: true,
            validator: null
        },
        from: {
            description: 'the player who posts',
            required: true,
            validator: null
        },
        to: {
            required: true,
            validator: null
        },
        post: {
            required: false,
            validator: null
        },
    },
    
    
    run: function (api, action, next) {
        
        var state = {
            playerFrom: action.params.from, 
            playerTo: action.params.to, 
            playerFromCheck : false,
            playerToCheck : false,
            idApp: action.params.app, 
            post: action.params.post, 
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
            api.tasks.enqueue("postonwall", state, 'default', function (err, toRun) {
                state.resp = {
                    ok: 1,
                    state: 'queued'
                };
                return emitter.emit('ready');
            });
            
            
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



/*
 * A player attacks another player
 * 
 */
exports.socialattack = {
    name: 'socialattack',
    description: 'A player attacks another player: example ' + JSON.stringify({
        "app": "app_mlg",
        "from": {
            "id": "p1"
        },
        "to": {
            "id": "p2",
        },
        "winner": "from",
        "detail": {
            "game": "bitchfight",
            "a_health": "10",
            "d_health": "8",
            "a_score": "6",
            "d_score": "0",
            "item_transfer": {
                "id_item": "--MLG id of item -",
                "name": "name of item to display"
            }
        },
        "post": {
            "msg": "voila pour ta poire"
        }
    })
    
    ,
    outputExample: {
        "app": "app_mlg",
        "from": {
            "id": "p1"
        },
        "to": {
            "id": "p2",
        },
        "winner": "from",
        "detail": {
            "game": "bitchfight",
            
            "a_health": "10",
            "d_health": "8",
            "a_score": "6",
            "d_score": "0",
            "item_transfer": {
                "id_item": "--MLG id of item -",
                "name": "name of item to display"
            }
        },
        "post": {
            "msg": "voila pour ta poire"
        }
    
    },
    inputs: {
        
        app: {
            required: true,
            validator: null,
            description: 'the application, ex app_mlg',
        },
        from: {
            description: 'the player who attacks',
            required: true,
            validator: null
        },
        to: {
            description: 'the player who defends',
            required: true,
            validator: null
        },
        winner: {
            description: "winner, can be 'from' or 'to'",
            required: true,
            validator: null
        },
        detail: {
            description: 'the details of the attack ' + JSON.stringify({
                "detail": {
                    "game": "bitchfight",
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
            details:"An optional post to the wall : ex {msg:'i got you'}",
            required: false,
            validator: null
        },

    },
    
    
    run: function (api, action, next) {
        
        var state = {
            playerFrom: action.params.from, 
            playerTo: action.params.to, 
            playerFromCheck : false,
            playerToCheck : false,
            idApp: action.params.app, 
            post: action.params.post, 
            detail : action.params.detail,
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
            //check both players then emit post
            state.detail = action.params.detail;
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
                return emitter.emit('ready');
            });
            
            
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


/*
 * 
 * Changes a player status on his wall
 * 
 * 
 */

exports.socialstatus = {
    name: 'socialstatus',
    description: 'post a status on a players wall',
    outputExample: null,
    inputs: standardInputs,
    
    
    run: function (api, action, next) {
        
        action.response = JSON.stringify(action.params);
        action.response.error = null;
        
        next();
    }

};

var getCurrentMonth = function () {
    var d = new Date();
    var m = d.getMonth() + 1;
    var m2 = m < 10 ? "0" + m : "" + m;
    return "" + d.getFullYear() + m2;
}
/*
 * 
 * Gets the wall of a player
 * 
 */
exports.socialwallplayer = {
    name: 'socialwallplayer',
    description: 'get the wall of a player, the month is optional and defaults to current month : YYYYMM',
    outputExample: {
        inputs: {
            playerId: "p11",
            month: "201507"
        }
    },
    inputs: {
        playerId: {
            required: true,
            validator: null
        },
        month: {
            required: false,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        if (action.params.month === "{month}") {
            action.params.month = getCurrentMonth();
        }
        api.data.social.getPlayerWall(action.params.playerId, action.params.month, function (err, res) {
            
            action.response = res;
            action.response.error = null;
            next(null, res);

        })


    }

};


exports.socialwallExtPlayer = {
    name: 'socialwallextplayer',
    description: 'get the wall of a player, with exteranl ID, the month is optional and defaults to current month : YYYYMM',
    outputExample: {
        inputs: {
            ext_playerId: "mlg1",
            month: "201507"
        }
    },
    inputs: {
        ext_playerId: {
            required: true,
            validator: null
        },
        month: {
            required: false,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        if (action.params.month === "{month}") {
            action.params.month = getCurrentMonth();
        }
        api.data.social.getExtPlayerWall(action.params.ext_playerId, action.params.month, function (err, res) {
            
            action.response = res;
            action.response.error = null;
            next(null, res);

        })


    }

};
