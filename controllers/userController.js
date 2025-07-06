const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db_sequelize');
const Sequelize = require('sequelize');

const Usuario = require('../models/relational/usuario')(sequelize, Sequelize);

// Dados mockados para teste
let users = [
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
let nextId = 2;


exports.index = async (req, res) => {
  try {
    // Retorna todos os usuários sem a senha
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

exports.show = async (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

exports.store = async (req, res) => {
  try {
    const { nome, email, password, role = 'patient' } = req.body;
    
    // Validação simples
    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }
    
    // Verifica se o email já existe
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ message: 'Este email já está em uso' });
    }
    
    // Cria o novo usuário
    const newUser = {
      id: nextId++,
      nome,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.push(newUser);
    
    // Remove a senha antes de retornar
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    const { nome, email, password, role } = req.body;
    
    // Verifica se o email já está em uso por outro usuário
    if (email && email !== users[userIndex].email) {
      if (users.some(u => u.email === email)) {
        return res.status(400).json({ message: 'Este email já está em uso' });
      }
    }
    
    // Atualiza os dados do usuário
    users[userIndex] = {
      ...users[userIndex],
      nome: nome || users[userIndex].nome,
      email: email || users[userIndex].email,
      password: password ? bcrypt.hashSync(password, 10) : users[userIndex].password,
      role: role || users[userIndex].role,
      updatedAt: new Date()
    };
    
    // Remove a senha antes de retornar
    const { password: _, ...userWithoutPassword } = users[userIndex];
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

exports.destroy = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Remove o usuário do array
    users.splice(userIndex, 1);
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ message: 'Erro ao remover usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação simples
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }
    
    // Encontra o usuário pelo email
    console.log('Procurando usuário com email:', email);
    console.log('Usuários disponíveis:', users);
    
    const user = users.find(u => u.email === email);
    console.log('Usuário encontrado:', user);
    
    // Verifica se o usuário existe e a senha está correta
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log('Senha válida?', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Senha inválida');
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
    
    console.log('Criando token JWT para o usuário:', {
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    // Cria um token JWT simples
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'segredo-super-seguro',
      { expiresIn: '8h' }
    );
    
    console.log('Token gerado:', token);
    
    // Remove a senha antes de retornar
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword,
      expiresIn: 8 * 60 * 60 // 8 horas em segundos
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
};
