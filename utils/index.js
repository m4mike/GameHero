'use strict';
var crypt = require('bcryptjs');

module.exports.randomId = function (len, bits) {
    len = len == null ? 6 : len;
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len) {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toLowerCase();
};

module.exports.HyperJson = require('./HyperJson.js');


module.exports.passwordHash = function hash(psw, cb){ //cb(err,hash)
    crypt.genSalt(10, function (err, salt) {
        if (err) return cb(err);
        crypt.hash(psw, salt, function (err, hash) {
            if (err) return cb(err);
            cb(null, hash)
        });
    });
   
}

module.exports.passwordTest = function testPassword(psw,hash, cb) { //cb(err,verified)
    crypt.compare(psw, hash, cb);
}

