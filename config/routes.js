exports.default = { 
  routes: function(api){
    return {
      
            get: [
                { path: '/status', action: 'status' }, // (GET) /api/users
               // { path: '/cacheTest/:key/:value', action: 'cacheTest' }, 
               //{ path: '/random', action: 'randomNumber' }, // (GET) /api/users
               // { path: '/sleep', action: 'sleepTest' }, // (GET) /api/users
                
                { path: '/tictac/start', action: 'gameCreate' }, // (GET) /api/quests
                { path: '/tictac/view', action: 'tictacView' },
                { path: '/tictac/play/:gameId/:x/:y', action: 'tictacMove' },
                { path: '/users/byId/:userId', action: 'userById' },
                { path: "/users/delete/:userId", action: "userDelete" }, 
                { path: '/users', action: 'userActions' }, 
                { path: '/quests', action: 'questsActions' }, 
                { path: '/quests/forMission/:missionId', action: 'questsForMission' },
                { path: '/quests/forApp/:appId', action: 'questsForApp' },
                { path: '/missions', action: 'questsActions' }


            ],
            delete: [
                { path: "/users/:userId", action: "userDelete" }, 
            ]

      /* ---------------------
      routes.js 

      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: http://www.actionherojs.com/docs/servers/web.html

      examples:
      
      get: [
        { path: '/users', action: 'usersList' }, // (GET) /api/users
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: '/login/:userID(^\\d{3}$)', action: 'login' } // (POST) /api/login/123
      ],

      all: [
        { path: '/user/:userID', action: 'user' } // (*) / /api/user/123
      ]
      
      ---------------------- */
      
    }
  }
}