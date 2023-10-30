import { PayloadAction } from '@reduxjs/toolkit';
import { PhoneNumberRequest, AddressRequest, ClubListRequest } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import createMemberSaga from './saga';
import { CreateMemberState } from './types';

export const initialState: CreateMemberState = {
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
  name: 'createMember',
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

    createMemberRequest(state, action: PayloadAction<any>) {},

    createMemberRequestsSuccess: (state, action) => {},
    createMemberRequestsFailed: (state, action) => {},

    packagesRequest: () => {
      return;
    },

    packagesRequestSuccess: (state, action) => {
      state.packagesRequest = action.payload;
    },

    packageProRequest: () => {
      return;
    },

    packageProRequestSuccess: (state, action) => {
      state.packageProRequest = action.payload;
    },

    packageProRequestFailed: (state, action) => {},

    clubsRequest(state, action: PayloadAction<ClubListRequest>) {
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

    checkPhoneNumberRequestFailed: (state, action) => {},

    fetchCategories() {},
    fetchCategoriesSuccess(state, action) {
      state.hobby = action.payload;
    },

    fetchCity(state, action: PayloadAction<AddressRequest>) {},
    fetchCitySuccess(state, action) {
      state.city = action.payload;
    },

    fetchBirthPlaceCity(state, action: PayloadAction<AddressRequest>) {},
    fetchBirthPlaceCitySuccess(state, action) {
      state.birthPlaceCity = action.payload;
    },

    fetchDistrict(state, action: PayloadAction<AddressRequest>) {},
    fetchDistrictSuccess(state, action) {
      state.district = action.payload;
    },

    fetchWard(state, action: PayloadAction<AddressRequest>) {},
    fetchWardSuccess(state, action) {
      state.ward = action.payload;
    },
  },
});

export const { actions: createMemberActions } = slice;

export const useCreateMemberSlice = () => {
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
