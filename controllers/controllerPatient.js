const { v4: uuidv4 } = require('uuid');
const { Patient } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { first_name, last_name, phone, email, address, date_of_birth } = req.body;
      const patient = await Patient.create({
        id: uuidv4(),
        first_name,
        last_name,
        phone,
        email,
        address,
        date_of_birth
      });
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const patients = await Patient.findAll();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { first_name, last_name, phone, email, address, date_of_birth } = req.body;
      const patient = await Patient.findByPk(id);
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      await patient.update({ first_name, last_name, phone, email, address, date_of_birth });
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      await patient.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
