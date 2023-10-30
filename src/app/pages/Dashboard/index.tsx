// material
import { Box, Grid, Container, Typography } from '@mui/material';

import icon1 from 'app/pages/Dashboard/icons/icon1.svg';
import icon2 from 'app/pages/Dashboard/icons/icon2.svg';
import icon3 from 'app/pages/Dashboard/icons/icon3.svg';
import icon4 from 'app/pages/Dashboard/icons/icon4.svg';
import icon5 from 'app/pages/Dashboard/icons/icon5.svg';
import icon6 from 'app/pages/Dashboard/icons/icon6.svg';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { Province } from 'types';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import Page from '../../components/Page';
import TableToolbar from '../MemberManagement/CardPrinting/components/TableToolbar';

import Item, { ItemProps } from './components/Item';

import { useDashboardDataSlice } from './slice';

import { selectDashboardData } from './slice/selectors';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { actions } = useDashboardDataSlice();
  const { provinces, dashboardData } = useSelector(selectDashboardData);
  const { t } = useTranslation();
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [currentProvince, setCurrentProvince] = useState<
    Province | undefined
  >();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (userInformation) {
      const defaultFilter = {
        provinceId: userInformation?.provinceId
          ? userInformation.provinceId
          : '',
      };
      dispatch(actions.fetchProvinces());
      dispatch(actions.fetchDashboardData(defaultFilter));
    }
  }, [userInformation]);

  useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (userInformation && userInformation.provinceId) {
        const id = userInformation.provinceId;
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

  const fetchDashboardDataObj = (newFilter: any) => {
    dispatch(actions.fetchDashboardData(newFilter));
  };

  const listItems: ItemProps[] = useMemo(() => {
    return [
      {
        icon: icon1,
        backgroundColor: '#C8FACD',
        color: '#005249',
        value: dashboardData?.ktaMembers,
        title: t(translations.dashboard.ktaMembers),
        iconColor:
          'linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 97.35%)',
      },
      {
        icon: icon1,
        backgroundColor: '#C8FACD',
        color: '#005249',
        value: dashboardData?.memberClaim,
        title: t(translations.dashboard.memberClaim),
        iconColor:
          'linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 97.35%)',
      },
      {
        icon: icon4,
        backgroundColor: '#FFBDBD',
        color: '#005249',
        value: dashboardData?.ktaCardDowload,
        title: t(translations.dashboard.ktaCardDownload),
        iconColor:
          'linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 97.35%)',
      },
      {
        icon: icon2,
        backgroundColor: 'rgba(208, 242, 255, 1)',
        color: '#04297A',
        value: dashboardData?.imiClub,
        title: t(translations.dashboard.imiTKT),
        iconColor:
          'linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 97.35%)',
      },
      {
        icon: icon2,
        backgroundColor: 'rgba(208, 242, 255, 1)',
        color: '#04297A',
        value: dashboardData?.clubClaim,
        title: t(translations.dashboard.clubClaim),
        iconColor:
          'linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 97.35%)',
      },
      // {
      //   icon: icon3,
      //   backgroundColor: '#FFF7CD',
      //   color: '#7A4F01',
      //   value: dashboardData?.imiClubAssociation,
      //   title: t(translations.dashboard.imiClubAssociation),
      //   iconColor:
      //     'linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 97.35%)',
      // },
      // {
      //   icon: icon5,
      //   backgroundColor: '#E8E8E8',
      //   color: '#005249',
      //   value: dashboardData?.imiPromoter,
      //   title: t(translations.dashboard.imiPromoter),
      //   iconColor:
      //     'linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 97.35%)',
      // },
      // {
      //   icon: icon6,
      //   backgroundColor: '#BCCCF8',
      //   color: 'rgba(0, 82, 73, 1)',
      //   value: dashboardData?.imiBusinessPartner,
      //   title: t(translations.dashboard.imiBusinessPartner),
      //   iconColor:
      //     'linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 97.35%)',
      // },
    ];
  }, [dashboardData, t]);

  const onChangeProvince = useCallback((newProvince?: Province) => {
    if (newProvince) {
      setCurrentProvince(newProvince);
      const newFilter = {
        ...filter,
        provinceId: newProvince?.id === 0 ? '' : newProvince.id,
      };
      setFilter(newFilter);
      fetchDashboardDataObj(newFilter);
    }
  }, []);

  const renderListItems = useMemo(() => {
    const firstRow = [];
    const secondRow = [];
    const thirdRow = [];
    for (let index = 0; index < listItems.length; index++) {
      const element = listItems[index];
      if (index <= 2) {
        firstRow.push(<Item {...element} />);
      } else if (index > 2 && index <= 4) {
        secondRow.push(<Item {...element} />);
      } else {
        thirdRow.push(<Item {...element} />);
      }
    }
    return (
      <>
        <Grid container spacing={2} direction="row" sx={{ mb: '21px' }}>
          {firstRow}
        </Grid>
        <Grid container spacing={2} direction="row" sx={{ mb: '21px' }}>
          {secondRow}
        </Grid>
        <Grid container spacing={2} direction="row" sx={{ mb: '21px' }}>
          {thirdRow}
        </Grid>
      </>
    );
  }, [dashboardData, listItems]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            {t(translations.dashboard.hiWelcome)}
          </Typography>
        </Box>
        <Box sx={{ pb: 2 }}>
          <TableToolbar
            provinces={newProvinces}
            currentProvince={currentProvince}
            onChangeProvince={onChangeProvince}
            provinceId={userInformation?.provinceId}
          />
        </Box>
        <Box>{renderListItems}</Box>
      </Container>
    </Page>
  );
}
