const VotationCenter = require('../models/VotationCenter');

const basic = async (req, res) => { 
  const project = await VotationCenter.aggregate([
    { 
      "$group": {
        "_id": null,
        "totalVotes": { "$sum": "$votes" },
        "totalElectors": { "$sum": "$electors" },
        "totalCenters": { "$sum": 1 } 
      }
    }, {
      "$project": {
        totalCenters: "$totalCenters",
        totalElectors: "$totalElectors",
        totalVotes: "$totalVotes",
        "participation":{
          "$cond": [ 
            { $eq: [ "$totalVotes", 0 ] }, 
            "N/A", 
            {
              "$round": [
                {
                  "$multiply": [
                    100, {
                      "$divide": [ "$totalVotes", "$totalElectors" ]
                    }
                  ]
                }, 2
              ]
            }
          ]
        }
      }
    }
  ]);

  const {
    totalVotes,
    totalCenters,
    totalElectors,
    participation
  } = project[0];

  return res.json({
    'votes': {
      'name': 'Votos totales',
      'total': totalVotes
    },
    'centers': {
      'name': 'Centros de votación',
      'total': totalCenters
    },
    'electors': {
      'name': 'Total de electores',
      'total': totalElectors
    },
    'participation': {
      'name': 'Participación',
      'total': `${participation} %`
    }
  });
};

module.exports = { basic };
