import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.createAssociation || initialState;

export const selectAssociation = createSelector([selectSlice], state => state);
