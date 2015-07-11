
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
                        assert(data == 1);
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
                        assert(data == 0);
                        return cb();
                    });
                }
            ], 
                function (err) {
                if (err) throw (err)
                done();
            })
    });
    
    
    
    
    
   

});








