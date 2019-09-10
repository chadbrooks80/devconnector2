import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or Update Profile 1:24pm
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  // edit determines if we are editing or creating a new profile.
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // ********************* NOTE THIS IS NOT WORKING NEED TO FIX IT LATER!! ********************************************************************************************
    // I personally added this because sometimes when I edit items it is being sent as an array and not a string, which is causing error on the backend
    // if (typeof formData.skills === 'object')
    //   formData.skills = formData.split(',');

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
