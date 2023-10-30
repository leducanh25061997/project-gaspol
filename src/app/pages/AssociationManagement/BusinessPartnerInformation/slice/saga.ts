import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MembershipService } from 'services';

import { MembershipRequest } from 'types';

import { clubInformationActions as actions } from '.';

function* fetchBusinessPartnerInformation(action: PayloadAction<string>) {
  try {
    const result: MembershipRequest = yield call(
      MembershipService.fetchBusinessPartnerInformation,
      action.payload,
    );
    yield put(actions.fetchBusinessPartnerInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* businessPartnerInformationSaga() {
  yield takeLatest(
    actions.fetchBusinessPartnerInformation.type,
    fetchBusinessPartnerInformation,
  );
}
