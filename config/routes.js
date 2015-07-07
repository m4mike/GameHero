exports.default = { 
  routes: function(api){
    return {
      
            get: [
                { path: '/status', action: 'status' }, // (GET) /api/players
               // { path: '/cacheTest/:key/:value', action: 'cacheTest' }, 
               //{ path: '/random', action: 'randomNumber' }, // (GET) /api/players
               // { path: '/sleep', action: 'sleepTest' }, // (GET) /api/players
                
                { path: '/tictac/start', action: 'gameCreate' }, // (GET) /api/quests
                { path: '/tictac/view', action: 'tictacView' },
                { path: '/tictac/play/:gameId/:x/:y', action: 'tictacMove' },
                { path: '/players/byId/:playerId', action: 'playerById' },
                { path: "/players/delete/:playerId", action: "playerDelete" }, 
                { path: '/players', action: 'playerActions' }, 
                { path: '/quests', action: 'questsActions' }, 
                { path: '/quests/forMission/:missionId', action: 'questsForMission' },
                { path: '/quests/forApp/:appId', action: 'questsForApp' },
                { path: '/missions', action: 'missionsList' },
                { path: '/missions/forApp', action: 'missionsForApp' },
                { path: '/swagger', action: 'swagger' }


            ],
            delete: [
                { path: "/players/:playerId", action: "playerDelete" }, 
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