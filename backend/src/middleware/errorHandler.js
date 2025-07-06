// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message: `Validation Error: ${message}`,
      statusCode: 400
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      message: `${field} already exists`,
      statusCode: 400
    };
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    error = {
      message: 'Resource not found',
      statusCode: 404
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      statusCode: 401
    };
  }

  // CORS error
  if (err.message === 'Not allowed by CORS') {
    error = {
      message: 'CORS policy violation',
      statusCode: 403
    };
  }

  // Rate limit error
  if (err.status === 429) {
    error = {
      message: 'Too many requests',
      statusCode: 429
    };
  }

  // Send error response
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    ...(error.stack && { stack: error.stack })
  });
};

export default errorHandler; 