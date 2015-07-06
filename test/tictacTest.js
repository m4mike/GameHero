var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('Action: TicTac', function () {
    

    
    describe('Create game', function () {
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
            
            
            api.specHelper.runAction('gameCreate', {}, function (response) {
                resp = response;
            });
            done();
               
        });
        

        it('should not return null', function (done) {
            
            resp.should.not.be.null();
            done();
               
        });
        
        it('should contain a board', function (done) {
            resp.
            done();
        });
        
        it('just value', function (done) {
            done();
        });
        
        it('gibberish param', function (done) {
            done();
        });
        
    });
    
  

});