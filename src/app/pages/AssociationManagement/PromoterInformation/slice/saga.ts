import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ClubService,
  MemberService,
  MembershipService,
  PromoterService,
} from 'services';
import {
  FilterParams,
  ClubInformation,
  Pageable,
  RequestJoinClubList,
  ClubDocumentSubmit,
  FileUpload,
  ParamsUrl,
  CreateClubFormRequest,
  FormParams,
  IndividualInformation,
} from 'types';
import { UserPackageType } from 'types/enums';

import { promoterInformationActions as actions } from '.';

function* fetchPromoterInformation(action: PayloadAction<string>) {
  try {
    const result: IndividualInformation = yield call(
      PromoterService.fetchIndividualInformation,
      action.payload,
    );
    yield put(actions.fetchPromoterInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* promoterInformationSaga() {
  yield takeLatest(actions.fetchPromoterInformation, fetchPromoterInformation);
}
