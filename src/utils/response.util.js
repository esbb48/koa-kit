const response = statusCode => (ctx, result) => {
  ctx.status = statusCode;
  ctx.body = {
    status: 'success',
    message: null,
    result,
  };
  return ctx;
};
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports.DatabaseError = class DatabaseError extends AppError {};
module.exports.ForbiddenError = class ForbiddenError extends AppError {};
module.exports.NotFoundError = class NotFoundError extends AppError {};
module.exports.ParamsError = class ParamsError extends AppError {};
module.exports.UnauthorizedError = class UnauthorizedError extends AppError {};

module.exports.responseOk = response(200);
module.exports.responseAddOk = response(201);
module.exports.responseListOk = (ctx, total, page, rows) =>
  response(200)(ctx, {
    total,
    page,
    rows,
  });
