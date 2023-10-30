import {
  DashboardData,
  FilterParams,
  MemberReport,
  ClubReport,
  Pageable,
} from 'types';
import axios from 'axios';
import queryString from 'query-string';
import {
  ChangeHistory,
  ChangeHistoryParams,
  DownloadCard,
  DownloadCardParams,
  MemberHistory,
  MemberHistoryParams,
  TktClub,
  TktClubParams,
  UpgradeKis,
  UpgradeKisParams,
} from 'types/Report';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (params[p] !== '') {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      }
    }
  return str.join('&');
};

const fetchDashboardData = async (
  params: FilterParams,
): Promise<DashboardData> => {
  const response = await instance.get(
    `v2/admin/statistic/membership/?${serialize(params)}`,
  );
  return response.data;
};

const fetchMemberReport = async (
  params: FilterParams,
): Promise<MemberReport> => {
  const response = await instance.get(
    `v2/admin/statistic/reporting/kta?${serialize(params)}`,
  );
  return response.data;
};

const fetchCommonReport = async (params: FilterParams): Promise<ClubReport> => {
  const { type } = params;
  delete params.type;
  const response = await instance.get(
    `v2/admin/statistic/reporting/${type}?${serialize(params)}`,
  );
  return response.data;
};

const fetchMembershipHistory = async (
  params: MemberHistoryParams,
): Promise<Pageable<MemberHistory>> => {
  const response = await instance.get(
    `/v2/admin/statistic/reporting/kta/membership?${serialize(params)}`,
  );
  return response.data;
};

const exportKTAMembership = async (
  params: MemberHistoryParams,
): Promise<string> => {
  const response = await instance.get(
    `/v2/admin/statistic/reporting/kta/membership/export?${serialize(params)}`,
  );
  return response.data;
};

const fetchChangeHistory = async (
  params: ChangeHistoryParams,
): Promise<Pageable<ChangeHistory>> => {
  const response = await instance.get(
    `/v2/admin/statistic/reporting/kta/switch-club/history?${serialize(
      params,
    )}`,
  );
  return response.data;
};

const exportChangeHistory = async (
  params: ChangeHistoryParams,
): Promise<string> => {
  const response = await instance.get(
    `/v2/admin/statistic/reporting/kta/switch-club/history/export?${serialize(
      params,
    )}`,
  );
  return response.data;
};

const fetchUpgradeHistory = async (
  params: UpgradeKisParams,
): Promise<Pageable<UpgradeKis>> => {
  const response = await instance.get(
    `v2/admin/statistic/reporting/kta/kis?${serialize(params)}`,
  );
  return response.data;
};

const exportUpgradeHistory = async (
  params: UpgradeKisParams,
): Promise<string> => {
  const response = await instance.get(
    `/v2/admin/statistic/reporting/kta/kis/export?${serialize(params)}`,
  );
  return response.data;
};

const fetchDownloadCard = async (
  params: DownloadCardParams,
): Promise<Pageable<DownloadCard>> => {
  const response = await instance.get(
    `v2/admin/membership/kta/card-printing?${serialize(params)}`,
  );
  return response.data;
};

const exportDownloadCard = async (
  params: DownloadCardParams,
): Promise<string> => {
  const response = await instance.get(
    `v2/admin/membership/kta/card-printing/export?${serialize(params)}`,
  );
  return response.data;
};

const fetchTktClub = async (
  params: TktClubParams,
): Promise<Pageable<TktClub>> => {
  const response = await instance.get(
    `/v2/admin/statistic/reporting/tkt/membership?${serialize(params)}`,
  );
  return response.data;
};

const exportTktClub = async (params: TktClubParams): Promise<string> => {
  const response = await instance.get(
    `v2/admin/statistic/reporting/tkt/export?${serialize(params)}`,
  );
  return response.data;
};

export default {
  fetchDashboardData,
  fetchMemberReport,
  fetchCommonReport,
  fetchMembershipHistory,
  exportKTAMembership,
  fetchChangeHistory,
  exportChangeHistory,
  fetchUpgradeHistory,
  exportUpgradeHistory,
  fetchDownloadCard,
  exportDownloadCard,
  fetchTktClub,
  exportTktClub,
};
