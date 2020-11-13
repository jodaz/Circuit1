const validator = require('validator');
const isEmpty = require('is-empty');

let errors = {};

module.exports = {
  update: (data) => {
    data.full_name = !isEmpty(data.full_name) ? data.full_name : '';
    data.personId = !isEmpty(data.personId) ? data.personId : '';
  
    if (validator.isEmpty(data.full_name)) {
      errors.full_name = 'Ingrese el nombre del votante';
    }
    if (validator.isEmpty(data.personId)) {
      errors.personId = 'Ingrese su contraseña';
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
