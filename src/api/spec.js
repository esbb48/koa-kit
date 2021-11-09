'use strict';
const packageJson = require('../../package.json');
const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);

const getSpecDetail = () => {
  let definitions = {};
  let paths = {};
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') < 0 && file !== baseName)
    .forEach(file => {
      const { spec: apiSpec, definition } = require(path.join(__dirname, file));
      definitions = { ...definitions, ...definition };
      paths = { ...paths, ...apiSpec };
    });

  return { definitions, paths };
};

const getSpec = () => {
  const { paths, definitions } = getSpecDetail();
  return {
    swagger: '2.0',
    info: {
      version: packageJson.version,
      title: 'Koa2 startkit API',
      description: 'Koa2 startkit API',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    // host,
    basePath: '/api',
    tags: [],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths,
    definitions: {
      ApiResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
      ...definitions,
    },
  };
};

module.exports = getSpec;
