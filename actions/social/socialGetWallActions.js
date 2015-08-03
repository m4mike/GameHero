var utils = require("../../utils")
var events = require('events');
var util = require('util');
var async = require('async');
var socialUtils = require('./socialUtils.js');


getCurrentMonth = function () {
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
exports.sociallastwallplayer = {
    name: 'sociallastwallplayer',
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
        }
    },
    run: function (api, action, next) {
            api.data.social.getPlayerLastWall(action.params.playerId, function (err, res) {
            action.response = { ok: 1, _result: res };
            action.response.error = null;
            next(null, res);
        })
    }
};


exports.lastwallextplayer = {
    name: 'lastwallextplayer',
    description: 'get the last wall of a player, with exteranl ID<br/>If the player has no walls, the result will be null.',
    inputs: {
        ext_playerId: {
            description: "external player id",
            required: true,
            validator: null
        }
    },
    run: function (api, action, next) {
        
        api.data.social.getExtPlayerLastWall(action.params.ext_playerId, function (err, res) {
            if (err) {
                action.response = { ok: 0, _result: null, error:err };
                action.response.error = err;
                return next(err);
            } else {
                action.response = { ok: 1, _result: res };
                action.response.error = null;
                return next(null, res);
            }
           
           
        })
   }
};


exports.socialwallplayer = {
    name: 'socialwallplayer',
    description: 'get the wall of a player, the month is optional and defaults to current month : YYYYMM <br/>will return empty if no wall exists for that month',
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
            description:"month of the wall YYYMM or empty for current month",
            required: false,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        if (action.params.month == null || action.params.month === "{month}") {
            action.params.month = getCurrentMonth();
        }
        api.data.social.getPlayerWall(action.params.playerId,action.params.month,  function (err, res) {
            action.response = { ok: 1, _result: res };
            action.response.error = null;
            next(null, res);
       })
   }
};


exports.socialwallExtPlayer = {
    name: 'socialwallextplayer',
    description: 'get the wall of a player, with exteranl ID, month given or current month if null, will return empty if no wall exists for that month',
    inputs: {
        ext_playerId: {
            description:"external player id",
            required: true,
            validator: null
        },
        month: {
            description: "month of the wall YYYMM or empty for current month",
            required: false,
            validator: null
        }
    },
    run: function (api, action, next) {
        if (action.params.month == null || action.params.month === "{month}") {
            action.params.month = getCurrentMonth();
        }
        api.data.social.getExtPlayerWall(action.params.ext_playerId,action.params.month, function (err, res) {
            action.response = { ok: 1, _result: res };
            action.response.error = null;
            next(null, res);
        })
    }
};



