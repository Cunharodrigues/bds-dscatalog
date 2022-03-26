import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const tokenkey = 'authData';

const CLIENT_ID = process.env.REACT_APP_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: 'basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenkey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //console.log('INTERCEPTOR ANTES DA REQUISIÇÃO');
    return config;
  },
  function (error) {
    //console.log('INTERCEPTOR ERRO NA REQUISIÇÃO');
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log('INTERCEPTOR RESPOSTA COM SUCESSO');
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      history.push('/admin/auth');
    }
    return Promise.reject(error);
  });
