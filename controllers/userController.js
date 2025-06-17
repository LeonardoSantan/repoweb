const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const sequelize = require('../config/db_sequelize');
const Sequelize = require('sequelize');

const Usuario = require('../models/relational/usuario')(sequelize, Sequelize);

// Segredo para assinatura dos tokens
const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

sequelize.sync();

exports.index = async (req, res) => {
  const users = await Usuario.findAll();
  res.json(users);
};

exports.show = async (req, res) => {
  const user = await Usuario.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
};

exports.store = async (req, res) => {
  const { nome, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await Usuario.create({ nome, email, password: hash });
  res.status(201).json(user);
};

exports.update = async (req, res) => {
  const user = await Usuario.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  const updates = { nome: req.body.nome, email: req.body.email };
  if (req.body.password) {
    updates.password = await bcrypt.hash(req.body.password, 10);
  }
  await user.update(updates);
  res.json(user);
};

exports.destroy = async (req, res) => {
  const user = await Usuario.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  await user.destroy();
  res.status(204).end();
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Usuario.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};
