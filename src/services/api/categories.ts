import { Category, Pageable } from 'types';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchCategories = async (params: string): Promise<Pageable<Category>> => {
  const response = await instance.get(`v1/category?type=${params}`);
  return response.data;
};

export default {
  fetchCategories,
};
