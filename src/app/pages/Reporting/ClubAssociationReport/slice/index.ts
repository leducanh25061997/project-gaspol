import { PayloadAction } from '@reduxjs/toolkit';
import { Province } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { associationReportSaga } from './saga';
import { AssociationReportState } from './types';

export const initialState: AssociationReportState = {};

const slice = createSlice({
  name: 'associationReport',
  initialState,
  reducers: {
    fetchAssociationReport: (state, action: PayloadAction<any>) => {},
    fetchAssociationReportSuccess: (state, action) => {
      state.associationReport = action.payload;
    },
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
  },
});

export const { actions: associationReportActions } = slice;

export const useAssociationReportSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: associationReportSaga });
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
