import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  Province,
  FilterParams,
  MemberReport,
  Pageable,
  ClubParams,
  PageableClub,
  Clubdata,
} from 'types';
import statisticService from 'services/api/statisticService';
import {
  ChangeHistory,
  ChangeHistoryParams,
  DownloadCardParams,
  MemberHistory,
  MemberHistoryParams,
  UpgradeKis,
  UpgradeKisParams,
  DownloadCard,
} from 'types/Report';

import { memberReportActions as actions } from '.';

function* fetchMemberReport(action: PayloadAction<FilterParams>) {
  try {
    const result: MemberReport = yield call(
      statisticService.fetchMemberReport,
      action.payload,
    );
    yield put(actions.fetchMemberReportSuccess(result));
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

function* fetchMembershipHistory(action: PayloadAction<MemberHistoryParams>) {
  try {
    const result: Pageable<MemberHistory> = yield call(
      statisticService.fetchMembershipHistory,
      action.payload,
    );
    yield put(actions.fetchMembershipHistorySuccess(result));
  } catch (error) {}
}

function* exportKTAMembership(action: PayloadAction<MemberHistoryParams>) {
  try {
    const result: string = yield call(
      statisticService.exportKTAMembership,
      action.payload,
    );
    yield put(actions.exportKTAMembershipSuccess(result));
  } catch (error: any) {
    yield put(actions.exportKTAMembershipFailed(error));
    window.location.href = error.response.request.responseURL;
  }
}

function* fetchChangeHistory(action: PayloadAction<ChangeHistoryParams>) {
  try {
    const result: Pageable<ChangeHistory> = yield call(
      statisticService.fetchChangeHistory,
      action.payload,
    );
    yield put(actions.fetchChangeHistorySuccess(result));
  } catch (error) {}
}

function* exportChangeHistory(action: PayloadAction<ChangeHistoryParams>) {
  try {
    const result: string = yield call(
      statisticService.exportChangeHistory,
      action.payload,
    );
    yield put(actions.exportChangeHistorySuccess(result));
  } catch (error: any) {
    yield put(actions.exportChangeHistoryFailed(error));
    window.location.href = error.response.request.responseURL;
  }
}

function* fetchUpgradeKis(action: PayloadAction<UpgradeKisParams>) {
  try {
    const result: Pageable<UpgradeKis> = yield call(
      statisticService.fetchUpgradeHistory,
      action.payload,
    );
    yield put(actions.fetchUpgradeKisSuccess(result));
  } catch (error) {}
}

function* exportUpgradeKis(action: PayloadAction<UpgradeKisParams>) {
  try {
    const result: string = yield call(
      statisticService.exportUpgradeHistory,
      action.payload,
    );
    yield put(actions.exportUpgradeKisSuccess(result));
  } catch (error: any) {
    yield put(actions.exportUpgradeKisFailed(error));
    window.location.href = error.response.request.responseURL;
  }
}

function* fetchDownloadCard(action: PayloadAction<DownloadCardParams>) {
  try {
    const result: Pageable<DownloadCard> = yield call(
      statisticService.fetchDownloadCard,
      action.payload,
    );
    yield put(actions.fetchDownloadCardSuccess(result));
  } catch (error) {}
}

function* exportDownloadCard(action: PayloadAction<DownloadCardParams>) {
  try {
    const result: string = yield call(
      statisticService.exportDownloadCard,
      action.payload,
    );
    yield put(actions.exportDownloadCardSuccess(result));
  } catch (error: any) {
    yield put(actions.exportDownloadCardFailed(error));
    window.location.href = error.response.request.responseURL;
  }
}

function* clubsRequest(action: PayloadAction<ClubParams>) {
  try {
    const result: PageableClub<Clubdata> = yield call(
      MemberService.fetchClubs,
      action.payload,
    );
    yield put(actions.clubsRequestSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

export function* memberReportSaga() {
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fetchMemberReport.type, fetchMemberReport);
  yield takeLatest(actions.fetchMembershipHistory.type, fetchMembershipHistory);
  yield takeLatest(actions.exportKTAMembership.type, exportKTAMembership);
  yield takeLatest(actions.fetchChangeHistory.type, fetchChangeHistory);
  yield takeLatest(actions.exportChangeHistory.type, exportChangeHistory);
  yield takeLatest(actions.fetchUpgradeKis.type, fetchUpgradeKis);
  yield takeLatest(actions.exportUpgradeKis.type, exportUpgradeKis);
  yield takeLatest(actions.fetchDownloadCard.type, fetchDownloadCard);
  yield takeLatest(actions.exportDownloadCard.type, exportDownloadCard);
  yield takeLatest(actions.clubsRequest.type, clubsRequest);
}
