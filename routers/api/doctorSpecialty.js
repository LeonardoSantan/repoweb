/**
 * @swagger
 * tags:
 *   name: DoctorSpecialties
 *   description: Associação entre médicos e especialidades
 */

/**
 * @swagger
 * /doctor-specialties:
 *   get:
 *     summary: Lista todas as relações médico-especialidade
 *     tags: [DoctorSpecialties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de relações
 *   post:
 *     summary: Cria uma nova relação médico-especialidade
 *     tags: [DoctorSpecialties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor_id:
 *                 type: integer
 *               specialty_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Relação criada
 */

/**
 * @swagger
 * /doctor-specialties/{doctor_id}/{specialty_id}:
 *   get:
 *     summary: Busca relação por médico e especialidade
 *     tags: [DoctorSpecialties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: specialty_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relação encontrada
 *   put:
 *     summary: Atualiza relação
 *     tags: [DoctorSpecialties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: specialty_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               novo_specialty_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Relação atualizada
 *   delete:
 *     summary: Remove relação
 *     tags: [DoctorSpecialties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: specialty_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Relação removida
 */

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controllerDoctorSpecialty');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');

// Apenas admin pode criar, editar e deletar relações doctor-specialty
router.post('/', verifyToken, authorizeRole('admin'), controller.create);
router.put('/:doctor_id/:specialty_id', verifyToken, authorizeRole('admin'), controller.update);
router.delete('/:doctor_id/:specialty_id', verifyToken, authorizeRole('admin'), controller.delete);
// Todos autenticados podem listar e ver detalhes
router.get('/', verifyToken, controller.findAll);
router.get('/:doctor_id/:specialty_id', verifyToken, controller.findById);

module.exports = router;
