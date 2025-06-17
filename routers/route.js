const express = require('express');
const db = require('../config/db_sequelize');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerClinic = require('../controllers/controllerClinic');
const controllerDoctor = require('../controllers/controllerDoctor');
const route = express.Router();

// Middleware de proteção de rota
function isAuthenticated(req, res, next) {
  if (req.session && req.session.login) {
    return next();
  } else {
    res.redirect('/');
  }
}

// Login / Logout
route.get("/", controllerUsuario.getLogin);
route.get("/login", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout); // ADICIONADO

// Rotas protegidas - exigem autenticação

route.get("/home", isAuthenticated, (req, res) => {
  res.render('home');
});

// Usuário
route.get("/usuarioCreate", isAuthenticated, controllerUsuario.getCreate);
route.post("/usuarioCreate", isAuthenticated, controllerUsuario.postCreate);
route.get("/usuarioList", isAuthenticated, controllerUsuario.getList);

// Clínica
route.get("/clinicCreate", isAuthenticated, controllerClinic.getCreate);
route.post("/clinicCreate", isAuthenticated, controllerClinic.postCreate);
route.get("/clinicList", isAuthenticated, controllerClinic.getList);

// Médico
route.get("/doctorCreate", isAuthenticated, controllerDoctor.getCreate);
route.post("/doctorCreate", isAuthenticated, controllerDoctor.postCreate);
route.get("/doctorList", isAuthenticated, controllerDoctor.getList);

module.exports = route;
