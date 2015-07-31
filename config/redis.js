// You can use many types redis connection packages, including:
// node redis | https://github.com/mranney/node_redis
// fake redis | https://github.com/hdachev/fakeredis
// sentinel redis | https://github.com/ortoo/node-redis-sentinel

//var redis_url = require('redis-url');

exports.default = {
    redis: function (api) {
        
        var redisDetails = {};
        var redis_url = '';
        if (process.env.REDISTOGO_URL != null) redis_url = process.env.REDISTOGO_URL;
        if (process.env.REDIS_URL != null) redis_url = process.env.REDIS_URL;

            //console.log("Redis running in heroku");
            var rd = require('redis-url').parse(process.env.REDISTOGO_URL);
            redisDetails.host = rd.hostname || '127.0.0.1';
            redisDetails.port = rd.port || 6379;
            redisDetails.password = rd.password || '';
            redisDetails.database = rd.database || 0;
            redisDetails.options = null;

        if(redis_url != '')
        {
            //console.log("Redis running in heroku");
            var rd = require('redis-url').parse(process.env.REDISTOGO_URL);
            redisDetails.host = rd.hostname || '127.0.0.1';
            redisDetails.port = rd.port || 6379;
            redisDetails.password = rd.password || '';
            redisDetails.database = rd.database || 0;
            redisDetails.options = null;
        } else {
            
            // You can opt to use a real redis DB
            // This is required for multi-server deployments
            
            redisDetails.package = 'redis';
            redisDetails.host = process.env.REDIS_HOST || '127.0.0.1';
            redisDetails.port = process.env.REDIS_PORT || 6379;
            redisDetails.password = process.env.REDIS_PASS || '';
            redisDetails.database = process.env.REDIS_DB || 0;
            redisDetails.options = null;
        }
        // Which channel to use on redis pub/sub for RPC communication
        redisDetails.channel = 'gamehero:rpc';
        // How long to wait for an RPC call before considering it a failure 
        redisDetails.rpcTimeout = 5000;
        // which redis package should you ise?
        redisDetails.package = 'redis';
        

        // redisDetails.package  = 'redis-sentinel-client';
        // redisDetails.port     =  26379;
        // redisDetails.host     = '127.0.0.1';
        // redisDetails.database = 0;
        // redisDetails.options  = {
        //   master_auth_pass: null,
        //   masterName: 'BUS',
        // };
        
        
        return redisDetails;
    }
}

exports.test = {
    redis: function (api) {
        var package = 'redis';
        if (process.env.FAKEREDIS === 'false') {
            package = 'redis';
        }
        
        return {
            'package': package,
            'host': '127.0.0.1',
            'port': 6379,
            'password': null,
            'options': null,
            'database': 2
        }
    }
}


