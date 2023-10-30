/**
 *
 * KisManagement
 *
 */
import React, { memo } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { AuditTrail, KisInfo, Province } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import KisToolbar from 'app/pages/KisManagement/components/KisToolbar';
import { withTitle } from 'app/components/HOC/WithTitle';
import { AuditBox } from 'app/components/AuditBox';
import { Card } from '@mui/material';
import moment from 'moment';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { NewKis } from '../NewKis';
import { TableList } from '../components/TableList';
import { useKisManagementSlice } from '../slice';
import { selectKisManagement } from '../slice/selectors';

interface Props {}

const ImiManagement = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useKisManagementSlice();
  const { kisPageable } = useSelector(selectKisManagement);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [isView, setIsView] = React.useState<boolean>(false);
  const [selectedKIS, setSelectedKIS] = React.useState<number | undefined>();
  const [newKISDialog, setNewKISDialog] = React.useState({
    open: false,
  });
  const [isConfigureUpdate, setIsConfigureUpdate] =
    React.useState<boolean>(false);
  const headers = [
    {
      id: 'kisName',
      label: t(translations.kisInformation.kisName),
      width: 200,
    },
    {
      id: 'kisId',
      label: t(translations.kisInformation.kisID),
    },
    {
      id: 'price',
      label: t(translations.kisInformation.minMaxPrice),
    },
    {
      id: 'modifiedDate',
      label: t(translations.kisInformation.latestUpdate),
    },
    {
      id: 'status',
      label: t(translations.common.status),
      isShow: isConfigureUpdate,
      isHide: !isConfigureUpdate,
    },
    {
      id: 'action',
      label: t(translations.common.action),
      // isShow: isConfigureUpdate,
      // isHide: !isConfigureUpdate
    },
  ];

  React.useEffect(() => {
    fetchDataForPage();
  }, []);

  React.useEffect(() => {
    if (userInformation && userInformation.roles) {
      if (
        userInformation.roles.length > 0 &&
        userInformation.roles.includes('kis_configure_update')
      ) {
        setIsConfigureUpdate(true);
        // headers.push({
        //   id: 'action',
        //   label: t(translations.common.action),
        // })
      }
    }
  }, [userInformation]);

  const fetchDataForPage = (page: number = 0, limit: number = 10) => {
    dispatch(
      actions.fetchKisData({
        size: limit,
        page,
      }),
    );
  };

  const handleChangeImiStatus = (item: KisInfo) => {
    const newParams: KisInfo = {
      id: item.id,
      status: item.status,
    };
    dispatch(actions.updateIMIKisInformation(newParams));
  };

  const handleOnPageChange = (page?: number, limit?: number) => {
    dispatch(
      actions.fetchKisData({
        page,
        size: limit,
      }),
    );
  };

  const headersAudit = [
    {
      id: 'timestamp',
      label: t(translations.kisInformation.timestamp),
    },
    {
      id: 'by',
      label: t(translations.common.by),
    },
    {
      id: 'action',
      label: t(translations.common.action),
    },
  ];
  const renderItem = (item: AuditTrail, index?: number) => {
    return [
      moment(item?.timestamp).format('DD/MM/YYYY HH:mm'),
      item.by,
      item.actions,
    ];
  };

  const handleEditKIS = React.useCallback((id: number) => {
    setIsView(false);
    setSelectedKIS(id);
    setNewKISDialog(prev => ({ ...prev, open: true }));
  }, []);

  const handleViewKIS = React.useCallback((id: number) => {
    setSelectedKIS(id);
    setIsView(true);
    setNewKISDialog(prev => ({ ...prev, open: true }));
  }, []);

  const handleAddNewKIS = React.useCallback(() => {
    setSelectedKIS(undefined);
    setNewKISDialog(prev => ({ ...prev, open: true }));
  }, []);

  const handleCloseNewKISDialog = React.useCallback(() => {
    setSelectedKIS(undefined);
    setNewKISDialog(prev => ({ ...prev, open: false }));
  }, []);

  return (
    <>
      <Card sx={{ padding: '1rem' }}>
        <KisToolbar
          type="imi"
          onAddNew={handleAddNewKIS}
          isConfigureUpdate={isConfigureUpdate}
        />
        <TableList
          handleOnPageChange={handleOnPageChange}
          onChangeStatus={handleChangeImiStatus}
          headers={headers}
          items={kisPageable?.data}
          totalElements={kisPageable?.total}
          type="imi"
          onEdit={handleEditKIS}
          onView={handleViewKIS}
          isConfigureUpdate={isConfigureUpdate}
        />
      </Card>
      {/* <AuditBox
        items={undefined}
        headers={headersAudit}
        renderItem={renderItem}
      />*/}
      <NewKis
        open={newKISDialog.open}
        id={selectedKIS}
        isView={isView}
        onClose={handleCloseNewKISDialog}
      />
    </>
  );
});

export default withTitle(ImiManagement, 'kisInformation.kisManagementTitle');
