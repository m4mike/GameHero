var ActionheroPrototype = require("actionhero").actionheroPrototype;
var actionhero = new ActionheroPrototype();
var api;

process.env.FAKEREDIS = 'false';
process.env.port = 3000;


actionhero.start(function (err, apiFromCallback) {
    if (err) { console.log(err); }
    api = apiFromCallback;
    api.log('a test','info');
    
    api.log('environment :' + api.env);
    var d = require('./data').init(api);
    d.seed();
    api.log('end start');
});