import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  Pageable,
  FilterAdminMembership,
  Province,
  CardPrintingRequest,
  Club,
  ClubParams,
  ClubResponse,
} from 'types';
import cardPrintingService from 'services/api/cardPrintingService';
import Notifier from 'app/pages/Notifier';
import {
  CardPrinting,
  RequestDownloadCard,
} from 'types/CardPrintingManagement';

import { cardPrintingManagementActions as actions } from '.';

function* cardPrintingManagement(action: PayloadAction<CardPrintingRequest>) {
  try {
    const result: Pageable<CardPrintingRequest> = yield call(
      cardPrintingService.fetchCardPrintingRequested,
      action.payload,
    );
    yield put(actions.fetchCardPrintingDataSuccess(result));
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

function* fetchClubs(action: PayloadAction<ClubParams>) {
  try {
    const result: ClubResponse = yield call(
      MemberService.fetchClubs,
      action.payload,
    );
    yield put(actions.fetchClubSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* sendProcessDownloadCard(
  action: PayloadAction<RequestDownloadCard, string, (error?: any) => void>,
) {
  try {
    const result: CardPrinting = yield call(
      cardPrintingService.processDownload,
      action.payload,
    );
    yield put(actions.sendProcessDownloadCardSuccess(result));
    action.meta();
    Notifier.addNotifySuccess({
      messageId: 'Send process card printing successfully',
    });
  } catch (error) {
    console.log(error);
    // action.meta(error?.response?.data);
  }
}

function* sendProcessDownloadCards(
  action: PayloadAction<RequestDownloadCard, string, (error?: any) => void>,
) {
  try {
    const result: CardPrinting = yield call(
      cardPrintingService.processDownloads,
      action.payload,
    );
    yield put(actions.sendProcessDownloadCardsSuccess(result));
    action.meta();
    Notifier.addNotifySuccess({
      messageId: 'Send process card printing successfully',
    });
  } catch (error) {
    console.log(error);
    // action.meta(error?.response?.data);
  }
}

function* fetchCardPrintingApprovedData(
  action: PayloadAction<CardPrintingRequest>,
) {
  try {
    const result: Pageable<CardPrintingRequest> = yield call(
      cardPrintingService.fetchCardPrintingRequested,
      action.payload,
    );
    yield put(actions.fetchCardPrintingApprovedDataSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

function* getDownloadLink(
  action: PayloadAction<RequestDownloadCard, string, (error?: any) => void>,
) {
  try {
    const result: string = yield call(
      cardPrintingService.getDownloadCardLink,
      action.payload,
    );
    yield put(actions.getDownloadLinkSuccess(result));
    action.meta();
    Notifier.addNotifySuccess({
      messageId: 'Download card printing successfully',
    });
  } catch (err) {
    action.meta(err?.response?.data?.messages);
    const fakeURL = err?.response?.request?.responseURL;
    if (fakeURL) {
      window.open(fakeURL);
      Notifier.addNotifySuccess({
        messageId: 'Download card printing successfully',
      });
    } else {
      Notifier.addNotifyError({
        messageId:
          err?.response?.data?.messages || 'Download URL is not available yet',
      });
    }
  }
}

function* getExportLink(
  action: PayloadAction<RequestDownloadCard, string, (error?: any) => void>,
) {
  try {
    const result: string = yield call(
      cardPrintingService.getExportCardLink,
      action.payload,
    );
    yield put(actions.getExportLinkSuccess(result));
    action.meta();
    Notifier.addNotifySuccess({
      messageId: 'Export data card printing successfully',
    });
  } catch (err) {
    action.meta(err?.response?.data?.messages);
    const fakeURL = err?.response?.request?.responseURL;
    if (fakeURL) {
      window.open(fakeURL);
      Notifier.addNotifySuccess({
        messageId: 'Export data card printing successfully',
      });
    } else {
      Notifier.addNotifyError({
        messageId:
          err?.response?.data?.messages || 'Export data is not available yet',
      });
    }
  }
}

export function* cardPrintingManagementSaga() {
  yield takeLatest(actions.fetchCardPrintingData.type, cardPrintingManagement);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fetchClubs.type, fetchClubs);
  yield takeLatest(
    actions.sendProcessDownloadCard.type,
    sendProcessDownloadCard,
  );
  yield takeLatest(
    actions.sendProcessDownloadCards.type,
    sendProcessDownloadCards,
  );
  yield takeLatest(
    actions.fetchCardPrintingApprovedData.type,
    fetchCardPrintingApprovedData,
  );
  yield takeLatest(actions.getDownloadLink.type, getDownloadLink);
  yield takeLatest(actions.getExportLink.type, getExportLink);
}
