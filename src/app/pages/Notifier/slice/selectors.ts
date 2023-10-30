import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state?.notifier || initialState;

export const selectNotifier = createSelector([selectSlice], state => state);
