import { Pageable, FilterParams, KisInfo } from 'types';
import queryString from 'query-string';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchKisRequest = async (
  params?: FilterParams,
): Promise<Pageable<KisInfo>> => {
  const response = await instance.get(
    `/v1/kis-category?${queryString.stringify({ ...params })}`,
  );
  return response.data;
};

const fetchKisProvinceRequest = async (
  params?: FilterParams,
): Promise<Pageable<KisInfo>> => {
  const response = await instance.get(
    `/v1/kis-province?${queryString.stringify({ ...params })}`,
  );
  return response.data;
};

const updateImiKis = async (params?: KisInfo): Promise<KisInfo> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/v1/kis-category/${params?.id}`,
    newParams,
  );
  return response.data;
};

async function getKisDetail(id: number): Promise<KisInfo> {
  const response = await instance.get(`/v1/kis-category/${id}`);
  return response.data;
}

async function createKis(params: KisInfo): Promise<KisInfo> {
  const response = await instance.post('/v1/kis-category', params);
  return response.data;
}

const updateKisProvince = async (params?: KisInfo): Promise<KisInfo> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/v1/kis-province/${params?.id}`,
    newParams,
  );
  return response.data;
};

async function getKisProvinceDetail(id: number): Promise<KisInfo> {
  const response = await instance.get(`/v1/kis-province/${id}`);
  return response.data;
}

async function createKisProvince(params: KisInfo): Promise<KisInfo> {
  const response = await instance.post('/v1/kis-province', params);
  return response.data.data;
}

export default {
  fetchKisRequest,
  getKisDetail,
  createKis,
  fetchKisProvinceRequest,
  updateImiKis,
  updateKisProvince,
  getKisProvinceDetail,
  createKisProvince,
};
