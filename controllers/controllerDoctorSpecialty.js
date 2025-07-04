const db = require('../config/db_sequelize');
const DoctorSpecialty = require('../models/relational/doctorSpecialty')(db, db.Sequelize);

module.exports = {
  async create(req, res) {
    try {
      const { doctor_id, specialty_id, since } = req.body;
      const doctorSpecialty = await DoctorSpecialty.create({ doctor_id, specialty_id, since });
      res.status(201).json(doctorSpecialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const doctorSpecialties = await DoctorSpecialty.findAll();
      res.json(doctorSpecialties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { doctor_id, specialty_id } = req.params;
      const doctorSpecialty = await DoctorSpecialty.findOne({ where: { doctor_id, specialty_id } });
      if (!doctorSpecialty) return res.status(404).json({ error: 'DoctorSpecialty not found' });
      res.json(doctorSpecialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { doctor_id, specialty_id } = req.params;
      const { since } = req.body;
      const doctorSpecialty = await DoctorSpecialty.findOne({ where: { doctor_id, specialty_id } });
      if (!doctorSpecialty) return res.status(404).json({ error: 'DoctorSpecialty not found' });
      await doctorSpecialty.update({ since });
      res.json(doctorSpecialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { doctor_id, specialty_id } = req.params;
      const doctorSpecialty = await DoctorSpecialty.findOne({ where: { doctor_id, specialty_id } });
      if (!doctorSpecialty) return res.status(404).json({ error: 'DoctorSpecialty not found' });
      await doctorSpecialty.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
