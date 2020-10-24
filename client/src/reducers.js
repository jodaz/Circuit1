export const userReducer = (previousState = {}, action) => {
  switch(action.type) {
    case 'SET_USER': 
      return { ...previousState, ...action.payload };
      break;
    default:
      return previousState;
  }
}

