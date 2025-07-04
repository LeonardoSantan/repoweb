module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('patient', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    first_name: { type: Sequelize.STRING(50), allowNull: false },
    last_name: { type: Sequelize.STRING(50), allowNull: false },
    phone: { type: Sequelize.STRING(20), allowNull: false },
    email: { type: Sequelize.STRING(100), allowNull: false },
    address: { type: Sequelize.STRING(200), allowNull: false },
    date_of_birth: { type: Sequelize.DATEONLY, allowNull: false }
  });
  return Patient;
};
