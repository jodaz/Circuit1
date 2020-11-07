const Model = require('../models/User');
const bcrypt = require('bcrypt');

const get = async (req, res) => {
  const { page } = req.query;

  const limit = parseInt(page.size);
  const skip = page.size * page.number; 

  await Model.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .then(models => {

      const contentRange = `users ${range}/${models.length}`;
      
      res.status(200)
        .set('Content-Range', contentRange)
        .json(models);
    })
    .catch(err => res.status(400).json(err.message));
};

const store = async (req, res) => {
  const {...data} = req.body;

  const hash = await bcrypt.hash(data.password, 10);
  const user = new Model({
    ...data,
    password: hash
  });

  await user.save()
    .then(model => res.status(200).json(model))
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
