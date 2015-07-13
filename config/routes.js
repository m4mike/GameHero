exports.default = { 
  routes: function(api){
    return {
      
            get: [
                { path: '/status', action: 'status' }, 
                { path: '/debug', action: 'debugtest' }, 
                
                { path: '/apps', action: 'appActions' },

                { path: '/apps/:idApp/createPlayerForUser/:idUser', action: 'appCreatePlayer' },
                { path: '/apps/list', action: 'appList' },
               
               
                { path: '/users', action: 'userActions' },
                { path: '/users/byId/:idUser', action: 'userById' },
                { path: '/users/:idUser/addInterest/:lang/:cat/:interest',action:'userAddInterest'},
                { path: '/users/:idUser/removeInterest/:lang/:cat/:interest',action:'userRemoveInterest'},
                { path: '/users/:idUser/hasInterest/:lang/:cat/:interest',action:'userHasInterest'},
          
  
               
                { path: '/players', action: 'playerActions' },
                { path: '/players/byId/:playerId', action: 'playerById' },
                { path: "/players/delete/:playerId", action: "playerDelete" }, 
            
                 
                { path: '/quests', action: 'questsActions' }, 
                { path: '/quests/forMission/:idMission', action: 'questsForMission' },
                { path: '/quests/forApp/:idApp', action: 'questsForApp' },
                { path: '/quests/search/:search', action: 'questsSearch' },
                
                { path: '/missions', action: 'missionsList' },
                { path: '/missions/forApp', action: 'missionsForApp' },
                { path: '/missions/byId', action: 'missionById' },
              
                { path: '/interests', action: 'interestActions' },
                { path: '/interests/categories/:lang', action: 'listCats' },
                { path: '/interests/add/:lang/:cat/:interest', action: 'addInterest' },
          //      { path: '/interests/byId', action: 'missionById' },
                { path: '/interestsForCat/:lang/:cat', action: 'interestsForCat' },
                
                 { path: '/tictac/start', action: 'tictacCreate' }, 
                { path: '/tictac/start/:x/:y', action: 'tictacCreateAndStart' },
                { path: '/tictac/view', action: 'tictacView' },
                { path: '/tictac/play/:idGame/:x/:y', action: 'tictacMove' },


                { path: '/swagger', action: 'swagger' }


            ],
            delete: [
                { path: "/players/:playerId", action: "playerDelete" },
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