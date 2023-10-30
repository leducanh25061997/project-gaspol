import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.memberRequestJoinClub || initialState;

export const selectMemberRequestJoinClub = createSelector(
  [selectSlice],
  state => state,
);
