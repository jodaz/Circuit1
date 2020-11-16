const Model = require('../models/VotationCenter');
const Person = require('../models/Person');
const User = require('../models/User');
const validator = require('../validation/votationCenters');
const isEmpty = require('is-empty');

const get = async (req, res) => {
  const { page, perPage } = req.query;

  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage - perPage;
  const total = await Model.count({});

  await Model.find()
    .populate('user')
    .limit(limit) 
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(models => {
      res.status(200)
        .json({ data: models, total: total });
    })
    .catch(err => res.status(400).json(err.message));
};

const show = async (req, res) => {
  const { id } = req.params;

  await Model.findOne({ '_id': id })
    .populate('user')
    .then(model => res.status(200).json(model))
    .catch(err => res.status(400).json(err.message));
}

const store = async (req, res) => {
  const data = req.body;
  
  let votationCenter = new Model(data);

  await votationCenter.save()
    .then(model => {
      User.findByIdAndUpdate(model.user, { votationCenter: model.id }, { new: true }) 
        .then(() => res.status(200).json(model));
    })
    .catch(err => res.status(400).json(err.message));
};

const vote = async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const { errors, isValid } = validator.vote(data);

  if (!isValid) return res.status(400).json({ data: errors });

  await Person.find({ 'personId': data.personId })
    .then(async (model) => {
      if (!isEmpty(model)) {
        return res.status(400).json({
          data: { 'personId': 'El votante se encuentra registrado.'  }
        });
      }

      const person = await Person.create(data);

      await Model.findByIdAndUpdate(id, {$inc: { 'votes': 1} }, {new: true})
        .then(model => {

          model.people.push(person);
          model.save();
          
          return res.status(200).json(model);
        }).catch(err => res.status(400).json(err.message));
    });
};

const update = async (req, res) => {
  const { id } = req.params;

  const data = {
    name,
    parish,
    user,
    municipality
  } = req.body;

  const { errors, isValid } = validator.update(data);

  if (!isValid) return res.status(400).json({ data: errors });

  const model = await Model.findOne({ '_id': id }).then(model => model);
  
  if (model.user) {
    // Remove votation center from user
    await User.findByIdAndUpdate(
      { '_id' : model.user }, 
      { votationCenter: null }, 
      { new: true },
      (err, doc) => doc
    );
  }

  await model.update(data, {new: true})
    .then(() => {
      // Update users collection
      User.findByIdAndUpdate(
        { '_id': data.user },
        { votationCenter: model.id },
        { new: true },
        (err, doc) => doc
      );

      return res.status(200).json(model);
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

module.exports = { update, show, get, store, vote, destroy };
