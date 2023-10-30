import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.claimList || initialState;

export const selectClaimList = createSelector([selectSlice], state => state);
