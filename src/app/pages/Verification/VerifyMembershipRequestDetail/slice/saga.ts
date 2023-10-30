import { UserPackageService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UserPackage } from 'types';

import { membershipRequestDetailActions as actions } from '.';

function* fetchMembershipRequestDetail(action: PayloadAction<string>) {
  try {
    const result: UserPackage = yield call(
      UserPackageService.fetchUserPackageInfo,
      action.payload,
    );
    yield put(actions.fetchMembershipRequestDetailSuccess(result));
  } catch (error) {
    yield put(actions.fetchMembershipRequestDetailFailed());
    console.log(
      '🚀 ~ file: saga.ts ~ line 9 ~ function*fetchMembershipRequestDetail ~ error',
      error,
    );
  }
}

function* approveMembershipRequest(
  action: PayloadAction<number, string, (error?: any) => void>,
) {
  try {
    yield call(UserPackageService.approveUserPackage, action.payload);
    action.meta();
  } catch (err) {
    action.meta(err);
    console.log(err);
  }
}

export function* membershipRequestDetailSaga() {
  yield takeLatest(
    actions.fetchMembershipRequestDetail.type,
    fetchMembershipRequestDetail,
  );
  yield takeLatest(
    actions.approveMembershipRequest.type,
    approveMembershipRequest,
  );
}
