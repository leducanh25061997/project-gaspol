import { PayloadAction } from '@reduxjs/toolkit';
import { FilterParams, MerchantRequests, Pageable } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { merchantRequestSaga } from './saga';
import { MerchantRequestState } from './types';

export const initialState: MerchantRequestState = {};

const slice = createSlice({
  name: 'merchantRequest',
  initialState,
  reducers: {
    fetchMerchantRequests: (state, action: PayloadAction<FilterParams>) => {},
    fetchMerchantRequestsSuccess: (
      state,
      action: PayloadAction<Pageable<MerchantRequests>>,
    ) => {
      state.merchantRequestsPageable = action.payload;
    },
    fetchMerchantRequestsFailed: (state, action) => {},
  },
});

export const { actions: merchantRequestActions } = slice;

export const useMerchantRequestSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: merchantRequestSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMerchantRequestSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
