const { getOkRes, getRouteSpec } = require('../../utils/swagger.util');

const tags = ['auth'];
module.exports = {
  '/auth/login': {
    post: getRouteSpec({
      tags,
      parameters: [],
      summary: 'Login',
      okRes: getOkRes({
        result: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
            },
          },
        },
      }),
    }),
  },
};
