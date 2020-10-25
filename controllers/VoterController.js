const Model = require('../models/Person');

const get = (req, res) => {
  const { range } = req.query;

  let [min, max] = JSON.parse(range);

  Model.find()
    .skip(min+1)
    .limit(max+1)
    .sort({ createdAt: -1 })
    .then(models => {

      const contentRange = `voters ${range}/${models.length}`;
      
      res.status(200)
        .set('Content-Range', contentRange)
        .json(models);
    })
    .catch(err => res.status(400).json(err.message));
};

module.exports = { get };
