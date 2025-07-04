/**
 * @swagger
 * tags:
 *   name: Specialties
 *   description: Gerenciamento de especialidades
 */

/**
 * @swagger
 * /specialties:
 *   get:
 *     summary: Lista todas as especialidades
 *     tags: [Specialties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *   post:
 *     summary: Cria uma nova especialidade
 *     tags: [Specialties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specialty'
 *     responses:
 *       201:
 *         description: Especialidade criada
 */
/**
 * @swagger
 * /specialties/{id}:
 *   get:
 *     summary: Busca uma especialidade por ID
 *     tags: [Specialties]
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
 *         description: Especialidade encontrada
 *   put:
 *     summary: Atualiza uma especialidade
 *     tags: [Specialties]
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
 *             $ref: '#/components/schemas/Specialty'
 *     responses:
 *       200:
 *         description: Especialidade atualizada
 *   delete:
 *     summary: Remove uma especialidade
 *     tags: [Specialties]
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
 *         description: Especialidade removida
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controllerSpecialty');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');

// Apenas admin pode criar, editar e deletar specialties
router.post('/', verifyToken, authorizeRole('admin'), controller.create);
router.put('/:id', verifyToken, authorizeRole('admin'), controller.update);
router.delete('/:id', verifyToken, authorizeRole('admin'), controller.delete);
// Todos autenticados podem listar e ver detalhes
router.get('/', verifyToken, controller.findAll);
router.get('/:id', verifyToken, controller.findById);

module.exports = router;
