var utils = require("../../utils")
var events = require('events');
var util = require('util');

exports.players = {
    name: 'playerActions',
    description: 'List possible actions on players',
    outputExample: null,
    
    run: function (api, action, next) {
        /*
         *   { path: '/players', action: 'playerActions' },
                { path: '/players/byId/:playerId', action: 'playerById' },
                { path: '/players/byExtId/:playerId', action: 'playerByIdExt' },
                { path: '/players/byIdFull/:playerId', action: 'playerByIdFull' },
                { path: '/players/byExtIdFull/:playerId', action: 'playerByIdExtFull' },
               
                { path: '/players/forApp/:idApp', action: 'playersForApp' }, 
                { path: '/players/create/app/:idApp/extid/:idExt', action: 'createPlayerExt' } ,
                { path: '/players/wall/byId/:playerId/:month', action: 'socialwallplayer' },
         * 
         * */
        var collection = new utils.HyperJson();
        collection.link("Find player by id", api.serverUrl + "/api/players/byId/:playerId")
            .link("Find player by External Id", api.serverUrl + "/players/byExtId/:playerId")
            .link('Get full player by id', api.serverUrl + '/players/byIdFull/:playerId')
             .link('get full player by external id', api.serverUrl + '/players/byExtIdFull/:playerId')
              .link('get all players for an app', api.serverUrl + '/players/forApp/:idApp')
               .link('create a player for an app, given an external id', api.serverUrl + '/players/create/app/:idApp/extid/:idExt')
                .link('get the wall of a player', api.serverUrl + '/players/wall/byId/:playerId/:month');
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.playerById = {
    name: 'playerById',
    description: 'Get player by Id, try player id p1,p2,p3,p11,p12,p13',
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
                    
                    var hj = new utils.HyperJson({
                        ok:1,    
                        _result : result
                    
                    });
                    hj.link(api.serverUrl + "/api/players/getByIdFull/" + result._id);
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};

exports.playerByIdExt = {
    name: 'playerByIdExt',
    description: 'Get player by external Id, try player id mlg11, mlg12',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.playerId;
        
        api.data.players.getByIdExt(id, function (err, result) {
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
                    var hj = new utils.HyperJson({
                       ok:1, 
                        _result : result
                    
                    });
                    hj.link(api.serverUrl + "/api/players/getByIdExtFull/" + result._id);
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};


exports.playerByIdFull = {
    name: 'playerByIdFull',
    description: 'Get full player details by Id, try player id p1,p2,p3,p11,p12,p13',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.playerId;
        
        api.data.players.getByIdFull(id, function (err, result) {
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
                    var hj = new utils.HyperJson({
                        ok:1,
                        _result : result
                    
                    });
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};


exports.playerByExtIdFull = {
    name: 'playerByExtIdFull',
    description: 'Get full player details by External Id, try player id mlg11, mlg12,mlg13',
    inputs: {
        playerId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        var id = action.params.playerId;
        
        api.data.players.getByIdExtFull(id, function (err, result) {
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
                    var hj = new utils.HyperJson({
                        ok:1,
                        _result : result
                    
                    });
                    action.response = hj.toObject();
                    next();
                }
            }
        });
        
    }
};


exports.playersForApp = {
    name: 'playersForApp',
    description: 'get all players for an app, try appId : app_mlg',
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
                    ok: 1, 
                    _result : result
                    
                });
                collection.addSelfIdsToItems(api.serverUrl + "/api/players/byId/" , "_id");
                action.response = collection.toObject();
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
                    action.response = { ok: 1, _result: 'deleted' };
                    next();
                }
            }
        });
        
    }
};



