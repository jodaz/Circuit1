const Model = require('../models/User');
const bcrypt = require('bcrypt');

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
  const {...data} = req.body.attributes;

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
