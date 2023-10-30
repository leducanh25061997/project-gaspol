import { PayloadAction } from '@reduxjs/toolkit';
import { PromoterInformation } from 'types/PromoterManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { promoterInformationSaga } from './saga';
import { PromoterInformationState } from './types';

export const initialState: PromoterInformationState = {};

const slice = createSlice({
  name: 'promoterInformation',
  initialState,
  reducers: {
    fetchPromoterInformation: (state, action: PayloadAction<string>) => {},
    fetchPromoterInformationSuccess: (
      state,
      action: PayloadAction<PromoterInformation>,
    ) => {
      state.promoterInformation = action.payload;
    },
  },
});

export const { actions: promoterInformationActions } = slice;

export const usePromoterInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: promoterInformationSaga });
  return { actions: slice.actions };
};
