const { v4: uuidv4 } = require('uuid');
const { Patient } = require('../models');

module.exports = {
  async create(req, res) {
    console.log('Dados recebidos no corpo da requisição:', req.body);
    try {
      const { first_name, last_name, phone, email, address, date_of_birth } = req.body;
      
      // Validação dos campos obrigatórios
      if (!first_name || !last_name || !phone || !email || !address || !date_of_birth) {
        console.log('Campos obrigatórios faltando:', { 
          first_name: !!first_name, 
          last_name: !!last_name, 
          phone: !!phone, 
          email: !!email, 
          address: !!address, 
          date_of_birth: !!date_of_birth 
        });
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      
      console.log('Tentando criar paciente com os dados:', { 
        first_name, 
        last_name, 
        phone, 
        email, 
        address, 
        date_of_birth 
      });
      
      const patient = await Patient.create({
        id: uuidv4(),
        first_name,
        last_name,
        phone,
        email,
        address,
        date_of_birth
      });
      
      console.log('Paciente criado com sucesso:', patient);
      res.status(201).json(patient);
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      res.status(500).json({ 
        error: 'Erro ao criar paciente',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
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
