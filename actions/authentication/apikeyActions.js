exports.apiKeyGet = {
    name: 'getapikey',
    description: 'Get an api key',
    outputExample: null,
    inputs: {
        api_user: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, done) {
        
        api.jwtauth.generateToken(action.params.api_user, function (err, data) {
            action.response = { ok: 1, _result: data };
            done();
        });
    }
};

exports.apiKeyTest = {
    name: 'testapikey',
    description: 'Test an api key',
    outputExample: null,
    authenticated: true,
   
    
    run: function (api, action, done) {
        
        api.jwtauth.generateToken(action.params.api_user, function (err, data) {
            action.response = { ok: 1, _result: "api user = " + action.connection.apiuser };
            done();
        });
    }
};
