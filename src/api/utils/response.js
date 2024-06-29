const handelServiceResponse = async (hasError, status, message, serviceData = {}) => ({
  hasError,
  status,
  data: {
    success: !hasError,
    message,
    ...serviceData,
  },
});

const responseBuilder = async (res, status, data) => res.status(status).send(data);

const errorResponse = async (level, error) => ({
  message: `unexpected error at ${level}`,
  error,
});

module.exports = {
  handelServiceResponse,
  responseBuilder,
  errorResponse,
};
