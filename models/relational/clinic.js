module.exports = (sequelize, Sequelize) => {
  const Clinic = sequelize.define('clinic', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    phone: { type: Sequelize.STRING(20), allowNull: false }
  });
  return Clinic;
};
