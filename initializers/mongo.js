module.exports = {
    startPriority: 101,
    stopPriority: 999,
    loadPriority: 200,
    initialize: function (api, next) {
        
        api.mongo = {};
        api.mongo.status = { open: false };
        
        
        api.mongo.url = "mongodb://localhost:27017";
        if (api.config.mongo != null) {
            if (api.config.mongo.url != null)
                api.mongo.url = api.config.mongo.url;
        }
        if (process.env.MONGOLAB_URI !=  null ) {
            // You can opt to use a real redis DB
            // This is required for multi-server deployments
            api.log("setting MONGOLAB_URI");
            api.mongo.url = process.env.MONGOLAB_URI;
    
        }
       
        api.mongo.MongoClient = require('mongodb').MongoClient;
        api.mongo.Db = require('mongodb').Db;
        
        
        api.mongo.getDb = function (next) {
            api.mongo.MongoClient.connect(api.mongo.url, function (err, db) {
                if (err) {
                    return next(err);
                } else {
                    api.mongo.status.open = true;
                    api.log('Mongo connection open', 'info');
                    db.on('close', api.mongo.onClose);
                    db.on('open', api.mongo.onOpen);
                    return next(null, db);
                }
            });
        }
        
        api.mongo.onClose = function () {
            api.mongo.status.open = false;
            api.log("Mongo connection closed", 'warn');
        }

        api.mongo.onOpen = function () {
            api.mongo.status.open = trur;
            api.log("Mongo connection open", 'info');
        }
        next();
    }
}