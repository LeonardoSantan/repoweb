const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/relational/user');
const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'super_secreta_123';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação de usuários (login)
 *   - name: User
 *     description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica usuário e retorna JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                 id:
 *                   type: integer
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

    const ok = bcrypt.compareSync(password, usuario.password);
    if (!ok) return res.status(401).json({ error: 'Senha inválida' });

    const payload = { id: usuario.id, email: usuario.email, role: usuario.role };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    res.json({ token, role: usuario.role, id: usuario.id });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, password, role]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Leonardo"
 *               email:
 *                 type: string
 *                 example: "leonardo@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 nome: { type: string }
 *                 email: { type: string }
 *                 role: { type: string }
 *       400:
 *         description: Erro ao criar usuário
 */
router.post('/', async (req, res) => {
  const { nome, email, password, role } = req.body;
  if (!nome || !email || !password || !role) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, password, role' });
  }
  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ nome, email, password: hash, role });
    res.status(201).json({ id: user.id, nome: user.nome, email: user.email, role: user.role });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
  }
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna informações do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 */
router.get('/me', verifyToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'Você está autenticado!'
  });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', verifyToken, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', verifyToken, async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string }
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', verifyToken, async (req, res) => {
  const { nome, email, password, role } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  if (nome) user.nome = nome;
  if (email) user.email = email;
  if (password) user.password = bcrypt.hashSync(password, 10);
  if (role) user.role = role;

  await user.save();
  res.json({ id: user.id, nome: user.nome, email: user.email, role: user.role });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', verifyToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  await user.destroy();
  res.status(204).send();
});

module.exports = router;
