var _ = require('lodash');

//Performs a mylittle duel attack
module.exports.g_mld = function mld(api, state, next) {
    /*
    var state = {
        action : 'attack',
        playerFrom: action.params.from, 
        playerTo: action.params.to, 
        playerFromCheck : false,
        playerToCheck : false,
        idApp: action.params.app, 
        post: action.params.post, 
        detail : action.params.detail,
        winner : action.params.winner,
        game : action.params.game,
        hasPosted:false,
        fromData: null,
        toData : null,
        err: null
    };
    */


    //fromData.datattack is a string like "HHH" it has letters H,M L
    //transform string to arrays and test validity
    state.fromData.attack = [].slice.call(state.fromData.attack);
    state.toData.attack = [].slice.call(state.toData.attack);
    state.fromData.defence = [].slice.call(state.fromData.defence);
    state.toData.defence = [].slice.call(state.toData.defence);
    if (!validateMoves(state)) { state.err = new Error('wrong moves'); return next(state.err) }

    //are initial health levels available?
    if (state.fromData.health == null) state.fromData.health = 10;
    if (state.toData.health == null) state.toData.health = 10;

    //start fighting :-)
    state.moves = [];
    var round = 0;
    var fromHealth = state.fromData.health;
    var toHealth = state.fromData.health;
    for (round = 0; round < 29 ; round++) {
        var roundData = {
            round: round,
            attackFrom: getval(state.fromData.attack, round),
            defenceTo: getval(state.toData.defence, round),
            attackFromResult: 0,
            attackTo: getval(state.toData.attack, round),
            defenceFrom: getval(state.fromData.defence, round),
            attackToResult: 0
        }
        roundData.attackFromResult = attackresult(roundData.attackFrom, roundData.defenceTo);
        roundData.attackToResult = attackresult(roundData.attackTo, roundData.defenceFrom);

        toHealth -= roundData.attackFromResult;
        fromHealth -= roundData.attackToResult;
        roundData.toHealth = toHealth;
        roundData.fromHealth = fromHealth;
        state.moves.push(roundData);
        if (toHealth <= 0) {
            state.winner = "from";
            break;
        }
        if (fromHealth <= 0) {
            state.winner = "to";
            break;
        }

    }
    if (state.winner == null) {
        state.winner = 'draw';
    }
    next(null, state);
}

function getval(arr, index) {
    var a = arr[index % arr.length]
    return a;

}

function attackresult(attack, defence) {
    //possibly add random factor for defending 
    return attack == defence ? 0 : 1;
}

function validateMoves(state) {

    function vMoves(moveArr) {

        var wrongs = 0;
        _.reduce(moveArr, function (acc, n) {
            n = n.toUpperCase();
            if (!(n == "H" || n == "M" || n == "L")) wrongs++;
        });
        return wrongs == 0;
    }
    var test = _.map([state.fromData.attack,
        state.toData.attack,
        state.fromData.defence,
        state.fromData.defence], vMoves);
    return _.every(test, Boolean);

}