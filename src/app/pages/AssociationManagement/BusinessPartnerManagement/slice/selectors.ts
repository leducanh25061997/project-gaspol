import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.businessPartnerManagement || initialState;

export const selectBusinessPartnerManagement = createSelector(
  [selectSlice],
  state => state,
);
