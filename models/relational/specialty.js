module.exports = (sequelize, Sequelize) => {
  const Specialty = sequelize.define('specialty', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    name: { type: Sequelize.STRING(100), allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false }
  });
  return Specialty;
};
