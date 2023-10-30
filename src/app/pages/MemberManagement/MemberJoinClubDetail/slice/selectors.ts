import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.memberJoinClubDetail || initialState;

export const selectMemberJoinClubDetail = createSelector(
  [selectSlice],
  state => state,
);
