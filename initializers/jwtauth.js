var jsonwebtoken = require('jsonwebtoken');

module.exports = {
    startPriority: 800,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        
        
        api.jwtauth = {
            processToken: function (token,cb) {
                jsonwebtoken.verify(token, api.config.jwtauth.secret, {}, function (err, data) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null,data);
                    }
                });
            },
            generateToken: function (data, cb) {
                try {
                    var token = jsonwebtoken.sign(data, api.config.jwtauth.secret, {
                        algorithm: api.config.jwtauth.algorithm
                    });
                    cb(null,token);
                } catch (err) {
                    cb(err);
                }
            }
        };
        next();
    }
}