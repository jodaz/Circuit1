const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (validator.isEmpty(data.login)) {
    errors.login = 'Ingrese su login';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Ingrese su contraseña';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
