import { PayloadAction } from '@reduxjs/toolkit';
import { Province } from 'types';
import {
  CardPrinting,
  RequestDownloadCard,
} from 'types/CardPrintingManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { memberManagementSaga } from './saga';
import { MemberManagementState } from './types';

export const initialState: MemberManagementState = {};

const slice = createSlice({
  name: 'memberManagement',
  initialState,
  reducers: {
    fetchMembersData: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    fetchMembersDataSuccess: (state, action) => {
      state.membersDataPageable = action.payload;
      state.isLoading = true;
    },
    fetchMembersDataFailed: state => {
      state.isLoading = false;
    },

    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
    // sendRequestDownloadCard(
    //   state,
    //   action: PayloadAction<RequestDownloadCard>,
    // ) {},
    sendRequestDownloadCard: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    sendRequestDownloadCardSuccess: (
      state,
      action: PayloadAction<CardPrinting>,
    ) => {
      state.cardPrinting = action.payload;
    },
  },
});

export const { actions: memberManagementActions } = slice;

export const useMemberManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberManagementSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMemberManagementSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
