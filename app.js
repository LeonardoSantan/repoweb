// app.js
require('dotenv').config();

const express     = require('express');
const path        = require('path');
const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const htmlRoutes = require('./routers/route'); // deve ser um express.Router()
const apiRoutes  = require('./routers/api');   // deve ser um express.Router()

const db   = require('./config/db_sequelize');
const app  = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', htmlRoutes);

app.use('/api', apiRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`→ Servidor em: http://localhost:${PORT}`);
      console.log(`→ Swagger em:  http://localhost:${PORT}/api/docs`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar no banco:', err);
    process.exit(1);
  });

module.exports = app;
