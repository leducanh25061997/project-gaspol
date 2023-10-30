import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import ClubService from 'services/api/clubManagement';

import { PayloadAction } from '@reduxjs/toolkit';

import { showError } from 'utils/commonFunction';

import { WithCallBack } from 'types';

import {
  ClaimClubDetailsResponse,
  OldMemberListResponse,
  OldMemberListRequestParams,
  AssignAdminParams,
} from './types';

import { Actions as actions } from '.';

function* getClaimedClubDetails(action: PayloadAction<string>) {
  try {
    const result: ClaimClubDetailsResponse = yield call(
      ClubService.getClaimedClubDetails,
      action.payload,
    );

    yield put(actions.getClaimedClubDetailsSuccess(result));
  } catch (error: any) {
    showError(error);
  }
}

function* getOldMemberList(action: PayloadAction<OldMemberListRequestParams>) {
  try {
    const result: OldMemberListResponse = yield call(
      ClubService.getOldMemberList,
      action.payload,
    );
    yield put(actions.getOldMemberListSuccess(result));
    yield put(actions.updateFilter(action.payload.filter));
  } catch (error: any) {
    showError(error);
  }
}

function* activeClaimClub(
  action: PayloadAction<WithCallBack<string | number>>,
) {
  try {
    yield call(ClubService.activeClaimClub, action.payload.params);
    action.payload.onSuccess && action.payload.onSuccess();
  } catch (error: any) {
    action.payload.onError && action.payload.onError(error);
  }
}

function* assignAdmin(action: PayloadAction<WithCallBack<AssignAdminParams>>) {
  try {
    yield call(ClubService.assignAdmin, action.payload.params);
    action.payload.onSuccess && action.payload.onSuccess();
  } catch (error: any) {
    action.payload.onError && action.payload.onError(error);
  }
}

export function* Saga() {
  yield takeLatest(actions.getClaimedClubDetails.type, getClaimedClubDetails);
  yield takeLatest(actions.getOldMemberList.type, getOldMemberList);
  yield takeEvery(actions.activeClaimClub.type, activeClaimClub);
  yield takeEvery(actions.assignAdmin.type, assignAdmin);
}
