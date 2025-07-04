/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Gerenciamento de médicos
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Lista todos os médicos
 *     tags: [Doctors]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de médicos }
 *   post:
 *     summary: Cria um novo médico
 *     tags: [Doctors]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201: { description: Médico criado }
 */
/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Busca um médico por ID
 *     tags: [Doctors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Médico encontrado }
 *   put:
 *     summary: Atualiza um médico
 *     tags: [Doctors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200: { description: Médico atualizado }
 *   delete:
 *     summary: Remove um médico
 *     tags: [Doctors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Médico removido }
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controllerDoctorApi');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');

// Apenas admin pode criar, editar e deletar médicos
router.post('/', verifyToken, authorizeRole('admin'), controller.create);
router.put('/:id', verifyToken, authorizeRole('admin'), controller.update);
router.delete('/:id', verifyToken, authorizeRole('admin'), controller.delete);
// Todos autenticados podem listar e ver detalhes
router.get('/', verifyToken, controller.findAll);
router.get('/:id', verifyToken, controller.findById);

module.exports = router;
