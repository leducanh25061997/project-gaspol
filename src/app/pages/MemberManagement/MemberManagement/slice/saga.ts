import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MemberService, MembershipService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  MembershipRequest,
  Pageable,
  FilterAdminMembership,
  Province,
} from 'types';

import {
  CardPrinting,
  RequestDownloadCard,
} from 'types/CardPrintingManagement';
import cardPrintingService from 'services/api/cardPrintingService';
import Notifier from 'app/pages/Notifier';

import { memberManagementActions as actions } from '.';

function* memberManagement(action: PayloadAction<FilterAdminMembership>) {
  try {
    const result: Pageable<MembershipRequest> = yield call(
      MemberService.fetchAdminMembership,
      action.payload,
    );
    yield put(actions.fetchMembersDataSuccess(result));
  } catch (err) {
    yield put(actions.fetchMembersDataFailed());
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

export function* memberManagementSaga() {
  yield takeLatest(actions.fetchMembersData.type, memberManagement);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(
    actions.sendRequestDownloadCard.type,
    sendRequestDownloadCard,
  );
}
