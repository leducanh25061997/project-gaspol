import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.merchantRequest || initialState;

export const selectMerchantRequest = createSelector(
  [selectSlice],
  state => state,
);
