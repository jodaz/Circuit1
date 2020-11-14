const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = {
  vote: (data) => {
    let errors = {};
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
  },
  update: (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.municipality = !isEmpty(data.municipality) ? data.municipality : '';
    data.parish = !isEmpty(data.parish) ? data.parish : '';
    data.user = !isEmpty(data.user) ? data.user : '';
  
    if (validator.isEmpty(data.name)) {
      errors.name = 'Ingrese el nombre';
    }
    if (validator.isEmpty(data.parish)) {
      errors.parish = 'Ingrese la parroquia';
    }
    if (validator.isEmpty(data.user)) {
      errors.user = 'Seleccione el responsable';
    }
    if (validator.isEmpty(data.municipality)) {
      errors.municipality = 'Ingrese el municipio';
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
