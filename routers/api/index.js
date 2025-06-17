const express      = require('express');
const authRouter   = require('./auth');
const clinicRouter = require('./clinic');

const router = express.Router();

router.use('/login', authRouter);

router.use('/clinics', clinicRouter);

module.exports = router;
