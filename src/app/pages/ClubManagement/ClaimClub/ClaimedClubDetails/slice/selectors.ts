import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.claimedClubDetails || initialState;

export const selectClaimedClubDetails = createSelector(
  [selectSlice],
  state => state,
);
