const { Doctor, Clinic, Specialty } = require('../../models');

module.exports = {
  // Listar todos os médicos
  async list(req, res) {
    try {
      const doctors = await Doctor.findAll({
        include: [
          { model: Clinic, as: 'clinic' },
          { model: Specialty, as: 'specialties' }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      res.json(doctors);
    } catch (error) {
      console.error('Erro ao listar médicos:', error);
      res.status(500).json({ error: 'Erro ao listar médicos' });
    }
  },

  // Obter um médico por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id, {
        include: [
          { model: Clinic, as: 'clinic' },
          { model: Specialty, as: 'specialties' }
        ]
      });
      
      if (!doctor) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      
      res.json(doctor);
    } catch (error) {
      console.error('Erro ao buscar médico:', error);
      res.status(500).json({ error: 'Erro ao buscar médico' });
    }
  },

  // Criar um novo médico
  async create(req, res) {
    try {
      const { specialties, ...doctorData } = req.body;
      
      const doctor = await Doctor.create(doctorData);
      
      // Adiciona especialidades se fornecidas
      if (specialties && specialties.length > 0) {
        await doctor.setSpecialties(specialties);
      }
      
      // Recarrega o médico com os relacionamentos
      const createdDoctor = await Doctor.findByPk(doctor.id, {
        include: [
          { model: Clinic, as: 'clinic' },
          { model: Specialty, as: 'specialties' }
        ]
      });
      
      res.status(201).json(createdDoctor);
    } catch (error) {
      console.error('Erro ao criar médico:', error);
      res.status(400).json({ 
        error: 'Erro ao criar médico',
        details: error.errors ? error.errors.map(e => e.message) : [error.message]
      });
    }
  },

  // Atualizar um médico
  async update(req, res) {
    try {
      const { id } = req.params;
      const { specialties, ...doctorData } = req.body;
      
      const doctor = await Doctor.findByPk(id);
      
      if (!doctor) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      
      await doctor.update(doctorData);
      
      // Atualiza especialidades se fornecidas
      if (specialties) {
        await doctor.setSpecialties(specialties);
      }
      
      // Recarrega o médico com os relacionamentos
      const updatedDoctor = await Doctor.findByPk(id, {
        include: [
          { model: Clinic, as: 'clinic' },
          { model: Specialty, as: 'specialties' }
        ]
      });
      
      res.json(updatedDoctor);
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
      res.status(400).json({ 
        error: 'Erro ao atualizar médico',
        details: error.errors ? error.errors.map(e => e.message) : [error.message]
      });
    }
  },

  // Excluir um médico
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const doctor = await Doctor.findByPk(id);
      
      if (!doctor) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      
      await doctor.destroy();
      
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir médico:', error);
      res.status(500).json({ error: 'Erro ao excluir médico' });
    }
  }
};
