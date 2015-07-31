var apiusers = require('../../data/apiUserData.js');

exports.apiKeyGet = {
    name: 'getapikey',
    description: 'Get an api key',
    outputExample: null,
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
        var id = action.params.api_user;
        
        apiusers.getApiKey(action.params.api_user,action.params.api_pasw,function(err,key){
            if (err) { action.error = err; return done(err); }
            action.response = { ok: 1, _result: key }
            done()
         })
    }
}

exports.apiKeyTest = {
    name: 'testapikey',
    description: 'Test an api key',
    outputExample: null,
    authenticated: true,
   
    
    run: function (api, action, done) {
        
        api.jwtauth.generateToken(action.params.api_user, function (err, data) {
            if (err) {
                action.error = err;
                return done();
            }

            action.response = { ok: 1, _result: "api user = " + action.connection.apiuser };
            done();
        });
    }
};
