const Prontuario = require('../models/prontuario');

module.exports = {
  async create(req, res) {
    try {
      const prontuario = await Prontuario.create(req.body);
      res.status(201).json(prontuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const prontuarios = await Prontuario.find();
      res.json(prontuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const prontuario = await Prontuario.findById(id);
      if (!prontuario) return res.status(404).json({ error: 'Prontuário não encontrado' });
      // Restrição: paciente só pode acessar seu próprio prontuário
      const user = req.user;
      if (user.tipo === 'patient' && prontuario.patientId !== user.id) {
        return res.status(403).json({ error: 'Acesso negado: você só pode acessar seu próprio prontuário.' });
      }
      res.json(prontuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const prontuario = await Prontuario.findByIdAndUpdate(id, req.body, { new: true });
      if (!prontuario) return res.status(404).json({ error: 'Prontuário não encontrado' });
      res.json(prontuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const prontuario = await Prontuario.findByIdAndDelete(id);
      if (!prontuario) return res.status(404).json({ error: 'Prontuário não encontrado' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
