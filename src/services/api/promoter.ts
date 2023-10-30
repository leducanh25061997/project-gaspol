import {
  IndividualInformation,
  MemberJoinClub,
  Membership,
  Pageable,
} from 'types';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchIndividualInformation = async (
  params: string,
): Promise<IndividualInformation> => {
  const response = await instance.get(
    `v1/membership/TAA_PROMOTOR/member/${params}`,
  );
  return response.data;
};

const editIndividualPromoter = async (
  params: IndividualInformation,
): Promise<any> => {
  const response = await instance.put(
    `v1/membership/TAA_PROMOTOR/member/${params ? params.id : ''}`,
    params,
  );
  return response.data;
};

export default {
  fetchIndividualInformation,
  editIndividualPromoter,
};
