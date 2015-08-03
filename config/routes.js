exports.default = { 
  routes: function(api){
        return {
            
            get: [
                { path: '/status', action: 'status' }, 
                { path: '/debug', action: 'debugtest' }, 
                { path: '/auth/getToken/', action: 'getapikey' }, 
                { path: '/auth/testToken/', action: 'testapikey' }, 
                
                { path: '/apps', action: 'appActions' },
                //{ path: '/apps/:idApp/createPlayerForUser/:idUser', action: 'appCreatePlayer' },
                { path: '/apps/list', action: 'appList' },
                { path: '/apps/byId/', action: 'appById' },
               
               
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
            
                
                { path: '/games', action: 'gameActions' },
                { path: '/games/byId', action: 'gameById' },
                { path: '/games/all', action: 'allGames' },
                { path: '/games/forApp/', action: 'gamesForApp' }, 
        
                
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