
var assert = require('assert');

var should = require("should");
var api;
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var setup = { testUrl : 'http://localhost:3000/api' };
var chakram = require('chakram'), expect = chakram.expect;
process.env.NODE_ENV = 'test';

describe('Test Suite 1', function () {


    it('Test 1', function (done) {
        console.log('starting');
        actionhero.start(function (err, a) {
            console.log('inside');
            api = a;
            assert.ok(true, "This shouldn't fail");
           
        })
        done();
       
    })
    
    it('Test 2', function () {
        assert.ok(1 === 1, "This shouldn't fail");
        //assert.ok(false, "This should fail");
    })
})