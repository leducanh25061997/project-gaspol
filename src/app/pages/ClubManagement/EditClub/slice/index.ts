import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import {
  CreateClubFormRequest,
  PhoneNumberRequest,
  AddressRequest,
  ClubInformation,
  Bank,
  EditClubFormRequest,
  FilterParams,
  RequestJoinClubList,
  Pageable,
} from 'types';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

import { EditClubState } from './types';
import { clubManagementEditSaga } from './saga';

export const initialState: EditClubState = {
  club: {},
  provinces: [],
  clubCategories: [],
  packages: [],
  profile: {},
};

const slice = createSlice({
  name: 'editClub',
  initialState,
  reducers: {
    // updateClub: {
    //   reducer(state) {
    //     return state;
    //   },
    //   prepare(
    //     params: EditClubFormRequest | undefined,
    //     meta: (error?: any) => void,
    //   ) {
    //     return { payload: params, meta };
    //   },
    // },
    fetchClub(state, action: PayloadAction<string>) {},
    fetchClubSuccess(state, action: PayloadAction<ClubInformation>) {
      state.club = action.payload;
    },
    fetchClubFailed(state, action: PayloadAction<string>) {},

    updateClub(state, action: PayloadAction<any>) {},
    updateClubSuccess() {},
    updateClubFailed() {},

    fetchUrlFileRequestsSuccess: (state, action) => {
      state.fileUploadRequests = action.payload;
    },

    fetchCategories() {},
    fetchPackages() {},
    fetchBank() {},
    fetchBankSuccess(state, action: PayloadAction<Bank[]>) {
      state.banks = action.payload;
    },
    fetchProvinces() {},
    fetchProvinceSuccess(state, action) {
      state.provinces = action.payload;
    },
    fetchMembershipSuccess(state, action) {
      state.membership = action.payload;
    },
    fetchPackagesSuccess(state, action) {
      state.packages = action.payload;
    },
    fetchClubCategoriesSuccess(state, action) {
      state.clubCategories = action.payload;
    },
    fetchKisCategoriesSuccess(state, action) {
      state.kisCategories = action.payload;
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
    checkPhoneNumberRequest(
      state,
      action: PayloadAction<PhoneNumberRequest>,
    ) {},

    checkPhoneNumberRequestSuccess: (state, action) => {
      state.profile = action.payload;
    },

    checkPhoneNumberRequestFailed: (state, action) => {
      state.profile = action.payload?.response?.data?.messages[0];
    },

    fetchListMemberOfClub(state, action: PayloadAction<FilterParams>) {},
    fetchListMemberOfClubSuccess(
      state,
      action: PayloadAction<Pageable<RequestJoinClubList>>,
    ) {
      state.clubMembersPageable = action.payload;
    },

    resetProfile: () => {},
    resetProfileSucess: state => {
      state.profile = {};
    },

    checkClubnameRequest: {
      reducer(state) {
        return state;
      },
      prepare(
        params: ClubNameRequest,
        meta?: (clubNameResponse?: ClubNameResponse) => void,
      ) {
        return { payload: params, meta };
      },
    },

    checkClubnameRequestSuccess(
      state,
      action: PayloadAction<ClubNameResponse>,
    ) {},
  },
});

export const { actions: clubManagementEditActions } = slice;

export const useClubManagementEditSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubManagementEditSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useClubManagementCreateSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
