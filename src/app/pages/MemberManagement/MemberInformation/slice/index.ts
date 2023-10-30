import { PayloadAction } from '@reduxjs/toolkit';
import {
  FilterParams,
  IndividualInformation,
  Pageable,
  RequestPointHistory,
  TransactionHistory,
  CardPrintingRequest,
} from 'types';
import { ClubHistoryRequestData } from 'types/ClubHistoryType';
import {
  CardPrinting,
  RequestDownloadCard,
} from 'types/CardPrintingManagement';

import {
  IndividualInformationV2,
  UserPointParams,
} from 'types/MembershipRequest';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { memberInformationSaga } from './saga';
import { MemberInformationState } from './types';

export const initialState: MemberInformationState = {
  loading: false,
};

const slice = createSlice({
  name: 'memberInformation',
  initialState,
  reducers: {
    fetchIndividualInformation: (state, action: PayloadAction<string>) => {},

    fetchIndividualInformationSuccess: (
      state,
      action: PayloadAction<IndividualInformationV2>,
    ) => {
      state.memberInformation = action.payload;
    },
    fetchPointHistory(state, action: PayloadAction<FilterParams>) {},
    fetchPointHistorySuccess(
      state,
      action: PayloadAction<Pageable<RequestPointHistory>>,
    ) {
      state.pointHistoryPageable = action.payload;
    },
    fetchTransactionHistory(state, action: PayloadAction<any>) {},
    fetchTransactionHistorySuccess(
      state,
      action: PayloadAction<Pageable<TransactionHistory>>,
    ) {
      state.transactionHistoryPageable = action.payload;
    },
    fetchUserPoint(state, action: PayloadAction<UserPointParams>) {},
    fetchUserPointSuccess(state, action: PayloadAction<number>) {
      state.userPoint = action.payload;
    },
    fetchClubHistory(state, action: PayloadAction<ClubHistoryRequestData>) {},
    fetchClubHistorySuccess(state, action) {
      state.clubHistoryPageable = action.payload;
    },
    fetchDownloadHistory(state, action: PayloadAction<CardPrintingRequest>) {},
    fetchDownloadHistorySuccess(state, action) {
      state.downloadHistoryPageable = action.payload;
    },
    sendRequestDownloadCard: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    sendRequestDownloadCardSuccess: (
      state,
      action: PayloadAction<CardPrinting>,
    ) => {
      state.cardPrinting = action.payload;
    },
    fetchMembershipKis(state, action: PayloadAction<FilterParams>) {},
    fetchMembershipKisSuccess(state, action) {
      state.membershipKis = action.payload;
    },

    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { actions: memberInformationActions } = slice;

export const useMemberInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberInformationSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMemberInformationSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
