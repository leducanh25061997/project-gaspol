/**
 *
 * TableList
 *
 */
import React, { memo, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Table from 'app/components/Table';
import { MembershipRequest, FilterMemberValue, TableHeaderProps } from 'types';
import {
  ClaimList,
  OldMemberListRequestData,
  OldMemberListType,
} from 'types/ClaimList';
import path from 'app/routes/path';
import { useDispatch } from 'react-redux';
import { Avatar, Stack, Card, Button, Typography, styled } from '@mui/material';
import { debounce, isEmpty } from 'lodash';
import UserMoreMenu from 'app/components/MemberMoreMenu';
import {
  MembershipType,
  OrderType,
  MemberStatus,
  PackageMemberType,
} from 'types/enums';
import { EllipsisText } from 'app/components/EllipsisText';
import { Status } from 'app/components/Status';
import { Header } from 'app/components/Header';

import TableToolbar from '../ToolbarFilter';
import { useClaimDetailSlice } from '../../slice';
import { OldMemberListDataType } from '../../slice/types';
import { ActiveDialog } from '../ActiveDialog';

interface Props {
  headers: TableHeaderProps[];
  items?: ClaimList[];
  totalElements?: number;
  data?: OldMemberListDataType;
  id: any;
  state?: any;
  isActive?: any;
}
interface ParamsPageProps {
  page: number;
  limit: number;
  keyword?: string;
  orderBy?: OrderType;
  orderType?: string;
  packageCode?: string;
  status?: string[];
}

export const TableList = memo((props: Props) => {
  const { headers, items, data, id, state, isActive } = props;

  const dispatch = useDispatch();
  const { actions } = useClaimDetailSlice();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<OldMemberListRequestData>({
    nikNumber: '',
    oldKtaNumber: '',
    phoneOrName: '',
    page: 0,
    rowsPerPage: 10,
    order: OrderType.DESC,
    orderBy: '',
  });
  const [activeMemberData, setActiveMemberData] = useState<OldMemberListType>();
  const [openApprove, setOpenApprove] = React.useState(false);

  const fetchDataForPage = (params: OldMemberListRequestData) => {
    dispatch(
      actions.fetchOldMemberList({
        size: params?.rowsPerPage,
        page: params?.page,
        filter: {
          nikNumber: params?.nikNumber,
          oldKtaNumber: params?.oldKtaNumber,
          searchKey: params?.phoneOrName,
        },
      }),
    );
  };

  const activeOldMember = (item: OldMemberListType) => {
    setActiveMemberData(item);
    setOpenApprove(true);
  };

  const onSearch = (params: OldMemberListRequestData) => {
    fetchDataForPage({
      rowsPerPage: filter?.rowsPerPage,
      page: filter?.page,
      nikNumber: params?.nikNumber,
      oldKtaNumber: params?.oldKtaNumber,
      phoneOrName: params?.phoneOrName,
    });
  };

  const renderItem = (item: OldMemberListType, index?: number) => {
    return [
      item.fullName,
      item.oldKtaNumber ? item.oldKtaNumber : '-',
      <EllipsisText text={item?.phone}></EllipsisText>,
      item.nikNumber ? item.nikNumber : '-',
      item?.packageName ? item?.packageName : '-',
      item?.status ? <Status status={item?.status} /> : '-',
      moment(item?.registerTime).format('DD/MM/YYYY HH:mm'),
      <Button
        variant="contained"
        onClick={() => {
          activeOldMember(item);
        }}
      >
        {t(translations.common.active)}
      </Button>,
    ];
  };

  const handleFetchDataForPage = (params: OldMemberListRequestData) => {
    fetchDataForPage({
      page: params.page,
      rowsPerPage: params.rowsPerPage,
      orderBy: params.orderBy,
      nikNumber: params?.nikNumber,
      oldKtaNumber: params?.oldKtaNumber,
      phoneOrName: params?.phoneOrName,
    });
  };

  const handleOnPageChange = (pageNumber: number, limit: number) => {
    handleFetchDataForPage({
      page: pageNumber,
      rowsPerPage: limit,
      orderBy: filter?.orderBy as OrderType,
      nikNumber: filter?.nikNumber,
      oldKtaNumber: filter?.oldKtaNumber,
      phoneOrName: filter?.phoneOrName,
    });
    setFilter({
      ...filter,
      rowsPerPage: limit,
      page: pageNumber,
    });
  };

  const handleConfirm = (activeMemberData: any) => {
    dispatch(
      actions.activeOldMember({
        claimId: id,
        ktaMembershipId: activeMemberData?.id,
      }),
    );
  };

  const backToMemberList = () => {
    navigate(path.memberManagement);
  };

  const DivActive = styled('div')({
    marginTop: '120px',
    textAlign: 'center',
    fontSize: '36px',
    color: '#777777',
  });

  return (
    <Card style={{ marginTop: '2rem' }}>
      <Header title={t(translations.common.oldMemberList)} />
      {state?.status === MemberStatus.DONE || isActive ? (
        <div style={{ height: '300px' }}>
          <DivActive>
            {t(translations.claimManagement.memberActivated)}
          </DivActive>
          <Button
            variant="contained"
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '2rem',
              display: 'table-row',
              padding: '0.5rem 1.5rem 0.5rem 1.5rem',
            }}
            onClick={backToMemberList}
          >
            {t(translations.claimManagement.backToMemberList)}
          </Button>
        </div>
      ) : (
        <>
          <TableToolbar
            onSearch={onSearch}
            keyword={filter?.phoneOrName ? filter?.phoneOrName : ''}
            placeholder={t(translations.tableMembership.searchPlaceholder)}
            state={state}
          />
          <Table
            headers={headers ? headers : []}
            items={data?.data}
            pageNumber={filter?.page ? filter?.page : 0}
            totalElements={data?.count ? data.count : 0}
            renderItem={renderItem}
            order={filter?.order ? filter?.order : OrderType.DESC}
            orderBy={String(filter?.orderBy ? filter?.orderBy : '')}
            onPageChange={handleOnPageChange}
          />
        </>
      )}
      <ActiveDialog
        open={openApprove}
        title={t(translations.common.confirmation)}
        description={
          <Typography sx={{ fontWeight: 600 }}>
            {t(translations.claimManagement.activeMemberModal)}
          </Typography>
        }
        activeMemberData={activeMemberData ? activeMemberData : null}
        onCancel={() => setOpenApprove(false)}
        onCreate={() => {
          handleConfirm(activeMemberData);
          setOpenApprove(false);
        }}
      />
    </Card>
  );
});
