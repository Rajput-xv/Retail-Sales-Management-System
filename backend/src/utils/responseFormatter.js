const formatResponse = (success, data = null, message = '') => {
  return {
    success,
    data,
    message
  };
};

const formatError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.status = statusCode;
  return error;
};

const formatPaginatedResponse = (items, total, page, pageSize) => {
  return {
    items,
    total,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    totalPages: Math.ceil(total / pageSize)
  };
};

export { formatResponse, formatError, formatPaginatedResponse };
