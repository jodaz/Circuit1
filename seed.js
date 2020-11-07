const Model = require('./models/User');
const bcrypt = require('bcrypt');
const { ADMIN } = require('./config');
const db = require('./config/db');

db.start();

async function seedDB() {
  const hash = await bcrypt.hash(ADMIN.password, 10);

  const user = new Model({
    full_name: ADMIN.full_name, 
    login: ADMIN.login, 
    password: hash,
    role: 'ADMIN'
  });

  await user.save()
    .then(() => console.log("Admin user created"));

  db.close();
} 

seedDB();
