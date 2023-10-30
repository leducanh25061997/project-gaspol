import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.memberInformation || initialState;

export const selectMemberInformation = createSelector(
  [selectSlice],
  state => state,
);
