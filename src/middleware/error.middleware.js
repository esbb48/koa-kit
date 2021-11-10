const HTTPS_STATUS_CODE = {
  DatabaseError: 400,
  ForbiddenError: 403,
  NotFoundError: 404,
  ParamsError: 400,
  UnauthorizedError: 401,
};

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const errorType = error.name;
    ctx.status = HTTPS_STATUS_CODE[errorType] || 500;
    ctx.body = {
      status: errorType,
      message: error.message || 'Internal server error',
      result: null,
    };
  }
};
