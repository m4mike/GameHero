// uses a combination of mongo and redis
_ = require('lodash');
var Promise = require('bluebird');
var client; // for redis
var data; // for mongo

module.exports.init = function (api) {
    //api.log("initialising interests");
    client = api.redis.client;
    data = require('./index.js');
    return module.exports;
}



module.exports.addInterest = function (lang, cat, interest, next) {
   
    var catUrn = "urn:cat:" + lang.trim() + ":" + cat.trim();
    client.sadd(catUrn, interest);
    if (next != null) {
        
        client.sadd("urn:tag:" + lang.trim() + ":" + interest, cat, next);
    }
    else {
        
        client.sadd("urn:tag:" + lang.trim() + ":" + interest, cat);
    }
   
}

module.exports.removeInterest = function (lang, cat, interest, next) {
    var catUrn = "urn:cat:" + lang.trim() + ":" + cat.trim();
    client.srem(catUrn, interest);
    if (next != null) {
        client.srem("urn:tag:" + lang.trim() + ":" + interest, cat, next);
    }
    else{

        return client.srem("urn:tag:" + lang.trim() + ":" + interest, cat);
    }
};


module.exports.existInterest = function (lang, cat, interest, next) {
    return client.exists("urn:tag:" + lang.trim() + ":" + interest, function (err, dat) {
        if (dat == 1)
            next(null, true);
        else
            next(null, false);
    });
}


module.exports.getInterestsForCat = function (lang, cat, next) {
    var catUrn = "urn:cat:" + lang + ":" + cat.trim();
    return client.smembers(catUrn, next);
}

module.exports.getRandomInterestsForCat = function (lang, cat, amount, next) {
    amount = typeof amount !== 'undefined' ? amount : 20;
    var catUrn = "urn:cat:" + cat.trim();
    return client.srandmember(catUrn, amount, next);
}
module.exports.removeCat = function (lang, cat, next) {
    
    var catUrn = "urn:cat:" + lang.trim() + ":" + cat.trim();
    lang = lang.trim();
    client.smembers(catUrn, function (err, items) { 
        client.srem("urn:tag:" + lang + item, cat);
    });
    client.del(catUrn, next);
    //todo still need to cleanup tags without cat
    next(null, true);
}

module.exports.listCats = function (lang, next) {
    
    var catUrn = "urn:cat:" + lang + ":*";
    client.keys(catUrn, function (err, cats) {
        var cleanedcats = _.map(cats, function (cat) {
            return cat.split(':')[3];
        });
        next(null, cleanedcats);
    })
}
