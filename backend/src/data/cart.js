//
// In-memory shopping cart store.
// Structure: { [userId]: [ { productId, quantity }, ... ] }
//
// For MVP/demo, we use a default single cart.
//

const cartData = {
  // Default guest cart:
  'guest': []
};

module.exports = cartData;
