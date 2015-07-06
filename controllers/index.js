(function (controllers) {
    
    controllers.init = function (app) {
        
        require("./homeController").init(app);
        require("./missionController").init(app);
        require("./questController.js").init(app);
        require("./actionController.js").init(app);
        require("./userController.js").init(app);
        
        
          
    };

})(module.exports);