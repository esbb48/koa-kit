const response = statusCode => (ctx, result) => {
  ctx.status = statusCode;
  ctx.body = {
    status: 'success',
    message: null,
    result,
  };
  return ctx;
};

module.exports.responseOk = response(200);
module.exports.responseAddOk = response(201);
module.exports.responseListOk = (ctx, total, page, rows) =>
  response(200)(ctx, {
    total,
    page,
    rows,
  });
