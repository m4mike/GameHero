var request = require("request");
var should = require("should");
var setup = require("./../_setup.js")._setup;
var api;

describe('integration', function () {
    
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
        console.log('getting : ' + setup.testUrl);
        request.get(setup.testUrl + "/someAction", function (err, response, body) {
            body = JSON.parse(body);
            body.error.should.equal("unknown action or invalid apiVersion");
            done();
        });
    });


});