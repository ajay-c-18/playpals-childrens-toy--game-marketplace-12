const { getProducts } = require('../services/product');

// PUBLIC_INTERFACE
exports.list = (req, res) => {
  /**
   * Returns a list of products, filtered and sorted based on query parameters.
   * @route GET /products
   */
  try {
    const { age, priceMin, priceMax, brand, sortBy, sortOrder } = req.query;
    const products = getProducts({ age, priceMin, priceMax, brand, sortBy, sortOrder });
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
