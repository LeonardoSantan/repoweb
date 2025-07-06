// app.js
const express       = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerJSDoc  = require('swagger-jsdoc');
const cors          = require('cors');
const userRoutes    = require('./routers/api/users');
const apiRouter     = require('./routers/api');

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:5173', // URL do frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);

// Conexão MongoDB (Mongoose)
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web2_db';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro MongoDB:', err));

// Conexão Sequelize/PostgreSQL
const { sequelize } = require('./models');
sequelize.sync({ alter: true }).then(async () => {
  console.log('Tabelas sincronizadas!');
  await require('./seeds/initialData')();
}).catch(err => {
  console.error('Erro ao sincronizar tabelas:', err);
});

// Swagger Definition
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
          name:     { type: 'string' },
          email:    { type: 'string' },
          password: { type: 'string' }
        },
        required: ['name', 'email', 'password']
      },
      Patient: {
        type: 'object',
        properties: {
          first_name:    { type: 'string' },
          last_name:     { type: 'string' },
          phone:         { type: 'string' },
          email:         { type: 'string' },
          address:       { type: 'string' },
          date_of_birth: { type: 'string', format: 'date' }
        },
        required: ['first_name', 'last_name', 'phone', 'email', 'address', 'date_of_birth']
      },
      Clinic: {
        type: 'object',
        properties: {
          name:    { type: 'string' },
          address: { type: 'string' },
          phone:   { type: 'string' }
        },
        required: ['name', 'address', 'phone']
      },
      Doctor: {
        type: 'object',
        properties: {
          first_name: { type: 'string' },
          last_name:  { type: 'string' },
          phone:      { type: 'string' },
          email:      { type: 'string' },
          crm:        { type: 'string' },
          clinic_id:  { type: 'string', format: 'uuid' }
        },
        required: ['first_name', 'last_name', 'phone', 'email', 'crm', 'clinic_id']
      },
      Appointment: {
        type: 'object',
        properties: {
          patient_id:   { type: 'string', format: 'uuid' },
          doctor_id:    { type: 'string', format: 'uuid' },
          clinic_id:    { type: 'string', format: 'uuid' },
          scheduled_at: { type: 'string', format: 'date-time' },
          notes:        { type: 'string' },
          status:       { type: 'string' }
        },
        required: ['patient_id', 'doctor_id', 'clinic_id', 'scheduled_at', 'status']
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

// Rota raiz
app.get('/', (req, res) => {
  res.send('API RepoWeb2 rodando! Veja /api/docs para documentação.');
});


app.use('/api', apiRouter);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
