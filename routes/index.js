const loginRoutes = require('./api/login');
const logoutRoutes = require('./api/logout');
const votationCenterRoutes = require('./api/votation-centers');
const municipalitiesRoutes = require('./api/municipalities');
const parishesRoutes = require('./api/parishes');
const userRoutes = require('./api/users');
const analyticsRoutes = require('./api/analytics');
const passport = require('passport');

module.exports = (app) => {
  app.use('/api', loginRoutes);
  app.use(
    '/api',
    passport.authenticate('jwt', { session: false }),
    logoutRoutes
  );
  app.use(
    '/api/users',
    passport.authenticate('jwt', { session: false }),
    userRoutes
  );
  app.use(
    '/api/votation-centers',
    passport.authenticate('jwt', { session: false }),
    votationCenterRoutes
  );
  app.use(
    '/api/parishes',
    passport.authenticate('jwt', { session: false }),
    parishesRoutes
  );
  app.use(
    '/api/municipalities',
    passport.authenticate('jwt', { session: false }),
    municipalitiesRoutes
  );
  app.use(
    '/api/analytics',
    passport.authenticate('jwt', { session: false }),
    analyticsRoutes
  );
};
