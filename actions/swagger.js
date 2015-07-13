exports.swagger = {
  name: 'swagger',
  description: 'Returns Swagger JSON',
  outputExample: {},
  run: function(api, data, next) {
    // Built by the swagger initializer.
        data.response = api.swagger.documentation;
        console.log('swagger override, env node env             = ' + process.env.NODE_ENV);
        console.log('swagger override, envnpm config production = ' + process.env.NPM_CONFIG_PRODUCTION);
       
        console.log('setting swagger to :' + data.response.host);
    next();
  }
};
