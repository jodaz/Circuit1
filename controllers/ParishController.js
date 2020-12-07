const VotationCenter = require('../models/VotationCenter');

const get = async (req, res) => { 
    const data = await VotationCenter.aggregate([
        { 
            "$group": { 
                "_id": '$parish',
                "totalElectors": {"$sum": "$electors" }, 
                "totalVotes": { "$sum": "$votes" }
            }
        }, {
            "$project": {
                _id: 0,
                id: "$_id",
                name: "$_id",
                totalElectors: "$totalElectors",
                totalVotes: "$totalVotes",
                participation: {
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
                                },
                                2
                            ]
                        }
                    ]
                }
            }
        }, {
            "$sort": {
                "participation": -1
            }
        }
    ]);

    return res.status(200).json({
        data: data,
        total: data.length
    });
};

module.exports = { get };
