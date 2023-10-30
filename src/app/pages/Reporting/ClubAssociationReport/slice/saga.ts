import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import { Province, FilterParams, ClubReport } from 'types';

import statisticService from 'services/api/statisticService';

import { associationReportActions as actions } from '.';

function* fetchAssociationReport(action: PayloadAction<FilterParams>) {
  try {
    const params = action.payload;
    params.type = 'TAA_ASSOCIATION';
    const result: ClubReport = yield call(
      statisticService.fetchCommonReport,
      params,
    );
    yield put(actions.fetchAssociationReportSuccess(result));
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

export function* associationReportSaga() {
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fetchAssociationReport.type, fetchAssociationReport);
}
