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
            description:"month of the wall YYYMM or empty for current month",
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
            description:"external player id",
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
