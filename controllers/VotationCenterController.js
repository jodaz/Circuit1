const Model = require('../models/VotationCenter');
const Person = require('../models/Person');

const get = async (req, res) => {
  const { page } = req.query;

  const limit = parseInt(page.size);
  const skip = page.size * page.number;

  await Model.find()
    .limit(limit) 
    .sort({ createdAt: -1 })
    .then(models => {
      const data = models.map(model => {
        const { id, ...rest } = model;

        return ({
          id: id,
          attributes: rest._doc
        });
      });

      res.status(200)
        .json({
          data: data
        });
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
