import { call, takeLatest, put } from 'redux-saga/effects';
import { KeycloakService, LocalStorageService } from 'services';
import {
  AuthParams,
  AuthResponse,
  Pageable,
  UserInfomation,
  UserProfile,
} from 'types';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions as actions } from '.';

function* login(
  action: PayloadAction<AuthParams, string, (error?: any) => void>,
) {
  try {
    const response: AuthResponse = yield call(
      KeycloakService.login,
      action.payload,
    );

    LocalStorageService.set(
      LocalStorageService.OAUTH_TOKEN,
      response.access_token,
    );
    LocalStorageService.set(
      LocalStorageService.REFRESH_TOKEN,
      response.refresh_token,
    );
    yield put(actions.loginSuccess(response));
    const result: UserProfile = yield call(KeycloakService.getProfile);
    LocalStorageService.set(LocalStorageService.USER, result);
    LocalStorageService.set(LocalStorageService.USERUUID, result.userUuid);
    if (result.groups && result.groups.length) {
      if (result.groups[0] && result.groups[0].attribute) {
        if (result.groups[0].attribute.length > 0) {
          if (result.groups[0].attribute[0].key === 'province_id') {
            LocalStorageService.set(
              LocalStorageService.PROVINCEID,
              result.groups[0].attribute[0].value,
            );
          }
        }
      }
    }
    if (result.roles) {
      LocalStorageService.set(LocalStorageService.ROLES, result.roles);
    }
    action.meta();
  } catch (error: any) {
    action.meta(error.response?.data);
  }
}

function* logout(action: PayloadAction<any, string, (error?: any) => void>) {
  try {
    yield call(KeycloakService.logout);
    LocalStorageService.removeAllItem();
    yield put(actions.logoutSuccess());
    action.meta();
  } catch (error: any) {
    action.meta(error.response?.data);
  }
}

function* fetchUserInformation() {
  try {
    const result: UserProfile = yield call(KeycloakService.getProfile);
    let id: string = '';
    if (result.groups && result.groups.length) {
      if (result.groups[0] && result.groups[0].attribute) {
        if (result.groups[0].attribute.length > 0) {
          if (result.groups[0].attribute[0].key === 'province_id') {
            id = result.groups[0].attribute[0].value;
          }
        }
      }
    }
    const obj = {
      groups: result?.groups || [],
      roles: result?.roles || [],
      provinceId: id,
      userName: result?.username,
    };
    yield put(actions.fetchUserInformationSuccess(obj));
  } catch (error) {
    console.log(error);
  }
}

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.logout.type, logout);
  yield takeLatest(actions.fetchUserInformation.type, fetchUserInformation);
}
