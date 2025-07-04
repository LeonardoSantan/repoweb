const express      = require('express');
const authRouter   = require('./auth');
const clinicRouter = require('./clinic');
const patientRouter = require('./patient');
const appointmentRouter = require('./appointment');
const specialtyRouter = require('./specialty');
const doctorRouter = require('./doctor');
const doctorSpecialtyRouter = require('./doctorSpecialty');
const prontuarioRouter = require('./prontuario');

const router = express.Router();

router.use('/login', authRouter);
router.use('/clinics', clinicRouter);
router.use('/patients', patientRouter);
router.use('/appointments', appointmentRouter);
router.use('/specialties', specialtyRouter);
router.use('/doctors', doctorRouter);
router.use('/doctor-specialties', doctorSpecialtyRouter);
router.use('/prontuarios', prontuarioRouter);

module.exports = router;
