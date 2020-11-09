const mongoose = require('mongoose');

const VotationCenterSchema = new mongoose.Schema({
  name: String,
  municipality: String,
  parish: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  votes: { type: Number, default: 0},
  people: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}]
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
