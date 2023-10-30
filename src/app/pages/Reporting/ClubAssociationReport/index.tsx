import { Container, Grid, Paper, Typography } from '@mui/material';
import Page from 'app/components/Page';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import checkIcon from 'assets/images/check-icon.svg';
import newIcon from 'app/pages/Reporting/icons/new-icon.svg';
import reNewIcon from 'app/pages/Reporting/icons/re-new-icon.svg';
import warningIcon from 'app/pages/Reporting/icons/warning-icon.svg';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { translations } from 'locales/translations';

import TableToolbar from 'app/pages/MemberManagement/CardPrinting/components/TableToolbar';

import { Province, FilterParams } from 'types';

import DateRangeComponent from 'app/components/DateRangeComponent';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import Card from '../components/Card';

import { useAssociationReportSlice } from './slice';

import { selectAssociationReport } from './slice/selectors';

const RootContainer = styled.div`
  .section-container {
    box-shadow: 0 0 2px 0 rgb(145 158 171 / 24%),
      0 16px 32px -4px rgb(145 158 171 / 24%);
    border: 1px solid #ffffff;
  }
  .title-container {
    color: #777777;
    .time {
      color: #637381;
    }
  }
`;

function ClubAssociationReport() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useAssociationReportSlice();
  const { provinces, associationReport } = useSelector(selectAssociationReport);
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const fetchData = useSelector(selectAuth);
  const { userInformation } = fetchData;
  const [filter, setFilter] = useState<FilterParams>({
    provinceId: '',
    startDate: '',
    endDate: '',
  });

  React.useEffect(() => {
    if (userInformation && userInformation.provinceId) {
      dispatch(
        actions.fetchAssociationReport({
          ...filter,
          provinceId: userInformation.provinceId,
        }),
      );
    } else {
      dispatch(actions.fetchAssociationReport(filter));
    }
    dispatch(actions.fetchProvinces());
  }, []);

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (userInformation?.provinceId) {
        const id: string = userInformation.provinceId;
        const data = provinces?.filter(
          (item: any) => parseInt(id) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else {
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      }
    }
  }, [provinces, userInformation]);

  // React.useEffect(() => {
  //   if (provinces && provinces.length > 0) {
  //     const obj = { name: t(translations.common.all), id: 0 };
  //     setNewProvinces([obj, ...provinces]);
  //   }
  // }, [provinces]);

  const fetchAssociationReport = (newFilter: FilterParams) => {
    dispatch(actions.fetchAssociationReport(newFilter));
  };

  const onChangeProvince = (newProvince?: Province) => {
    if (newProvince) {
      setCurrentProvince(newProvince);
      const newFilter = {
        ...filter,
        provinceId: newProvince?.id === 0 ? '' : newProvince.id,
      };
      setFilter(newFilter);
      fetchAssociationReport(newFilter);
    }
  };

  const handleDoneFilter = (rangeDate: any) => {
    if (rangeDate?.length && rangeDate[1]) {
      const newFilter = {
        ...filter,
        startDate:
          rangeDate?.length && rangeDate[0]
            ? parseInt(moment(rangeDate[0]).format('x'))?.toString()
            : ('' as string),
        endDate:
          rangeDate?.length && rangeDate[1]
            ? parseInt(moment(rangeDate[1]).endOf('day').format('x')).toString()
            : ('' as string),
      };
      setFilter(newFilter);
      fetchAssociationReport(newFilter);
    }
  };

  const items = useMemo(() => {
    return (
      <Grid container spacing={4}>
        <Card
          icon={checkIcon}
          title={t(translations.dashboard.totalTAAAssociationActive)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalAssociationActive
          }
        />
        <Card
          icon={warningIcon}
          title={t(translations.dashboard.totalTAAAssociationExpired)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalAssociationExpired
          }
        />
        <Card
          icon={reNewIcon}
          title={t(translations.dashboard.totalTAAAssociationRenew)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalAssociationRenew
          }
        />
        <Card
          icon={checkIcon}
          title={t(translations.dashboard.totalActive)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalFourStarAssociationActive
          }
          star={4}
        />
        <Card
          icon={checkIcon}
          title={t(translations.dashboard.totalActive)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalThreeStarAssociationActive
          }
          star={3}
        />
        <Card
          icon={checkIcon}
          title={t(translations.dashboard.totalActive)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalTwoStarAssociationActive
          }
          star={2}
        />
        <Card
          icon={checkIcon}
          title={t(translations.dashboard.totalActive)}
          value={
            associationReport?.StatisticReportingTAAAssociation
              ?.totalOneStarAssociationActive
          }
          star={1}
        />
      </Grid>
    );
  }, [associationReport, t]);
  // console.log(associationReport);
  return (
    <Page title="Club TKT">
      <Container maxWidth="xl">
        <Typography variant="h4" className="pb-30">
          {t(translations.dashboard.hiWelcome)}
        </Typography>
        <TableToolbar
          provinces={newProvinces}
          currentProvince={currentProvince}
          onChangeProvince={onChangeProvince}
          provinceId={userInformation?.provinceId}
        />
        <RootContainer className="mt-20">
          <Paper
            elevation={0}
            className="rounded-10 px-36 py-16 section-container"
          >
            <div className="title-container flex x-between mb-24 y-center">
              <span className="fw-700 fs-24 lh-48">
                {t(translations.dashboard.taaDashboard)}
              </span>
            </div>
            {items}
          </Paper>
          <Paper
            elevation={0}
            className="rounded-10 px-36 py-16 section-container mt-30"
          >
            <div className="title-container flex x-between mb-24 y-center">
              <span className="fw-700 fs-24 lh-48">
                {t(translations.dashboard.newCreation)}
              </span>
              <DateRangeComponent
                handleDoneFilter={handleDoneFilter}
                resetPicker={() => {
                  const newFilter = {
                    ...filter,
                    startDate: '',
                    endDate: '',
                  };
                  setFilter(newFilter);
                }}
              />
            </div>
            <Grid container spacing={4}>
              <Card
                title={t(translations.dashboard.newAssociationCreated)}
                value={
                  associationReport?.StatisticReportingTAAAssociation
                    ?.totalNewAssociation
                }
                icon={newIcon}
              />
            </Grid>
          </Paper>
        </RootContainer>
      </Container>
    </Page>
  );
}

export default ClubAssociationReport;
