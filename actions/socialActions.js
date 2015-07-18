var utils = require("../utils")


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

exports.socialattack = {
    name: 'socialattack',
    description: 'attack a player',
    outputExample: null,
    inputs: standardInputs,


    run: function (api, action, next) {

        action.response = JSON.stringify(action.params);
        action.response.error = null;

        next();
    }

};


exports.socialpost = {
    name: 'socialpost',
    description: 'post on a players wall',
    outputExample: null,
    inputs: standardInputs,


    run: function (api, action, next) {

        action.response = JSON.stringify(action.params);
        action.response.error = null;

        next();
    }

};

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

exports.socialwallplayer = {
    name: 'socialwallplayer',
    description: 'get the wall of a player, the month is optional and defaults to current month : YYYYMM',
    outputExample: {
        inputs: {
            playerId: "p1",
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
