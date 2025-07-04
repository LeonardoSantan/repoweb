const { v4: uuidv4 } = require('uuid');
const { Appointment } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { patient_id, doctor_id, clinic_id, scheduled_at, notes, status } = req.body;
      const appointment = await Appointment.create({
        id: uuidv4(),
        patient_id,
        doctor_id,
        clinic_id,
        scheduled_at,
        notes,
        status
      });
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const appointments = await Appointment.findAll();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);
      if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { patient_id, doctor_id, clinic_id, scheduled_at, notes, status } = req.body;
      const appointment = await Appointment.findByPk(id);
      if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
      await appointment.update({ patient_id, doctor_id, clinic_id, scheduled_at, notes, status });
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);
      if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
      await appointment.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
