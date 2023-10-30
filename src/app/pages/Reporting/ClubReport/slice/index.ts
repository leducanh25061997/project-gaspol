import { PayloadAction } from '@reduxjs/toolkit';
import { Pageable, Province } from 'types';
import { TktClub } from 'types/Report';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { clubReportSaga } from './saga';
import { ClubReportState } from './types';

export const initialState: ClubReportState = {};

const slice = createSlice({
  name: 'clubReport',
  initialState,
  reducers: {
    fetchClubReport: (state, action: PayloadAction<any>) => {},
    fetchClubReportSuccess: (state, action) => {
      state.clubReport = action.payload;
    },
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
    fetchTKTClub: (state, action: PayloadAction<any>) => {
      state.isLoadingTKTClub = true;
    },
    fetchTKTClubSuccess: (state, action: PayloadAction<Pageable<TktClub>>) => {
      state.TKTClub = action.payload;
      state.isLoadingTKTClub = false;
    },
    fetchTKTClubFailed: (state, action: PayloadAction<any>) => {
      state.isLoadingTKTClub = false;
    },
    exportTKTClub: (state, action: PayloadAction<any>) => {
      state.isLoadingExportTKTClub = true;
    },
    exportTKTClubSuccess: (state, action) => {
      state.isLoadingExportTKTClub = false;
    },
    exportTKTClubFailed: (state, action) => {
      state.isLoadingExportTKTClub = false;
    },
  },
});

export const { actions: clubReportActions } = slice;

export const useClubReportSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubReportSaga });
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
