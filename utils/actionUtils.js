var events = require('events');
var util = require('util');
var async = require('async');

/*
 * GetPlayers maps external players into players and checks players exist
 */
module.exports.getPlayers = function getPlayers(api,state, next) {
    //state needs to contain playerFrom and playerTo
    //next is a err,result function
    
    var EventEmitter = require('events').EventEmitter;
    var emitter = new EventEmitter();
   
   
    emitter.on('start', function () {
        var nextEmit = 'internal';
        try {
            if (typeof state.playerFrom === 'object') {
                if (typeof state.playerTo != 'object') {
                    state.err = new Error('playerTo is not an object');
                    return emitter.emit('error');
                }
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

        } catch (err) {
            state.error = err;
            return emitter.emit('error')
        }
    });
    
    emitter.on('internal', function () {
        async.parallel([
            function (cb) {
                api.data.players.getBaseInfoById(state.playerFrom, function (err, p1) {
                    if (p1 == null) { state.playerFromCheck = false; }
                    else {
                        state.playerFrom = p1;
                        state.playerFromCheck = true;
                    }
                    return cb();
                })
            },
            function (cb) {
                api.data.players.getBaseInfoById(state.playerTo, function (err, p2) {
                    if (p2 == null) { state.playerToCheck = false; }
                    else {
                        state.playerTo = p2;
                        state.playerToCheck = true;
                    }
                    return cb();
                })
            }], 
            function (err) {
                if(err){ state.err = err; return emitter.emit('error')}
                return emitter.emit('ready');
            }
        );
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
            }], 
            function (err) {
                if (err) { state.error = err; return emitter.emit('error') }
                return emitter.emit('ready');
            }
        );//async
   });
    emitter.on('ready', function () {
        return next(null, state);
    });
    
    emitter.on('error', function () {
        return next(state.err);
    });
    emitter.emit('start');
}