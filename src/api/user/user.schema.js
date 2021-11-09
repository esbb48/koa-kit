module.exports = {
  User: {
    type: 'object',
    required: ['name'],
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      name: {
        type: 'string',
        example: 'doggie',
      },
      created_at: {
        type: 'integer',
        format: 'int64',
      },
    },
  },
};
