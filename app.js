var ActionheroPrototype = require("actionhero").actionheroPrototype;
var actionhero = new ActionheroPrototype();
var api;

process.env.FAKEREDIS = 'false';
//process.env.NODE_ENV = 'production';
//process.env.port = 3000;
var should = require('should');
var async = require('async');
var assert = require('assert');
var _ = require('lodash');

actionhero.start(function (err, apiFromCallback) {
    if (err) { console.log(err); }
    api = apiFromCallback;
    api.log('environment :' + api.env);
    
  
     
      
});