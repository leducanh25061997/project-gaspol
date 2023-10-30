import {
  FilterAdminMembership,
  FilterMemberParams,
  Pageable,
  FilterAssociationParams,
} from 'types';
import {
  ApproveAssociationFormRequest,
  AssociationInformationType,
  AssociationManagement,
  ClubAssociationInformationType,
  ClubInformationRequest,
  CreateAssociationRequest,
  AssociationList,
  EditAssociationRequest,
  AddClubAssociationRequest,
  checkAssociationNameInfo,
} from 'types/AssociationManagement';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      // console.log(params[p]);
      if (params[p] !== '' && !Array.isArray(params[p])) {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      } else if (Array.isArray(params[p]) && params[p].length) {
        // console.log(params[p]);
        params[p].map((item: any) => {
          str.push(encodeURIComponent(p) + '=' + item);
        });
      }
    }
  return str.join('&');
};

const fetchAssociationList = async (
  params: FilterAssociationParams,
): Promise<Pageable<AssociationList>> => {
  // const response = await instance.post(
  //   'v1/membership/TAA_ASSOCIATION/member',
  //   params,
  // );
  // return response.data;
  const newParams = { ...params };
  const response = await instance.get(
    `/v2/admin/membership/taa/association?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchAssociationInformation = async (
  params: string,
): Promise<AssociationInformationType> => {
  const response = await instance.get(
    `v2/admin/membership/taa/association/${params}`,
  );
  return response.data;
};

const fetchClubAssociationInformation = async (
  params: ClubInformationRequest,
): Promise<Pageable<ClubAssociationInformationType>> => {
  const response = await instance.get(
    `v2/association/${params.id}/club?page=${params.page}&size=${params.size}`,
  );
  return response.data;
};

const createAssociation = async (
  body: CreateAssociationRequest,
): Promise<any> => {
  const response = await instance.post(`v1/admin/membership`, body);
  return response;
};

const updateAssociation = async (
  params?: EditAssociationRequest,
): Promise<AssociationInformationType> => {
  const newParams = { ...params };
  const response = await instance.put(
    `/v2/admin/membership/taa/association/${params?.id}`,
    newParams.body,
  );
  return response.data;
};

const addClubAssociation = async (
  params?: AddClubAssociationRequest,
): Promise<any> => {
  const newParams = { ...params };
  const response = await instance.put(
    `/v2/admin/membership/taa/association/${params?.id}/club`,
    newParams.body,
  );
  return response.data;
};

const checkAssociationName = async (
  params: string,
): Promise<checkAssociationNameInfo> => {
  const response = await instance.get(
    `/v2/membership/taa/association/validate?associationName=${params}`,
  );
  return response.data;
};

const approveAssociationRequest = async (
  params?: ApproveAssociationFormRequest,
): Promise<ApproveAssociationFormRequest> => {
  const newParams = { ...params };
  const response = await instance.put(
    `/v2/admin/membership/taa/association/${params?.id}`,
    newParams.associationBody,
  );
  return response.data;
};

export default {
  fetchAssociationList,
  fetchAssociationInformation,
  createAssociation,
  updateAssociation,
  approveAssociationRequest,
  fetchClubAssociationInformation,
  addClubAssociation,
  checkAssociationName,
};
