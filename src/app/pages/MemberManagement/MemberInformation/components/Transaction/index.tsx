import {
  Stack,
  Box,
  Collapse,
  Card,
  TextField,
  Grid,
  Button,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MembershipRequest, TransactionHistory } from 'types';
import { OrderType } from 'types/enums';
import moment from 'moment';
import Table from 'app/components/Table';
import { Status } from 'app/components/Status';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { currencyFormat } from 'utils/helpers/currency';

import { selectMemberInformation } from '../../slice/selectors';
import { useMemberInformationSlice } from '../../slice';

interface Props {
  // items?: TransactionHistory[];
  // totalElements?: number;
}

export const Transactions = memo((props: Props) => {
  const [open, setOpen] = useState(true);
  const [openPicker, setOpenPicker] = useState(false);
  const { actions } = useMemberInformationSlice();
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);
  const { t } = useTranslation();
  const { memberInformation, transactionHistoryPageable } = useSelector(
    selectMemberInformation,
  );
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    userUuid: '',
    membershipType: 'KTA',
    size: 10,
    page: 0,
    startDate: '',
    endDate: '',
  });
  React.useEffect(() => {
    if (memberInformation?.ktaMembershipInfor?.userUuid) {
      const filterParams = filter;
      filterParams.userUuid = memberInformation?.ktaMembershipInfor?.userUuid;
      dispatch(actions.fetchTransactionHistory(filterParams));
      setFilter({
        ...filter,
        userUuid: memberInformation?.ktaMembershipInfor?.userUuid,
      });
    }
  }, [memberInformation, dispatch]);

  React.useEffect(() => {
    dispatch(actions.fetchTransactionHistory(filter));
  }, [filter]);

  const handleOnPageChange = (pageNumber: number, size: number) => {
    setOpenPicker(false);
    setFilter({
      ...filter,
      page: pageNumber,
      size,
    });
  };

  const headers = [
    {
      id: 'createdDate',
      label: t(translations.common.checkoutTime),
      width: 400,
    },
    {
      id: 'processedDate',
      label: t(translations.common.processedTime),
      width: 400,
    },
    {
      id: 'total',
      label: t(translations.common.totalAmount),
      width: 200,
    },
    {
      id: 'description',
      label: t(translations.common.description),
      width: 200,
    },
    {
      id: 'status',
      label: t(translations.common.status),
      width: 400,
    },
  ];

  const renderItem = (item: TransactionHistory, index?: number) => {
    return [
      moment(item.createdDate).format('DD/MM/YYYY - HH:mm'),
      item?.processedDate
        ? moment(item.processedDate).format('DD/MM/YYYY - HH:mm')
        : '-',
      'Rp ' + (item?.total ? currencyFormat(Number(item.total)) : 0),
      item?.orderItem?.length ? item?.orderItem[0]?.itemName : '',
      <Status status={item?.status} />,
    ];
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDoneFilter = () => {
    // console.log(moment(rangeDate[1]).endOf('day').format('x'));
    setFilter({
      ...filter,
      startDate:
        rangeDate?.length && rangeDate[0]
          ? parseInt(moment(rangeDate[0]).format('x'))?.toString()
          : ('' as string),
      endDate:
        rangeDate?.length && rangeDate[1]
          ? parseInt(moment(rangeDate[1]).endOf('day').format('x')).toString()
          : ('' as string),
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
            }}
          >
            {t(translations.memberInformation.transactionHistory)}
          </Box>
          {open ? (
            <ArrowDropDown sx={{ color: '#868686', marginLeft: 2 }} />
          ) : (
            <ArrowRight sx={{ color: '#868686', marginLeft: 2 }} />
          )}
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& .date_range': {
              display: 'flex',
              border: '1px solid #dce0e4',
              borderRadius: '8px',
              alignItems: 'center',
              position: 'relative',
              height: '41px',
            },
            '& .label_period': {
              position: 'absolute',
              fontSize: '12px',
              top: '-10px',
              left: '16px',
              padding: '0 3px',
              background: '#fff',
              zIndex: '1',
            },
            '& input': {
              width: '100px',
            },
            '& fieldset': {
              border: 'none',
            },
            '& .startDate input': {
              paddingRight: '0',
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              onClose={() => setOpenPicker(false)}
              open={openPicker}
              startText=""
              endText=""
              value={rangeDate}
              disableCloseOnSelect={false}
              onChange={newValue => {
                setRangeDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <div className="date_range">
                    <InputLabel className="label_period">
                      {t(translations.common.period)}
                    </InputLabel>
                    <TextField
                      // {...startProps}
                      className="startDate"
                      placeholder="dd/mm/yyyy"
                      onFocus={() => setOpenPicker(true)}
                      value={
                        rangeDate[0]
                          ? moment(rangeDate[0]).format('DD/MM/YYYY')
                          : ''
                      }
                    />
                    <Box sx={{ color: '#bac3cb' }}>-</Box>
                    <TextField
                      // {...endProps}
                      onFocus={() => setOpenPicker(true)}
                      placeholder="dd/mm/yyyy"
                      value={
                        rangeDate[1]
                          ? moment(rangeDate[1]).format('DD/MM/YYYY')
                          : ''
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {!openPicker ? (
                              <Icon
                                onClick={() => {
                                  setOpenPicker(true);
                                }}
                                icon="ant-design:calendar-outlined"
                                width={20}
                                height={20}
                                style={{ cursor: 'pointer' }}
                              />
                            ) : (
                              <Icon
                                onClick={() => {
                                  setOpenPicker(false);
                                  setRangeDate([null, null]);
                                  setFilter({
                                    ...filter,
                                    startDate: '',
                                    endDate: '',
                                  });
                                }}
                                icon="ant-design:close-circle-outlined"
                                width={20}
                                height={20}
                                style={{ cursor: 'pointer' }}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#01AB55',
              color: 'white',
              marginLeft: '30px',
            }}
            onClick={() => {
              setOpenPicker(false);
              handleDoneFilter();
            }}
          >
            {t(translations.common.apply)}
          </Button>
        </Grid>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table
          headers={headers}
          renderItem={renderItem}
          order={OrderType.DESC}
          orderBy={''}
          items={transactionHistoryPageable?.data || []}
          totalElements={transactionHistoryPageable?.total || 0}
          pageNumber={filter.page}
          onPageChange={handleOnPageChange}
        />
      </Collapse>
    </Card>
  );
});
