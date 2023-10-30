import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from './';

const membershipRequestsSelector = (state: RootState) =>
  state.membershipRequests || initialState;

const selectIndividualMembers = createSelector(
  [membershipRequestsSelector],
  state => state,
);

export { selectIndividualMembers };
