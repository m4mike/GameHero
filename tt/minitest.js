var data = require('./../data');
var should = require('should');

data.database.getMongo().then(function (db) {
	console.log(db);
	console.log(db.players.count());
	
});