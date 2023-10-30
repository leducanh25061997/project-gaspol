import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import { MembershipRequest, Pageable, Province, clubFilterParams } from 'types';

import { clubManagementActions as actions } from '.';

function* fetchClubsRequest(action: PayloadAction<clubFilterParams>) {
  try {
    const result: Pageable<MembershipRequest> = yield call(
      MemberService.newFetchAdminMembership,
      action.payload,
    );
    yield put(actions.fetchClubsDataSuccess(result));
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

export function* clubManagementSaga() {
  yield takeLatest(actions.fetchClubsData.type, fetchClubsRequest);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
}
