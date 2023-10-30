import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.promoterManagement || initialState;

export const selectPromoterManagement = createSelector(
  [selectSlice],
  state => state,
);
