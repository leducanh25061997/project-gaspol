import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { UserPackage } from 'types';

import { membershipRequestDetailSaga } from './saga';
import { MembershipRequestDetailState } from './types';
export const initialState: MembershipRequestDetailState = {};

const slice = createSlice({
  name: 'membershipRequestDetail',
  initialState,
  reducers: {
    fetchMembershipRequestDetail(state, action: PayloadAction<string>) {},
    fetchMembershipRequestDetailSuccess(
      state,
      action: PayloadAction<UserPackage>,
    ) {
      state.userPackage = action.payload;
    },
    fetchMembershipRequestDetailFailed() {},
    approveMembershipRequest: {
      reducer(state) {},
      prepare(userPackageId: number, meta: (error?: any) => void) {
        return { payload: userPackageId, meta };
      },
    },
  },
});

export const { actions: membershipRequestDetailActions } = slice;

export const useMembershipRequestDetailSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: membershipRequestDetailSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMembershipRequestDetailSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
