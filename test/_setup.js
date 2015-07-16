process.env.NODE_ENV = 'test';
exports._setup = {
    
    testUrl: "http://localhost:8081/api",
    api: null,
     d : require('./../startDomain.js'),
    
    init: function (callback) {
        var self = this;
        this.d.start(function (err, _api) {
            //console.log('domain started');
            
            this.api = _api;
            if (this.api == null) console.log('api is null ! ');
            //console.log('setup finished');
            callback(null, api);
        });
    
        

    },

    exit: function(callback) {
        var self = this;
       
        
        
        this.d.exit(function (err, _api) {
            console.log('domain stopped');
           
            callback(null, null);
        });
    
        

    }
}