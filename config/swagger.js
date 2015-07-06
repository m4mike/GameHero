exports['default'] = {
    swagger: function (api) {
        return {
            // Should be changed to hit www.yourserver.com 
            baseUrl: '127.0.0.1',
            // Specify routes that don't need to be displayed 
            ignoreRoutes: ['/swagger'],
            // Specify how routes are grouped 
            routeTags : {
                'testing' : ['/status'],
                'users' : ['/users'],
                'quests' : ['/quests'],
                'games' : ['/tictac']
            },
           
            // Generate documentation for actions specified under config/routes.js 
            documentConfigRoutes: true,
            // Set true if you want to organize actions by version 
            groupByVersionTag: true,
            // Generate documentation for simple actions specified by action-name 
            documentSimpleRoutes: false,
            // For simple routes, groups all actions under a single category 
            groupBySimpleActionTag: false
        }
    }
}