/**
 * @swagger
 * tags:
 *   name: Prontuarios
 *   description: Gerenciamento de prontuários médicos (NoSQL)
 */

/**
 * @swagger
 * /prontuarios:
 *   get:
 *     summary: Lista todos os prontuários
 *     tags: [Prontuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prontuários
 *   post:
 *     summary: Cria um novo prontuário
 *     tags: [Prontuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prontuario'
 *     responses:
 *       201:
 *         description: Prontuário criado
 */
/**
 * @swagger
 * /prontuarios/{id}:
 *   get:
 *     summary: Busca um prontuário por ID
 *     tags: [Prontuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prontuário encontrado
 *   put:
 *     summary: Atualiza um prontuário
 *     tags: [Prontuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prontuario'
 *     responses:
 *       200:
 *         description: Prontuário atualizado
 *   delete:
 *     summary: Remove um prontuário
 *     tags: [Prontuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Prontuário removido
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controllerProntuario');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');

// Apenas admin e doctor podem criar, editar e deletar prontuários
router.post('/', verifyToken, authorizeRole('admin', 'doctor'), controller.create);
router.put('/:id', verifyToken, authorizeRole('admin', 'doctor'), controller.update);
router.delete('/:id', verifyToken, authorizeRole('admin', 'doctor'), controller.delete);
// Todos autenticados podem listar
router.get('/', verifyToken, controller.findAll);
// Paciente só pode ver o próprio prontuário (implementar filtro no controller futuramente)
router.get('/:id', verifyToken, controller.findById);

module.exports = router;
