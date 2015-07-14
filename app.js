


process.env.FAKEREDIS = 'false';

var domain = require('domain');

var ActionheroPrototype = require("actionhero").actionheroPrototype;
var actionhero = new ActionheroPrototype();
var serverDomain = domain.create();

serverDomain.on('error', function (er) {
    console.error('********************************************** Caught error!', er);
    actionhero.restart(function (err, apiFromCallback) {
        if (err) { console.log(err); }
        api = apiFromCallback;
    });
});

serverDomain.run(function () {
    // server is created in the scope of serverDomain
   
    var api;

    actionhero.start(function (err, apiFromCallback) {
        if (err) { console.log(err); }
        api = apiFromCallback;
    });
    
});