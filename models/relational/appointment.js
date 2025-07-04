module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define('appointment', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    patient_id: { type: Sequelize.UUID, allowNull: false },
    doctor_id: { type: Sequelize.UUID, allowNull: false },
    clinic_id: { type: Sequelize.UUID, allowNull: false },
    scheduled_at: { type: Sequelize.DATE, allowNull: false },
    notes: { type: Sequelize.TEXT },
    status: { type: Sequelize.STRING(20), allowNull: false }
  });
  return Appointment;
};
