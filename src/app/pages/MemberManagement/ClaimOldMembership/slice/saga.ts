import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { ClaimService, MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import { Pageable } from 'types';
import { ClaimList, ClaimRequestData } from 'types/ClaimList';

import { claimListActions as actions } from '.';

function* claimList(action: PayloadAction<ClaimRequestData>) {
  try {
    const result: Pageable<ClaimList> = yield call(
      ClaimService.fetchClaimInformation,
      action.payload,
    );
    yield put(actions.fetchClaimListSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

function* exportClaimList(
  action: PayloadAction<ClaimRequestData, string, (error?: any) => void>,
) {
  try {
    const result: string = yield call(
      ClaimService.exportClaimList,
      action.payload,
    );
    yield put(actions.exportClaimListSuccess(result));
  } catch (err: any) {
    yield put(actions.exportClaimListFailed(err));
    window.location.href = err.response.request.responseURL;
  }
  action.meta();
}

export function* claimListSaga() {
  yield takeLatest(actions.fetchClaimList.type, claimList);
  yield takeLatest(actions.exportClaimList.type, exportClaimList);
}
