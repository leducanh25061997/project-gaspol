import { CardPrintingRequest } from 'types';
import axios from 'axios';
import queryString from 'query-string';
import {
  CardPrintingResponse,
  RequestDownloadCard,
  CardPrinting,
} from 'types/CardPrintingManagement';

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

const fetchCardPrintingRequested = async (
  params: CardPrintingRequest,
): Promise<CardPrintingResponse> => {
  const response = await instance.get(
    `v2/admin/membership/kta/card-printing?${serialize(params)}`,
  );
  return response.data;
};

const fetchDownloadHistory = async (
  params: CardPrintingRequest,
): Promise<CardPrintingResponse> => {
  const response = await instance.get(
    `v2/admin/membership/kta/card-printing/download?${serialize(params)}`,
  );
  return response.data;
};

const requestDownload = async (
  params: RequestDownloadCard,
): Promise<CardPrinting> => {
  const response = await instance.post(
    'v2/admin/membership/kta/card-printing',
    params,
  );
  return response.data;
};

const processDownload = async (
  params: RequestDownloadCard,
): Promise<CardPrinting> => {
  const response = await instance.put(
    `v2/admin/membership/kta/card-printing/${params.id}`,
    params,
  );
  return response.data;
};

const processDownloads = async (
  params: RequestDownloadCard,
): Promise<CardPrinting> => {
  const response = await instance.put(
    `v2/admin/membership/kta/card-printing`,
    params,
  );
  return response.data;
};

const getDownloadCardLink = async (
  params: RequestDownloadCard,
): Promise<any> => {
  const response = await instance.get(
    `v2/admin/membership/kta/card-printing/${params.id}/download`,
  );
  return response.data;
};

const getExportCardLink = async (params: RequestDownloadCard): Promise<any> => {
  const response = await instance.get(
    `v2/admin/membership/kta/card-printing/export?${serialize(params)}`,
  );
  return response.data;
};

export default {
  fetchCardPrintingRequested,
  fetchDownloadHistory,
  requestDownload,
  processDownload,
  processDownloads,
  getDownloadCardLink,
  getExportCardLink,
};
