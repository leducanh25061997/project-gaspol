import {
  FilterParams,
  UserPackage,
  MembershipRequest,
  Pageable,
  MerchantRequests,
} from 'types';

import { createService } from './axios';

const baseUrl = process.env.REACT_APP_API_URL;
const instance = createService(baseUrl);

const fetchUserPackageInfo = async (
  userPackageId: string,
): Promise<UserPackage> => {
  const response = await instance.get(`/v1/user-package/${userPackageId}/info`);
  return response.data;
};

const approveUserPackage = async (userPackageId: number) => {
  const response = await instance.put(
    `/v1/user-package/${userPackageId}/approve`,
  );
  return response.data;
};

const fetchMembershipRequests = async (
  params: FilterParams,
): Promise<Pageable<MembershipRequest>> => {
  const response = await instance.post('/v1/user-package/filter', params);
  return response.data;
};
const fetchMerchantRequests = async (
  params: FilterParams,
): Promise<Pageable<MerchantRequests>> => {
  const response = await instance.post('/v1/user-package/filter', params);
  return response.data;
};
export default {
  fetchUserPackageInfo,
  approveUserPackage,
  fetchMembershipRequests,
  fetchMerchantRequests,
};
