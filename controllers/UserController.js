const Model = require('../models/User');
const bcrypt = require('bcrypt');
const useFilter = require('../utils/filter');

const get = async (req, res) => {
  const { page, perPage, filter, role, sort } = req.query;
  let query = {};

  if (role) {
    query.role = role;
    query.votationCenter = null;
  }

  if (filter) {
    query = {...query, ...useFilter(filter) };
  }

  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage - perPage;

  await Model.find(query)
    .populate('VotationCenter')
    .limit(limit) 
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (models) => {
      const total = await models.length;

      res.status(200).json({ data: models, total: total });
    })
    .catch(err => res.status(400).json(err.message));
}

const show = async (req, res) => {
  const { id } = req.query;

  await Model.findOne(id)
    .populate('user')
    .then(model => res.status(200).json(model))
    .catch(err => res.status(400).json(err.message));
};

const store = async (req, res) => {
  const data = req.body;

  const hash = await bcrypt.hash(data.password, 10);
  const user = new Model({
    ...data,
    password: hash
  });

  await user.save()
    .then(model => res.status(200).json({ success: 'true', message: 'Usuario creado' }))
    .catch(err => res.status(400).json(err.message));
};

const update = async (req, res) => {
  //  
};

const destroy = async (req, res) => {
  const { id } = req.params;

  await Model.findOneAndDelete({ '_id': id})
    .then(() => res.status(200).json({
      message: '¡Elemento eliminado!'
    }))
    .catch(err => res.status(400).json(err.message));
};

const current = async (req, res) => {
  const { id } = req.body;

  await Model.findOne({ '_id': id})
    .populate('votationCenter')
    .then(model => res.json(model))
    .catch(err => res.status(400).json(err.message));
}

module.exports = { show, current, get, store, update, destroy };
