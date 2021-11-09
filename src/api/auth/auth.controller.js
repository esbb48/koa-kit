'use strict';

exports.login = ctx => {
  const user = null;
  ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = user;
};
