import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import { Province, FilterParams, ClubReport, Pageable } from 'types';
import { TktClub, TktClubParams } from 'types/Report';
import statisticService from 'services/api/statisticService';

import { clubReportActions as actions } from '.';

function* fetchClubReport(action: PayloadAction<FilterParams>) {
  try {
    const params = action.payload;
    params.type = 'TKT';
    const result: ClubReport = yield call(
      statisticService.fetchCommonReport,
      params,
    );
    yield put(actions.fetchClubReportSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

function* fetchProvinces() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(actions.fetchProvinceSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchTKTClub(action: PayloadAction<TktClubParams>) {
  try {
    const result: Pageable<TktClub> = yield call(
      statisticService.fetchTktClub,
      action.payload,
    );
    yield put(actions.fetchTKTClubSuccess(result));
  } catch (error) {
    yield put(actions.fetchTKTClubFailed(error));
  }
}

function* exportTKTClub(action: PayloadAction<TktClubParams>) {
  try {
    const result: string = yield call(
      statisticService.exportTktClub,
      action.payload,
    );
    yield put(actions.exportTKTClubSuccess(result));
  } catch (error: any) {
    yield put(actions.exportTKTClubFailed(error));
    window.location.href = error.response.request.responseURL;
  }
}

export function* clubReportSaga() {
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fetchClubReport.type, fetchClubReport);
  yield takeLatest(actions.exportTKTClub.type, exportTKTClub);
  yield takeLatest(actions.fetchTKTClub.type, fetchTKTClub);
}
