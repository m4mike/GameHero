﻿// uses a combination of mongo and redis
var _ = require('lodash');
var Promise = require('bluebird');

var client; // for redis
var database; // for mongo
var api = null;
var ObjectID = require('mongodb').ObjectID;

module.exports.init = function (theapi) {
    //api.log("initialising interests");
    api = theapi;
    client = api.redis.client;
    database = require('./index.js');
    return module.exports;
}

module.exports.getPlayerWall = function (idPlayer, month, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        var id = getWallIdFromPlayerAndMonth(idPlayer, Number(month))
        return db.walls.findOne({ _id: id  },next);


    });
}; //getPlayerWall

module.exports.getExtPlayerWall = function (idExt, month, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        api.data.players.getIdByidExt(idExt, function (err, idPlayer) {
            if (err) return next(err);
            if (idPlayer == null) return next(new Error("Ext Id not found"));
            var imonth = Number(month);
            return db.walls.findOne({ id_player: idPlayer._id, month: imonth },next);
        })
    })
}; //getPlayerWall



module.exports.getLogById = function (idLog, next) {
    database.getDb(function (err, db) {
        if (err) return next(err);
        return db.social.findOne({ _id: idLog },next);

       
    });
}; //getPlayerWall

var getCurrentMonth = function () {
    var d = new Date();
    var m = d.getMonth() + 1;
    var m2 = m < 10 ? "0" + m : "" + m;
    return Number("" + d.getFullYear() + m2);
}

module.exports.postOnWall = function (playerFrom, playerTo, app, post, next) {
    var state = {
        db: null,
        actionLog: null,
        idWall: null,
        playerFrom: playerFrom,
        playerTo: playerTo,
        idApp: app,
        post: post,
        err: null
    };

    var EventEmitter = require('events').EventEmitter;
    var emitter = new EventEmitter();
    
    //binding the events
    //   start -> getDb ->createActionLog -> createWallItem
    
    emitter.on('start', function () {
        database.getDb(function (err, db) {
            if (err) { state.err = err; return emitter.emit('error'); }
            state.db = db;
            return emitter.emit('createactionlog');
        })
    });

    emitter.on('createactionlog', function () {
        var al = getSocialProto();
        al.a = 'post';
        al.from._id = state.playerFrom._id;
        al.from.id_ext = state.playerFrom.id_ext;
        al.from.id_user = state.playerFrom.id_user;
        al.from.dispname = state.playerFrom.dispname;
        al.id_app = state.idApp;
        al.post = state.post;
        state.actionLog = al;
        state.db.social.insert(al, function (err) {
            if (err) api.log("Failed to insert action log into mongo", 'error');
        }); // don't wait for result, we already have the objectid
        return emitter.emit('findwall');
    });



    emitter.on('findwall', function () {
        var imonth = getCurrentMonth();
        state.db.walls.findOne({ id_player: state.playerTo._id, month: imonth }, { _id: 1 }, function (err, wall) {
            if (wall == null) { return emitter.emit('createwall') }
            state.idWall = wall._id;
            return emitter.emit('addtowall');
        })
    });

    emitter.on('createwall', function () {
        var wall = getWallProto(state.playerTo, getCurrentMonth());
        state.db.walls.insert(wall, function (err, res) {
            if (err) { state.err = err; return emitter.emit('error'); }
            return emitter.emit('addtowall');
        })
    });

    emitter.on('addtowall', function () {
        var wi = getWallItemProtoFromLog(state.actionLog);
        state.db.walls.update(
            { _id: state.idWall },
            {
                $push: {
                    items: {
                        $each: [wi],
                        $position: 0
                    }
                }
            }, function (err, rs) {
                if (err) { state.err = err; return emitter.emit('error'); }
                return emitter.emit('ready');
            });
    });

    emitter.on('ready', function () {
        next();
    });
    emitter.on('error', function () {
        next(state.err);
    });

    emitter.emit('start');
}


