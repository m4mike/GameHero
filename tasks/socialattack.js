exports.task = {
    name: "socialattack",
    description: "player p1 attacks player p2  ",
    frequency: 0,
    queue: "default",
    plugins: [],
    pluginOptions: [],
    
    run: function (api, params, next) {
        //var state = {
        //    playerFrom: action.params.from, 
        //    playerTo: action.params.to, 
        //    playerFromCheck : false,
        //    playerToCheck : false,
        //    idApp: action.params.app, 
        //    post: action.params.post, 
        //    detail: the details of the attack
        //    err: null
        //};
        //postOnWall = function (playerFrom, playerTo, app, post, next) {
        api.data.social.socialAttack(params.playerFrom, params.playerTo, params.idApp, params.post, params.detail, next)
   
    }
};