var should = require("should");
var assert = require('assert');
var api;
var setup = { testUrl : 'http://localhost:3000/api/' };

process.env.NODE_ENV = 'test';
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();

var requestjs = require('request-json');
var request = requestjs.createClient(setup.testUrl);

function assertOk(response, body) {
    assert(response.statusCode == 200);
    assert(body['ok'] == 1);
}



describe('Api User tests', function (done) {
    before(function (done) {
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
    
    describe('When i create an api user', function (done) {
        it("I can cleanup first", function (done) {
            api.data.apiUsers.deleteApiUser('averyrandomlogin1', function (err, data) {
                return done();
            })
        });
        it("I can create him", function (done) {
            api.data.apiUsers.createApiUser('averyrandomlogin1', 'apassword', function (err, data) {
                assert(err == null);
                var user = data;
                assert(user.hash != null);
                return done();
            })
        });
        it("I can look him up", function (done) {
            api.data.apiUsers.getByUserName('averyrandomlogin1', function (err, data) {
                assert(err == null);
                var user = data;
                assert(user.hash != null);
                return done();
            })
        });
        it("I can get an api key for him", function (done) {
            api.data.apiUsers.getApiKey('averyrandomlogin1', 'apassword', function (err, data) {
                assert(err == null);
                
                assert(data != null);
                return done();
            })
        });
        it("And I can delete him again", function (done) {
            api.data.apiUsers.deleteApiUser('averyrandomlogin1', function (err, data) {
                return done();
            })
        });
        it("after which i cant have a key anymore", function (done) {
            api.data.apiUsers.getApiKey('averyrandomlogin1', 'apassword', function (err, data) {
                assert(err != null);
                
                assert(data == null);
                return done();
            })
        });

            
           
    });
        
       
});


