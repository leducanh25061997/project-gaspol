import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.associationReport || initialState;

export const selectAssociationReport = createSelector(
  [selectSlice],
  state => state,
);
