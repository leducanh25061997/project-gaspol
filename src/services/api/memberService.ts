import {
  Province,
  Pageable,
  FileUpload,
  Member,
  ParamsUrl,
  MembershipsReponAblepage,
  Package,
  Memberships,
  Clubdata,
  Profile,
  ClubParams,
  PageableClub,
  PhoneNumberRequest,
  FilterMemberParams,
  MembershipRequest,
  FilterAdminMembership,
  clubFilterParams,
} from 'types';
import axios from 'axios';
import queryString from 'query-string';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);
const fetchProvince = async (): Promise<Pageable<Province>> => {
  const response = await instance.get(`v1/province/filter`);
  return response.data;
};
const fetchMemberShip = async (): Promise<Memberships[]> => {
  const response = await instance.get(`v1/membership`);
  return response.data;
};

const fetchUrlImages = async (params: any): Promise<Pageable<FileUpload>> => {
  const response = await instance.get(
    `v1/file/upload-url?${queryString.stringify(params)}`,
  );
  return response.data;
};

const createNewmember = async (
  params: Member,
): Promise<MembershipsReponAblepage> => {
  // const response = await instance.post('v1/form', params);
  const response = await instance.post('v1/admin/membership', params);
  return response.data;
};

const getUrlImageData = async (params: ParamsUrl[]): Promise<ParamsUrl[]> => {
  const client = axios.create();
  const responUrl: ParamsUrl[] = [];
  await Promise.all(
    params.map((value, index) => {
      return new Promise((resolve, reject) => {
        client
          .put(value.url, value.files, {
            headers: {
              'Content-Type': value.files.type,
              'Content-Disposition': `attachment; filename=${encodeURI(
                value.files.name || 'unknow',
              )}`,
            },
          })
          .then(resp => {
            responUrl.push({
              name: value.name,
              url: String(resp?.config?.url),
              files: '',
              key: value.key,
            });
            resolve(resp);
          })
          .catch(err => reject(err));
      });
    }),
  );
  return responUrl;
};

const fetchPackages = async (params: number): Promise<Package[]> => {
  const response = await instance.get(`v1/package?membershipId=${params}`);
  return response.data;
};

const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (params[p] !== '') {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      }
    }
  return str.join('&');
};

const fetchClubs = async (
  params: ClubParams,
): Promise<PageableClub<Clubdata>> => {
  const newParams = { ...params };
  delete newParams.change;
  delete newParams.isLastItem;
  const response = await instance.get(
    `v2/admin/membership/tkt?${serialize(newParams)}`,
  );
  return response.data;
};

const checkPhoneNumberUnique = async (
  params: PhoneNumberRequest,
): Promise<Profile[]> => {
  const response = await instance.get(`v1/profile/phone/${Number(params)}`);
  return response.data;
};

const fetchMembershipRequest = async (
  params?: FilterMemberParams,
): Promise<Pageable<MembershipRequest>> => {
  const newParams = { ...params };
  delete newParams?.membershipType;
  const response = await instance.post(
    `/v1/membership/${params?.membershipType}/member`,
    newParams,
  );
  return response.data;
};

const fetchAdminMembership = async (
  params?: FilterAdminMembership,
): Promise<Pageable<MembershipRequest>> => {
  const newParams = { ...params };
  delete newParams?.size;
  delete newParams?.page;
  const response = await instance.post(
    `/v1/admin/membership/kta/member?size=${params?.size}&page=${params?.page}`,
    newParams,
  );
  return response.data;
};

const newFetchAdminMembership = async (
  params?: any,
): Promise<Pageable<MembershipRequest>> => {
  const newParams = { ...params };
  if (newParams && Object.keys(newParams).length > 0) {
    for (const key in newParams) {
      if (newParams[key] === '' || newParams[key].length === 0) {
        delete newParams[key];
      }
    }
  }
  const response = await instance.get(
    `/v2/admin/membership/tkt?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchProPackage = async (params: string): Promise<Package[]> => {
  const response = await instance.get(`v2/package?packageCode=${params}`);
  return response.data;
};

export default {
  fetchProvince,
  fetchUrlImages,
  createNewmember,
  getUrlImageData,
  fetchMemberShip,
  fetchPackages,
  fetchProPackage,
  fetchClubs,
  checkPhoneNumberUnique,
  fetchMembershipRequest,
  fetchAdminMembership,
  newFetchAdminMembership,
};
