import { Card, Stack, Box, Collapse, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import React, { memo, useEffect, useState } from 'react';
import { PointHistory, RequestPointHistory } from 'types';
import { OrderType } from 'types/enums';
import moment from 'moment';
import Table from 'app/components/Table';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { ClubHistoryType } from 'types/ClubHistoryType';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useMemberInformationSlice } from '../../slice';
import { selectMemberInformation } from '../../slice/selectors';

interface Props {
  items?: ClubHistoryType[];
  totalElements?: number;
}

export const ClubHistory = memo((props: Props) => {
  const { items, totalElements } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { actions } = useMemberInformationSlice();
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const { clubHistoryPageable } = useSelector(selectMemberInformation);
  const handleClick = () => {
    setOpen(!open);
  };
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    membershipId: '',
  });

  const fetchClubHistory = (filter: any) => {
    dispatch(actions.fetchClubHistory(filter));
  };

  useEffect(() => {
    if (!id) return;
    const newFilter = {
      ...filter,
      membershipId: id,
    };
    fetchClubHistory(newFilter);
  }, []);

  useEffect(() => {
    if (filter.membershipId) {
      fetchClubHistory(filter);
    }
  }, [filter]);

  const handleOnPageChange = (pageNumber: number, size: number) => {
    setFilter({
      ...filter,
      page: pageNumber,
      size,
    });
  };

  const headers = [
    {
      id: 'approveTime',
      label: t(translations.common.approveTime),
      width: '35%',
    },
    {
      id: 'oldClub',
      label: t(translations.common.oldClub),
      width: '35%',
    },
    {
      id: 'newClub',
      label: t(translations.common.newClub),
      width: '30%',
    },
  ];

  const convertClub = (province: string, club: string) => {
    return (
      <div>
        <span style={{ fontWeight: 'bold' }}>{province}</span>
        {' - '}
        <span>{club}</span>
      </div>
    );
  };

  const renderItem = (item: ClubHistoryType, index?: number) => {
    return [
      item.approveTime
        ? moment(item.approveTime).format('DD/MM/YYYY - HH:mm')
        : '-',
      item.oldClubName
        ? convertClub(item.oldProvinceName, item.oldClubName)
        : '-',
      item.newClubName
        ? convertClub(item.newProvinceName, item.newClubName)
        : '-',
    ];
  };

  return (
    <Card
      sx={{
        mt: 3,
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          marginBottom: '16px',
          justifyContent: 'space-between',
        }}
      >
        <Grid
          onClick={handleClick}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              color: '#777777',
            }}
          >
            {t(translations.memberInformation.changeClubHistory)}
          </Box>
          {open ? (
            <ArrowDropDown sx={{ color: '#868686', marginLeft: 2 }} />
          ) : (
            <ArrowRight sx={{ color: '#868686', marginLeft: 2 }} />
          )}
        </Grid>
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table
          headers={headers}
          items={clubHistoryPageable?.data}
          renderItem={renderItem}
          totalElements={clubHistoryPageable?.count}
          order={OrderType.DESC}
          orderBy={''}
          pageNumber={filter.page}
          onPageChange={handleOnPageChange}
        />
      </Collapse>
    </Card>
  );
});
