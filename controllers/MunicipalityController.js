const VotationCenter = require('../models/VotationCenter');

const get = async (req, res) => { 
    const data = await VotationCenter.aggregate([
        { 
            "$group": { 
                "_id": '$municipality',
                "totalElectors": {"$sum": "$electors" }, 
                "totalVotes": { "$sum": "$votes" } 
            }
        }, {
            "$project": {
                _id: 0,
                id: "$_id",
                name: "$_id",
                totalElectors: "$totalElectors",
                totalVotes: "$totalVotes"
            }
        }
    ]);

    return res.status(200).json({
        data: data,
        total: data.length
    });
};

module.exports = { get };
