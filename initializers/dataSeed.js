module.exports = {
    startPriority: 1000,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        api.log('Seed check of data')
        api.data.seed();
    
        next();
    }
}