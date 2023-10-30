import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.memberManagement || initialState;

export const selectMemberManagement = createSelector(
  [selectSlice],
  state => state,
);
