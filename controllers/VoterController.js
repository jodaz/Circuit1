const Model = require('../models/Person');

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

module.exports = { get };
