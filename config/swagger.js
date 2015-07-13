exports['default'] = {
    swagger: function (api) {
        return {
            // Should be changed to hit www.yourserver.com 
            baseUrl: 'http://localhost',
            // Specify routes that don't need to be displayed 
            ignoreRoutes: ['/swagger'],
            // Specify how routes are grouped 
            routeTags : {
                'apps' : ['apps'],
                'players' : ['players'],
                'quests' : ['quests','missions'],
                'games' : ['tictac'],
                'users' : ['users', 'interests']
            },
            // Generate documentation for simple actions specified by action-name 
            documentSimpleRoutes: false,
            // Generate documentation for actions specified under config/routes.js 
            documentConfigRoutes: true,
            // Set true if you want to organize actions by version 
            groupByVersionTag: false,
            // For simple routes, groups all actions under a single category 
            groupBySimpleActionTag: true
        }
    }
}

exports.production = {
    swagger: function (api) {
        console.log('production: setting swagger to heroku');
        return {
            // Should be changed to hit www.yourserver.com 
            baseUrl: 'https://test-mbe.herokuapp.com',
           
           
        }
    }

}