module.exports.init = function (api) {
    
    var async = require("async");
    var data = require('../data');
    var _ = require("lodash");
    
    
    
    //define keystore
    function KeyStore(values) {
        this.values = values || {};
        
        this.getKeys = function () {
            return _.keys(this.values);
        }
        
        this.add = function (key) {
            this.values[key] = true;
        };
    }    ;
    
    var _getQuestsForplayer = function (playerId, next) {
        
        var locals = {};
        
        locals.playerId = playerId;
        locals.next = next;
        async.parallel([
            function (callback) {
                data.quests.getAllQuests(function (err, res) {
                    if (err) return callback(err);
                    locals.quests = res;
                    callback();
                });
            },
                //get player
            function (callback) {
                data.players.getById(locals.playerId, function (err, res) {
                    if (err) return callback(err);
                    locals.player = res;
                    callback();
                });
            }
        ], 
            function (err) {
            if (err) locals.next(err);
            //now match player and quests
            var questsDone = _.pluck(locals.player.quests, 'quest_id');
            var ks = new KeyStore();
            
            locals.result = {};
            locals.result = _.select(locals.quests, function (q) {
                var incl = true;
                //test for needed = null
                if (q.needed == null)
                    return true;
                //check for quests
                if (q.needed.quests != null) {
                    //all quests in needed.quests need to be in questsdone
                    var stillNeeded = _.select(q.needed.quests, function (qq) {
                        return questsDone.indexOf(qq) < 0 //leave it in stillneeded, the player didnt do the quest
                    });
                    if (stillNeeded.length > 0)
                        return false;
                }
                //check for counters
                var counters = locals.player.counters;
                if (q.needed.counters != null) {
                    _.forEach(q.needed.counters, function (neededcounter) {
                        if (counters[neededcounter[0]] < neededcounter[1])
                            incl = false;
                    });
                }
                return incl;
            });//find
            
            locals.next(null, locals.result);
                   
        }); //Err
        
        
    };
    
    module.exports.getValidQuestsForplayer = _getQuestsForplayer;
    return module.exports;
    

}//init
