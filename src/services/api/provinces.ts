import {
  Address,
  Pageable,
  PhoneNumberRequest,
  Province,
  AddressRequest,
} from 'types';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchProvince = async (): Promise<Pageable<Province>> => {
  const response = await instance.get(`v1/province/filter`);
  return response.data;
};

const fetchAddress = async (
  params: AddressRequest,
): Promise<Pageable<Address>> => {
  const response = await instance.get(
    `v1/address/${params.type}/filter?active=false&parentId=${params.id}`,
  );
  return response.data;
};

const fetchBirthPlaceCity = async (
  params: AddressRequest,
): Promise<Pageable<Address>> => {
  const response = await instance.get(
    `v1/address/${params.type}/filter?active=false&name=${params.name}`,
  );
  return response.data;
};

export default {
  fetchProvince,
  fetchAddress,
  fetchBirthPlaceCity,
};
