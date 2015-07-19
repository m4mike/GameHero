exports.task = {
  name: "postonwall",
  description: "player p1 posts on player p2 wall ",
  frequency: 0,
  queue: "default",
  plugins:       [],
  pluginOptions: [],

    run: function (api, params, next){
        //var state = {
        //    playerFrom: action.params.from, 
        //    playerTo: action.params.to, 
        //    playerFromCheck : false,
        //    playerToCheck : false,
        //    idApp: action.params.app, 
        //    post: action.params.post, 
        //    err: null
        //};
        //postOnWall = function (playerFrom, playerTo, app, post, next) {
        api.data.social.postOnWall(params.playerFrom,params.playerTo,params.idApp,params.post,next)
   
  }
};
