const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'AzureError') {
      return res.status(500).json({
        status: 'error',
        message: 'Azure service error',
        error: err.message
      });
    }
  
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
    });
  };
  
  module.exports = errorHandler;