var moment = require('moment');
exports.status = {
    name: 'status',
    description: 'return some basic information about the API',
    
    
    run: function (api, data, next) {
        api.stats.getAll(function (err, stats) {
            var timeUp = new moment(new Date().getTime() - api.bootTime);
            api.tasks.details(function (err, details) {
                data.response.id = api.id;
                data.response.actionheroVersion = api.actionheroVersion;
                data.response.apiVersion = api.config.general.apiVersion;
                data.response.serverName = api.config.general.serverName;
                data.response.uptime =  timeUp.minutes();
                data.response.stats = stats;
                data.response.queues = details.queues;
                data.response.workers = details.workers;
                data.response.environment = api.environment;
                next(err);
            });
        });
    }
};