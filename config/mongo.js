exports.default = {
    mongo: function (api) {
        var mongoDetails = {};
        
        if (process.env.MONGOLAB_URI != null) {
            //console.log("Mongo running in heroku");
            mongoDetails = { url : process.env.MONGOLAB_URI + "/gami" };
        } else {
            
            
            mongoDetails = { url : "mongodb://localhost:27017/gami" };
        }
        return mongoDetails;
    }
}
