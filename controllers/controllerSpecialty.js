const { v4: uuidv4 } = require('uuid');
const { Specialty } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const specialty = await Specialty.create({
        id: uuidv4(),
        name,
        description
      });
      res.status(201).json(specialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const specialties = await Specialty.findAll();
      res.json(specialties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const specialty = await Specialty.findByPk(id);
      if (!specialty) return res.status(404).json({ error: 'Specialty not found' });
      res.json(specialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const specialty = await Specialty.findByPk(id);
      if (!specialty) return res.status(404).json({ error: 'Specialty not found' });
      await specialty.update({ name, description });
      res.json(specialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const specialty = await Specialty.findByPk(id);
      if (!specialty) return res.status(404).json({ error: 'Specialty not found' });
      await specialty.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
