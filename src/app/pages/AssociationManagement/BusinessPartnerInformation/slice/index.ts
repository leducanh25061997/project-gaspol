import { PayloadAction } from '@reduxjs/toolkit';
import {
  FilterParams,
  MembershipRequest,
  Pageable,
  RequestJoinClubList,
  Document,
  ClubDocumentSubmit,
} from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { businessPartnerInformationSaga } from './saga';
import { BusinessPartnerInformationState } from './type';

export const initialState: BusinessPartnerInformationState = {};

const slice = createSlice({
  name: 'businessPartnerInformation',
  initialState,
  reducers: {
    fetchBusinessPartnerInformation: (
      state,
      action: PayloadAction<string>,
    ) => {},
    fetchBusinessPartnerInformationSuccess: (
      state,
      action: PayloadAction<MembershipRequest>,
    ) => {
      state.businessPartnerInformation = action.payload;
    },
  },
});

export const { actions: clubInformationActions } = slice;

export const useBusinessPartnerInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: businessPartnerInformationSaga });
  return { actions: slice.actions };
};
