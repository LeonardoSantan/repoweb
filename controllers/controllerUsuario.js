const db = require('../config/db_sequelize');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },

    async postLogin(req, res) {
        try {
            const usuario = await db.Usuario.findOne({ where: { login: req.body.login } });
            if (usuario && bcrypt.compareSync(req.body.senha, usuario.senha)) {
                // ✅ Cria sessão
                req.session.login = req.body.login;
                res.render('home');
            } else {
                res.redirect('/');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro no login');
        }
    },

    async getLogout(req, res) {
        req.session.destroy(); // ✅ Encerra a sessão
        res.redirect('/');
    },

    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },

    async postCreate(req, res) {
        const existing = await db.Usuario.findOne({ where: { login: req.body.login } });
        if (existing) {
            return res.send("Este login já está criado!");
        }

        const senhaHash = bcrypt.hashSync(req.body.senha, 10);

        await db.Usuario.create({
            login: req.body.login,
            senha: senhaHash,
            tipo: req.body.tipo
        });

        res.redirect('/home');
    },

    async getList(req, res) {
        try {
            const usuarios = await db.Usuario.findAll();
            res.render('usuario/usuarioList', {
                usuarios: usuarios.map(user => user.toJSON())
            });
        } catch (err) {
            console.log(err);
        }
    },

    async getUpdate(req, res) {
        try {
            const usuario = await db.Usuario.findByPk(req.params.id);
            res.render('usuario/usuarioUpdate', { usuario: usuario.dataValues });
        } catch (err) {
            console.log(err);
        }
    },

    async postUpdate(req, res) {
        try {
            let updateData = { ...req.body };
            // Se vier senha nova, aplica hash
            if (req.body.senha && req.body.senha.trim() !== '') {
                updateData.senha = bcrypt.hashSync(req.body.senha, 10);
            } else {
                // Remove senha se veio vazia para não sobrescrever
                delete updateData.senha;
            }
            await db.Usuario.update(updateData, { where: { id: req.body.id } });
            res.render('home');
        } catch (err) {
            console.log(err);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Usuario.destroy({ where: { id: req.params.id } });
            res.render('home');
        } catch (err) {
            console.log(err);
        }
    }
}
