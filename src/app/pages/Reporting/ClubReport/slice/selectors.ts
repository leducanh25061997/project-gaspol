import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.clubReport || initialState;

export const selectClubReport = createSelector([selectSlice], state => state);
