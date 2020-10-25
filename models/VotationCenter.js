const mongoose = require('mongoose');

const VotationCenterSchema = new mongoose.Schema({
  name: String,
  responsible: String,
  municipality: String,
  parish: String,
  responsible_id: String,
  votes: { type: Number, default: 0}
},
{
  timestamps: true
});

VotationCenterSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('VotationCenter', VotationCenterSchema);