import { PayloadAction } from '@reduxjs/toolkit';
import { Pageable, Province } from 'types';
import {
  ChangeHistory,
  DownloadCard,
  MemberHistory,
  UpgradeKis,
} from 'types/Report';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { memberReportSaga } from './saga';
import { MemberReportState } from './types';

export const initialState: MemberReportState = {};

const slice = createSlice({
  name: 'memberReport',
  initialState,
  reducers: {
    fetchMemberReport: (state, action: PayloadAction<any>) => {},
    fetchMemberReportSuccess: (state, action) => {
      state.memberReport = action.payload;
    },
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
    fetchMembershipHistory: (state, action: PayloadAction<any>) => {
      state.isLoadingKTA = false;
    },
    fetchMembershipHistorySuccess: (
      state,
      action: PayloadAction<Pageable<MemberHistory>>,
    ) => {
      state.membershipHistory = action.payload;
      state.isLoadingKTA = true;
    },
    exportKTAMembership: (state, action: PayloadAction<any>) => {
      state.isLoadingExportKTA = true;
    },
    exportKTAMembershipSuccess: (state, action: PayloadAction<any>) => {
      state.isLoadingExportKTA = false;
    },
    exportKTAMembershipFailed: (state, action: PayloadAction<any>) => {
      state.isLoadingExportKTA = false;
    },

    fetchChangeHistory: (state, action: PayloadAction<any>) => {
      state.isLoadingChangeHistory = false;
    },
    fetchChangeHistorySuccess: (
      state,
      action: PayloadAction<Pageable<ChangeHistory>>,
    ) => {
      state.changeHistoryClub = action.payload;
      state.isLoadingChangeHistory = true;
    },
    exportChangeHistory: (state, action: PayloadAction<any>) => {
      state.isLoadingExportChangeHistory = true;
    },
    exportChangeHistorySuccess: (state, action: PayloadAction<any>) => {
      state.isLoadingExportChangeHistory = false;
    },
    exportChangeHistoryFailed: (state, action: PayloadAction<any>) => {
      state.isLoadingExportChangeHistory = false;
    },
    fetchUpgradeKis: (state, action: PayloadAction<any>) => {
      state.isLoadingUpgradeKis = false;
    },
    fetchUpgradeKisSuccess: (
      state,
      action: PayloadAction<Pageable<UpgradeKis>>,
    ) => {
      state.upgradeKis = action.payload;
      state.isLoadingUpgradeKis = true;
    },
    exportUpgradeKis: (state, action: PayloadAction<any>) => {
      state.isLoadingExportUpgradeKis = true;
    },
    exportUpgradeKisSuccess: (state, action: PayloadAction<any>) => {
      state.isLoadingExportUpgradeKis = false;
    },
    exportUpgradeKisFailed: (state, action: PayloadAction<any>) => {
      state.isLoadingExportUpgradeKis = false;
    },

    fetchDownloadCard: (state, action: PayloadAction<any>) => {
      state.isLoadingDownloadCard = false;
    },
    fetchDownloadCardSuccess: (
      state,
      action: PayloadAction<Pageable<DownloadCard>>,
    ) => {
      state.downloadCard = action.payload;
      state.isLoadingDownloadCard = true;
    },
    exportDownloadCard: (state, action: PayloadAction<any>) => {
      state.isLoadingExportDownloadCard = true;
    },
    exportDownloadCardSuccess: (state, action: PayloadAction<any>) => {
      state.isLoadingExportDownloadCard = false;
    },
    exportDownloadCardFailed: (state, action: PayloadAction<any>) => {
      state.isLoadingExportDownloadCard = false;
    },
    clubsRequest(state, action: PayloadAction<any>) {},

    clubsRequestSuccess: (state, action) => {
      state.clubsRequest = action.payload;
    },

    clubsRequestFailed: (state, action) => {},
  },
});

export const { actions: memberReportActions } = slice;

export const useMemberReportSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberReportSaga });
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
