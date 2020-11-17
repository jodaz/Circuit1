const VotationCenter = require('../models/VotationCenter');

const basic = async (req, res) =>{ 
  const votes = await VotationCenter.aggregate([
    { $match: { _id: '$all' }},
    { $project: { total: { $sum: "votes" } }}
  ]);
  const centers = await VotationCenter.count({});

  return res.json({
    'votes': {
      'name': 'Votos totales',
      'total': votes
    },
    'centers': {
      'name': 'Centros de votación',
      'total': centers
    }
  });
};

module.exports = { basic };
