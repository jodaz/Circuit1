const Model = require('../models/VotationCenter');
const isEmpty = require('../utils/isEmpty');

const login = (req, res) => {

  Model.findOne({ 'responsible_id': req.body.responsible_id })
    .then(model => {

      if (isEmpty(model)) {
        return res.status(401)
          .json({
            'password': 'Credenciales inválidas'
          });
      }

      res.status(200)
        .json(model)
    })
    .catch(err => err.res.status(400).json({
      'message': '¡Esta cédula no está registrada!'
    }));
};

module.exports = { login };