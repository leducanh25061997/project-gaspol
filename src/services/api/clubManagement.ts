import {
  ClaimClubDetailsResponse,
  OldMemberListResponse,
  OldMemberListRequestParams,
  FilterParams as FilterOldMemberListParams,
  AssignAdminParams,
} from 'app/pages/ClubManagement/ClaimClub/ClaimedClubDetails/slice/types';
import {
  ClaimedClubListResponse,
  FilterParams as FilterClaimedClubListParams,
} from 'app/pages/ClubManagement/ClaimClub/ClaimedClubList/slice/types';
import querystring from 'query-string';
import { omit, pick } from 'lodash';

import {
  ClubInformation,
  CreateClubFormRequest,
  FilterParams,
  Pageable,
  RequestJoinClubList,
  IndividualInformation,
  EditClubFormRequest,
} from 'types';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);
const API_VERSION = process.env.REACT_APP_API_VERSION;

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

const createClubRequest = async (
  params: CreateClubFormRequest,
): Promise<CreateClubFormRequest> => {
  const response = await instance.post('/v1/admin/membership', params);
  return response.data;
};

const updateClubRequest = async (
  params?: EditClubFormRequest,
): Promise<EditClubFormRequest> => {
  const newParams = { ...params };
  const response = await instance.put(
    `/v2/admin/membership/tkt/${params?.clubMembershipId}`,
    newParams.clubData,
  );
  return response.data;
};

const approvalDocumentbRequest = async (
  params?: IndividualInformation,
): Promise<IndividualInformation> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/v2/admin/membership/tkt/${params?.id}`,
    newParams,
  );
  return response.data;
};

const filterMemberJoinClubRequest = async (
  params: FilterParams,
): Promise<Pageable<RequestJoinClubList>> => {
  const response = await instance.post('v1/member/filter', params);
  return response.data;
};

const memberClubRequest = async (
  params: FilterParams,
): Promise<Pageable<RequestJoinClubList>> => {
  const newParams = { ...params };
  delete newParams.clubId;
  const response = await instance.get(
    `v2/admin/membership/tkt/${params.clubId}/member?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchClubInformation = async (
  params: string,
): Promise<ClubInformation> => {
  const response = await instance.get(`v2/admin/membership/tkt/${params}`);
  return response.data;
};

const getClaimedClubList = async (
  params: FilterClaimedClubListParams,
): Promise<ClaimedClubListResponse> => {
  params.status = params?.status || undefined;
  const query = querystring.stringify(
    pick(params, [
      'page',
      'size',
      'sort',
      'provinceId',
      'status',
      'searchField',
      'fromDate',
      'toDate',
    ]),
  );
  try {
    const response = await instance.get(
      '/v1/admin/membership/tkt/claim?' + query,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const exportClubClaimList = async (
  params: FilterClaimedClubListParams,
): Promise<any> => {
  const response = await instance.get(`v2/admin/membership/tkt/claim/export`, {
    params,
  });
  return response.data;
};

const getClaimedClubDetails = async (
  claimId: string,
): Promise<ClaimClubDetailsResponse> => {
  try {
    const response = await instance.get(
      `/v1/admin/membership/tkt/claim/${claimId}`,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getOldMemberList = async (
  params: OldMemberListRequestParams,
): Promise<OldMemberListResponse> => {
  try {
    const response = await instance.get(
      `/v2/admin/membership/tkt/${params.claimId}/member`,
      {
        params: params.filter,
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const activeClaimClub = async (claimId: string | number): Promise<any> => {
  try {
    const response = await instance.post(
      `v1/admin/membership/tkt/claim/${claimId}/activation`,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const assignAdmin = async (data: AssignAdminParams): Promise<any> => {
  try {
    const response = await instance.post(
      `v2/admin/membership/tkt/${data.claimId}/member`,
      {
        userUuid: data.userUuid,
        role: 'ADMIN',
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default {
  updateClubRequest,
  approvalDocumentbRequest,
  createClubRequest,
  filterMemberJoinClubRequest,
  fetchClubInformation,
  getClaimedClubList,
  getClaimedClubDetails,
  getOldMemberList,
  activeClaimClub,
  assignAdmin,
  memberClubRequest,
  exportClubClaimList,
};
