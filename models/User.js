const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: String,
  login: String,
  password: String,
  role: String
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
