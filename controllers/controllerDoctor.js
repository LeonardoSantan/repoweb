const db = require('../config/db_sequelize');
module.exports = {
  async getCreate(req, res) {
    // Busca clínicas para select
    const clinics = await db.Clinic.findAll();
    res.render('doctor/doctorCreate', { clinics: clinics.map(c => c.toJSON()) });
  },
  async postCreate(req, res) {
    db.Doctor.create(req.body)
      .then(() => res.redirect('/doctorList'))
      .catch(err => console.log(err));
  },
  async getList(req, res) {
    db.Doctor.findAll({ include: db.Clinic })
      .then(doctors => res.render('doctor/doctorList', { doctors: doctors.map(d => d.toJSON()) }))
      .catch(err => console.log(err));
  }
};
