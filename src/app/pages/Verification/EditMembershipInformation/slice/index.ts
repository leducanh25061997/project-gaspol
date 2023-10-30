import { PayloadAction } from '@reduxjs/toolkit';
import { IndividualInformation, UserPackage } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { editIndividualMemberSaga } from './saga';
import { EditIndividualMemberState } from './types';

export const initialState: EditIndividualMemberState = {};

const slice = createSlice({
  name: 'editIndividualMember',
  initialState,
  reducers: {
    fetchProvinceRequests: () => {},

    fetchProvinceRequestsSuccess(state, action) {
      state.provinces = action.payload;
    },

    fetchProvinceRequestsFailed: (state, action) => {},

    fetchUrlFileRequest(state, action: PayloadAction<any>) {},

    fetchUrlFileRequestsSuccess: (state, action) => {
      state.fileUploadRequests = action.payload;
    },

    fetchUrlFileRequestsFailed: (state, action) => {},

    editIndividualRequest(state, action) {},

    editIndividualRequestsSuccess: (state, action) => {},
    editIndividualRequestFailed: (state, action) => {},

    fetchMembershipRequestDetail(state, action: PayloadAction<string>) {},
    fetchMembershipRequestDetailSuccess(
      state,
      action: PayloadAction<UserPackage>,
    ) {
      state.userPackage = action.payload;
    },
    fetchMembershipRequestDetailFailed() {},

    fetchIndividualInformation: (state, action: PayloadAction<string>) => {},

    fetchIndividualInformationSuccess: (
      state,
      action: PayloadAction<IndividualInformation>,
    ) => {
      state.individualInformation = action.payload;
    },
  },
});

export const { actions: editIndividualMemberActions } = slice;

export const useEditIndividualMemberSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: editIndividualMemberSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useEditIndividualMemberSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
