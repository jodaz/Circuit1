const Model = require('../models/VotationCenter');

const login = (req, res) => {
  Model.findOne(req.body)
    .then(model => {
      
      res.status(200)
        .json(model)
    })
    .catch(err => res.status(400).json({
      'message': '¡Esta cédula no está registrada!'
    }));
};

// const destroy = (req, res) => {  };

module.exports = { login };