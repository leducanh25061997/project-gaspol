import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { clubManagementCreateSaga } from 'app/pages/ClubManagement/CreateClub/slice/saga';
import { CreateClubState } from 'app/pages/ClubManagement/CreateClub/slice/types';
import {
  CreateClubFormRequest,
  PhoneNumberRequest,
  AddressRequest,
  Bank,
} from 'types';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

export const initialState: CreateClubState = {
  provinces: [],
  clubCategories: [],
  profile: {},
};

const slice = createSlice({
  name: 'createClub',
  initialState,
  reducers: {
    // createClub: {
    //   reducer(state) {
    //     return state;
    //   },
    //   prepare(
    //     params: CreateClubFormRequest | undefined,
    //     meta: (error?: any) => void,
    //   ) {
    //     return { payload: params, meta };
    //   },
    // },

    createClub(state, action: PayloadAction<any>) {},
    createClubSuccess() {},
    createClubFailed() {},
    fetchCategories() {},
    fetchPackages() {},
    fetchProvinces() {},
    fetchProvinceSuccess(state, action) {
      state.provinces = action.payload;
    },
    fetchMembershipSuccess(state, action) {
      state.membership = action.payload;
    },
    fetchPackagesSuccess(state, action) {
      state.package = action.payload;
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
    fetchBank() {},
    fetchBankSuccess(state, action: PayloadAction<Bank[]>) {
      state.banks = action.payload;
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

    checkClubnameFailed: (state, action) => {},

    fetchUrlFileRequestsSuccess: (state, action) => {
      state.fileUploadRequests = action.payload;
    },

    packageProRequest: () => {
      return;
    },

    packageProRequestSuccess: (state, action) => {
      state.packageProRequest = action.payload;
    },

    packageProRequestFailed: (state, action) => {},

    resetProfile: () => {},
    resetProfileSucess: state => {
      state.profile = {};
    },
  },
});

export const { actions: clubManagementCreateActions } = slice;

export const useClubManagementCreateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubManagementCreateSaga });
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
