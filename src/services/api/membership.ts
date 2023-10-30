import {
  IndividualInformation,
  IndividualInformationV2,
  MemberJoinClub,
  Membership,
  Pageable,
  MembershipRequest,
  FilterParams,
  RequestPointHistory,
  TransactionHistory,
  Member,
  KtaNumberRequest,
} from 'types';
import { ClubHistoryRequestData, ClubHistoryType } from 'types/ClubHistoryType';
import {
  MembershipKis,
  TransactionRequestData,
  UserPointParams,
} from 'types/MembershipRequest';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchMembership = async (): Promise<Pageable<Membership>> => {
  const response = await instance.get(`v1/membership`);
  return response.data;
};

const fetchIndividualInformation = async (
  params: string,
): Promise<IndividualInformationV2> => {
  const response = await instance.get(`v2/membership/KTA/member/${params}`);
  return response.data;
};

const fetchBusinessPartnerInformation = async (
  params?: string,
): Promise<MembershipRequest> => {
  const response = await instance.get(
    `v1/membership/TAA_BUSINESS_PARTNER/member/${params}`,
  );
  return response.data;
};

const editIndividualMember = async (
  params: IndividualInformation,
): Promise<any> => {
  const response = await instance.put(
    `v1/admin/membership/${params.id}`,
    params,
  );
  return response.data;
};

// const editIndividualMember = async (
//   params: IndividualInformation,
// ): Promise<any> => {
//   const response = await instance.post('v1/form', params);
//   return response.data;
// };

const fetchMemberRequestJoinClub = async (
  memberId: string,
): Promise<IndividualInformation> => {
  const response = await instance.get(`v1/member/${memberId}`);
  return response.data;
};

const approveMemberJoinClub = async (params: MemberJoinClub): Promise<void> => {
  await instance.put(`v1/member/${params.id}`, {
    status: params.status,
  });
};

const fetchPointHistory = async (
  params: FilterParams,
): Promise<Pageable<RequestPointHistory>> => {
  const response = await instance.get(`v1/admin/g-point/${params.userUuid}`);
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

const fetchTransactionHistory = async (
  params: TransactionRequestData,
): Promise<Pageable<TransactionHistory>> => {
  const response = await instance.get(`v1/admin/order?${serialize(params)}`);
  return response.data;
};

const fetchChangeClubHistory = async (
  params: ClubHistoryRequestData,
): Promise<Pageable<ClubHistoryType>> => {
  const response = await instance.get(
    `/v2/admin/membership/kta/${params.membershipId}/switch-club/history?size=${params.size}&page=${params.page}`,
  );
  return response.data;
};

const fetchUserPoint = async (params: UserPointParams): Promise<any> => {
  const response = await instance.get(`v1/g-point/${params.userUuid}`);
  return response.data;
};

const checkKtaNumber = async (params: KtaNumberRequest): Promise<boolean> => {
  const response = await instance.get(
    `v2/membership/kta/check?ktaNumber=${params.ktaNumber}`,
  );
  return response.data;
};

const fetchMembershipKis = async (
  params: FilterParams,
): Promise<MembershipKis> => {
  const response = await instance.get(
    `v2/admin/membership/kta/${params.id}/kis?status=${params.kisStatus}`,
  );
  return response.data;
};

export default {
  fetchMembership,
  fetchIndividualInformation,
  editIndividualMember,
  fetchMemberRequestJoinClub,
  approveMemberJoinClub,
  fetchBusinessPartnerInformation,
  fetchPointHistory,
  fetchTransactionHistory,
  fetchUserPoint,
  checkKtaNumber,
  fetchChangeClubHistory,
  fetchMembershipKis,
};
