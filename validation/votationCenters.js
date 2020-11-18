const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = {
  vote: (data) => {
    let errors = {};

    data.votes = !isEmpty(data.votes) ? data.votes : '';
  
    if (validator.isEmpty(data.votes)) {
      errors.votes = 'Ingrese el número de votos recolectados';
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
    if (validator.isEmpty(data.user.id)) {
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
