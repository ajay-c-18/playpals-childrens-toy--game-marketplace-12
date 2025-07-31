const {
  getCartDetails,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../services/cart');

// PUBLIC_INTERFACE
exports.getCart = (req, res) => {
  /**
   * Returns the current cart for user (demo: guest only).
   * @route GET /cart
   */
  try {
    const items = getCartDetails();
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.addItem = (req, res) => {
  /**
   * Adds a product to cart (or updates quantity).
   * @route POST /cart
   * body: { productId, quantity }
   */
  try {
    const { productId, quantity = 1 } = req.body;
    const items = addToCart(productId, Number(quantity));
    res.status(201).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.updateItem = (req, res) => {
  /**
   * Updates the quantity of an item in the cart.
   * @route PUT /cart/:productId
   * body: { quantity }
   */
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const items = updateCartItem(productId, Number(quantity));
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.removeItem = (req, res) => {
  /**
   * Removes an item from the cart.
   * @route DELETE /cart/:productId
   */
  try {
    const { productId } = req.params;
    const items = removeFromCart(productId);
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.clearCart = (req, res) => {
  /**
   * Clears the whole cart.
   * @route DELETE /cart
   */
  try {
    clearCart();
    res.json([]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
