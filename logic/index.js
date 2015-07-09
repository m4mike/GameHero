module.exports.database = null;
module.exports.missions = null;
module.exports.quests = null;
module.exports.players = null;
module.exports.users = null;

var cachedApi = null;

module.exports.init = function (api) {
    
    if (cachedApi == null) {
        cachedApi = api; // save the reference once
        module.exports.quests = new require("./questLogic").init(api);
        module.exports.players = new require("./playerLogic").init(api);
        module.exports.users = new require("./userLogic").init(api);
    }
    return module.exports;
    
}
