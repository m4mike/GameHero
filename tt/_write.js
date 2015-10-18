/* global process */
process.env.NODE_ENV = 'dev';
var assert = require('assert');
var should = require('should');
var async = require('async');

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var setup = { testUrl : 'http://localhost:3000/api/' };
var requestjs = require('request-json');
var request = requestjs.createClient(setup.testUrl);


function start(done) {
    process.env.SPECHELPER = true;
    actionhero.start(function (err, a) {
        api = a;
        done();
    });
}


function end(done) {
    actionhero.stop(function (err) {
        done();
    });
}

function assertOk(response, body) {
    assert(response.statusCode == 200);
    assert(body['ok'] == 1);
}

start(function () {
    
    async.series(
        [
                //get user
            function (done) {
                api.data.apps.byId("app_follow", function (err, data) {
                    data.should.not.be.null();
                    done();
                })
            },
            function (done) {
                api.data.apiUsers.createApiUser('averyrandomlogin1', 'apassword', function (err, data) {
                    assert(err == null);
                    var user = data;
                    assert(user.hash != null);
                    return done();


                })

            },
            api.data.apiUsers.getApiKey('averyrandomlogin1', 'apassword', function (err, data) {
                assert(err == null);
                
                assert(data != null);
                return done();
            }),
            api.data.apiUsers.deleteApiUser('averyrandomlogin1', function (err, data) { 
                    return done();
            }),
            api.data.apiUsers.getApiKey('averyrandomlogin1', 'apassword', function (err, data) {
                assert(err != null);
                
                assert(data == null);
                return done();
            })



        ]
        , function (err) { }
    );

        
});






