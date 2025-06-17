/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Emissão de token
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/db_sequelize');
const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'super_secreta_123';

/**
 * @swagger
 * /api/login:
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
 *               login: { type: string, example: admin }
 *               senha: { type: string, example: 1234 }
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
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;
  const usuario = await db.Usuario.findOne({ where: { login } });
  if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

  const ok = bcrypt.compareSync(senha, usuario.senha);
  if (!ok) return res.status(401).json({ error: 'Senha inválida' });

  const payload = { id: usuario.id, login: usuario.login, tipo: usuario.tipo };
  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
