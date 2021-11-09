'use strict';
const packageJson = require('../../package.json');
const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);

const getSpecDetail = () => {
  let schemas = {};
  let paths = {};
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') < 0 && file !== baseName)
    .forEach(file => {
      const { spec: apiSpec, schema } = require(path.join(__dirname, file));
      schemas = { ...schemas, ...schema };
      paths = { ...paths, ...apiSpec };
    });
  return { schemas, paths };
};

const getSpec = () => {
  const { paths, schemas } = getSpecDetail();
  return {
    openapi: '3.0.0',
    info: {
      version: packageJson.version,
      title: 'Koa2 startkit API',
      description: 'Koa2 startkit API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/',
      },
    ],
    schemes: ['http', 'https'],
    paths,
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
      schemas,
      parameters: {
        limit: {
          name: 'limit',
          in: 'query',
          required: true,
          type: 'integer',
          format: 'int32',
          default: 10,
        },
        page: {
          name: 'page',
          in: 'query',
          required: true,
          type: 'integer',
          format: 'int32',
          default: 1,
        },
      },
      responses: {},
    },
  };
};

module.exports = getSpec;
