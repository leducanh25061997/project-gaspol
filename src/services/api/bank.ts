import { Profile, Pageable, PhoneNumberRequest, Bank } from 'types';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchListBanks = async (): Promise<Bank[]> => {
  const response = await instance.get(`v1/bank`);
  return response.data;
};

export default {
  fetchListBanks,
};
