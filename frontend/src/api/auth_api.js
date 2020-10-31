import axios from 'axios';
import { APIUrl } from './base';

const loginPath = `${APIUrl}/user/login/`;
const logoutPath = `${APIUrl}/user/logout/`;

const loginRequest = (user) => axios({ url: loginPath, data: user, method: 'POST' });

const logoutRequest = () => axios({
  url: logoutPath,
  method: 'POST',
});

export { loginRequest, logoutRequest };
