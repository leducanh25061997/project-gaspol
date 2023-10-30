import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest, put } from 'redux-saga/effects';
import { UserPackageService } from 'services';
import { FilterParams, MembershipRequest, Pageable } from 'types';

import { membershipRequestsActions } from '.';

function* membershipRequest(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<MembershipRequest> = yield call(
      UserPackageService.fetchMembershipRequests,
      action.payload,
    );
    yield put(membershipRequestsActions.fetchMembershipRequestsSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

export default function* membershipRequestsSaga() {
  yield takeLatest(
    membershipRequestsActions.fetchMembershipRequests.type,
    membershipRequest,
  );
}
