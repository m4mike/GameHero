var apiusers = require('../../data/apiUserData.js');
var utils = require('../../utils');

/////////////////////////////////////////////////////////////
exports.createApiUser = {
    name: 'createApiUser',
    description: 'Create an api user, returns an api key',
    authenticated: true,
    authenticatedRole : "administrator",
    inputs: {
        api_user: {
            required: true,
            validator: null
        },
        api_pasw: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, done) {
        apiusers.createApiUser(action.params.api_user, action.params.api_pasw, function (err, key) {
            if (err) { action.error = err; return done(err); }
            action.response = { ok: 1, api_key: key }
            done()
        })
    }
}
/////////////////////////////////////////////////////////////
exports.apiKeyGet = {
    name: 'getapikey',
    description: 'Log in to get your api key',
    
    inputs: {
        api_user: {
            required: true,
            validator: null
        },
        api_pasw: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, done) {
       apiusers.getApiKey(action.params.api_user,action.params.api_pasw,function(err,key){
            if (err) { action.error = err; return done(err); }
            action.response = { ok: 1, api_key: key }
            done()
         })
    }
}
/////////////////////////////////////////////////////////////
exports.apiKeyTest = {
    name: 'testapikey',
    description: 'Test an api key',
    authenticated: true,
   
    
    run: function (api, action, done) {
            action.response = { ok: 1, result: "api user id  = " + action.connection.apiuser };
            return done();
   }
};
