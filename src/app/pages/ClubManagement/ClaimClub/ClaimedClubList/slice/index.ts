import { PayloadAction } from '@reduxjs/toolkit';
import { Province } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { claimedClubSaga } from './saga';
import {
  ClaimedClubListResponse,
  ClaimedClubListState,
  FilterParams,
} from './types';

export const initialState: ClaimedClubListState = {
  data: [],
  loading: true,
  exporting: false,
  provinces: [],
  count: 0,
  filter: {
    page: 0,
    size: 10,
  },
};

const slice = createSlice({
  name: 'claimedClubList',
  initialState,
  reducers: {
    getClaimedClubList(state, action: PayloadAction<FilterParams>) {
      state.loading = true;
    },
    getClaimedClubListSuccess(
      state,
      action: PayloadAction<ClaimedClubListResponse>,
    ) {
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
    },
    getClaimedClubListFailed(state) {
      state.loading = false;
    },

    updateFilter(state, action: PayloadAction<FilterParams>) {
      state.filter = { ...state.filter, ...action.payload };
    },

    exportClubClaimList: {
      reducer(state) {
        state.exporting = true;
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    exportClubClaimListSuccess: (state, action: PayloadAction<any>) => {
      state.exporting = false;
    },
    exportClubClaimListFailed: (state, action: PayloadAction<any>) => {
      state.exporting = false;
    },

    fetchProvince: () => {
      return;
    },
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
  },
});

export const { actions: claimedClubActions } = slice;

export const useClaimedClubListSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: claimedClubSaga });
  return { actions: slice.actions };
};
