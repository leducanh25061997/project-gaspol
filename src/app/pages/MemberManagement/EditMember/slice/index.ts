import { PayloadAction } from '@reduxjs/toolkit';
import {
  PhoneNumberRequest,
  AddressRequest,
  IndividualInformation,
  ClubDocumentSubmit,
  IndividualInformationV2,
} from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import editMemberSaga from './saga';
import { EditMemberState } from './types';

export const initialState: EditMemberState = {
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
  birthPlaceCity: [],
  loading: false,
};

const slice = createSlice({
  name: 'editMember',
  initialState,
  reducers: {
    fetchIndividualInformation: (state, action: PayloadAction<string>) => {},

    fetchIndividualInformationSuccess: (
      state,
      action: PayloadAction<IndividualInformationV2>,
    ) => {
      state.memberInformation = action.payload;
    },

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

    editMemberRequest(state, action) {},

    editMemberRequestsSuccess: (state, action) => {},
    editMemberRequestsFailed: (state, action) => {},

    submitClubDocuments: (
      state,
      action: PayloadAction<ClubDocumentSubmit>,
    ) => {},
    submitClubDocumentSuccess: (state, action: PayloadAction<string>) => {},
    submitClubDocumentFailed: (state, action: PayloadAction<string>) => {},

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

    checkPhoneNumberRequestFailed: (state, action) => {},

    checkKtaNumberUnique(state, action: PayloadAction<any>) {},

    checkKtaNumberRequestSuccess: (state, action) => {
      state.checkKtaNumberUnique = action.payload;
    },

    checkNumberRequestFailed: (state, action) => {},

    fetchCategories() {},
    fetchCategoriesSuccess(state, action) {
      state.hobby = action.payload;
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

    fetchBirthPlaceCity(state, action: PayloadAction<AddressRequest>) {},
    fetchBirthPlaceCitySuccess(state, action) {
      state.birthPlaceCity = action.payload;
    },

    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { actions: editMemberActions } = slice;

export const useEditMemberSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: editMemberSaga });
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
