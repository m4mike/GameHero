exports.swagger = {
  name: 'swagger',
  description: 'Returns Swagger JSON',
  outputExample: {},
  run: function(api, data, next) {
    // Built by the swagger initializer.
        data.response = api.swagger.documentation;
        console.log('swagger override, env node env = ' + process.env.NODE_ENV);
        console.log('swagger override, envnpm config production = ' + process.env.NPM_CONFIG_PRODUCTION);
        if (process.env.NODE_ENV == 'production' || process.env.NPM_CONFIG_PRODUCTION) {
            console.log('override setting swagger to production');
            data.response.host = "https://test-mbe.herokuapp.com";
        }
        else {
            console.log('no production found')
        }
        console.log('setting swagger to :' + data.response.host);
    next();
  }
};
