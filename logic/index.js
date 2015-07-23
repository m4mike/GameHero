module.exports.quests = null;
module.exports.counters = null;

var api = null;

module.exports.init = function (theApi) {
    
    if (api == null) {
        api = theApi; // save the reference once
        //api.logic = {};
        module.exports.quests  = require("./questLogic").init(api);
        //module.exports.players = new require("./playerLogic").init(api);
        module.exports.counters = require("./counterLogic").init(api);
        
        
    }
    return module.exports;
    
}
