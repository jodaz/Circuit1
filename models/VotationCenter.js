const mongoose = require('mongoose');

const VotationCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  municipality: { type: String, required: true },
  parish: { type: String, required: true },
  electors: { type: Number, required: true },
  votes: {type: mongoose.Schema.Types.Number, default: 0 },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dispatches: []
},
{
  timestamps: true
});

VotationCenterSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { 
    delete ret._id
  }
});

module.exports = mongoose.model('VotationCenter', VotationCenterSchema);
