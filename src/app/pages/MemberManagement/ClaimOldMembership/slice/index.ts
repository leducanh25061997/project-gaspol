import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { claimListSaga } from './saga';
import { ClaimListState } from './types';

export const initialState: ClaimListState = {};

const slice = createSlice({
  name: 'claimList',
  initialState,
  reducers: {
    fetchClaimList: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    fetchClaimListSuccess: (state, action) => {
      state.claimList = action.payload;
      state.isLoading = true;
    },
    fetchClaimListFailed: state => {
      state.isLoading = false;
    },
    exportClaimList: {
      reducer(state) {
        state.exporting = true;
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    exportClaimListSuccess: (state, action: PayloadAction<any>) => {
      state.exporting = false;
    },
    exportClaimListFailed: (state, action: PayloadAction<any>) => {
      state.exporting = false;
    },
  },
});

export const { actions: claimListActions } = slice;

export const useClaimListSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: claimListSaga });
  return { actions: slice.actions };
};
