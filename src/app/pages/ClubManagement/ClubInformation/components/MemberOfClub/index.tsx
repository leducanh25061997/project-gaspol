/**
 *
 * MemberOfClub
 *
 */
import { Grid, styled, Card } from '@mui/material';
import { Status } from 'app/components/Status';
import Table from 'app/components/Table';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import NestedList from 'app/components/Collapse';
import { Label } from 'app/components/Label';
import { FilterParams, MembershipRequest, RequestJoinClubList } from 'types';
import { useDispatch } from 'react-redux';

import { useClubInformationSlice } from '../../slice';

interface Props {
  items?: RequestJoinClubList[];
  totalElements?: number;
  clubId?: string;
}

const MemberOfClubRoot = styled('div')({
  padding: '10px 0',
  border: '1px solid #FFFFFF',
  borderRadius: '10px',
  display: 'flex',
  boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.25)',
  '& .MuiList-root': {
    width: '100%',
    borderRadius: '10px',
  },
});

export const MemberOfClub = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useClubInformationSlice();
  const [filter, setFilter] = React.useState<FilterParams>({ page: 0 });
  const { items, totalElements, clubId } = props;
  const [openCollapse, setOpenCollapse] = React.useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const headers = [
    {
      id: 'fullName',
      label: t(translations.tableMembership.name),
    },
    {
      id: 'ktaNumber',
      label: t(translations.common.ktaNumber),
    },
    {
      id: 'role',
      label: t(translations.tableRequestClub.role),
      width: 300,
    },
    {
      id: 'phoneNumber',
      label: t(translations.createNewMemberPage.phoneNumber),
    },
    {
      id: 'packageStatus',
      label: t(translations.common.packageStatus),
    },
    {
      id: 'status',
      label: t(translations.clubInformation.memberStatus),
    },
  ];

  const renderItem = (item: MembershipRequest, index?: number) => {
    const roles = item?.roles && item?.roles.map((a: any) => ` ${a.title}`);
    return [
      item.fullName,
      item.ktaNumber,
      item?.roles && item?.roles.length > 0 && roles ? roles[0] : '-',
      item.phone,
      <Status status={item.packageStatus} isMemberOfClub />,
      <Status status={item.status} />,
    ];
  };

  const handleOnPageChange = (page?: number, limit?: number) => {
    dispatch(
      actions.fetchListMemberOfClub({
        clubId: Number(clubId),
        size: limit,
        page,
      }),
    );
    setFilter({ ...filter, page });
  };

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        title={
          <div style={{ display: 'flex', margin: '10px 0 0 20px' }}>
            <Label>{t(translations.clubInformation.memberList)}</Label>
            <div style={{ color: '#00AB55', marginLeft: '10px' }}>
              <span style={{ marginRight: '10px' }}>{'-'}</span>
              {totalElements ? `${totalElements} members` : 0}
            </div>
          </div>
        }
        description={
          <Grid container spacing={2} sx={{ marginTop: '0' }}>
            <Grid item xs={12} md={12}>
              <Table
                headers={headers}
                items={items}
                totalElements={totalElements}
                renderItem={renderItem}
                order={'asc'}
                orderBy={''}
                onPageChange={handleOnPageChange}
              />
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
});
