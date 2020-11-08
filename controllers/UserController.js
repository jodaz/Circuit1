const Model = require('../models/User');
const bcrypt = require('bcrypt');

const get = async (req, res) => {
  const { page, perPage } = req.query;

  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage;

  await Model.find()
    .limit(limit) 
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(models => {
      res.status(200)
        .json({ data: models });
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

module.exports = { get, store, update, destroy };
