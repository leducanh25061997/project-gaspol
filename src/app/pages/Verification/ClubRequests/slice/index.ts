import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import clubRequestSaga from './saga';
import { ClubRequestState } from './types';

export const initialState: ClubRequestState = {};

const slice = createSlice({
  name: 'clubRequests',
  initialState,
  reducers: {
    fetchClubRequests() {},
    fetchClubRequestsSuccess(state, action) {
      state.clubRequestsPageable = action.payload;
    },
    fetchClubRequestsFailed() {},
  },
});

export const { actions: clubRequestActions } = slice;

export const useClubRequestsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubRequestSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSliceSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
