export const userReducer = (previousState = {}, action) => {
  switch(action.type) {
    case 'SET_USER': 
      return { ...previousState, ...action.payload };
      break;
    default:
      return previousState;
  }
}

export const errorsReducer = (previousState = {}, action) => {
  switch(action.type) {
    case 'SET_ERROR': 
      return { ...previousState, ...action.payload };
      break;
    case 'CLEAR_ERRORS':
      return {}
      break;
    default:
      return previousState;
  }
}

export const voterReducer = (previousState = {}, action) => {
  switch(action.type) {
    case 'SET_VOTER': 
      return { ...action.payload };
      break;
    case 'CLEAR_VOTER':
      return {};
      break;
    default:
      return previousState;
  }
}


