import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.editIndividualMember || initialState;

export const selectEditIndividualMember = createSelector(
  [selectSlice],
  state => state,
);
