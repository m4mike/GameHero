
(function (expo) //initialises module.exports
{
    
    var async = require("async");
    var data = require("../data");
    //var users = require("../data/seedData.js").users;
    var _ = require("lodash");
    

    

    expo.init = function (logic) {
        
        //define keystore
        function KeyStore(values) {
            this.values = values || {};
            
            this.getKeys = function () {
                return _.keys(this.values);
            }
            
            this.add = function (key) {
                this.values[key] = true;
            };
        };

        var _getQuestsForUser = function (userId, next) {
            
            var locals = {};
            
            locals.userId = userId;
            locals.next = next;
            async.parallel([
                function (callback) {
                    data.quests.getAllQuests(function (err, res) {
                        if (err) return callback(err);
                        locals.quests = res;
                        callback();
                    });
                },
                //get user
                function (callback) {
                    data.users.getById(locals.userId, function (err, res) {
                        if (err) return callback(err);
                        locals.user = res;
                        callback();
                    });
                 }
            ], 
            function (err) {
                if (err) locals.next(err);
                //now match user and quests
                var questsDone = _.pluck(locals.user.quests, 'quest_id');
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
                            return questsDone.indexOf(qq) < 0 //leave it in stillneeded, the user didnt do the quest
                        });
                        if (stillNeeded.length > 0)
                            return false;
                    }
                    //check for counters
                    var counters = locals.user.counters;
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
        
        logic.quests = {};
        logic.quests.getValidQuestsForUser = _getQuestsForUser;
        
    

    }//init
})(module.exports);