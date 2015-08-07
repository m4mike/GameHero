
var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;


describe('data tests', function () {

    before(function (done) {
        this.timeout(10000);
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
  
  describe('Data should be seeded', function () {
    describe('Connecting to mongo', function () {
      it('inside an api', function (done) {
        api.should.not.be.null();
        done();
      });

      it('should work', function (done) {
        api.data.getDb(function (err, db) {
          //console.log(db);
          db.db.should.not.be.null();
          done();
        });
      });
    });
    
    describe("There should be users",function(){
      it("i can find u1",function(done){
        api.data.users.byId("u1",function(err,user){
          user.should.not.be.null();
          done();
        })
      });
      it("i can find p1",function(done){
                api.data.players.byId("p1",function(err,user){
          user.should.not.be.null();
          done();
        })
      });
      it("i can find followers mission",function(done){
                api.data.missions.byId("mfollowers",function(err,res){
          res.should.not.be.null();
          done();
        })
      });
      it("i can find quests for followers mission",function(done){
        api.data.quests.forMission("mfollowers",function(err,res){
          res.should.not.be.null();
          done();
        })
      })
     
    });
  });
});