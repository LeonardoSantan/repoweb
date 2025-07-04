module.exports = (sequelize, Sequelize) => {
  const DoctorSpecialty = sequelize.define('doctor_specialty', {
    doctor_id: { type: Sequelize.UUID, primaryKey: true },
    specialty_id: { type: Sequelize.UUID, primaryKey: true },
    since: { type: Sequelize.DATE, allowNull: false }
  }, {
    timestamps: false
  });
  return DoctorSpecialty;
};
