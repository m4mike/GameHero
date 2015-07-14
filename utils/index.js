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
