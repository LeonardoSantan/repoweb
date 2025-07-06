/**
 * @swagger
 * tags:
 *   name: Clinic
 *   description: CRUD de clínicas
 */
const express = require('express');
const clinicController = require('../../controllers/api/clinicController');
const verifyToken = require('../../middlewares/verifyToken');
const authorizeRole = require('../../middlewares/authorizeRole');
const router = express.Router();

// Rotas públicas (não requerem autenticação)
router.get('/', clinicController.list);
router.get('/:id', clinicController.getById);

// Rotas protegidas (requerem autenticação e papel de admin)
router.post('/', verifyToken, authorizeRole('admin'), clinicController.create);
router.put('/:id', verifyToken, authorizeRole('admin'), clinicController.update);
router.delete('/:id', verifyToken, authorizeRole('admin'), clinicController.delete);

// Documentação Swagger
/**
 * @swagger
 * /clinics:
 *   get:
 *     summary: Lista todas as clínicas
 *     tags: [Clinic]
 *     responses:
 *       200:
 *         description: Lista de clínicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clinic'
 */

/**
 * @swagger
 * /clinics/{id}:
 *   get:
 *     summary: Retorna clínica por ID
 *     tags: [Clinic]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: 
 *         description: Clínica encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clinic'
 *       404: 
 *         description: Clínica não encontrada
 */

/**
 * @swagger
 * /clinics:
 *   post:
 *     summary: Cria nova clínica (apenas admin)
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClinicInput'
 *     responses:
 *       201: 
 *         description: Clínica criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clinic'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /clinics/{id}:
 *   put:
 *     summary: Atualiza clínica (apenas admin)
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ClinicInput' }
 *     responses:
 *       200: 
 *         description: Clínica atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clinic'
 *       404: 
 *         description: Clínica não encontrada
 */

/**
 * @swagger
 * /clinics/{id}:
 *   delete:
 *     summary: Remove clínica
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       204: { description: Removida }
 */


module.exports = router;
