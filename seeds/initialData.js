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
};
