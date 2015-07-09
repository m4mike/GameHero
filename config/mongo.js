exports.default = {
    mongo: function (api) {
        var url = "mongodb://localhost:27017";
      
        
        if (process.env.MONGOLAB_URI === 'false' || process.env.REDIS_HOST !== undefined) {
            // You can opt to use a real redis DB
            // This is required for multi-server deployments
            
            mongoDetails.url = process.env.MONGOLAB_URI;
    
        }
        
        return url;
    }
}
