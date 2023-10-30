import { PayloadAction } from '@reduxjs/toolkit';
import {
  FilterParams,
  ClubInformation,
  Pageable,
  RequestJoinClubList,
  ClubDocumentSubmit,
  IndividualInformation,
} from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { clubInformationSaga } from './saga';
import { ClubInformationState } from './types';

export const initialState: ClubInformationState = {
  clubCategories: [],
};

const slice = createSlice({
  name: 'clubInformation',
  initialState,
  reducers: {
    fetchClubInformation: (state, action: PayloadAction<string>) => {},
    fetchClubInformationSuccess: (
      state,
      action: PayloadAction<ClubInformation>,
    ) => {
      state.clubInformation = action.payload;
    },
    fetchListMemberOfClub(state, action: PayloadAction<FilterParams>) {},
    fetchListMemberOfClubSuccess(
      state,
      action: PayloadAction<Pageable<RequestJoinClubList>>,
    ) {
      state.clubMembersPageable = action.payload;
    },
    submitClubDocuments: (
      state,
      action: PayloadAction<ClubDocumentSubmit>,
    ) => {},
    submitClubDocumentSuccess: (state, action: PayloadAction<string>) => {},
    submitClubDocumentFailed: (state, action: PayloadAction<string>) => {},
    submitApprovalCubDocuments: (
      state,
      action: PayloadAction<IndividualInformation>,
    ) => {},
    submitApprovalCubDocumentsSuccess: (
      state,
      action: PayloadAction<ClubInformation>,
    ) => {
      // state.clubInformation = action.payload;
    },
    submitApprovalCubDocumentsFailed: (
      state,
      action: PayloadAction<string>,
    ) => {},

    fetchCategories() {},

    fetchClubCategoriesSuccess(state, action) {
      state.clubCategories = action.payload;
    },
  },
});

export const { actions: clubInformationActions } = slice;

export const useClubInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: clubInformationSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useClubInformationSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
