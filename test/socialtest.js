var should = require("should");
var assert = require('assert');
var api;
var setup = { testUrl : 'http://localhost:3000/api/' };

process.env.NODE_ENV = 'test';
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();

var requestjs = require('request-json');
var request = requestjs.createClient(setup.testUrl);

var options = {
    url: '',
    headers: {
        'User-Agent': 'request'
    }
};

function assertNotification(response,body){
    assert(response.statusCode == 200);
    assert(body['notification'] != null);
    assert(body['ok'] == 1);
}

function assertOk(response, body) {
    assert(response.statusCode == 200);
    assert(body['ok'] == 1);
}
describe('social', function () {
    
    before(function (done) {
            actionhero.start(function (err, a) {
            api = a;
            setTimeout( function () { done(); },1000);
           
        })
    });
    
    after(function (done) {
        
        actionhero.stop(function (err) {
            done();
        });
    })
    
    it("getting socal actions", function (done) {
        request.get("social/", function (error, response, body) {
            assertOk(response, body);
            done();
        });
       
    });
    
    
    var actionData = {
        "actiontype": "attack",
        "app": "app_mlg",
        "from": {
            "id": "p11"
        },
        "to": {
            "id": "p12",
        },
        "winner": "from",
        "detail": {
            "game": "g_mld",
            "winner": "from",
            "a_health": "10",
            "d_health": "8",
            "a_score": "6",
            "d_score": "0",
        },
        "post": {
            "msg": "voila pour ta poire"
        }
    };
    
    
    it("attack", function (done) {
        request.post("social/attack/", actionData, function (error, response, body) {
            assertNotification(response, body);
            done();
        });
    });
    
    it("attack with external ids", function (done) {
        actionData.from = { "id_ext": "mlg11" };
        actionData.to = { "id_ext": "mlg12" };
        request.post("social/attack/", actionData, function (error, response, body) {
            assertNotification(response, body);
            done();
        });
    });
    
    var postData = {
        "actiontype": "post",
        "app": "app_mlg",
        "from": {
            "id": "p1"
        },
        "to": {
            "id": "p2"
        },
        "post": {
            "msg": "Tu es prês de moi?"
        }
    };

    it("post to a wall", function (done) {
         request.post("social/post/", postData, function (error, response, body) {
            assertNotification(response, body);
            done();
        });
    });
    
    it("post to a wall with external ids", function (done) {
        postData.from = { "id_ext": "mlg11" };
        postData.to = { "id_ext": "mlg12" };
        request.post("social/post/", postData, function (error, response, body) {
            assertNotification(response, body);
            done();
        });
    });
    
    var statusData =  {
        "actiontype": "status",
        "app": "app_mlg",
        "from": {
            "id": "p1"
        },
        "post": {
            "msg": "test update"
        }
    };
    it("update a status", function (done) {
        request.post("social/status/", statusData, function (error, response, body) {
            assertNotification(response, body);
            done();
        });
    });
    
    it("update a status with external ids", function (done) {
        statusData.from = { 'id_ext': 'mlg1' };
        request.post("social/status/", statusData, function (error, response, body) {
            assertNotification(response, body);
            done();
        });
    });
});


//describe("Random User API", function () {
//    var apiResponse;

//    before(function () {
//        setup.init(function (err, _api) {
//            if (err) console.log(err);
//            api = _api;

//            done();
//        });
//    });

//    it("should return 200 on success", function () {
//        return expect(apiResponse).to.have.status(200);
//    });

//    it("should return content type and server headers", function () {
//        expect(apiResponse).to.have.header("server");
//        expect(apiResponse).to.have.header("content-type", /json/);
//        return chakram.wait();
//    });

//    it("should include email, username, password and phone number", function () {
//        return expect(apiResponse).to.have.schema('results[0].user', {
//            "required": [
//                "email", 
//                "username", 
//                "password", 
//                "phone"
//            ]
//        });
//    });

//    it("should return a female user", function () {
//        return expect(apiResponse).to.have.json('results[0].user.gender', 'female');
//    });

//    it("should return a valid email address", function () {
//        return expect(apiResponse).to.have.json(function (json) {
//            var email = json.results[0].user.email;
//            expect(/\S+@\S+\.\S+/.test(email)).to.be.true;
//        });
//    });

//    it("should return a single random user", function () {
//        return expect(apiResponse).to.have.schema('results', { minItems: 1, maxItems: 1 });
//    });

//    it("should not be gzip compressed", function () {
//        return expect(apiResponse).not.to.be.encoded.with.gzip;
//    });

//    //it("should return a different username on each request", function () {
//    //    this.timeout(10000);
//    //    var multipleResponses = [];
//    //    for (var ct = 0; ct < 5; ct++) {
//    //        multipleResponses.push(chakram.get("http://api.randomuser.me/?gender=female"));
//    //    }
//    //    return chakram.all(multipleResponses).then(function (responses) {
//    //        var returnedUsernames = responses.map(function (response) {
//    //            return response.body.results[0].user.username;
//    //        });
//    //        while (returnedUsernames.length > 0) {
//    //            var username = returnedUsernames.pop();
//    //            expect(returnedUsernames.indexOf(username)).to.equal(-1);
//    //        }
//    //    });
//    //});
//});