module.exports.socialAttack = function (playerFrom, playerTo, app, post, details, next) {
    var state = {
        db: null,
        readyFrom: false,
        readyTo: false,
        actionLog: null,
        idWallTo: null,
        idWallFrom: null,
        playerFrom: playerFrom,
        playerTo: playerTo,
        idApp: app,
        post: post,
        details: details,
        err: null
    };

    var EventEmitter = require('events').EventEmitter;
    var emitter = new EventEmitter();
    
    //binding the events
    //   start -> getDb ->createActionLog -> createWallItem
    
    emitter.on('start', function () {
        database.getDb(function (err, db) {
            if (err) { state.err = err; return emitter.emit('error'); }
            state.db = db;
            return emitter.emit('createactionlog');
        })
    });

    emitter.on('createactionlog', function () {
        var al = getSocialProto();
        al.a = 'attack';
        al.from._id = state.playerFrom._id;
        al.from.id_ext = state.playerFrom.id_ext;
        al.from.id_user = state.playerFrom.id_user;
        al.from.dispname = state.playerFrom.dispname;
        al.to._id = state.playerTo._id;
        al.to.id_ext = state.playerTo.id_ext;
        al.to.id_user = state.playerTo.id_user;
        al.to.dispname = state.playerTo.dispname;
        al.id_app = state.idApp;
        al.post = state.post;
        al.details = state.details;
        state.actionLog = al;
        state.db.social.insert(al, function (err) {
            if (err) api.log("Failed to insert action log into mongo", 'error');
        }); // don't wait for result, we already have the objectid
        emitter.emit('findwallto');
        emitter.emit('findwallfrom');
    });



    emitter.on('findwallto', function () {
        var imonth = getCurrentMonth();
        state.db.walls.findOne({ _id: getWallIdFromPlayerAndMonth(state.playerTo._id, imonth) }, { _id: 1 }, function (err, wall) {
            if (wall == null) { return emitter.emit('createwallto') }
            state.idWallTo = wall._id;
            return emitter.emit('addtowallto');
        })
    });
    emitter.on('findwallfrom', function () {
        var imonth = getCurrentMonth();
        state.db.walls.findOne({ _id: getWallIdFromPlayerAndMonth(state.playerFrom._id, imonth) }, { _id: 1 }, function (err, wall) {
            if (wall == null) { return emitter.emit('createwallfrom') }
            state.idWallFrom = wall._id;
            return emitter.emit('addtowallfrom');
        })
    });

    emitter.on('createwallto', function () {
        var wall = getWallProto(state.playerTo, getCurrentMonth());
        state.idWallTo = wall._id;
        state.db.walls.insert(wall, function (err, res) {
            if (err) { state.err = err; return emitter.emit('error'); }
            return emitter.emit('addtowallto');
        })
    });
    emitter.on('createwallfrom', function () {
        var wall = getWallProto(state.playerFrom, getCurrentMonth());
        state.idWallFrom = wall._id;
        state.db.walls.insert(wall, function (err, res) {
            if (err) { state.err = err; return emitter.emit('error'); }

            return emitter.emit('addtowallfrom');
        })
    });

    emitter.on('addtowallto', function () {
        var wi = getWallItemProtoFromLog(state.actionLog);
        state.db.walls.update(
            { _id: state.idWallTo },
            {
                $push: {
                    items: {
                        $each: [wi],
                        $position: 0
                    }
                }
            }, function (err, rs) {
                if (err) { state.err = err; return emitter.emit('error'); }
                return emitter.emit('readyto');
            });
    });
    emitter.on('addtowallfrom', function () {
        var wi = getWallItemProtoFromLog(state.actionLog);
        state.db.walls.update(
            { _id: state.idWallFrom },
            {
                $push: {
                    items: {
                        $each: [wi],
                        $position: 0
                    }
                }
            }, function (err, rs) {
                if (err) { state.err = err; return emitter.emit('error'); }
                return emitter.emit('readyfrom');
            });
    });

    emitter.on('readyto', function () {
        state.readyTo = true;
        if (state.readyFrom) emitter.emit('ready');

    });
    emitter.on('readyfrom', function () {
        state.readyFrom = true;
        if (state.readyTo) emitter.emit('ready');
    });

    emitter.on('ready', function () {
        next();
    });
    emitter.on('error', function () {
        next(state.err);
    });

    emitter.emit('start');
}


var getSocialProto = function () {
    return {
        _id: new ObjectID(), // id gets objectid from mongo
        'a': null,                  //type : post,status, attack
        'ts': new Date(),          //now
        'id_app': '',
        'from': {},
        'to': {},
        'detail': {},
        'post': {}
    }
}

var getWallIdFromPlayerAndMonth = function (idPlayer, imonth) {
    return 'wall_' + idPlayer + '_' + imonth;
}
var getWallProto = function (player, imonth) {
    return {
        _id: getWallIdFromPlayerAndMonth(player._id, imonth),
        id_player: player._id,
        id_user: player.id_user,
        "id_app": player.id_app,
        month: imonth,
        items: []
    }

}

var getWallItemProtoFromLog = function (log) {
    var wi = _.clone(log);
    return wi;
}