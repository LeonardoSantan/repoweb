/**
 * @swagger
 * tags:
 *   name: Clinic
 *   description: CRUD de clínicas
 */
const express = require('express');
const db = require('../../config/db_sequelize');
const verify = require('../../middlewares/verifyToken');
const router = express.Router();

/**
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Lista todas as clínicas
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Array de clínicas
 */
router.get('/clinics', verify, async (req, res) => {
  const data = await db.Clinic.findAll();
  res.json(data);
});

/**
 * @swagger
 * /api/clinics/{id}:
 *   get:
 *     summary: Retorna clínica por ID
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Clínica encontrada }
 *       404: { description: Não encontrada }
 */
router.get('/clinics/:id', verify, async (req, res) => {
  const clinic = await db.Clinic.findByPk(req.params.id);
  if (!clinic) return res.status(404).json({ error: 'Não encontrada' });
  res.json(clinic);
});

/**
 * @swagger
 * /api/clinics:
 *   post:
 *     summary: Cria nova clínica
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClinicInput'
 *     responses:
 *       201: { description: Criada }
 */
router.post('/clinics', verify, async (req, res) => {
  const created = await db.Clinic.create(req.body);
  res.status(201).json(created);
});

/**
 * @swagger
 * /api/clinics/{id}:
 *   put:
 *     summary: Atualiza clínica
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ClinicInput' }
 *     responses:
 *       200: { description: Atualizada }
 */
router.put('/clinics/:id', verify, async (req, res) => {
  const ok = await db.Clinic.update(req.body, { where: { id: req.params.id } });
  if (!ok[0]) return res.status(404).json({ error: 'Não encontrada' });
  const updated = await db.Clinic.findByPk(req.params.id);
  res.json(updated);
});

/**
 * @swagger
 * /api/clinics/{id}:
 *   delete:
 *     summary: Remove clínica
 *     tags: [Clinic]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       204: { description: Removida }
 */
router.delete('/clinics/:id', verify, async (req, res) => {
  const rows = await db.Clinic.destroy({ where: { id: req.params.id } });
  if (!rows) return res.status(404).json({ error: 'Não encontrada' });
  res.status(204).send();
});

module.exports = router;
