/* eslint-disable import/no-anonymous-default-export */
import { AuthResponse, AuthParams, UserProfile } from 'types';
import queryString from 'query-string';

import { LocalStorageService } from '../';

import { createServiceNoToken, createService } from './axios';

const TokenUrl = process.env.REACT_APP_KEYCLOAK_TOKEN_URL;
const LogoutUrl = process.env.REACT_APP_KEYCLOAK_LOGOUT_URL;
const GRANT_TYPE = 'password';
const baseURL = process.env.REACT_APP_API_URL;

const instance = createServiceNoToken(TokenUrl);
const customInstance = createService(baseURL);
const instanceLogout = createServiceNoToken(LogoutUrl);

const login = async (params: AuthParams): Promise<AuthResponse> => {
  const request = {
    ...params,
    grant_type: GRANT_TYPE,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const refetchAccessToken = async (
  refreshToken: string,
): Promise<AuthResponse> => {
  const request = {
    grant_type: GRANT_TYPE,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    refresh_token: refreshToken,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const logout = async (): Promise<any> => {
  const refresh_token = LocalStorageService.get(
    LocalStorageService.REFRESH_TOKEN,
  );
  const access_token = LocalStorageService.get(LocalStorageService.OAUTH_TOKEN);
  const request = {
    refresh_token,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  await instanceLogout.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
  });
};

const getProfile = async (): Promise<UserProfile> => {
  const response = await customInstance.get('v1/admin/profile/me');
  return response.data;
};

export default { login, refetchAccessToken, logout, getProfile };
