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

describe('When a player attacks a player in mld and should win', function () {
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
        post: 'pour ta poire!',
        winner:null,
        err: null
    };
    before(function (done) {
        actionhero.start(function (err, a) {
            api = a;
            var gp = require('../data/gameplay.js');
            gp.g_mld(api, state,function(err, result) {
                state = result;
                done();
            });
        })
    });
    
    after(function (done) {
        actionhero.stop(function (err) {
            done();
        });
    })
    
    it("he has a moves list", function (done) {
        
        assert(state.moves.length > 3);
        done();
    });
    
    it("he is the winner", function (done) {
        assert(state.winner == 'from');
        done();
    });

   
})