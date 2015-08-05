exports.status = {
  name: 'status',
  description: 'return some basic information about the API',
   
 
  run: function(api, data, next){
    api.stats.getAll(function(err, stats){
      api.tasks.details(function(err, details){
        data.response.id                = api.id;
        data.response.gameheroVersion = api.actionheroVersion;
        data.response.uptime            = new Date().getTime() - api.bootTime;
        data.response.stats             = stats;
        data.response.queues            = details.queues;
        data.response.workers           = details.workers;
        data.response.environment       = api.environment;
        next(err);
      });
    });
  }
};