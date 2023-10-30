import { PayloadAction } from '@reduxjs/toolkit';
import { Pageable, Province } from 'types';
import {
  AssociationList,
  AssociationManagement,
} from 'types/AssociationManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { clubAssociationManagementSaga } from './saga';

import { ClubAssociationManagementState } from './type';

export const initialState: ClubAssociationManagementState = {};

const slice = createSlice({
  name: 'clubAssociationManagement',
  initialState,
  reducers: {
    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },

    fetchAssociationList(state, action) {
      state.isLoading = false;
    },
    fetchAssociationSuccess: (
      state,
      action: PayloadAction<Pageable<AssociationList>>,
    ) => {
      state.associationManagement = action.payload;
      state.isLoading = true;
    },
  },
});

export const { actions: clubAssociationManagementActions } = slice;

export const useClubAssociationManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubAssociationManagementSaga });
  return { actions: slice.actions };
};
