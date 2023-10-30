import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.membershipRequestDetail || initialState;

export const selectMembershipRequestDetail = createSelector(
  [selectSlice],
  state => state,
);
