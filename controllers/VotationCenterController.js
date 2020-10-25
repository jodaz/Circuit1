const Model = require('../models/VotationCenter');

const get = (req, res) => {
  const { range } = req.query;

  let [min, max] = JSON.parse(range);

  Model.find()
    .skip(min+1)
    .limit(max+1)
    .sort({ createdAt: -1 })
    .then(models => {

      const contentRange = `votation centers ${range}/${models.length}`;
      
      res.status(200)
        .set('Content-Range', contentRange)
        .json(models);
    })
    .catch(err => res.status(400).json(err.message));
};

const store = (req, res) => {
  const { ...data } = req.body;
  
  let votationCenter = new Model(data);

  votationCenter.save()
    .then(model => res.status(200).json(model))
    .catch(err => res.status(400).json(err.message));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const person = await Person.create(data).save();

  await Model.findByIdAndUpdate(id, {$inc: { 'votes': 1} }, {new: true})
    .then(model => {

      await model.people.push(person);
      await model.save();
      
      return res.status(200).json(model)
    }).catch(err => res.status(400).json(err.message));
};

const destroy = (req, res) => {
  const { id } = req.params;

  Model.findOneAndDelete({ '_id': id})
    .then(() => res.status(200).json({
      message: '¡Elemento eliminado!'
    }))
    .catch(err => res.status(400).json(err.message));
};

module.exports = { get, store, update, destroy };
