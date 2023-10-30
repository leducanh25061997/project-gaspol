import { PayloadAction } from '@reduxjs/toolkit';
import { MembershipRequest, Pageable, Province } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { promoterManagementSaga } from './saga';
import { PromoterManagementState } from './types';

export const initialState: PromoterManagementState = {};

const slice = createSlice({
  name: 'promoterManagement',
  initialState,
  reducers: {
    fetchPromotersData(state, action) {
      state.isLoading = false;
    },

    fetchPromotersDataSuccess: (
      state,
      action: PayloadAction<Pageable<MembershipRequest>>,
    ) => {
      state.promoterList = action.payload;
      state.isLoading = true;
    },
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
  },
});

export const { actions: promoterManagementActions } = slice;

export const usePromoterManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: promoterManagementSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useClubManagementSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
