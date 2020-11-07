const mongoose = require('mongoose');
// Setting up
const { MONGO_URI, OPTIONS } = require('../config');

function start() {
  mongoose
    .connect(`${MONGO_URI}`, OPTIONS)
    .then(() => console.log(`MongoDB connected to ${MONGO_URI}`))
    .catch(error => console.log(error));
}

function close() {
  mongoose.connection.close();
  console.log("MongoDB connection closed");
}

module.exports = { start, close };

