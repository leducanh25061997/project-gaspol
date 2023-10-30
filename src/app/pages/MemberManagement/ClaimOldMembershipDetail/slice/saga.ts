import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ClaimService } from 'services';
import Notifier from 'app/pages/Notifier';
import {
  ActiveOldMemberListData,
  ClaimList,
  OldMemberListRequestData,
  OldMemberListType,
} from 'types/ClaimList';

import { Pageable } from 'types';

import { claimDetailActions as actions } from '.';

function* fetchClaimDetail(action: PayloadAction<string>) {
  try {
    yield put(actions.updateLoading(true));
    const result: ClaimList = yield call(
      ClaimService.fetchClaimDetail,
      action.payload,
    );
    yield put(actions.fetchClaimDetailSuccess(result));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(actions.updateLoading(false));
  }
}

function* fetchOldMemberList(action: PayloadAction<OldMemberListRequestData>) {
  try {
    const result: Pageable<OldMemberListType> = yield call(
      ClaimService.fetchOldMemberList,
      action.payload,
    );
    yield put(actions.fetchOldMemberListSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* activeOldMember(action: PayloadAction<ActiveOldMemberListData>) {
  try {
    const result: Pageable<OldMemberListType> = yield call(
      ClaimService.activeOldMemberList,
      action.payload,
    );
    yield put(actions.activeOldMemberSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'Updating is successful',
    });
  } catch (error) {
    yield put(actions.activeOldMemberError(undefined));
    Notifier.addNotifyError({
      messageId: 'Updating is failed',
    });
  }
}

function* rejectRequest(action: PayloadAction<any>) {
  try {
    const result: ClaimList = yield call(
      ClaimService.rejectRequest,
      action.payload,
    );
    const { navigate } = action.payload;
    navigate(`/memberships/member-claim`);
    Notifier.addNotifySuccess({
      messageId: 'common.rejectSuccess',
    });
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'common.rejectFailed',
    });
  }
}

function* setNavigator() {}

export function* claimDetailSaga() {
  yield takeLatest(actions.fetchClaimDetail.type, fetchClaimDetail);
  yield takeLatest(actions.fetchOldMemberList.type, fetchOldMemberList);
  yield takeLatest(actions.activeOldMember.type, activeOldMember);
  yield takeLatest(actions.setNavigator.type, setNavigator);
  yield takeLatest(actions.rejectRequest.type, rejectRequest);
}
