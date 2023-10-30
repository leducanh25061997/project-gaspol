import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { useInjectSaga } from 'redux-injectors';
import { FilterParams } from 'types';
import { PayloadAction } from '@reduxjs/toolkit';

import membershipRequestsSaga from './saga';
import { MembershipRequestsState } from './types';

export const initialState: MembershipRequestsState = {};

const slice = createSlice({
  name: 'membershipRequests',
  initialState,
  reducers: {
    fetchMembershipRequests: (
      state,
      payload: PayloadAction<FilterParams>,
    ) => {},
    fetchMembershipRequestsSuccess: (state, action) => {
      state.membershipRequestsPageable = action.payload;
    },
    fetchMembershipRequestsFailed: (state, action) => {},
  },
});

export const { actions: membershipRequestsActions } = slice;

export const useMembershipRequestsSlice = () => {
  useInjectReducer({
    key: slice.name,
    reducer: slice.reducer,
  });
  useInjectSaga({
    key: slice.name,
    saga: membershipRequestsSaga,
  });
  return { actions: slice.actions };
};
