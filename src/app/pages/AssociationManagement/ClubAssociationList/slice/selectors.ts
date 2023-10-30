import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.clubAssociationManagement || initialState;

export const selectClubAssociationManagement = createSelector(
  [selectSlice],
  state => state,
);
