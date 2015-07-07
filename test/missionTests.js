
var should = require('should');
var ActionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new ActionheroPrototype();
var api;

describe('Mission tests', function () {


    describe('List missions', function () {
        before(function (done) {
            actionhero.start(function (err, a) {

                api = a;
                done();
            })
        });

        after(function (done) {
            actionhero.stop(function () {

                done();
            });
        });
        var resp = null;


        it('can be called', function (done) {


            api.specHelper.runAction('missionList', {}, function (response) {
                resp = response;
            });
            done();

        });
    })
});