require('dotenv').config();

module.exports = {
  APP_ENV: process.env.APP_ENV,
  MONGO_URI: `${process.env.MONGO_URI}/${process.env.DB_DATABASE}`,
  APP_PORT: process.env.APP_PORT,
  ADMIN: {
    full_name: process.env.FULL_NAME,
    login: process.env.LOGIN,
    password: process.env.PASSWORD
  },
  OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  },
  SECRET: process.env.PASSPORT_SECRET
};
