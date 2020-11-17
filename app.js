const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
const passport = require('passport');
const db = require('./config/db');

// Setting up
const { APP_PORT } = require('./config');
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Expose-Headers', 'Content-Range')
  next();
});

// Start DB cluster 
db.start();

// Routing
require('./routes')(app);

if (APP_ENV = 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
} 

app.listen(APP_PORT, () => {
  console.log(`Listening on http://127.0.0.1:${APP_PORT}`);
});
