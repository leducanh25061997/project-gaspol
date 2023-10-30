import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MembershipService } from 'services';
import { IndividualInformation, MemberJoinClub } from 'types';

import { memberJoinClubDetailActions as actions } from '.';

function* fetchMemberInformation(action: PayloadAction<string>) {
  try {
    const result: IndividualInformation = yield call(
      MembershipService.fetchMemberRequestJoinClub,
      action.payload,
    );
    yield put(actions.fetchMemberInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}
function* approveMember(
  action: PayloadAction<MemberJoinClub, string, (error?: any) => void>,
) {
  try {
    yield call(MembershipService.approveMemberJoinClub, action.payload);
    yield put(actions.approveMemberSuccess());
    action.meta();
  } catch (error: any) {
    console.log(error);
    action.meta(error.response?.data);
  }
}

export function* memberJoinClubDetailSaga() {
  yield takeLatest(actions.fetchMemberInformation.type, fetchMemberInformation);
  yield takeLatest(actions.approveMember.type, approveMember);
}
