import { PayloadAction } from '@reduxjs/toolkit';
import { MembershipRequest, Pageable, Province } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { clubManagementSaga } from './saga';
import { ClubManagementState } from './types';

export const initialState: ClubManagementState = {};

const slice = createSlice({
  name: 'clubManagement',
  initialState,
  reducers: {
    fetchClubsData(state, action) {
      state.isLoading = false;
    },

    fetchClubsDataSuccess: (
      state,
      action: PayloadAction<Pageable<MembershipRequest>>,
    ) => {
      state.clubList = action.payload;
      state.isLoading = true;
    },
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },
  },
});

export const { actions: clubManagementActions } = slice;

export const useClubManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubManagementSaga });
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
