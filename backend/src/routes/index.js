const express = require('express');
const healthController = require('../controllers/health');
const productController = require('../controllers/product');
const cartController = require('../controllers/cart');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoint
 *   - name: Products
 *     description: Product listing and filtering
 *   - name: Cart
 *     description: Manage shopping cart
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Health]
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get products with filtering and sorting
 *     description: Returns a list of products, optionally filtered by age, price range, or brand, and sorted by price, age, name, or bestseller.
 *     parameters:
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Age filter (e.g. 3 means toys for age 3)
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, age, name, bestseller]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   price:
 *                     type: number
 *                   age:
 *                     type: integer
 *                   brand:
 *                     type: string
 *                   description:
 *                     type: string
 *                   bestseller:
 *                     type: boolean
 */
router.get('/products', productController.list);

/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get cart contents
 *     description: Get the contents of the current user's cart (demo: guest only).
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   product:
 *                     type: object
 *                     nullable: true
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   delete:
 *     tags: [Cart]
 *     summary: Clear the cart
 *     responses:
 *       200:
 *         description: Cart is now empty
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addItem);
router.delete('/cart', cartController.clearCart);

/**
 * @swagger
 * /cart/{productId}:
 *   put:
 *     tags: [Cart]
 *     summary: Update quantity for a cart item
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: New quantity
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID to remove
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.put('/cart/:productId', cartController.updateItem);
router.delete('/cart/:productId', cartController.removeItem);

module.exports = router;
