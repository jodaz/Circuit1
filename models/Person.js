const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  full_name: String,
  personId: String,
},
{
  timestamps: true
});

PersonSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { delete ret._id  }
});

module.exports = mongoose.model('Person', PersonSchema);
