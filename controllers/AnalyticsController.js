const Voter = require('../models/Person');
const VotationCenter = require('../models/VotationCenter');

const basic = async (req, res) =>{ 
  const voters = await Voter.count({});
  const centers = await VotationCenter.count({});

  return res.json({
    'voters': {
      'name': 'Votantes totales',
      'total': voters
    },
    'centers': {
      'name': 'Centros de votación',
      'total': centers
    }
  });
};

module.exports = { basic };
