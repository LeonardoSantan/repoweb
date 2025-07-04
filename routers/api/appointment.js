/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Gerenciamento de agendamentos
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Agendamento criado
 */
/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Busca um agendamento por ID
 *     tags: [Appointments]
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
 *         description: Agendamento encontrado
 *   put:
 *     summary: Atualiza um agendamento
 *     tags: [Appointments]
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
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Agendamento atualizado
 *   delete:
 *     summary: Remove um agendamento
 *     tags: [Appointments]
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
 *         description: Agendamento removido
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controllerAppointment');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');

// Apenas admin e doctor podem criar, editar e deletar appointments
router.post('/', verifyToken, authorizeRole('admin', 'doctor'), controller.create);
router.put('/:id', verifyToken, authorizeRole('admin', 'doctor'), controller.update);
router.delete('/:id', verifyToken, authorizeRole('admin', 'doctor'), controller.delete);
// Todos autenticados podem listar e ver detalhes
router.get('/', verifyToken, controller.findAll);
router.get('/:id', verifyToken, controller.findById);

module.exports = router;
