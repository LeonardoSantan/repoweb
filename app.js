// app.js
const express       = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerJSDoc  = require('swagger-jsdoc');
const userRoutes    = require('./routers/api/users');

const app = express();
app.use(express.json());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RepoWeb2 API',
    version: '1.0.0',
    description: 'API REST com autenticação JWT e Swagger'
  },
  servers: [
    { url: 'http://localhost:3000/api', description: 'Servidor local' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          nome:      { type: 'string' },
          email:     { type: 'string' },
          password:  { type: 'string' }
        },
        required: ['nome', 'email', 'password']
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

const options = {
  swaggerDefinition,
  apis: ['./routers/api/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
