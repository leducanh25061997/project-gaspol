import { PayloadAction } from '@reduxjs/toolkit';
import { Club, ClubResponse, Province } from 'types';
import { CardPrinting } from 'types/CardPrintingManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { cardPrintingManagementSaga } from './saga';
import { CardPrintingManagementState } from './types';

export const initialState: CardPrintingManagementState = {};

const slice = createSlice({
  name: 'cardPrintingManagement',
  initialState,
  reducers: {
    fetchCardPrintingData: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    fetchCardPrintingDataSuccess: (state, action) => {
      state.cardPrintingDataPageable = action.payload;
      state.isLoading = true;
    },
    fetchCardPrintingDataFailed: () => {},

    fetchProvinces() {},
    fetchProvinceSuccess: (state, action: PayloadAction<Province[]>) => {
      state.provinces = action.payload;
    },

    fetchClubs(state, action: PayloadAction<any>) {},
    fetchClubSuccess: (state, action: PayloadAction<ClubResponse>) => {
      state.clubs = action.payload;
    },
    sendProcessDownloadCard: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    sendProcessDownloadCardSuccess: (
      state,
      action: PayloadAction<CardPrinting>,
    ) => {
      state.cardPrinting = action.payload;
    },

    sendProcessDownloadCards: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    sendProcessDownloadCardsSuccess: (
      state,
      action: PayloadAction<CardPrinting>,
    ) => {
      state.cardPrinting = action.payload;
    },

    fetchCardPrintingApprovedData: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    fetchCardPrintingApprovedDataSuccess: (state, action) => {
      state.isLoading = true;
      state.cardPrintingApprovedDataPageable = action.payload;
    },
    fetchCardPrintingApprovedDataFailed: () => {},

    getDownloadLink: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },

    getDownloadLinkSuccess: (state, action) => {
      state.downloadLink = action.payload;
    },

    getExportLink: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },

    getExportLinkSuccess: (state, action) => {
      state.exportLink = action.payload;
    },
  },
});

export const { actions: cardPrintingManagementActions } = slice;

export const useCardPrintingManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: cardPrintingManagementSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMemberManagementSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
