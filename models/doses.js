const mongoose = require('mongoose');

const doseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  medicineName: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  taken: { type: Boolean, default: false },
  takenAt: { type: Date, default: null }
});

module.exports = mongoose.model('Dose', doseSchema);