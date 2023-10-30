import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.clubInformation || initialState;

export const selectClubInformation = createSelector(
  [selectSlice],
  state => state,
);
