import { Card, Stack, Box, Collapse, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import React, { memo, useState, useEffect } from 'react';
import { OrderType } from 'types/enums';
import moment from 'moment';
import Table from 'app/components/Table';
import { EllipsisText } from 'app/components/EllipsisText';
import DateRangeComponent from 'app/components/DateRangeComponent';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import {
  CardPrinting,
  CardPrintingResponse,
} from 'types/CardPrintingManagement';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectMemberInformation } from '../../slice/selectors';
import { useMemberInformationSlice } from '../../slice';
interface Props {
  items?: CardPrinting[];
  totalElements?: number;
}

export const DownloadedCard = memo((props: Props) => {
  const { items, totalElements } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const { actions } = useMemberInformationSlice();
  const { downloadHistoryPageable } = useSelector(selectMemberInformation);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    membershipId: '',
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    if (!id) return;
    const newFilter = {
      ...filter,
      membershipId: id,
    };
    fetchDownloadHistory(newFilter);
  }, []);

  const fetchDownloadHistory = (filter: any) => {
    dispatch(actions.fetchDownloadHistory(filter));
  };

  const headers = [
    {
      id: 'downloadedDate',
      label: t(translations.cardPrinting.downloadTime),
      width: 200,
    },
    {
      id: 'clubProvince',
      label: t(translations.cardPrinting.clubProvince),
      width: 300,
    },
    {
      id: 'joinedClub',
      label: t(translations.cardPrinting.joinedClub),
      width: 300,
    },
    {
      id: 'processedBy',
      label: t(translations.cardPrinting.processedBy),
      width: 300,
    },
  ];

  const renderItem = (item: CardPrinting) => {
    return [
      item?.downloadedDate
        ? moment(item.downloadedDate).format('DD/MM/YYYY HH:mm ')
        : '-',
      item?.provinceName ? (
        <EllipsisText line={2} text={item?.provinceName} />
      ) : (
        '-'
      ),
      item?.clubName ? <EllipsisText line={2} text={item?.clubName} /> : '-',
      item?.downloadedBy ? (
        <EllipsisText line={2} text={item?.downloadedBy} />
      ) : (
        '-'
      ),
    ];
  };

  // const handleDoneFilter = () => {

  // }

  const handleOnPageChange = (pageNumber: number, size: number) => {
    setFilter({
      ...filter,
      page: pageNumber,
      size,
    });
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
              mr: '6px',
            }}
          >
            {t(translations.cardPrinting.cardPrintingHistory)}
          </Box>
          <Box
            sx={{
              mr: '6px',
            }}
          >
            -
          </Box>
          <Box
            sx={{
              color:
                downloadHistoryPageable?.count === 0
                  ? 'rgba(255, 107, 0, 1)'
                  : 'rgba(0, 171, 85, 1)',
              textTransform: 'lowercase',
            }}
          >
            {downloadHistoryPageable?.count}{' '}
            {downloadHistoryPageable?.count &&
            downloadHistoryPageable?.count > 1
              ? t(translations.cardPrinting.downloads)
              : t(translations.cardPrinting.download)}
          </Box>
          {open ? (
            <ArrowDropDown sx={{ color: '#868686', marginLeft: 2 }} />
          ) : (
            <ArrowRight sx={{ color: '#868686', marginLeft: 2 }} />
          )}
        </Grid>
        {/* <DateRangeComponent
          handleDoneFilter={handleDoneFilter}
          resetPicker={() => {
            const newFilter = {
              ...filter,
              fromDate: '',
              toDate: '',
            };
            setFilter(newFilter);
            fetchDownloadHistory(newFilter);
          }}
        /> */}
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table
          headers={headers}
          items={downloadHistoryPageable?.data || []}
          renderItem={renderItem}
          totalElements={downloadHistoryPageable?.count || 0}
          order={OrderType.DESC}
          orderBy={''}
          pageNumber={filter.page}
          onPageChange={handleOnPageChange}
        />
      </Collapse>
    </Card>
  );
});
