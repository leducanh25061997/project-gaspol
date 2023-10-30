import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import { DashboardData, Province, FilterParams } from 'types';

import statisticService from 'services/api/statisticService';

import { dashboardDataActions as actions } from '.';

function* fetchDashboardData(action: PayloadAction<FilterParams>) {
  try {
    const result: DashboardData = yield call(
      statisticService.fetchDashboardData,
      action.payload,
    );
    yield put(actions.fetchDashboardDataSuccess(result));
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

export function* dashboardDataSaga() {
  yield takeLatest(actions.fetchDashboardData.type, fetchDashboardData);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
}
