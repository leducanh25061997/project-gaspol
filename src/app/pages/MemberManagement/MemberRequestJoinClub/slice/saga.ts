import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ClubService } from 'services';
import { FilterParams, Pageable, RequestJoinClubList } from 'types';

import { memberRequestJoinClubActions as actions } from '.';

function* fetchMembersList(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<RequestJoinClubList> = yield call(
      ClubService.filterMemberJoinClubRequest,
      action.payload,
    );
    yield put(actions.fetchMembersListSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* memberRequestJoinClubSaga() {
  yield takeLatest(actions.fetchMembersList.type, fetchMembersList);
}
