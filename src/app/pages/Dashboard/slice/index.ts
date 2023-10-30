import { PayloadAction } from '@reduxjs/toolkit';
import { Club, ClubResponse, Province } from 'types';
import { CardPrinting } from 'types/CardPrintingManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { dashboardDataSaga } from './saga';
import { DashboardDataState } from './types';

export const initialState: DashboardDataState = {};

const slice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    fetchDashboardData: (state, action: PayloadAction<any>) => {},

    fetchDashboardDataSuccess: (state, action) => {
      state.dashboardData = action.payload;
    },
    fetchDashboardDataFailed: () => {},

    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
  },
});

export const { actions: dashboardDataActions } = slice;

export const useDashboardDataSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: dashboardDataSaga });
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
