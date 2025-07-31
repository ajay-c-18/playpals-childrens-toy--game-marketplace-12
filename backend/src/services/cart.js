const cartData = require('../data/cart');
const products = require('../data/products');

/**
 * Helper: get current cart contents for a user. For this demo, only guest cart.
 */
function getCart(userId = 'guest') {
  return cartData[userId] || [];
}

/**
 * Helper: update cart for a user.
 */
function setCart(items, userId = 'guest') {
  cartData[userId] = items;
  return cartData[userId];
}

/**
 * Validate productId and get product details.
 */
function findProduct(productId) {
  return products.find(p => p.id === productId);
}

// PUBLIC_INTERFACE
function getCartDetails(userId = 'guest') {
  /**
   * Returns cart array with product snapshot added.
   */
  const cart = getCart(userId);
  return cart.map(({ productId, quantity }) => {
    const product = findProduct(productId);
    return {
      productId,
      quantity,
      product: product ? { ...product } : null,
    };
  });
}

// PUBLIC_INTERFACE
function addToCart(productId, quantity = 1, userId = 'guest') {
  /**
   * Adds or updates product in cart.
   */
  if (!findProduct(productId)) {
    throw new Error('Product not found');
  }
  let cart = getCart(userId);
  const idx = cart.findIndex(item => item.productId === productId);
  if (idx >= 0) {
    cart[idx].quantity += quantity;
    if (cart[idx].quantity < 1) cart[idx].quantity = 1;
  } else {
    cart.push({ productId, quantity: Math.max(1, quantity) });
  }
  setCart(cart, userId);
  return getCartDetails(userId);
}

// PUBLIC_INTERFACE
function updateCartItem(productId, quantity, userId = 'guest') {
  /**
   * Updates quantity for a product in cart.
   */
  if (!findProduct(productId)) throw new Error('Product not found');
  let cart = getCart(userId);
  const idx = cart.findIndex(item => item.productId === productId);
  if (idx === -1) throw new Error('Item not in cart');
  if (quantity < 1) {
    cart.splice(idx, 1); // remove item
  } else {
    cart[idx].quantity = quantity;
  }
  setCart(cart, userId);
  return getCartDetails(userId);
}

// PUBLIC_INTERFACE
function removeFromCart(productId, userId = 'guest') {
  /**
   * Removes a product from the cart.
   */
  let cart = getCart(userId);
  cart = cart.filter(item => item.productId !== productId);
  setCart(cart, userId);
  return getCartDetails(userId);
}

// PUBLIC_INTERFACE
function clearCart(userId = 'guest') {
  /**
   * Clears the entire cart.
   */
  setCart([], userId);
  return [];
}

module.exports = {
  getCartDetails,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
