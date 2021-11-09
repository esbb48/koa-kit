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
            $ref: '#/definitions/User',
          },
        },
      ],
      okRes: getOkRes({
        result: {
          $ref: '#/definitions/User',
        },
      }),
    }),
  },
  '/user/{userId}': {
    get: getRouteSpec({
      tags,
      summary: 'Get User',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'ID of user to return',
          required: true,
          type: 'integer',
          format: 'int64',
        },
      ],
      okRes: getOkRes({
        result: {
          $ref: '#/definitions/User',
        },
      }),
    }),
    put: getRouteSpec({
      tags,
      summary: 'Update User',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'ID of user to return',
          required: true,
          type: 'integer',
          format: 'int64',
        },
        {
          in: 'body',
          name: 'body',
          description: 'User object that needs to be added to the store',
          required: true,
          schema: {
            $ref: '#/definitions/User',
          },
        },
      ],
      okRes: getOkRes({
        result: {
          $ref: '#/definitions/User',
        },
      }),
    }),
    delete: getRouteSpec({
      tags,
      summary: 'Delete User',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'ID of user to return',
          required: true,
          type: 'integer',
          format: 'int64',
        },
      ],
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
            rowsPerPage: {
              type: 'number',
            },
            rows: {
              type: 'array',
              items: {
                $ref: '#/definitions/User',
              },
            },
          },
        },
      }),
    }),
  },
};
