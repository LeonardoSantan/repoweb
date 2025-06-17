const db = require('../config/db_sequelize');
module.exports = {
  async getCreate(req, res) {
    res.render('clinic/clinicCreate');
  },
  async postCreate(req, res) {
    db.Clinic.create(req.body)
      .then(() => res.redirect('/clinicList'))
      .catch(err => console.log(err));
  },
  async getList(req, res) {
    db.Clinic.findAll()
      .then(clinics => res.render('clinic/clinicList', { clinics: clinics.map(c => c.toJSON()) }))
      .catch(err => console.log(err));
  }
};
