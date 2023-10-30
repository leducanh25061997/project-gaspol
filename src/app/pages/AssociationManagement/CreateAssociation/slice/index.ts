import { PayloadAction } from '@reduxjs/toolkit';
import { PhoneNumberRequest, AddressRequest, Bank } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import createMemberSaga from './saga';
import { CreateAssociationState } from './types';

export const initialState: CreateAssociationState = {
  clubsRequest: {
    data: [],
    nextToken: '',
    isFetching: false,
    isLastItem: false,
    change: false,
    size: 0,
    requestSize: 0,
    isScroll: false,
  },
  provinceRequests: [],
};

const slice = createSlice({
  name: 'createAssociation',
  initialState,
  reducers: {
    fetchProvinceRequests: () => {
      return;
    },

    fetchProvinceRequestsSuccess(state, action) {
      state.provinceRequests = action.payload;
    },

    fetchProvinceRequestsFailed: (state, action) => {},

    fetchUrlFileRequest(state, action: PayloadAction<any>) {},

    fetchUrlFileRequestsSuccess: (state, action) => {
      state.fileUploadRequests = action.payload;
    },

    fetchUrlFileRequestsFailed: (state, action) => {},

    createAssociationRequest(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },

    createAssociationRequestsSuccess: (state, action) => {
      state.isLoading = false;
    },
    createAssociationRequestsFailed: (state, action) => {
      state.isLoading = false;
    },

    packagesRequest: () => {
      return;
    },

    packagesRequestSuccess: (state, action) => {
      state.packagesRequest = action.payload;
    },

    packagesRequestFailed: (state, action) => {},

    clubsRequest(state, action: PayloadAction<any>) {
      state.clubsRequest.isFetching = true;
    },

    clubsRequestSuccess: (state, action) => {
      if (action.payload.data.length === 0) {
        state.clubsRequest.isLastItem = true;
      }
      if (action.payload.change) {
        state.clubsRequest.isLastItem = false;
      }
      state.clubsRequest.requestSize = action.payload.data?.length;
      state.clubsRequest.size = action.payload.size;
      state.clubsRequest.isScroll = action.payload.isScroll;
      state.clubsRequest.change = action.payload.change;
      state.clubsRequest.data = action.payload.data;
      state.clubsRequest.nextToken = action.payload.nextToken;
      state.clubsRequest.isFetching = false;
    },

    clubsRequestFailed: (state, action) => {
      state.clubsRequest.isFetching = false;
    },

    checkPhoneNumberRequest(state, action: PayloadAction<any>) {},

    checkPhoneNumberRequestSuccess: (state, action) => {
      state.profile = action.payload;
    },

    checkPhoneNumberRequestFailed: (state, action) => {
      state.profile = {};
    },

    checkAssociationName(state, action: PayloadAction<string>) {},
    checkAssociationNameSuccess: (state, action) => {
      state.checkAssociation = action.payload;
    },
    checkAssociationNameFails: (state, action) => {},

    fetchCategories() {},
    fetchCategoriesSuccess(state, action) {
      state.clubCategories = action.payload;
    },

    fetchCity(state, action: PayloadAction<AddressRequest>) {},
    fetchCitySuccess(state, action) {
      state.city = action.payload;
    },

    fetchDistrict(state, action: PayloadAction<AddressRequest>) {},
    fetchDistrictSuccess(state, action) {
      state.district = action.payload;
    },

    fetchWard(state, action: PayloadAction<AddressRequest>) {},
    fetchWardSuccess(state, action) {
      state.ward = action.payload;
    },

    fetchBank() {},
    fetchBankSuccess(state, action: PayloadAction<Bank[]>) {
      state.banks = action.payload;
    },
  },
});

export const { actions: createAssociationActions } = slice;

export const useCreateAssociationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: createMemberSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useCreateMemberSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
