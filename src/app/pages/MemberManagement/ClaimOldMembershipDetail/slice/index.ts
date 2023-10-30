import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import {
  ClaimList,
  OldMemberListRequestData,
  OldMemberListType,
} from 'types/ClaimList';

import { ClaimDetailState, OldMemberListDataType } from './types';

import { claimDetailSaga } from './saga';

export const initialState: ClaimDetailState = {
  loading: false,
};

const slice = createSlice({
  name: 'claimDetail',
  initialState,
  reducers: {
    fetchClaimDetail(state, action: PayloadAction<string>) {},
    fetchClaimDetailSuccess: (state, action: PayloadAction<ClaimList>) => {
      state.claimDetail = action.payload;
      state.isActive = false;
    },
    fetchOldMemberList(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    fetchOldMemberListSuccess: (state, action) => {
      state.oldMemberList = action.payload;
      state.isLoading = true;
    },

    rejectRequest(state, action: PayloadAction<any>) {},

    activeOldMember(state, action: PayloadAction<any>) {},
    activeOldMemberSuccess: (state, action) => {
      state.claimDetail = action.payload;
      state.isActive = true;
    },
    activeOldMemberError: (state, action) => {
      state.isActive = false;
    },
    setNavigator: (state, action: PayloadAction<any>) => {
      state.isActive = true;
    },
    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { actions: claimDetailActions } = slice;

export const useClaimDetailSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: claimDetailSaga });
  return { actions: slice.actions };
};
