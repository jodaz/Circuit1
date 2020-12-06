const Model = require('../models/VotationCenter');
const User = require('../models/User');
const validator = require('../validation/votationCenters');
const useFilter = require('../utils/filter');
const bcrypt = require('bcrypt');

const get = async (req, res) => {
  const { page, perPage, filter } = req.query;

  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage - perPage;
  const total = await Model.count(useFilter(filter));

  await Model.find(useFilter(filter))
    .populate('user')
    .limit(limit) 
    .skip(skip)
    .sort({ "votes": -1 })
    .then(async (models) => {
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
  const { login, full_name, password, ...rest } = req.body;

  const hash = await bcrypt.hash(password, 10);
  let user = await User.create({
    'full_name': full_name,
    'login': login.toLowerCase(),
    'role': 'USER',
    'password': hash
  });
  
  let votationCenter = new Model({
    ...rest,
    user: user.id
  });

  await votationCenter.save()
    .then(async (model) => {
      await user.update({ votationCenter: model.id }, { new: true });

      return res.json(model);
    })
    .catch(err => res.status(400).json(err.message));
};

const vote = (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const { errors, isValid } = validator.vote(data);

  if (!isValid) return res.status(400).json({ data: errors });

  Model.findOne({ '_id': id }).then(async (model) => {
    let votes = (model.dispatches.length) ? model.votes : 0;

    const newDispatch = {
      'votes': data.votes - votes,
      'sent_at': new Date()
    };

    model.votes = data.votes;
    model.dispatches.push(newDispatch);
    await model.save();

    return res.status(200).json(model);
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
