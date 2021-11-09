module.exports.jwtTokenHeader = {
  name: 'rowsPerPage',
  in: 'query',
  description: 'rows per page',
  required: true,
  type: 'integer',
  format: 'int64',
  default: 10,
};
module.exports.paginationParams = [
  {
    name: 'rowsPerPage',
    in: 'query',
    description: 'rows per page',
    required: true,
    type: 'integer',
    format: 'int64',
    default: 10,
  },
  {
    name: 'page',
    in: 'query',
    description: 'page',
    required: true,
    type: 'integer',
    format: 'int64',
    default: 1,
  },
];

const getOkRes = ({ status, message, ...otherProps }) => ({
  description: 'success',
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
      ...otherProps,
    },
  },
});

module.exports.getOkRes = getOkRes;

module.exports.getRouteSpec = ({
  url,
  summary,
  description,
  responses = {},
  okRes = getOkRes({}),
  ...params
}) => ({
  summary: summary || 'UNSET',
  description,
  parameters: [],
  responses: {
    200: okRes,
    500: {
      description: 'Internal server error',
      schema: {
        status: 'failed',
        $ref: '#/definitions/ApiResponse',
      },
    },
    ...responses,
  },
  ...params,
});
