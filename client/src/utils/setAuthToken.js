import axios from 'axios';

const setauthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.comm['x-auth-token'];
  }
};

export default setauthToken;
