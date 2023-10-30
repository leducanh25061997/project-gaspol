/**
 *
 * ApprovalDialog
 *
 */
import { Card, Typography } from '@mui/material';
import { AuditTrail, TableHeaderProps } from 'types';
import moment from 'moment';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import Table from '../Table';

interface Props {
  items?: AuditTrail[];
  headers: TableHeaderProps[];
  renderItem: (item: AuditTrail, index?: number) => string[];
}

export const AuditBox = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const { items, headers, renderItem } = props;

  const onRequestSort = () => {};

  return (
    <>
      <Typography sx={{ marginTop: '40px', fontWeight: 800 }}>
        {t(translations?.kisInformation?.auditTrails)}
      </Typography>
      <Card sx={{ marginTop: '10px' }}>
        <Table
          headers={headers}
          order={'desc'}
          onRequestSort={onRequestSort}
          orderBy={''}
          renderItem={renderItem}
          limitElement={2}
          items={items}
        ></Table>
      </Card>
    </>
  );
});
