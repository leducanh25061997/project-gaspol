import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import {
  MembershipRequest,
  Pageable,
  FilterMemberParams,
  Province,
} from 'types';

import { businessPartnerManagementActions as actions } from '.';

function* businessPartnerManagement(action: PayloadAction<FilterMemberParams>) {
  try {
    const result: Pageable<MembershipRequest> = yield call(
      MemberService.fetchMembershipRequest,
      action.payload,
    );
    yield put(actions.fetchMembersDataSuccess(result));
  } catch (error) {
    console.log(error);
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

export function* businessPartnerManagementSaga() {
  yield takeLatest(actions.fetchMembersData.type, businessPartnerManagement);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
}
