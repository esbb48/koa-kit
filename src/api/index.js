'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');
const { koaSwagger } = require('koa2-swagger-ui');
const getSpec = require('./spec');

const baseName = path.basename(__filename);

function applyApiMiddleware(app) {
  const router = new Router({
    prefix: '/api',
  });

  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') < 0 && file !== baseName)
    .forEach(file => {
      const api = require(path.join(__dirname, file)).route(Router);
      router.use(api.routes());
    });

  app.use(router.routes()).use(router.allowedMethods());
  app.use(
    koaSwagger({
      routePrefix: '/docs',
      hideTopbar: true,
      swaggerOptions: {
        spec: getSpec(),
      },
    })
  );
}

module.exports = applyApiMiddleware;
