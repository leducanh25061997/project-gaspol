import ClubService from 'services/api/clubManagement';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { MemberService } from 'services';

import { Province } from 'types';

import { ClaimedClubListResponse, FilterParams } from './types';

import { claimedClubActions as actions } from '.';

// function* doSomething() {}
function* getClaimedClubList(action: PayloadAction<FilterParams>) {
  try {
    const result: ClaimedClubListResponse = yield call(
      ClubService.getClaimedClubList,
      action.payload,
    );
    yield put(actions.getClaimedClubListSuccess(result));
    yield put(actions.updateFilter(action.payload));
  } catch (error) {
    yield put(actions.getClaimedClubListFailed());
  }
}

export function* exportClubClaimList(
  action: PayloadAction<FilterParams, string, (error?: any) => void>,
) {
  try {
    const result: string = yield call(
      ClubService.exportClubClaimList,
      action.payload,
    );
    yield put(actions.exportClubClaimListSuccess(result));
  } catch (err: any) {
    yield put(actions.exportClubClaimListFailed(err));
    window.location.href = err.response.request.responseURL;
  }
  action.meta();
}

export function* fetchProvince() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(actions.fetchProvinceSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* claimedClubSaga() {
  yield takeLatest(actions.getClaimedClubList.type, getClaimedClubList);
  yield takeLatest(actions.exportClubClaimList.type, exportClubClaimList);
  yield takeLatest(actions.fetchProvince, fetchProvince);
}
