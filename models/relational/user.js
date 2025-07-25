const { DataTypes } = require('sequelize');
const db = require('../../config/db_sequelize');

const User = db.define('User', {
  id:       { type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true },
  name:     { type: DataTypes.STRING,   allowNull: false },
  email:    { type: DataTypes.STRING,   allowNull: false, unique: true },
  password: { type: DataTypes.STRING,   allowNull: false },
  role:     { type: DataTypes.STRING,   allowNull: false }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
