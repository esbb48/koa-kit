const {
  responseOk,
  responseAddOk,
  responseListOk,
} = require('../../utils/response.util');
const { schema, validate } = require('../../utils/validator.util');
const userService = require('./user.service');

exports.getOne = async ctx => {
  const validation = validate(ctx.params, {
    userId: schema.string().required(),
  });
  const user = await userService.getOne(validation);
  return responseOk(ctx, user);
};

exports.getAll = async ctx => {
  const { users, total, page } = await userService.getAll();
  return responseListOk(ctx, total, page, users);
};

exports.createOne = async ctx => {
  const validation = validate(ctx.request.body, {
    name: schema.string().required(),
  });
  const createdUser = await userService.createOne(validation);
  return responseAddOk(ctx, createdUser);
};

exports.updateOne = async ctx => {
  console.log(ctx.request.body);
  const validation = validate(
    { ...ctx.params, ...ctx.request.body },
    {
      userId: schema.string().required(),
      name: schema.string().required(),
    }
  );
  const user = await userService.updateOne(validation);
  return responseOk(ctx, user);
};
