var should = require("should");
var assert = require('assert');
var api;
var setup = { testUrl : 'http://localhost:3000/api/' };

process.env.NODE_ENV = 'dev';
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();

var requestjs = require('request-json');
var request = requestjs.createClient(setup.testUrl);

function assertOk(response, body) {
    assert(response.statusCode == 200);
    assert(body['ok'] == 1);
}

describe('game tests', function () {
    
    before(function (done) {
        actionhero.start(function (err, a) {
            api = a;
            setTimeout(function () { done(); }, 1000);
        })
    });
    
    after(function (done) {
        actionhero.stop(function (err) {
            done();
        });
    })
    
    it("is possible to get all games", function (done) {
        request.get("games/all", function (error, response, body) {
            assertOk(response,body);
            return done();
        });    });
    
    it("is possible to get all games for an app", function (done) {
        request.get("games/forApp/app_mlg", function (error, response, body) {
            assertOk(response,body);
            return done();
        });    });

    it("is possible to get a game details", function (done) {
        request.get("games/byId/g_mld", function (error, response, body) {
            assertOk(response,body);
            return done();
        });    });})