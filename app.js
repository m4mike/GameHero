var ActionheroPrototype = require("actionhero").actionheroPrototype;
var actionhero = new ActionheroPrototype();
var api;

process.env.FAKEREDIS = 'false';
process.env.port = 3000;
var should = require('should');
var async = require('async');
var assert = require('assert');

actionhero.start(function (err, apiFromCallback) {
    if (err) { console.log(err); }
    api = apiFromCallback;
    
    
    api.log('environment :' + api.env);
    

    
    var redis = require("redis"),
        client = redis.createClient();
    
    var Promise = require('bluebird');
    var async = require('async');
    
    var interests = {};
    
    interests.addInterest = function (lang, cat, interest, next) {
        var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
        if (next != null)
            return client.sadd(catUrn, interest, next);
        else
            client.sadd(catUrn, interest);
   
    }
    
    interests.removeInterest = function (lang, cat, interest, next) {
        var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
        if (next != null)
            return client.srem(catUrn, interest, next);
        else
            return client.srem(catUrn, interest);
    };
    
    
    interests.existInterest = function (lang, cat, interest, next) {
        var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
        return client.sismember(catUrn, interest, next);
    }
    
    
    interests.getInterestsForCat = function (lang, cat, next) {
        var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
        return client.smembers(catUrn, next);
    }
    
    interests.getRandomInterestsForCat = function (lang, cat, amount, next) {
        amount = typeof amount !== 'undefined' ? amount : 20;
        var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
        return client.srandmember(catUrn, amount, next);
    }
    interests.removeCat = function(lang, cat, next) {
      
        var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
        return client.del(catUrn,  next);
    }

    var getCats= function (  next) {
        var catUrn = "urn:Cat*" 
        return client.keys(catUrn, next);
    }
    
    var getMembers = function (cat, next){
        
        return client.smembers(cat, next);
    }

    async.series(
        [
            function (cb) { interests.addInterest('nl', 'Test', 'Tennis'); cb(); },
            function (cb) {
                interests.existInterest('nl', 'Test', 'Tennis', function (err, data) {
                    assert(data == 1);
                    return cb();
                });
            },
            function (cb) { interests.removeInterest('nl', 'Test', 'Tennis'); cb(); },
            function (cb) {
                interests.existInterest('nl', 'Test', 'Tennis', function (err, data) {
                    assert(data == 0);
                    return cb();
                });
            }
        ], function (err) { if (err) console.log(err) });


  
    getCats(function (err, data) { 
       assert(data.length >0);
    })

    getMembers("urn:Cat:Autres",function (err, data){
        assert(data.length > 0);
    })

               
});