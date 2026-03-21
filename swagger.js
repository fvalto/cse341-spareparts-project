const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Spareparts API',
    description: 'Week 3-4 API: CRUD Spareparts',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
