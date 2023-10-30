import { PayloadAction } from '@reduxjs/toolkit';
import { AssociationInformationType } from 'types/AssociationManagement';
import { PromoterInformation } from 'types/PromoterManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { associationInformationSaga } from './saga';
import { ClubAssociationInformationState } from './types';

export const initialState: ClubAssociationInformationState = {};

const slice = createSlice({
  name: 'clubAssociationInformation',
  initialState,
  reducers: {
    fetchAssociationInformation: (state, action: PayloadAction<string>) => {},
    fetchAssociationInformationSuccess: (
      state,
      action: PayloadAction<AssociationInformationType>,
    ) => {
      state.associationInformation = action.payload;
    },
    fetchClubAssociationInformation: (state, action: PayloadAction<any>) => {},
    fetchClubAssociationInformationSuccess: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.clubAssociationInformation = action.payload;
    },
    approveDocuments: (state, action: PayloadAction<any>) => {},
    approveDocumentsSuccess: (state, action: PayloadAction<any>) => {
      state.isApproved = true;
    },
    fetchCategories() {},
    fetchCategoriesSuccess(state, action) {
      state.clubCategories = action.payload;
    },
  },
});

export const { actions: associationInformationActions } = slice;

export const useAssociationInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: associationInformationSaga });
  return { actions: slice.actions };
};
