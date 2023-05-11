import axios from 'axios';
import { base_url } from '../utils/utils';
import { noAuthHeader } from './headers';

export const addBill = async (data) => {
  return await axios.post(`${base_url}/billing/add`, data, {
    headers: noAuthHeader()
  });
};

export const getBills = async () => {
  return await axios.get(`${base_url}/billing/list`, {
    headers: noAuthHeader()
  });
};

export const deleteBill = async (id) => {
  return await axios.delete(`${base_url}/billing/delete/${id}`, {
    headers: noAuthHeader()
  });
};

export const updateBill = async (id, data) => {
  return await axios.put(`${base_url}/billing/update/${id}`, data, {
    headers: noAuthHeader()
  });
};
