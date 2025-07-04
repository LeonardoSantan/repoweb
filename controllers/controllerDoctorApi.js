const { v4: uuidv4 } = require('uuid');
const { Doctor, Clinic } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const {
        first_name,
        last_name,
        phone,
        email,
        crm,
        clinic_id
      } = req.body;

      // opcional: validar existência da clínica
      const clinic = await Clinic.findByPk(clinic_id);
      if (!clinic) return res.status(400).json({ error: 'Clinic not found' });

      const doctor = await Doctor.create({
        id: uuidv4(),
        first_name,
        last_name,
        phone,
        email,
        crm,
        clinic_id
      });
      res.status(201).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const doctors = await Doctor.findAll({ include: Clinic });
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id, { include: Clinic });
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      const {
        first_name,
        last_name,
        phone,
        email,
        crm,
        clinic_id
      } = req.body;
      await doctor.update({ first_name, last_name, phone, email, crm, clinic_id });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      await doctor.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
