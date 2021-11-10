const {
  getOkRes,
  getRouteSpec,
  paginationParams,
} = require('../../utils/swagger.util');

const tags = ['user'];
module.exports = {
  '/user': {
    post: getRouteSpec({
      tags,
      summary: 'Create User',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'User object that needs to be added to the store!',
          required: true,
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      ],
      okRes: getOkRes({
        result: {
          $ref: '#/components/schemas/User',
        },
      }),
    }),
  },
  '/user/{userId}': {
    parameters: [
      {
        name: 'userId',
        in: 'path',
        description: 'ID of user to return',
        required: true,
        type: 'string',
      },
    ],
    get: getRouteSpec({
      tags,
      summary: 'Get User',
      okRes: getOkRes({
        result: {
          $ref: '#/components/schemas/User',
        },
      }),
    }),
    put: getRouteSpec({
      tags,
      summary: 'Update User',
      requestBody: {
        $ref: '#/components/schemas/User',
      },
      okRes: getOkRes({
        result: {
          $ref: '#/components/schemas/User',
        },
      }),
    }),
    delete: getRouteSpec({
      tags,
      summary: 'Delete User',
      okRes: getOkRes({}),
    }),
  },
  '/user/list': {
    post: getRouteSpec({
      tags,
      parameters: paginationParams,
      summary: 'Get User List',
      okRes: getOkRes({
        result: {
          type: 'object',
          properties: {
            total: {
              type: 'number',
            },
            limit: {
              type: 'number',
            },
            rows: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      }),
    }),
  },
};
