import axios from 'axios';
import { base_url } from '../utils/utils';
import { noAuthHeader } from './headers';

export const addDoctor = async (data) => {
  return await axios.post(`${base_url}/doctor/add`, data, {
    headers: noAuthHeader()
  });
};

export const getDoctors = async () => {
  return await axios.get(`${base_url}/doctor/list`, {
    headers: noAuthHeader()
  });
};

export const deleteDoctor = async (id) => {
  return await axios.delete(`${base_url}/doctor/delete/${id}`, {
    headers: noAuthHeader()
  });
};

export const updateDoctor = async (id, data) => {
  return await axios.put(`${base_url}/doctor/update/${id}`, data, {
    headers: noAuthHeader()
  });
};
