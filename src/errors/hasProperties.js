function hasProperties(...Properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      Properties.forEach((property) => {
        const value = data[property];
        if (!value) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
