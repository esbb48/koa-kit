'use strict';

const controller = require('./user.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/user`,
  });
  router
    .get('/:userId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
