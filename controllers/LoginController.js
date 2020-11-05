const Model = require('../models/User');
const isEmpty = require('../utils/isEmpty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const login = async (req, res) => {
  const { login, password } = req.body;

  await Model.findOne({ 'login': login })
    .then(model => {
      if (isEmpty(model)) {
        return res.status(401)
          .json({
            'password': 'Credenciales inválidas'
          });
      }
      bcrypt.compare(password, model.password)
        .then(match => {
          if (match) {
            const payload = { id: model.id };

            jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;

              res.json({ success: true, token: `Bearer ${token}`, user: model });
            });
          } else {
            errors.password = 'Incorrect password';
            return res.status(400).json({
              'message': '¡Esta cédula no está registrada!'
            });
          }
        })
        .catch(err => console.log(err));
    });
};

module.exports = { login };
