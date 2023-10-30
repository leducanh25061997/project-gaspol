import { Profile, Pageable, PhoneNumberRequest, Club } from 'types';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

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

const findMemberByPhone = async (
  params: PhoneNumberRequest,
): Promise<Profile[]> => {
  const response = await instance.get(
    `v1/profile/phone/${params.number}?type=${params.type}`,
  );
  return response.data;
};

const findUserByPhone = async (
  params: PhoneNumberRequest,
): Promise<Profile[]> => {
  const response = await instance.get(`v2/user/profile?phone=${params.number}`);
  return response.data;
};

const findClubname = async (
  params: ClubNameRequest,
): Promise<ClubNameResponse> => {
  const response = await instance.get(
    `v2/membership/${params.type}/check?${serialize(params)}`,
  );
  return response.data;
};

export default {
  findMemberByPhone,
  findUserByPhone,
  findClubname,
};
