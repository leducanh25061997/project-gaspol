import { PayloadAction } from '@reduxjs/toolkit';
import { WithCallBack } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { Saga } from './saga';
import {
  AssignAdminParams,
  ClaimClubDetailsResponse,
  ClaimedClubDetailsState,
  FilterParams,
  OldMemberListRequestParams,
  OldMemberListResponse,
} from './types';

export const initialState: ClaimedClubDetailsState = {
  clubDetails: {
    loading: true,
  },
  oldMemberList: {
    filter: {
      page: 0,
      size: 10,
    },
    total: 0,
  },
};

const slice = createSlice({
  name: 'claimedClubDetails',
  initialState,
  reducers: {
    getClaimedClubDetails(state, action: PayloadAction<string>) {},
    getClaimedClubDetailsSuccess(
      state,
      action: PayloadAction<ClaimClubDetailsResponse>,
    ) {
      state.clubDetails.data = action.payload;
      state.clubDetails.loading = false;
    },
    getClaimedClubDetailsFailed(state) {
      state.clubDetails.loading = false;
    },

    getOldMemberList(
      state,
      action: PayloadAction<OldMemberListRequestParams>,
    ) {},
    getOldMemberListSuccess(
      state,
      action: PayloadAction<OldMemberListResponse>,
    ) {
      state.oldMemberList.data = action.payload.data;
      state.oldMemberList.total = action.payload.total;
    },
    // getOldMemberListFailed(state) {},

    activeClaimClub(
      state,
      action: PayloadAction<WithCallBack<string | number>>,
    ) {},

    assignAdmin(
      state,
      action: PayloadAction<WithCallBack<AssignAdminParams>>,
    ) {},
    // activeClaimClubSuccess(state) {},
    // activeClaimClubFailed(state, action: PayloadAction<string>) {},

    updateFilter(state, action: PayloadAction<FilterParams>) {
      state.oldMemberList.filter = {
        ...state.oldMemberList.filter,
        ...action.payload,
      };
    },
  },
});

export const { actions: Actions } = slice;

export const useClaimClubDetailsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
