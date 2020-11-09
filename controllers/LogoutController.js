const Model = require('../models/User');
const logout = async (req, res) => {
  await req.logout();

  return res.json({
    'success': true
  });
};

module.exports = { logout };
