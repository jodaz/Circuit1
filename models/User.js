const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  votationCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'VotationCenter'},
},
{
  timestamps: true
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { 
    delete ret._id
    delete ret.password
  }
});

module.exports = mongoose.model('User', UserSchema);
