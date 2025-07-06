const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = async function seed() {
  // Admin default
  const adminEmail = 'admin@admin.com';
  const exists = await User.findOne({ where: { email: adminEmail } });
  if (!exists) {
    const hash = bcrypt.hashSync('admin123', 10);
    await User.create({ name: 'Admin User', email: adminEmail, password: hash, role: 'admin' });
    console.log('Usuário admin criado (email: admin@admin.com / senha: admin123)');
  }
  // Default regular user
  const userEmail = 'user@user.com';
  const existsUser = await User.findOne({ where: { email: userEmail } });
  if (!existsUser) {
    const hashUser = bcrypt.hashSync('user123', 10);
    await User.create({ name: 'Default User', email: userEmail, password: hashUser, role: 'patient' });
    console.log('Usuário padrão criado (email: user@user.com / senha: user123)');
  }
};
