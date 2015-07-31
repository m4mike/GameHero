module.exports = {
    startPriority: 900,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        
        
        var middleware = {
            name: 'Authorisation',
            global: true,
            priority: 1000,
            preProcessor: function (data, next) {
                if (data.actionTemplate.authenticated === true && api.config.jwtauth.enabled[data.connection.type] 
                    && api.config.jwtauth.enabled[data.connection.type] === true) {
                    //get api-key from headers or params
                    var api_key = '';
                    if (data.connection.params['apikey'] != null) api_key = data.connection.params['apikey'];
                    if (data.connection.params['api_key'] != null) api_key = data.connection.params['api_key'];

                    if(api_key=='') {
                        
                        var req = data.connection.rawConnection.req;
                        if (!req && data.connection.mockHeaders) {
                            req = {
                                headers: data.connection.mockHeaders
                            };
                        }
                        if (req.headers && req.headers['apikey']) {
                            api_key = req.headers['apikey'];
                        }
                    }//api_key in header?
                    
                    if (api_key == '') {
                        data.connection.rawConnection.responseHttpCode = 500;
                        next(new Error('Authorization Header Not Set'));
                    };
                    
                    api.jwtauth.processToken(api_key, function (err,res) {
                        if (err) return next(err);
                        // Valid data, lets set it and continue
                        data.connection.apiuser = res;
                        next();
                    });
                }//if authenticated
                else
                    next();
            }//preprocesssor
        }//middleware def
        
        api.actions.addMiddleware(middleware);
        next();
    }

}