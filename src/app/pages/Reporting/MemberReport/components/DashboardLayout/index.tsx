import { Grid, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { ReactNode, useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FilterParams, Province } from 'types';
import { translations } from 'locales/translations';

import TableToolbar from 'app/pages/MemberManagement/CardPrinting/components/TableToolbar';
import DateRangeComponent from 'app/components/DateRangeComponent';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { useMemberReportSlice } from '../../slice';
import { selectMemberReport } from '../../slice/selectors';

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

  @media (max-width: 900px) {
    .graph-card {
      justify-content: center;
    }
  }
`;
interface Props {
  title?: string;
  children: ReactNode;
  provinces?: Province[];
}
const DashBoardLayout = memo((props: Props) => {
  const { title, children, provinces } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { memberReport } = useSelector(selectMemberReport);
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [currentProvince, setCurrentProvince] = useState<
    Province | undefined
  >();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const [filter, setFilter] = useState<FilterParams>({
    provinceId: '',
    startDate: '',
    endDate: '',
  });

  // React.useEffect(() => {
  //   if (provinces && provinces.length > 0) {
  //     const obj = { name: t(translations.common.all), id: 0 };
  //     setNewProvinces([obj, ...provinces]);
  //   }
  // }, [provinces]);

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

  const fetchMemberReport = (newFilter: any) => {
    dispatch(actions.fetchMemberReport(newFilter));
  };
  const onChangeProvince = (newProvince?: Province) => {
    if (newProvince) {
      setCurrentProvince(newProvince);
      const newFilter = {
        ...filter,
        provinceId: newProvince?.id === 0 ? '' : newProvince.id,
      };
      setFilter(newFilter);
      fetchMemberReport(newFilter);
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
      fetchMemberReport(newFilter);
    }
  };

  return (
    <RootContainer className="mt-20">
      <Paper elevation={0} className="rounded-10 px-36 py-16 section-container">
        <div className="title-container flex x-between mb-24 y-center">
          <div className="flex y-center">
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'rgba(134, 134, 134, 1)',
                mr: '29px',
              }}
            >
              {title}
            </Typography>
            <TableToolbar
              provinces={newProvinces}
              currentProvince={currentProvince}
              onChangeProvince={onChangeProvince}
              provinceId={userInformation?.provinceId}
            />
          </div>
          <Stack
            sx={{
              '& .date_range': {
                height: '41px',
              },
            }}
          >
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
          </Stack>
        </div>
        {children}
      </Paper>
    </RootContainer>
  );
});

export default DashBoardLayout;
