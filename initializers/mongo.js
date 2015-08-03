module.exports = {
    startPriority: 101,
    stopPriority: 999,
    loadPriority: 200,
    initialize: function (api, next) {
        
        api.mongo = {};
        api.mongo.status = { open: false };
        
        api.mongo.url = api.config.mongo.url;
        //api.log('Mongo setup on ' + api.mongo.url);
        
       
        api.mongo.MongoClient = require('mongodb').MongoClient;
        //api.mongo.Db = require('mongodb').Db;
        
        api.mongo.getDb = function (next) {
            try {
                api.mongo.MongoClient.connect(api.mongo.url, function (err, db) {
                    if (err) {
                        api.log("unable to connect to mongo", 'critical');
                        return next(err);
                    } else {
                        api.mongo.status.open = true;
                        api.log('Mongo connection open', 'info');
                        db.on('close', api.mongo.onClose);
                        db.on('open', api.mongo.onOpen);
                        return next(null, db);
                    }
                });
            } catch (err) {
                api.log("unable to open mongo", 'error');
                next(err);
            }
        }
        
        api.mongo.onClose = function () {
            api.mongo.status.open = false;
            api.log("Mongo connection closed", 'warn');
            //todo : reconnect to mongo
        }

        api.mongo.onOpen = function () {
            api.mongo.status.open = true;
            api.log("Mongo connection open on " + api.mongo.url, 'info');
        }
        next();
    }
}