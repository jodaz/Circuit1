const Model = require('../models/VotationCenter');

const get = (req, res) => {
  Model.find()
    .then(models => {
      
      res.status(200)
      .set('Content-Range', models.length)
      .json(models)
    })
    .catch(err => res.status(400).json(err.message));
};

const store = (req, res) => {
  const { ...data } = req.body;
  
  let votationCenter = new Model(data);

  votationCenter.save()
    .then(model => res.status(200).json(model))
    .catch(err => res.status(400).json(err.message));
};

const update = (req, res) => {
  const { id } = req.params;

  Model.findByIdAndUpdate(id, {$inc: { 'votes': 1} }, {new: true})
    .then(model => res.status(200).json(model))
    .catch(err => res.status(400).json(err.message));
};

// const destroy = (req, res) => {  };

module.exports = { get, store, update };