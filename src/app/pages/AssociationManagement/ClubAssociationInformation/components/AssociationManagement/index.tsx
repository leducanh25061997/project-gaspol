import { Card, Grid, Icon, IconButton } from '@mui/material';
import { memo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import Table from 'app/components/Table';
import arrowBottom from 'assets/images/arrow-bottom.svg';
import arrowRight from 'assets/images/arrow-right.svg';
import { TitlePage } from 'app/components/Label';
import {
  AssociationInformationType,
  AssociationInformationType_Member,
} from 'types/AssociationManagement';
import { Status } from 'app/components/Status';
import { ViewRoles } from 'types/enums';
import { get } from 'lodash';

interface Props {
  info?: AssociationInformationType;
}

export const AssociationManagement = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(false);
  const headers = [
    {
      id: 'name',
      label: t(translations.tableAssociation.name),
    },
    {
      id: 'ktaNumber',
      label: t(translations.tableAssociation.ktaNumber),
    },
    {
      id: 'role',
      label: t(translations.tableAssociation.role),
    },
    {
      id: 'packageStatus',
      label: t(translations.tableAssociation.packageStatus),
    },
    {
      id: 'clubStatus',
      label: t(translations.clubInformation.memberStatus),
    },
  ];

  const renderItem = (item: AssociationInformationType_Member) => {
    let newRoles = '';
    item?.roles &&
      item?.roles.map((res: any, index: number) => {
        const getRes = get(ViewRoles, `${res.role}`);
        if (index === 0) {
          newRoles = newRoles + getRes.toString();
        } else {
          newRoles = newRoles + ', ' + getRes.toString();
        }
      });
    return [
      item?.fullName,
      item?.ktaNumber ? item.ktaNumber : '-',
      item?.roles && item?.roles.length > 0 ? item?.roles[0].role : '',
      <Status status={item?.packageStatus} isPackage />,
      <Status status={item?.membershipStatus} />,
    ];
  };

  return (
    <Grid>
      <Grid sx={{ display: 'flex' }} mb={2}>
        <TitlePage>
          {t(translations.clubAssociationInformation.associationManagement)}
        </TitlePage>
        <IconButton onClick={() => setCollapse(!collapse)}>
          {collapse ? <img src={arrowRight} /> : <img src={arrowBottom} />}
        </IconButton>
      </Grid>
      <Card sx={collapse ? { display: 'none' } : {}}>
        <Table
          headers={headers}
          items={info?.members}
          renderItem={renderItem}
          order={'desc'}
          orderBy={''}
          isNoPaging
        />
      </Card>
    </Grid>
  );
});
