const Model = require('../models/User');
const bcrypt = require('bcrypt');

const get = async (req, res) => {
  const { page, perPage, role } = req.query;
  const query = {};

  if (role) {
    query.role = role;
  }

  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage - perPage;
  const total = await Model.count({});

  await Model.find(query)
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
  const { id } = req.query;

  await Model.findOne({ '_id': id})
    .then(model => res.json(model))
    .catch(err => res.status(400).json(err.message));
}

module.exports = { current, get, store, update, destroy };
