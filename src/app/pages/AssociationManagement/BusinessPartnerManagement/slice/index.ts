import { PayloadAction } from '@reduxjs/toolkit';
import { MembershipRequest, Pageable, Province } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { businessPartnerManagementSaga } from './saga';
import { BusinessPartnerManagementState } from './type';

export const initialState: BusinessPartnerManagementState = {};

const slice = createSlice({
  name: 'businessPartnerManagement',
  initialState,
  reducers: {
    fetchMembersData(state, action) {
      state.isLoading = false;
    },

    fetchMembersDataSuccess: (
      state,
      action: PayloadAction<Pageable<MembershipRequest>>,
    ) => {
      state.membersDataPageable = action.payload;
      state.isLoading = true;
    },
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
  },
});

export const { actions: businessPartnerManagementActions } = slice;

export const useMemberManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: businessPartnerManagementSaga });
  return { actions: slice.actions };
};
