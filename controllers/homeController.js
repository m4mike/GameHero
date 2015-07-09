(function (homeController) {

  var data = require("../data")(api);
  //var auth = require("../auth");

  homeController.init = function (app) {

        app.get("/", function (req, res) {
            res.send("<html><body><h1>Express</h1></body></html>");

        });
  };

})(module.exports);