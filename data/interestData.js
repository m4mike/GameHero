var Promise = require('bluebird');
var client;

module.exports.init = function (api) {
    //api.log("initialising interests");
    client = api.redis.client;
    return module.exports;
}



module.exports.addInterest = function (lang, cat, interest, next) {
    if (client == null) { console.log('boem'); client = require('redis').createClient(); }
    var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
    if (next != null)
        return client.sadd(catUrn, interest, next);
    else
        client.sadd(catUrn, interest);
   
}

module.exports.removeInterest = function (lang, cat, interest, next) {
    var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
    if (next != null)
        return client.srem(catUrn, interest, next);
    else
        return client.srem(catUrn, interest);
};


module.exports.existInterest = function (lang, cat, interest, next) {
    var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
    return client.sismember(catUrn, interest, next);
}


module.exports.getInterestsForCat = function (lang, cat, next) {
    var catUrn = "urn:Cat:" + lang + ":" +  cat.trim();
    return client.smembers(catUrn, next);
}

module.exports.getRandomInterestsForCat = function (lang, cat, amount, next) {
    amount = typeof amount !== 'undefined' ? amount : 20;
    var catUrn = "urn:Cat:" +  cat.trim();
    return client.srandmember(catUrn, amount, next);
}
module.exports.removeCat = function (lang, cat, next) {
    
    var catUrn = "urn:Cat:" + lang.trim() + ":" + cat.trim();
    return client.del(catUrn, next);
}

module.exports.getCats = function (lang, next) {
    
    var catUrn = "urn:Cat:" +lang;
    return client.keys(catUrn, next);
}