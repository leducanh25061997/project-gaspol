import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MembershipService } from 'services';
import cardPrintingService from 'services/api/cardPrintingService';
import {
  CardPrintingRequest,
  FilterParams,
  IndividualInformationV2,
  Pageable,
  RequestPointHistory,
  TransactionHistory,
} from 'types';
import { ClubHistoryRequestData, ClubHistoryType } from 'types/ClubHistoryType';
import {
  RequestDownloadCard,
  CardPrinting,
} from 'types/CardPrintingManagement';
import {
  TransactionRequestData,
  UserPointParams,
  MembershipKis,
} from 'types/MembershipRequest';

import { memberInformationActions as actions } from '.';

function* fetchIndividualInformation(action: PayloadAction<string>) {
  try {
    yield put(actions.updateLoading(true));
    const result: IndividualInformationV2 = yield call(
      MembershipService.fetchIndividualInformation,
      action.payload,
    );
    yield put(actions.fetchIndividualInformationSuccess(result));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(actions.updateLoading(false));
  }
}

function* fetchPointHistory(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<RequestPointHistory> = yield call(
      MembershipService.fetchPointHistory,
      action.payload,
    );
    yield put(actions.fetchPointHistorySuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchTransactionHistory(
  action: PayloadAction<TransactionRequestData>,
) {
  try {
    const result: Pageable<TransactionHistory> = yield call(
      MembershipService.fetchTransactionHistory,
      action.payload,
    );
    yield put(actions.fetchTransactionHistorySuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchUserPoint(action: PayloadAction<UserPointParams>) {
  try {
    const result: number = yield call(
      MembershipService.fetchUserPoint,
      action.payload,
    );
    yield put(actions.fetchUserPointSuccess(result));
  } catch (error) {
    console.log(error);
  }
}
function* fetchClubHistory(action: PayloadAction<ClubHistoryRequestData>) {
  try {
    const result: Pageable<ClubHistoryType> = yield call(
      MembershipService.fetchChangeClubHistory,
      action.payload,
    );
    yield put(actions.fetchClubHistorySuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchDownloadHistory(action: PayloadAction<CardPrintingRequest>) {
  try {
    const result: Pageable<CardPrintingRequest> = yield call(
      cardPrintingService.fetchDownloadHistory,
      action.payload,
    );
    yield put(actions.fetchDownloadHistorySuccess(result));
  } catch (err) {
    console.log(err);
  }
}

function* sendRequestDownloadCard(
  action: PayloadAction<RequestDownloadCard, string, (error?: any) => void>,
) {
  try {
    const result: CardPrinting = yield call(
      cardPrintingService.requestDownload,
      action.payload,
    );
    yield put(actions.sendRequestDownloadCardSuccess(result));
    action.meta();
    Notifier.addNotifySuccess({
      messageId: 'Send request card printing successfully',
    });
  } catch (error) {
    console.log(error);
    // action.meta(error?.response?.data);
  }
}

function* fetchMembershipKis(action: PayloadAction<FilterParams>) {
  try {
    const params = action.payload;
    params.kisStatus = 'ACTIVE';
    const result: MembershipKis = yield call(
      MembershipService.fetchMembershipKis,
      params,
    );
    yield put(actions.fetchMembershipKisSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* memberInformationSaga() {
  yield takeLatest(
    actions.fetchIndividualInformation.type,
    fetchIndividualInformation,
  );
  yield takeLatest(actions.fetchPointHistory.type, fetchPointHistory);
  yield takeLatest(
    actions.fetchTransactionHistory.type,
    fetchTransactionHistory,
  );
  yield takeLatest(actions.fetchUserPoint.type, fetchUserPoint);
  yield takeLatest(actions.fetchDownloadHistory.type, fetchDownloadHistory);
  yield takeLatest(actions.fetchMembershipKis.type, fetchMembershipKis);
  yield takeLatest(
    actions.sendRequestDownloadCard.type,
    sendRequestDownloadCard,
  );
  yield takeLatest(actions.fetchClubHistory.type, fetchClubHistory);
}
