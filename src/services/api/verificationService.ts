import { Pageable, ClubRequest } from 'types';
import mockResult from 'app/pages/Verification/mock/individual/data.json';

const fetchClubRequests = async (): Promise<Pageable<ClubRequest>> => {
  return mockResult as any;
};

export default {
  fetchClubRequests,
};
