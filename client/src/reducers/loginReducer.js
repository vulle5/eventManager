import loginService from '../services/login';

export const authUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch({
        type: 'AUTH_USER',
        data: user
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return action.data;
    default:
      return state;
  }
};

export default loginReducer;
