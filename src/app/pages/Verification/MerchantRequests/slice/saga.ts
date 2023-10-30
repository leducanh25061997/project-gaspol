import { PayloadAction } from '@reduxjs/toolkit';
import {
  FilterParams,
  MembershipRequest,
  MerchantRequests,
  Pageable,
} from 'types';
import { UserPackageService } from 'services';
import { call, takeLatest, put } from 'redux-saga/effects';

import { merchantRequestActions as actions } from '.';

function* merchantRequests(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<MerchantRequests> = yield call(
      UserPackageService.fetchMerchantRequests,
      action.payload,
    );
    yield put(actions.fetchMerchantRequestsSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

export function* merchantRequestSaga() {
  yield takeLatest(actions.fetchMerchantRequests.type, merchantRequests);
}
