import axios from 'axios';
import { base_url } from '../utils/utils';
import { noAuthHeader } from './headers';

export const login = async (data) => {
  return await axios.post(`${base_url}/auth/login`, data, {
    headers: noAuthHeader()
  });
};

export const signup = async (data) => {
  return await axios.post(`${base_url}/auth/signup`, data, {
    headers: noAuthHeader()
  });
};
