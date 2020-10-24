require('dotenv').config();

module.exports = {
  APP_ENV: process.env.APP_ENV,
  MONGO_URI: `${process.env.MONGO_URI}/${process.env.DB_DATABASE}`,
  APP_PORT: process.env.APP_PORT,
  OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  }
};