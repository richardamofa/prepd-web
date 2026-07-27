const errorMiddleware = (
  error,
  req,
  res,
  next,
) => {
  console.error("❌ Error:", error);

  res.status(error.statusCode || 500).json({
    success: false,

    message:
      error.statusCode
        ? error.message
        : "Something went wrong on the server",
  });
};

module.exports = errorMiddleware;