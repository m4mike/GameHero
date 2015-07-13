exports.swagger = {
  name: 'swagger',
  description: 'Returns Swagger JSON',
  outputExample: {},
  run: function(api, data, next) {
    // Built by the swagger initializer.
        data.response = api.swagger.documentation;
        if (process.env.NODE_ENV == 'production') {
            console.log('setting swagger to production');
            data.response.host = "https://test-mbe.herokuapp.com";
        }
        console.log('setting swagger to :' + data.response.host);
    next();
  }
};
