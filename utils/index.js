// updater/index.js
var _ = require('lodash');

(function (utils) {
    
    
    utils.randomId = function (len, bits) {
        len = len == null? 6: len;
        bits = bits || 36;
        var outStr = "", newStr;
        while (outStr.length < len) {
            newStr = Math.random().toString(bits).slice(2);
            outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
        }
        return outStr.toLowerCase();
    };
    
    utils.port = 3000;
    utils.host = "http://localhost:" + utils.port;
    
    utils.absoluteUrl = function absoluteUrl(relativeUrl) {
        relativeUrl = _.startsWith(relativeUrl, "/") ? relativeUrl : "/" + relativeUrl;
        return utils.host + relativeUrl.replace(/\/\//, '/');
    }
    
    utils.collectionBuilder = {};
    
    
    utils.hyperJson = require("./HyperJson.js");
    
    
    utils.responses = {}
    
    
    utils.responses.internalServerError = function internalServerError(req, res, err) {
        res.status(500);
        return res.send({
            "error": {
                "type": 500,
                "message": "Internal Server Error",
                "detail": err
            }
        });
    }
    
    utils.responses.badRequestError = function badRequestError(req, res, err) {
        res.status(400);
        return res.send({
            "error" : {
                "type": 400,
                "message": "Bad Request",
                "detail": err
            }
        });
    }
    
    utils.responses.methodNotSupportedError = function methodNotSupportedError(req, res) {
        res.status(405);
        return res.send({
            "error": {
                "type": 405,
                "message": "Method Not Supported",
                "detail": req.method
            }
        });
    }
    
    utils.responses.notFoundError = function notFoundError(req, res, message) {
        res.status(404);
        var rep = {
            "error": {
                "type": 404,
                "message": "Not Found",
                "detail": req.url
            }
        };
        if (message != null) rep.error.message = message;
        return res.send(rep);
    };






})(module.exports);