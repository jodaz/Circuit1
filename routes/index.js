const express = require('express');
const votationCenterController = require('./api/votation-centers');

module.exports = (app) => {
  app.use(express.json());
  app.use('/api/votation-centers', votationCenterController);
};