const isEmpty = require('is-empty');

const filter = (obj) => {
  if (isEmpty(obj)) return {};

  const query = {};

  for (const [key, value] of Object.entries(obj)) {
    query[key] = {
      $regex: `.*${value}.*`,
      $options: 'i'
    }
  };

  return query;
};

module.exports = filter;
