
var should = require('should');
var assert = require('assert');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;


describe('data tests', function () {
    
    before(function (done) {
        this.timeout(10000);
        actionhero.start(function (err, a) {
            api = a;
            done();
        })
    });
    
    after(function (done) {
        actionhero.stop(function (err) {
            done();
        });
    })
    
    describe('Data should be seeded', function () {
        describe('Connecting to mongo', function () {
            it('inside an api', function (done) {
                api.should.not.be.null();
                done();
            });
            
            it('should work', function (done) {
                api.data.getDb(function (err, db) {
                    //console.log(db);
                    db.db.should.not.be.null();
                    done();
                });
            });
        });
        
        describe("There should be apps", function () {
            it("i can find app_follow", function (done) {
                api.data.apps.byId("app_follow", function (err, data) {
                    data.should.not.be.null();
                    done();
                })
            });
            it("i can find a list of apps", function (done) {
                api.data.apps.list( function (err, list) {
                    list.should.not.be.null();
                    assert(list.length > 0);
                    done();
                })
            });
            
           
            it("i can add a player to an app", function (done) {
                api.data.apps.addPlayerToApp("app_follow", "p1", function (err, res) {
                    api.data.apps.byId("app_follow", function (err, theApp) {
                        assert(theApp.players.indexOf("p1") > -1);
                        done();
                    })
                });
            });

            it("i can remove a player to an app", function (done) {
                api.data.apps.removePlayerFromApp("app_follow", "p1", function (err, res) {
                    api.data.apps.byId("app_follow", function (err, theApp) {
                        assert(theApp.players.indexOf("p1") < 0);
                        done();
                    })
                });
            });

            it("and readd it", function (done) {
                api.data.apps.addPlayerToApp("app_follow", "p1", function (err, res) {
                    api.data.apps.byId("app_follow", function (err, theApp) {
                        assert(theApp.players.indexOf("p1") > -1);
                        done();
                    })
                });
            });

            //it("i can find quests for followers mission", function (done) {
            //    api.data.quests.forMission("mfollowers", function (err, res) {
            //        res.should.not.be.null();
            //        done();
            //    })
            //})
     
        });
    });
});