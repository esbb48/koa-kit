module.exports.paginationParams = [
  {
    $ref: '#/components/parameters/page',
  },
  {
    $ref: '#/components/parameters/limit',
  },
];

const getRes = ({ description, result, message, status }) => ({
  description,
  content: {
    'application/json:': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: status || '',
          },
          message: {
            type: 'string',
            example: message || '',
          },
          result,
        },
      },
    },
  },
});

const getOkRes = (params = {}) =>
  getRes({
    message: null,
    status: 'success',
    ...params,
  });

module.exports.getOkRes = getOkRes;

module.exports.getRouteSpec = ({
  hasAuth = true,
  url,
  summary,
  responses = {},
  okRes = getOkRes(),
  ...params
}) => ({
  summary: summary || 'UNSET',
  parameters: [],
  security: hasAuth ? [{ BearerAuth: [] }] : [],
  responses: {
    200: okRes,
    500: getRes({
      description: 'Internal server error',
      status: 'error',
      message: 'Internal server error',
    }),
    ...responses,
  },
  ...params,
});
