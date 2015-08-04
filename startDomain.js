process.env.FAKEREDIS = 'false';
var ActionheroPrototype = require("actionhero").actionheroPrototype;
var actionhero = new ActionheroPrototype();

module.exports.api = null;

module.exports.start = function (cb) {
    
   
       
        actionhero.start(function (err, apiFromCallback) {
            if (err) { console.log(err); }
            if(apiFromCallback == null) console.log('apifromCallback is null !')
            module.exports.api = apiFromCallback;
            
            if (cb)
                cb(null, module.exports.api);
        });
    
   

    
}


module.exports.stop = function (cb) {
    
    
    console.log('* Stopping actionHero              *')
    
    actionhero.stop(function (err, apiFromCallback) {
        if (err) { console.log(err); }
       
        if (cb) cb(null, module.exports.api);
    });

}