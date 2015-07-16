var utils = require("../utils")
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

exports.socialattack = {
    name: 'socialattack',
    description: 'attack a player',
    outputExample: null,
    inputs: standardInputs,
   

    run: function (api, action, next) {
        
        action.response = JSON.stringify( action.params );
        action.response.error = null;
        
        next();
    }

};


exports.socialpost = {
    name: 'socialpost',
    description: 'post on a players wall',
    outputExample: null,
    inputs:standardInputs,
    
    
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