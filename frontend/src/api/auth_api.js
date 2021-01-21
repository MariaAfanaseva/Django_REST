import axios from 'axios';
import { APIUrl } from './base';

const loginPath = `${APIUrl}/user/login/`;
const logoutPath = `${APIUrl}/user/logout/`;
const registerPath = `${APIUrl}/user/register/`;

const loginRequest = (user) => axios({
  url: loginPath,
  data: user,
  method: 'POST',
});

const logoutRequest = () => axios({
  url: logoutPath,
  method: 'POST',
});

const registerRequest = (user) => axios({
  url: registerPath,
  method: 'POST',
  data: user,
});

export { loginRequest, logoutRequest, registerRequest };
