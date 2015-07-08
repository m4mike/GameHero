
var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;
var data = require('./../data');

describe('data tests', function(){

  
  describe('Connecting to mongo',function(){
	  it('should work',function(done){
		   data.getMongo().then(function(err,db){
         console.log(db);
         db.db.should.not.be.null();
         done();
       })
	  })
  })

});