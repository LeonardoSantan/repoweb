const mongoose = require('mongoose');

const ProntuarioSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  allergies: [String],
  medications: [{
    name: String,
    doseMg: Number,
    frequency: String
  }],
  conditions: [String],
  visits: [{
    appointmentId: String,
    diagnosis: String,
    prescriptions: [String],
    labs: [String]
  }],
  attachments: [{
    fileName: String,
    url: String
  }]
});

module.exports = mongoose.model('Prontuario', ProntuarioSchema);
