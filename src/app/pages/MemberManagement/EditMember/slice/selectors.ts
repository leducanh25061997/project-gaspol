import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state?.editMember?.memberInformation;

export const selectMemberInformation = createSelector(
  [selectSlice],
  state => state,
);

const selectEditMemberSlice = (state: RootState) =>
  state?.editMember || initialState;

export const selectEditMember = createSelector(
  [selectEditMemberSlice],
  state => state,
);
