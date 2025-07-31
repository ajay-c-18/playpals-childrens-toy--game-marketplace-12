const products = require('../data/products');

// PUBLIC_INTERFACE
function getProducts({ age, priceMin, priceMax, brand, sortBy, sortOrder }) {
  /**
   * Returns filtered and sorted list of products.
   * @param {Object} filter options: age, priceMin, priceMax, brand, sortBy, sortOrder
   * @returns {Array} list of product objects
   */
  let filtered = [...products];
  if (age !== undefined) {
    filtered = filtered.filter(
      p => Number(p.age) === Number(age)
    );
  }
  if (priceMin !== undefined) {
    filtered = filtered.filter(
      p => Number(p.price) >= Number(priceMin)
    );
  }
  if (priceMax !== undefined) {
    filtered = filtered.filter(
      p => Number(p.price) <= Number(priceMax)
    );
  }
  if (brand !== undefined) {
    filtered = filtered.filter(
      p => String(p.brand).toLowerCase() === String(brand).toLowerCase()
    );
  }

  // Sorting
  if (sortBy) {
    const order = (sortOrder === 'desc') ? -1 : 1;
    filtered.sort((a, b) => {
      if (sortBy === 'price') {
        return (a.price - b.price) * order;
      }
      if (sortBy === 'age') {
        return (a.age - b.age) * order;
      }
      if (sortBy === 'bestseller') {
        return ((b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)) * order;
      }
      // Default: sort by name
      return a.name.localeCompare(b.name) * order;
    });
  }
  return filtered;
}

module.exports = { getProducts };
