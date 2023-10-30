import { Card, Stack, Box, Collapse, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import React, { memo, useState } from 'react';
import { PointHistory, RequestPointHistory } from 'types';
import { OrderType } from 'types/enums';
import moment from 'moment';
import Table from 'app/components/Table';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

interface Props {
  items?: RequestPointHistory[];
  totalElements?: number;
}

export const Point = memo((props: Props) => {
  const { items, totalElements } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
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
      id: 'point',
      label: t(translations.common.gPoint),
      width: 200,
    },
    {
      id: 'balance',
      label: t(translations.common.balance),
      width: 200,
    },
    {
      id: 'description',
      label: t(translations.common.description),
      width: 400,
    },
  ];

  const renderItem = (item: PointHistory, index?: number) => {
    return [
      moment(item.createdDate).format('DD/MM/YYYY HH:mm '),
      item?.processedDate
        ? moment(item.processedDate).format('DD/MM/YYYY - HH:mm')
        : '-',
      item.changedPoint,
      item.balance,
      item.detail,
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
            {t(translations.memberInformation.pointHistory)}
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
          items={items}
          renderItem={renderItem}
          totalElements={totalElements}
          order={OrderType.DESC}
          orderBy={''}
        />
      </Collapse>
    </Card>
  );
});
