import axios from 'axios';
import { base_url } from '../utils/utils';
import { noAuthHeader } from './headers';

export const addPatient = async (data) => {
  return await axios.post(`${base_url}/patient/add`, data, {
    headers: noAuthHeader()
  });
};

export const getPatients = async () => {
  return await axios.get(`${base_url}/patient/list`, {
    headers: noAuthHeader()
  });
};

export const deletePatient = async (id) => {
  return await axios.delete(`${base_url}/patient/delete/${id}`, {
    headers: noAuthHeader()
  });
};
