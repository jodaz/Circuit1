const Model = require('../models/Person');

const get = async (req, res) =>{ 
  const { page, perPage, filter } = req.query;

  const query = {};
  const limit = parseInt(perPage);
  const skip = (page == 1) ? 0 : page * perPage - perPage;

  if (filter) {
    query.personId = { 
      $regex: `.*${filter.personId}.*`
    }; 
  }

  await Model.find(query)
    .limit(limit) 
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (models) => {
      const total = await models.length;

      res.status(200)
        .json({ data: models, total: total });
    })
    .catch(err => res.status(400).json(err.message));
};

module.exports = { get };
