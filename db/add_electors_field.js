const Model = require('../models/VotationCenter');
const db = require('../config/db');

db.start();

async function run() {
  await Model.update({}, { electors: 0 }, { multi: true }, (err, doc) => doc);

  db.close();
};

run();
