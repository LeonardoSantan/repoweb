const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Carregar todos os modelos relacionais e registrar associações em um único lugar.
// Isso garante que "sequelize.sync()" em app.js crie as FKs e relações corretas.

const User             = require('./relational/user'); // Já instancia usando o singleton de db_sequelize

const Patient          = require('./relational/patient')(sequelize, Sequelize);
const Doctor           = require('./relational/doctor')(sequelize, Sequelize);
const Clinic           = require('./relational/clinic')(sequelize, Sequelize);
const Specialty        = require('./relational/specialty')(sequelize, Sequelize);
const DoctorSpecialty  = require('./relational/doctorSpecialty')(sequelize, Sequelize);
const Appointment      = require('./relational/appointment')(sequelize, Sequelize);

// =====================
// Associations 1:N e N:N
// =====================

// 1:N  Clinic -> Doctor
Clinic.hasMany(Doctor,  { foreignKey: 'clinic_id' });
Doctor.belongsTo(Clinic, { foreignKey: 'clinic_id' });

// 1:N  Patient -> Appointment
Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

// 1:N  Doctor -> Appointment
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

// 1:N  Clinic -> Appointment
Clinic.hasMany(Appointment, { foreignKey: 'clinic_id' });
Appointment.belongsTo(Clinic, { foreignKey: 'clinic_id' });

// N:N Doctor <-> Specialty (pivot doctor_specialties)
Doctor.belongsToMany(Specialty, { through: DoctorSpecialty, foreignKey: 'doctor_id' });
Specialty.belongsToMany(Doctor, { through: DoctorSpecialty, foreignKey: 'specialty_id' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Patient,
  Doctor,
  Clinic,
  Specialty,
  Appointment,
  DoctorSpecialty,
};
