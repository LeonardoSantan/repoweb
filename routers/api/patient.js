/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Gerenciamento de pacientes
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Paciente criado
 */
/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Busca um paciente por ID
 *     tags: [Patients]
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
 *         description: Paciente encontrado
 *   put:
 *     summary: Atualiza um paciente
 *     tags: [Patients]
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
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Paciente atualizado
 *   delete:
 *     summary: Remove um paciente
 *     tags: [Patients]
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
 *         description: Paciente removido
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controllerPatient');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');

// Apenas admin pode criar, editar e deletar pacientes
router.post('/', verifyToken, authorizeRole('admin'), controller.create);
router.put('/:id', verifyToken, authorizeRole('admin'), controller.update);
router.delete('/:id', verifyToken, authorizeRole('admin'), controller.delete);
// Todos autenticados podem listar e ver detalhes
router.get('/', verifyToken, controller.findAll);
router.get('/:id', verifyToken, controller.findById);

module.exports = router;

