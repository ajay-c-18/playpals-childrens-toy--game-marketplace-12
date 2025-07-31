const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PlayPals API',
      version: '1.0.0',
      description: 'API for PlayPals children\'s toy and game marketplace - Listings, filters, and shopping cart.'
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
