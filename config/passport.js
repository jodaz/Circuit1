const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt  = require('passport-jwt').ExtractJwt;
const User        = require('../models/User');
const { SECRET }  = require('../config');

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

module.exports = passport => {
  passport.use(
    new jwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then(user => {
        if (user) return done(null, user);
        return done(null, false);
      }).catch(err => console.log(err));
    })
  );
};
