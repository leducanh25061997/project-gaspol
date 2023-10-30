import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.createMember || initialState;

export const selectCreateMember = createSelector([selectSlice], state => state);
