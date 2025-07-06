const { Clinic } = require('../../models');

module.exports = {
  // Listar todas as clínicas
  async list(req, res) {
    try {
      const clinics = await Clinic.findAll({
        order: [['name', 'ASC']]
      });
      
      res.json(clinics);
    } catch (error) {
      console.error('Erro ao listar clínicas:', error);
      res.status(500).json({ error: 'Erro ao listar clínicas' });
    }
  },

  // Obter uma clínica por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const clinic = await Clinic.findByPk(id);
      
      if (!clinic) {
        return res.status(404).json({ error: 'Clínica não encontrada' });
      }
      
      res.json(clinic);
    } catch (error) {
      console.error('Erro ao buscar clínica:', error);
      res.status(500).json({ error: 'Erro ao buscar clínica' });
    }
  },

  // Criar uma nova clínica
  async create(req, res) {
    try {
      const { name, address, phone } = req.body;
      
      const clinic = await Clinic.create({
        name,
        address,
        phone
      });
      
      res.status(201).json(clinic);
    } catch (error) {
      console.error('Erro ao criar clínica:', error);
      res.status(400).json({ 
        error: 'Erro ao criar clínica',
        details: error.errors ? error.errors.map(e => e.message) : [error.message]
      });
    }
  },

  // Atualizar uma clínica
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, address, phone } = req.body;
      
      const clinic = await Clinic.findByPk(id);
      
      if (!clinic) {
        return res.status(404).json({ error: 'Clínica não encontrada' });
      }
      
      await clinic.update({
        name: name || clinic.name,
        address: address || clinic.address,
        phone: phone || clinic.phone
      });
      
      res.json(clinic);
    } catch (error) {
      console.error('Erro ao atualizar clínica:', error);
      res.status(400).json({ 
        error: 'Erro ao atualizar clínica',
        details: error.errors ? error.errors.map(e => e.message) : [error.message]
      });
    }
  },

  // Excluir uma clínica
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const clinic = await Clinic.findByPk(id);
      
      if (!clinic) {
        return res.status(404).json({ error: 'Clínica não encontrada' });
      }
      
      await clinic.destroy();
      
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir clínica:', error);
      res.status(500).json({ error: 'Erro ao excluir clínica' });
    }
  }
};
