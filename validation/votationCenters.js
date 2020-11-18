const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = {
  vote: (data) => {
    let errors = {};

    data.personId = !isEmpty(data.personId) ? data.personId : '';
  
    if (validator.isEmpty(data.personId)) {
      errors.personId = 'Ingrese la cédula del votante';
    }
    if (!validator.isByteLength(data.personId, { min: 6, max: 9 })) {
      errors.personId = 'La cédula debe ser entre 6 y 9 dígitos';
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
