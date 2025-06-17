module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define('doctor', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    first_name: { type: Sequelize.STRING(50), allowNull: false },
    last_name: { type: Sequelize.STRING(50), allowNull: false },
    phone: { type: Sequelize.STRING(20), allowNull: false },
    email: { type: Sequelize.STRING(100), allowNull: false },
    crm: { type: Sequelize.STRING(20), allowNull: false },
    clinic_id: { type: Sequelize.UUID, allowNull: false }
  });
  return Doctor;
};
