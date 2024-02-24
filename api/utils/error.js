export const errorHandler = (statusCode, message) => {
  const err = new Error();
  err.statusCode = statusCode || 500;
  err.message = message || "Somehting went wrong";
  return err;
};
