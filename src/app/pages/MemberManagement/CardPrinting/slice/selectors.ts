import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.cardPrintingManagement || initialState;

export const selectcardPrintingManagement = createSelector(
  [selectSlice],
  state => state,
);
