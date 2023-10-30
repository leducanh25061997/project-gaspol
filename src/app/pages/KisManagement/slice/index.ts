import { PayloadAction } from '@reduxjs/toolkit';
import { KisInfo, Province, FilterParams, Pageable } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { kisManagementSaga } from './saga';
import { KisManagementState } from './types';

export const initialState: KisManagementState = {
  provinces: [],
};

const slice = createSlice({
  name: 'kisManagement',
  initialState,
  reducers: {
    fetchKisData: (state, action: PayloadAction<FilterParams>) => {
      state.isLoading = false;
    },
    fetchKisByProvince: (state, action: PayloadAction<FilterParams>) => {
      state.isLoading = false;
    },
    fetchKisDataSuccess: (state, action: PayloadAction<Pageable<KisInfo>>) => {
      state.kisPageable = action.payload;
      state.isLoading = true;
    },
    fetchKisDataFailed: () => {},
    fetchProvinces: () => {
      return;
    },
    fetchProvinceRequestsSuccess(state, action: PayloadAction<Province[]>) {
      state.provinces = action.payload;
    },
    fetchProvinceRequestsFailed: (state, action) => {},
    updateProvinceKisRequest(state, action: PayloadAction<FilterParams>) {
      state.isLoading = false;
    },
    updateIMIKisSuccess: (state, action: PayloadAction<KisInfo>) => {
      state.isLoading = true;
      if (state.kisPageable?.data) {
        state.kisPageable.data = state.kisPageable.data.map(kis => {
          if (kis.id === action.payload.id) {
            return action.payload;
          }
          return kis;
        });
      }
    },
    updateIMIKisFailed: (state, action) => {},
    getIMIKisInformation(state, action: PayloadAction<{ id: number }>) {
      state.kisInformation = undefined;
    },
    updateIMIKisInformation: {
      reducer(state) {
        return state;
      },
      prepare(params: KisInfo, meta?: (updatedKis?: KisInfo) => void) {
        return { payload: params, meta };
      },
    },
    getIMIKisInformationSuccess(state, action: PayloadAction<KisInfo>) {
      state.kisInformation = action.payload;
    },
    createKisInformation: {
      reducer(state) {
        return state;
      },
      prepare(params: KisInfo, meta: (createdKis?: KisInfo) => void) {
        return { payload: params, meta };
      },
    },
    getProvinceKisInformation(state, action: PayloadAction<{ id: number }>) {
      state.kisInformation = undefined;
    },
    getProvinceKisInformationSuccess(state, action: PayloadAction<KisInfo>) {
      state.kisInformation = action.payload;
    },
    updateProvinceKisInformation: {
      reducer(state) {
        return state;
      },
      prepare(params: KisInfo, meta?: (updatedKis?: KisInfo) => void) {
        return { payload: params, meta };
      },
    },
    updateProvinceKisInformationSuccess(state, action: PayloadAction<KisInfo>) {
      if (state.kisPageable?.data) {
        state.kisPageable.data = state.kisPageable.data.map(kis => {
          if (kis.id === action.payload.id) {
            return action.payload;
          }
          return kis;
        });
      }
    },
  },
});

export const { actions: kisManagementActions } = slice;

export const useKisManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: kisManagementSaga });
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
