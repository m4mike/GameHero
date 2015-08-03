var utils = require("../../utils")
var events = require('events');
var util = require('util');
var async = require('async');




/*
 * 
 * Changes a player status on his wall
 * 
 * 
 */

exports.socialstatus = {
    name: 'socialstatus',
    description: 'change status on a players wall<br/> example:<br/>{"app":"app_mlg","from":{"id":"p11"},"post":{"msg":"quelle belle journée!"}}',
    inputs: {
        app: {
            required: true,
            validator: null
        },
        from: {
            required: true,
            validator: null
        },
        post: {
            required: false,
            validator: null
        }
    },
    
    
    run: function (api, action, next) {
        
        var state = {
            action : 'status',
            playerFrom: action.params.from, 
            playerFromCheck : false,
            idApp: action.params.app, 
            post: action.params.post, 
            err: null
        };
        
        var EventEmitter = require('events').EventEmitter;
        var emitter = new EventEmitter();
        
        //binding the events
        //   start -> getting players from player id's
        //            checkPlayerFrom - playerFrom -
         //   post -> create task to post, reply
        
        
        emitter.on('start', function () {
            var nextEmit = 'internal';
            if (typeof state.playerFrom === 'object') {
                if (state.playerFrom.id_ext != null) {
                    nextEmit = 'external';
                    state.playerFrom = state.playerFrom.id_ext;
                } else {
                    state.playerFrom = state.playerFrom.id;
                   
                }
            }
            emitter.emit(nextEmit);
        })
        
        
        emitter.on('internal', function () {
            api.data.players.getBaseInfoById(state.playerFrom, function (err, p1) {
                if (p1 == null) { state.playerFromCheck = false; }
                else {
                    state.playerFrom = p1;
                    state.playerFromCheck = true;
                    emitter.emit('post');
            
                }
            })
        });
        
        emitter.on('external', function () {
            //check both players from external id then emit post
            
            api.data.players.getBaseInfoByIdExt(state.playerFrom, function (err, p1) {
                if (p1 == null) { state.playerFromCheck = false; state.err = new Error('player not found');emitter.emit('error');}
                else {
                    state.playerFrom = p1;
                    state.playerFromCheck = true;
                    emitter.emit('post');
                }
            })
        });
        
        emitter.on('post', function () {
            if (!state.playerFromCheck) {
                state.err = new Error('player from not found'); return emitter.emit('error');
            }
           
            
            if (typeof state.post == 'string') {
                var msg = state.post
                state.post = {};
                state.post.msg = msg;
            }

            api.data.social.postOnWall(state.playerFrom, state.playerTo, state.idApp, state.post, state.action, function(){
                            
                return emitter.emit('calc');
            });
            
            
        });
        
        emitter.on('calc', function () {
            api.logic.counters.updateCounters(state.playerFrom._id, state.idApp, state.action, function (err, update) {
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




/*
 * Posts a message to a players wall
 * 
 */
exports.socialpost = {
    name: 'socialpost',
    description: 'post on a players wall<br/> example:<br/>{"app":"app_mlg","from":{"id":"p11"},"to":{"id":"p12"},"post":{"msg":"Comment vas tu?"}}',
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
            action : 'post',
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
        })
        
        
        emitter.on('internal', function () {
            //check both players then emit post
            async.parallel([
                function (cb) {
                    
                    
                    
                    api.data.players.getBaseInfoById(state.playerFrom, function (err, p1) {
                        if (p1 == null) { state.playerFromCheck = false; state.err = new Error('player not found'); }
                        else {
                            state.playerFrom = p1;
                            state.playerFromCheck = true;
                        }
                        cb();
                    })
                },
                function (cb) {
                    api.data.players.getBaseInfoById(state.playerTo, function (err, p2) {
                        if (p2 == null) { state.playerToCheck = false; state.err = new Error('player not found');}
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
        
        emitter.on('external', function () {
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
            api.data.social.postOnWall(state.playerFrom, state.playerTo, state.idApp, state.post, state.action, function () {
                       
                
                return emitter.emit('calc');
            });
            
            
        });
        
        emitter.on('calc', function () {
            api.logic.counters.updateCounters(state.playerFrom._id, state.idApp, state.action, function (err, update) {
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

