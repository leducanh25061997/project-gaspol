import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.memberReport || initialState;

export const selectMemberReport = createSelector([selectSlice], state => state);
