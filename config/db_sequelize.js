const Sequelize = require('sequelize');
const sequelize = new Sequelize('web2_db', 'postgres', '1234', { host: 'localhost', dialect: 'postgres' });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.Clinic = require('../models/relational/clinic.js')(sequelize, Sequelize);
db.Doctor = require('../models/relational/doctor.js')(sequelize, Sequelize);

db.Clinic.hasMany(db.Doctor, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
db.Doctor.belongsTo(db.Clinic, { foreignKey: 'clinic_id' });

module.exports = db;
