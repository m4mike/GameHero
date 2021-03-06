exports.default = { 
  routes: function(api){
        return {
            
            get: [
                { path: '/status', action: 'status' }, 
                { path: '/debug', action: 'debugtest' }, 
                { path: '/auth/createApiUser/:api_user/:api_pasw', action: 'createApiUser' }, 
                { path: '/auth/getApiKey/:api_user/:api_pasw', action: 'getapikey' }, 
                { path: '/auth/testApiKey/', action: 'testapikey' }, 
                
                { path: '/apps', action: 'appActions' },
                { path: '/apps/list', action: 'appList' },                                          //api
                { path: '/apps/byId/:id', action: 'appById' },                                      //api
                { path: '/apps/create/:name', action : 'appCreate'},

               
               
                { path: '/users', action: 'userActions' },
                { path: '/users/byId/:idUser', action: 'userById' },
                { path: '/users/:idUser/addInterest/:lang/:cat/:interest', action: 'userAddInterest' },
                { path: '/users/:idUser/removeInterest/:lang/:cat/:interest', action: 'userRemoveInterest' },
                { path: '/users/:idUser/hasInterest/:lang/:cat/:interest', action: 'userHasInterest' },
          
                
                { path: '/players', action: 'playerActions' },
                { path: '/players/byId', action: 'playerById' },
                { path: '/players/byExtId/:playerId', action: 'playerByIdExt' },
                { path: '/players/byIdFull/:playerId', action: 'playerByIdFull' },
                { path: '/players/byExtIdFull/:playerId', action: 'playerByExtIdFull' },
                { path: '/players/forApp/:idApp', action: 'playersForApp' }, 
                { path: '/players/create/app/:idApp/extid/:idExt/dispName/:dispname', action: 'createPlayerExt' } ,
                { path: '/players/wall/byId/:playerId/:month', action: 'socialwallplayer' }, 
                { path: '/players/wall/byExtId/:ext_playerId/:month', action: 'socialwallextplayer' } , 
                 
                { path: '/social', action: 'socialactions' },
                { path: '/social/log/:app/:month', action: 'socialactions' },
                { path: '/social/wall/player/:playerId/:month', action: 'socialwallplayer' },
                { path: '/social/wall/extplayer/:ext_playerId/:month', action: 'socialwallextplayer' },
                { path: '/social/wall/last/player/', action: 'sociallastwallplayer' },
                { path: '/social/wall/last/extplayer/', action: 'lastwallextplayer' },
                

                { path: '/quests', action: 'questsActions' }, 
                { path: '/quests/forMission/:idMission', action: 'questsForMission' },
                { path: '/quests/forApp/:idApp', action: 'questsForApp' },
                { path: '/quests/search/:search', action: 'questsSearch' },
               
                { path: '/missions', action: 'missions' },
               
                
                { path: '/missions/forApp', action: 'missionsForApp' },
                { path: '/missions/byId', action: 'missionById' },
              
                { path: '/interests', action: 'interestActions' },
                { path: '/interests/categories/:lang', action: 'listCats' },
                { path: '/interests/add/:lang/:cat/:interest', action: 'addInterest' },
                { path: '/interestsForCat/:lang/:cat', action: 'interestsForCat' },
            
                
                { path: '/games/', action: 'gameActions' },
                { path: '/games/byId/:id', action: 'gameById' },
                { path: '/games/all', action: 'allGames' },
                { path: '/games/forApp/:idApp', action: 'gamesForApp' }, 
                { path: '/games/getData/player/:player/game/:game', action: 'getgamedata' }, 
                { path: '/games/getData/extplayer/:extplayer/game/:game', action: 'getgamedataext' }, 
                
                { path: '/games/tictac/start', action: 'tictacCreate' }, 
                { path: '/games/tictac/start/:x/:y', action: 'tictacCreateAndStart' },
                { path: '/games/tictac/view', action: 'tictacView' },
                { path: '/games/tictac/play/:idGame/:x/:y', action: 'tictacMove' },


                { path: '/swagger', action: 'swagger' }
            ],
            post: [
                { path: '/social/attack', action: 'socialattack' },
                { path: '/social/post', action: 'socialpost' },
                { path: '/social/status', action: 'socialstatus' },
                
                { path: '/games/save', action: 'savegamedata' } ,
                { path: '/games/attack', action: 'game_attack' } , 
            ],
            delete: [
                //{ path: "/players/:playerId", action: "playerDelete" },
                { path: "/interests/:lang/:cat/:interest", action: "deleteInterest" },
        
            ]
             

      /* ---------------------
      routes.js 

      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: http://www.actionherojs.com/docs/servers/web.html

      examples:
      
      get: [
        { path: '/players', action: 'playersList' }, // (GET) /api/players
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: '/login/:playerID(^\\d{3}$)', action: 'login' } // (POST) /api/login/123
      ],

      all: [
        { path: '/player/:playerID', action: 'player' } // (*) / /api/player/123
      ]
      
      ---------------------- */
      
    }
  }
}