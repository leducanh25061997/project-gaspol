import { PayloadAction } from '@reduxjs/toolkit';
import { FilterParams, Pageable, RequestJoinClubList } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { memberRequestJoinClubSaga } from './saga';
import { MemberRequestJoinClubState } from './types';

export const initialState: MemberRequestJoinClubState = {};

const slice = createSlice({
  name: 'memberRequestJoinClub',
  initialState,
  reducers: {
    fetchMembersList(state, action: PayloadAction<FilterParams>) {},
    fetchMembersListSuccess(
      state,
      action: PayloadAction<Pageable<RequestJoinClubList>>,
    ) {
      state.membersList = action.payload;
    },
  },
});

export const { actions: memberRequestJoinClubActions } = slice;

export const useMemberRequestJoinClubSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberRequestJoinClubSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMemberRequestJoinClubSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
