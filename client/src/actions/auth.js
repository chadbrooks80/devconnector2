import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  console.log({ name, email, password });
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data // return the token
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      REGISTER_FAIL
    });
  }
};
