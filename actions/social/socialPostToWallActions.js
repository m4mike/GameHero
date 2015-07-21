﻿var utils = require("../../utils")
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

