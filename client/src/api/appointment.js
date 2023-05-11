import axios from 'axios';
import { base_url } from '../utils/utils';
import { noAuthHeader } from './headers';

export const addAppointment = async (data) => {
  return await axios.post(`${base_url}/appointment/add`, data, {
    headers: noAuthHeader()
  });
};

export const getAppointments = async () => {
  return await axios.get(`${base_url}/appointment/list`, {
    headers: noAuthHeader()
  });
};

export const deleteAppointment = async (id) => {
  return await axios.delete(`${base_url}/appointment/delete/${id}`, {
    headers: noAuthHeader()
  });
};

export const updateAppointment = async (id, data) => {
  return await axios.put(`${base_url}/appointment/update/${id}`, data, {
    headers: noAuthHeader()
  });
};
