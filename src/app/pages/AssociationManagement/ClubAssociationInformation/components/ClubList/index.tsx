import { Card, Grid, IconButton } from '@mui/material';
import { memo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import Table from 'app/components/Table';

import { TitlePage } from 'app/components/Label';
import arrowBottom from 'assets/images/arrow-bottom.svg';
import arrowRight from 'assets/images/arrow-right.svg';
import path from 'app/routes/path';

import { ClubAssociationInformationType } from 'types/AssociationManagement';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from 'app/components/Status';
import { useNavigate } from 'react-router';
import { MemberStatus } from 'types/enums';

import { selectAssociationInformation } from '../../slice/selectors';
import { useAssociationInformationSlice } from '../../slice';

interface Props {
  idAssociation: any;
}

export const ClubList = memo((props: Props) => {
  const { idAssociation } = props;
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(false);
  const { clubAssociationInformation } = useSelector(
    selectAssociationInformation,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = useAssociationInformationSlice();
  const [filter, setFilter] = useState({
    id: idAssociation,
    size: 10,
    page: 0,
  });

  useEffect(() => {
    dispatch(actions.fetchClubAssociationInformation(filter));
  }, [filter]);

  const handleOnPageChange = (pageNumber: number, size: number) => {
    const newFilterParams = {
      ...filter,
      page: pageNumber,
      size,
    };
    setFilter(newFilterParams);
  };

  const headers = [
    {
      id: 'no',
      label: t(translations.clubAssociationInformation.name),
    },
    {
      id: 'clubName',
      label: t(translations.clubAssociationInformation.clubCode),
    },
    {
      id: 'clubAdmin',
      label: t(translations.clubAssociationInformation.clubAdmin),
    },
    {
      id: 'adminPhoneNumber',
      label: t(translations.clubAssociationInformation.adminPhoneNumber),
    },
    {
      id: 'packageStatus',
      label: t(translations.clubAssociationInformation.packageStatus),
    },
    {
      id: 'clubStatus',
      label: t(translations.tableAssociation.clubStatus),
    },
  ];

  const renderItem = (item: ClubAssociationInformationType) => {
    if (item?.status && item?.status.toString() === 'ACCEPTED') {
      return [
        item.clubName,
        item.clubCode ? item.clubCode : '-',
        item.adminName,
        item.adminPhoneNumber ? item.adminPhoneNumber : '-',
        <Status status={item?.packageStatus} isPackage />,
        <Status status={item?.status} />,
      ];
    } else {
      return [];
    }
  };

  return (
    <Grid>
      <Grid sx={{ display: 'flex' }} mb={2}>
        <TitlePage>
          {t(translations.clubAssociationInformation.clubList)}
          <span
            style={{
              fontWeight: 400,
              marginLeft: '5px',
              color: '#00AB55',
            }}
          >
            {'- ' +
              (clubAssociationInformation?.count
                ? clubAssociationInformation?.count
                : 0)}{' '}
            {t(translations.clubAssociationInformation.clubList)}
          </span>
        </TitlePage>
        <IconButton onClick={() => setCollapse(!collapse)}>
          {collapse ? <img src={arrowRight} /> : <img src={arrowBottom} />}
        </IconButton>
      </Grid>
      <Card sx={collapse ? { display: 'none' } : {}}>
        <Table
          headers={headers}
          items={clubAssociationInformation?.data || []}
          renderItem={renderItem}
          pageNumber={filter.page}
          totalElements={clubAssociationInformation?.count || 0}
          onPageChange={handleOnPageChange}
          onSelectRow={item => navigate(path.club + `/${item.clubId}`)}
          order={'desc'}
          orderBy={''}
        />
      </Card>
    </Grid>
  );
});
