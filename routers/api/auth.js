/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Emissão de token
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários (login)
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/relational/user');
const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'super_secreta_123';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica usuário e retorna JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: JWT retornado com sucesso
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica usuário e retorna JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [login, senha]
 *             properties:
 *               
 *               
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string }
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await User.findOne({ where: { email } });
  if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

  const ok = bcrypt.compareSync(password, usuario.password);
  if (!ok) return res.status(401).json({ error: 'Senha inválida' });

  const payload = { id: usuario.id, login: usuario.login, tipo: usuario.tipo };
  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
