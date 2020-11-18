const VotationCenter = require('../models/VotationCenter');

const basic = async (req, res) => { 
  const project = await VotationCenter.aggregate([
    { 
      "$group": {
        "_id": null,
        "totalVotes": { "$sum": "$votes" },
        "totalCenters": { "$sum": 1 }
      }
    }
  ]);
  const { totalVotes, totalCenters } = project[0];

  return res.json({
    'votes': {
      'name': 'Votos totales',
      'total': totalVotes
    },
    'centers': {
      'name': 'Centros de votación',
      'total': totalCenters
    }
  });
};

module.exports = { basic };
