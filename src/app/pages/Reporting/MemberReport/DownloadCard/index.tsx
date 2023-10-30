import { Grid, Paper } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import userDownloadIcon from 'assets/images/user-download.svg';
import downloadIcon from 'assets/images/download-icon.svg';
import { selectAuth } from 'app/pages/Auth/slice/selectors';

import Card from '../../components/Card';
import DashBoardLayout from '../components/DashboardLayout';
import { useMemberReportSlice } from '../slice';
import { selectMemberReport } from '../slice/selectors';

import { TableList } from './components/TableList';

const DownloadCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { provinces, memberReport } = useSelector(selectMemberReport);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const headers = [
    {
      id: 'cardName',
      label: t(translations.cardPrinting.cardName),
      hasSort: true,
    },
    {
      id: 'downloadProvince',
      label: t(translations.report.downloadProvince),
    },
    {
      id: 'clubName',
      label: t(translations.report.joinedIMIClub),
      hasSort: true,
    },
    {
      id: 'processedBy',
      label: t(translations.cardPrinting.processedBy),
      hasSort: true,
    },
    {
      id: 'transactionTime',
      label: t(translations.cardPrinting.generatedTime),
      hasSort: true,
    },
  ];

  React.useEffect(() => {
    const page: number = 0;
    const size: number = 10;
    dispatch(actions.fetchProvinces());
    dispatch(actions.fetchMemberReport({}));
    dispatch(
      actions.clubsRequest({
        provinceId: userInformation?.provinceId
          ? userInformation.provinceId
          : '',
      }),
    );
    dispatch(
      actions.fetchDownloadCard({
        size,
        page,
        provinceId: userInformation?.provinceId
          ? userInformation.provinceId
          : '',
      }),
    );
  }, [userInformation]);

  const items = useMemo(() => {
    return (
      <Grid container spacing={4}>
        <Card
          icon={userDownloadIcon}
          title={t(translations.dashboard.totalUserDownloads)}
          value={memberReport?.totalUserDownloads}
        />
        <Card
          icon={downloadIcon}
          title={t(translations.dashboard.totalOfDownloads)}
          value={memberReport?.totalOfdownloads}
        />
      </Grid>
    );
  }, [memberReport]);

  return (
    <div>
      <DashBoardLayout
        title={t(translations.dashboard.downloadCardDashboard)}
        provinces={provinces}
      >
        {items}
      </DashBoardLayout>
      <TableList headers={headers} />
    </div>
  );
};

export default DownloadCard;
