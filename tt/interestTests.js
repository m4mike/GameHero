
var should = require('should');
var assert = require('assert');
var async = require('async');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();

var api;
var interests;
var client;

describe('Redis tests', function () {
    
    before(function (done) {
        this.timeout(10000);
        actionhero.start(function (err, a) {
            api = a;
            api.data.init(api);
            interests = api.data.interests.init(api);
            client = api.redis.client;
            done();
        })
    });
    
    after(function (done) {
        actionhero.stop(function () {
            done();
        });
    });
    
    

    //before(function (done) {
    //    this.timeout(10000);
    //    actionhero.start(function (err, a) {
    //        api = a;
    //        api.data.init(api);
    //        interests = api.data.interests.init(api);
    //        client = api.redis.client;
    //        done();
    //    })
    //});

    //after(function (done) {
    //    actionhero.stop(function () {
    //        done();
    //    });
    //});

    it('should have an api object with proper parts', function (done) {
        [
            api.actions.actions,

            api.actions.versions,
            api.actions.actions.cacheTest['1'],
            api.actions.actions.randomNumber['1'],
            api.actions.actions.status['1']
        ].forEach(function (item) {
            item.should.be.a.Object;
        });

        [
            api.actions.actions.cacheTest['1'].run,
            api.actions.actions.randomNumber['1'].run,
            api.actions.actions.status['1'].run
        ].forEach(function (item) {
            item.should.be.an.instanceOf(Function);
        });

        [
            api.actions.actions.randomNumber['1'].name,
            api.actions.actions.randomNumber['1'].description
        ].forEach(function (item) {
            item.should.be.a.String;
        });

        api.config.should.be.an.instanceOf(Object);
        api.stats.should.be.an.instanceOf(Object);

        done();
    });


    it('adding an interest', function (done) {
        async.series(
            [
                function (cb) { interests.addInterest('nl', 'Test', 'Tennis'); cb(); },
                function (cb) {
                    interests.existInterest('nl', 'Test', 'Tennis', function (err, data) {
                        assert(data);
                        return cb();
                    });
                }
            ],
            function (err) {
                if (err) throw (err)
                done();
            })
    });

    it('removing an interest', function (done) {
        async.series(
            [
                function (cb) { interests.removeInterest('nl', 'Test', 'Tennis'); cb(); },
                function (cb) {
                    interests.existInterest('nl', 'Test', 'Tennis', function (err, data) {
                        assert(!data);
                        return cb();
                    });
                }
            ],
            function (err) {
                if (err) throw (err)
                done();
            })
    });

    it('adding an interest to a user', function (done) {

        async.series(
            [
                function (cb) {
                    api.data.users.addInterest("u3", "fr", "test", "iii", function (err, data) {
                        assert(data);
                        cb();
                    });
                },
                function (cb) {
                    api.data.users.hasInterest("u3", "fr", "test", "iii", function (err2, data2) {
                        assert(data2 == true);
                        cb();
                    })
                }
            ],
            function (err) {
                if (err) throw (err)
                done();
            })

    });


    it('removing that interest from the user', function (done) {

        async.series(
            [
                function (cb) {
                    api.data.users.removeInterest("u3", "fr", "test", "iii", function (err, data) {
                        assert(data);
                        cb();
                    });
                },
                function (cb) {
                    api.data.users.hasInterest("u3", "fr", "test", "iii", function (err2, data2) {
                        assert(data2 == false);
                        cb();
                    })
                }
            ],
            function (err) {
                if (err) throw (err)
                done();
            })

    });

    it('listing categories for a language', function (done) {

        api.data.interests.listCats('fr', function (err, data) {
            assert(data != null);
            assert(data.length > 0);
            done();
        });
    })

    it('getting random interests for a language and cat', function (done) {

        api.data.interests.getRandomInterestsForCat('fr',"Autres",5, function (err, data) {
            console.log(JSON.stringify(data));
            
            assert(data != null);
            assert(data.length > 0);
            console.log(JSON.stringify(data));
            done();
        });
    })
    

});









