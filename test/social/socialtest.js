var request = require("request");
var should = require("should");
var setup = require("./../_setup.js")._setup;
var api;

describe('social', function () {
    
    before(function (done) {
        setup.init(function (err, _api) {
            if (err) console.log(err);
            api = _api;
            //console.log('before step done');
            done();
        });
    });
    
    it("the api should work in general", function (done) {
        //console.log("starting test");
        api.log('getting : ' + setup.testUrl);
        request.get(setup.testUrl + "/doesntexist", function (err, response, body) {
            body = JSON.parse(body);
            body.error.should.equal("unknown action or invalid apiVersion");
            done();
        });
    });

    it("getting socal", function (done) {
        //console.log("starting test");
        console.log('getting : ' + setup.testUrl + "/social");
        request.get(setup.testUrl + "/social", function (err, response, body) {
            //console.log(JSON.stringify(response));
            
            done();
        });
    });

    
    var actionData = {
        "actiontype": "attack",
        "ts": "2015-07-15T13-00-00Z",
        "app": "app_mlg",
        "from": {
            "id": "- internal id of attacker -",
            "ext_id": "--MLG id of attacker -",
            "name": "Angelica"
        },
        "to": {
            "id": "-internal id of defender -",
            "ext_id": "--MLG id of defender -",
            "name": "Jessica"
        },
        "detail": {
            "game": "bitchfight",
            "winner": "from",
            "a_health": "10",
            "d_health": "8",
            "a_score": "6",
            "d_score": "0",
            "item_transfer": {
                "id_item": "--MLG id of item -",
                "name": "name of item to display"
            }
        },
        "post": {
            "msg": "voila pour ta poire"
        }
    };

    var options = {
        url: '',
        headers: {
            'User-Agent': 'request'
        }
    };
    
    it("attack", function (done) {
        options.url = setup.testUrl + "/attack";
        options.json = actionData;
        console.log('posting : ' + options.url);
        request.post(options,function (err, response, body) {
            //console.log(JSON.stringify(body));
            
            done();
        });
    });

    it("post to a wall", function (done) {
        options.json = {
            "actiontype": "post",
            "when": "2015-07-15T13-00-00Z",
            "app": "app_mlg",
            "from": {
                "id": "internal id of player",
                "ext_id": "--MLG id -",
                "name": "Angelica"
            },
            "to": {
                "id": "internal id of player",
                "ext_id": "--MLG id -",
                "name": "Jessica"
            },
            "post": {
                "msg": "Tu es prês de moi?"
            }
        };
        options.url = setup.testUrl + "/post";
        console.log('posting : ' + options.url);
        request.post(options, function (err, response, body) {
            //console.log(JSON.stringify(body));
           
            done();
        });
    });
    
    
    it("update a status", function (done) {
        options.json = {
            "actiontype" : "status",
            "when": "2015-07-15T13-00-00Z",
            "app": "app_mlg",
            "from": {
                "ext_id": "--MLG id -",
                "name": "Angelica"
            },
            "post": {
                "msg": "Je me sens bien"
            }
        };
        options.url = setup.testUrl + "/status";
        console.log('posting : ' + options.url);
        request.post(options, function (err, response, body) {
            //console.log(JSON.stringify(body));
            
            done();
        });
    });


});