import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.dashboardData || initialState;

export const selectDashboardData = createSelector(
  [selectSlice],
  state => state,
);
