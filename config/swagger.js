exports['default'] = {
    swagger: function (api) {
        var swag = {
            // Should be changed to hit www.yourserver.com 
            baseUrl: 'localhost',
            // Specify routes that don't need to be displayed 
            ignoreRoutes: ['/swagger'],
            // Specify how routes are grouped 
            routeTags : {
                'apps' : ['apps'],
                'players' : ['players'],
                'quests' : ['quests', 'missions'],
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
        

        if (process.env.NODE_ENV == 'production' || process.env.NPM_CONFIG_PRODUCTION) {
            console.log('config prod override for swagger ');
            swag.baseUrl = 'test-mbe.herokuapp.com';
        }
        return swag;

        
    }
}
