import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.claimDetail || initialState;

export const selectClaimDetail = createSelector([selectSlice], state => state);
