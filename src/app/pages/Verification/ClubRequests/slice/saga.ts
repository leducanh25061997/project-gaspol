import { call, takeLatest, put } from 'redux-saga/effects';
import { VerificationService } from 'services';
import { ClubRequest, Pageable } from 'types';

import { clubRequestActions } from '.';

function* fetchClubRequests() {
  try {
    const result: Pageable<ClubRequest> = yield call(
      VerificationService.fetchClubRequests,
    );
    yield put(clubRequestActions.fetchClubRequestsSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

export default function* clubRequestSaga() {
  yield takeLatest(clubRequestActions.fetchClubRequests, fetchClubRequests);
}
