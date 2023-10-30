import {
  ActiveOldMemberListData,
  ClaimList,
  ClaimRequestData,
  ClaimRequestDetail,
  OldMemberListRequestData,
  OldMemberListType,
} from 'types/ClaimList';

import querystring from 'query-string';
import { omit, pick } from 'lodash';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchClaimInformation = async (
  params: ClaimRequestData,
): Promise<ClaimList> => {
  // const data = omit(params, ['page', 'size', 'sort']);
  const data = {
    filter: params.searchKey || undefined,
    provinceId: Number(params.provinceId) || undefined,
    fromDate: Number(params.fromDate) || undefined,
    toDate: Number(params.toDate) || undefined,
    status: params.status || undefined,
  };
  const response = await instance.post(
    `v1/admin/claim?size=${params.size}&page=${params.page}`,
    data,
  );
  return response.data;
};

const exportClaimList = async (params: ClaimRequestData): Promise<any> => {
  const response = await instance.post(
    `v2/admin/membership/kta/claim/export`,
    params.filter,
  );
  return response.data;
};

const fetchClaimDetail = async (id: string): Promise<ClaimList> => {
  const response = await instance.get(`v1/claim/${id}`);
  return response.data;
};

const rejectRequest = async (params: any): Promise<any> => {
  const response = await instance.put(`v1/claim/${params.id}`);
  return response.data;
};

const fetchOldMemberList = async (
  params: OldMemberListRequestData,
): Promise<OldMemberListType> => {
  const response = await instance.post(
    `v1/admin/membership/kta/member?size=${params.size}&page=${params.page}`,
    params.filter,
  );
  return response.data;
};

const activeOldMemberList = async (
  params: ActiveOldMemberListData,
): Promise<ClaimList> => {
  const response = await instance.post(`v1/admin/claim/activation`, params);
  return response.data;
};

export default {
  rejectRequest,
  fetchClaimInformation,
  fetchClaimDetail,
  fetchOldMemberList,
  activeOldMemberList,
  exportClaimList,
};
