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

var state = {
    action : 'attack',
    playerFrom: {
        "_id": "p11",
        "id_user": "u1",
        "id_ext": "mlg11",
        "dispname": "Amanda"
    }, 
    playerTo: {
        "_id": "p12",
        "id_user": "u2",
        "dispname": "Beatrice",
        "id_ext": "mlg12"
    }, 
    
    
    fromData: { "defence": "LMM", "attack": "HHH" } ,
    toData : { "defence": "LMH", "attack": "MMM" },
    winner: null,
    err: null
};

var gp = require('../data/gameplay.js');

describe('My little duel tests', function (done) {
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
    
    describe('When a player attacks a player in mld and should win', function (done) {
        it("he has a moves list", function (done) {
            gp.g_mld(api, state, function (err, result) {
                state = result;
                assert(state.moves.length > 3);
                done();
            });
        });
        
        it("he is the winner", function (done) {
            assert(state.winner == 'from');
            done();
        });
    });

    describe('When a player attacks a player in mld and should loose', function (done) {
        it("he has a moves list", function (done) {
            state.fromData = { "defence": "LHM", "attack": "HHH" };
            state.toData = { "defence": "HHH", "attack": "MMM" };
            gp.g_mld(api, state, function (err, result) {
                state = result;
                assert(state.moves.length > 3);
                done();
            });
        });
        it("he is the loser", function (done) {
            assert(state.winner == 'to');
            done();
        });
    });
    describe('When a player attacks a player in mld and its a draw', function (done) {
        it("he has a moves list", function (done) {
            state.fromData = { "defence": "MMM", "attack": "HHH" };
            state.toData = { "defence": "HHH", "attack": "MMM" };
            gp.g_mld(api, state, function (err, result) {
                state = result;
                assert(state.moves.length > 3);
                done();
            });
        });
        it("it is a draw", function (done) {
            console.log(JSON.stringify( state));
            assert(state.winner == 'draw');
            done();
        });
    })
})