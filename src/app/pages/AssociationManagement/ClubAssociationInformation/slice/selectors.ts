import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state?.clubAssociationInformation || initialState;

export const selectAssociationInformation = createSelector(
  [selectSlice],
  state => state,
);
