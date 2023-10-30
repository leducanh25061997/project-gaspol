import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import {
  MembershipRequest,
  FilterMemberParams,
  Pageable,
  Province,
} from 'types';

import { promoterManagementActions as actions } from '.';

function* fetchPromotersRequest(action: PayloadAction<FilterMemberParams>) {
  try {
    const result: Pageable<MembershipRequest> = yield call(
      MemberService.fetchMembershipRequest,
      action.payload,
    );
    yield put(actions.fetchPromotersDataSuccess(result));
  } catch (errors) {
    console.log(errors);
  }
}

function* fetchProvinces() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(actions.fetchProvinceSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* promoterManagementSaga() {
  yield takeLatest(actions.fetchPromotersData.type, fetchPromotersRequest);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
}
