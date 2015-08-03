// uses a combination of mongo and redis
var _ = require('lodash');
var api = null;
var data = require('../data');

module.exports.init = function (theapi) {
    //api.log("initialising interests");
    api = theapi;
    return module.exports;
}


module.exports.updateCounters = function (idPlayer, idApp, actions, next) {
      
    //get cached counters for app:
    var state = {
        player: null,
        idApp: idApp,
        counters: null,
        err: null
    };
    
    var EventEmitter = require('events').EventEmitter;
    var emitter = new EventEmitter();
    
    //binding the events
    //   start -> getDb ->createActionLog -> createWallItem
    
    emitter.on('start', function () {
        api.cache.load('counters_' + idApp, { expireTimeMS: 300000 }, function (err, cnt) {
            if (!err && cnt) {
                state.counters = cnt;
                return emitter.emit('countersin');
            }
            else {
                //get app and counters
                api.data.apps.getById(idApp, function (err, app) {
                    if (err) { state.err = err; return emitter.emit('error') }
                    else {
                        state.counters = app.actions;
                        emitter.emit('savecache');
                        return emitter.emit('countersin');
                    }
                });
            }
        })
    });
    
    emitter.on('savecache', function () {
        api.cache.save('counters_' + idApp, state.counters);
    });
    
    emitter.on('countersin', function () {
        //filter the counters we need , id's are in actions param, need to match id in state.counters'
        //state counters contains elems like         
        //   {
        //      "id": "status",
        //      "counters": [ ["exp", 1]]
        //   }
        // the counter field in player is an object
        //
        // we only need the app counters for the actions in the param
        if (typeof actions === 'string') actions = [actions];
        
        var filtered = [];
        for (var i = 0; i < state.counters.length; i++) {
            if (_.indexOf(actions, state.counters[i].id) != -1)
                filtered.push(state.counters[i]);
        }           
        
        //filtered contains counters that need an update
        api.data.players.getById(idPlayer, function (err, player) {
            if (player.counters == null) player.counters = {};
            var modified = [];
            //foreach action, update the player counters
            _.forEach(filtered, function (action) {
                _.forEach(action.counters, function (cntr) {
                    var c = { cntr: cntr[0], from: 0, to: 0 };
                    if (player.counters[cntr[0]] == null) {
                        player.counters[cntr[0]] = cntr[1];
                        c.to = cntr[1];
                    }
                    else {
                        c.from = player.counters[cntr[0]];
                        player.counters[cntr[0]] += cntr[1];
                        c.to = player.counters[cntr[0]];

                    };
                    modified.push(c);   
                })
            })
            state.player = player;
            state.modified = modified;
            if (modified.length > 0) emitter.emit('saveplayer');
            return emitter.emit('ready')
       })
      
    });
    
    emitter.on('saveplayer', function () {
        api.data.players.update(state.player._id, { counters: state.player.counters });
    })

    emitter.on('ready', function () { 
        if (state.player == null)
            next(null, null);
        else
            next(null, {
                ok: 1,
                notification: {
                    type:'counter_update',
                    modified: state.modified,
                    idPlayer: state.player._id, 
                    id_ext : state.player.id_ext, 
                    counters: state.player.counters
                }
           
            });
    });

    emitter.on('error', function () {
        next(state.err);
    });

    emitter.emit('start');
}