import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.businessPartnerInformation || initialState;

export const selectBusinessPartnerInfomation = createSelector(
  [selectSlice],
  state => state,
);
