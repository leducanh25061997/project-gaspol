import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const clubRequestsSelector = (state: RootState) =>
  state.clubRequests || initialState;

const selectClubRequests = createSelector(
  [clubRequestsSelector],
  state => state,
);

export { selectClubRequests };
