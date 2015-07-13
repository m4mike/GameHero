exports.swagger = {
  name: 'swagger',
  description: 'Returns Swagger JSON',
  outputExample: {},
  run: function(api, data, next) {
    // Built by the swagger initializer.
        data.response = api.swagger.documentation;
        if (process.env.NODE_ENV == 'production') {
           
            data.response.host = "https://test-mbe.herokuapp.com";
        }

    next();
  }
};
