require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API',
        description: 'Contains API documentation for test API',
    },
    host: process.env.API_HOST || 'localhost:3001',
    schemes: ['http'],
};

const outputFile = '/api/dist/swagger.json';
const endpointsFiles = ['../api.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);