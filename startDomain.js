process.env.FAKEREDIS = 'false';
var domain = require('domain');
var ActionheroPrototype = require("actionhero").actionheroPrototype;
var actionhero = new ActionheroPrototype();
var serverDomain = domain.create();

module.exports.api = null;

module.exports.start = function (cb) {
    
    serverDomain.on('error', function (er) {
        console.error('********************************************** Caught error!', er);
        //actionhero.restart(function (err, apiFromCallback) {
        //    if (err) { console.log(err); }
        //    module.exports.api = apiFromCallback;
        //    if (cb) cb(null, module.exports.api);
        //});
    });
    
    serverDomain.run(function (err,api) {
        // server is created in the scope of serverDomain
        
        if (process.env.NODE_ENV != 'test') {
            console.log('***********************************************')
            console.log('* Starting actionHero Domain                  *')
            console.log('***********************************************')
        }
        actionhero.start(function (err, apiFromCallback) {
            if (err) { console.log(err); }
            module.exports.api = apiFromCallback;
            if (cb)
                cb(null, module.exports.api);
        });
    
    });


}

module.exports.reStart = function (cb) {
    
    console.log('***********************************************')
    console.log('* Re-Starting actionHero Domain                  *')
    console.log('***********************************************')
    actionhero.restart(function (err, apiFromCallback) {
        if (err) { console.log(err); }
        module.exports.api = apiFromCallback;
        if (cb) cb(null, module.exports.api);
    });

}

module.exports.stop = function (cb) {
    
    
    console.log('* Stopping actionHero Domain                  *')
    
    actionhero.stop(function (err, apiFromCallback) {
        if (err) { console.log(err); }
        serverDomain.exit();
        
        if (cb) cb(null, module.exports.api);
    });

}