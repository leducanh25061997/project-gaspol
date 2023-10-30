import { PanoramaSharp } from '@mui/icons-material';
import { PayloadAction } from '@reduxjs/toolkit';
import { IndividualInformation, MemberJoinClub } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { memberJoinClubDetailSaga } from './saga';
import { MemberJoinClubDetailState } from './types';

export const initialState: MemberJoinClubDetailState = {};

const slice = createSlice({
  name: 'memberJoinClubDetail',
  initialState,
  reducers: {
    fetchMemberInformation(state, action: PayloadAction<string>) {},
    fetchMemberInformationSuccess: (
      state,
      action: PayloadAction<IndividualInformation>,
    ) => {
      state.memberInformation = action.payload;
    },
    approveMember: {
      reducer(state) {
        return state;
      },
      prepare(params: MemberJoinClub, meta: (errors?: any) => void) {
        return { payload: params, meta };
      },
    },
    approveMemberSuccess() {},
  },
});

export const { actions: memberJoinClubDetailActions } = slice;

export const useMemberJoinClubDetailSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberJoinClubDetailSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMemberJoinClubDetailSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
