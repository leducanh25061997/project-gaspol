import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.clubManagement || initialState;

export const selectClubManagement = createSelector(
  [selectSlice],
  state => state,
);
