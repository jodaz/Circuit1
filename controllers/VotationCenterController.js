const Model = require('../models/VotationCenter');
const Person = require('../models/Person');

const get = async (req, res) => {
  const { page, perPage } = req.query;

  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage - perPage;
  const total = await Model.count({});

  await Model.find()
    .limit(limit) 
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(models => {
      res.status(200)
        .json({ data: models, total: total });
    })
    .catch(err => res.status(400).json(err.message));
};

const store = async (req, res) => {
  const { ...data } = req.body;
  
  let votationCenter = new Model(data);

  await votationCenter.save()
    .then(model => res.status(200).json(model))
    .catch(err => res.status(400).json(err.message));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const person = await Person.create(data);

  await Model.findByIdAndUpdate(id, {$inc: { 'votes': 1} }, {new: true})
    .then(model => {

      model.people.push(person);
      model.save();
      
      return res.status(200).json(model)
    }).catch(err => res.status(400).json(err.message));
};

const destroy = async (req, res) => {
  const { id } = req.params;

  await Model.findOneAndDelete({ '_id': id})
    .then(() => res.status(200).json({
      message: '¡Elemento eliminado!'
    }))
    .catch(err => res.status(400).json(err.message));
};

module.exports = { get, store, update, destroy };
