import { Package, Pageable } from 'types';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchPackages = async (params: number): Promise<Pageable<Package>> => {
  const response = await instance.get(`v1/package?membershipId=${params}`);
  return response.data;
};

export default {
  fetchPackages,
};
