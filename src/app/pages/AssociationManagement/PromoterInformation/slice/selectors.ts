import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state?.promoterInformation?.promoterInformation ||
  initialState?.promoterInformation;

export const selectPromoterInformation = createSelector(
  [selectSlice],
  state => state,
);
