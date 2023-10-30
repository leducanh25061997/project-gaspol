/**
 *
 * MemberManagement
 *
 */
import React, { memo, useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import KisToolbar from 'app/pages/KisManagement/components/KisToolbar';
import { withTitle } from 'app/components/HOC/WithTitle';
import { AuditBox } from 'app/components/AuditBox';
import { AuditTrail, KisInfo, Province, FilterParams } from 'types';
import moment from 'moment';
import { Loading } from 'app/components/Loading';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { selectKisManagement } from '../slice/selectors';
import { useKisManagementSlice } from '../slice';
import { TableList } from '../components/TableList';

import { KisInfo as KisInformationDialog } from '../KisInfo';

interface Props {}

const KisProvince = memo((props: Props) => {
  const [currentProvince, setCurrentProvince] = useState<
    Province | undefined
  >();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useKisManagementSlice();
  const { kisPageable, provinces, isLoading } =
    useSelector(selectKisManagement);
  const [selectedKIS, setSelectedKIS] = React.useState<number | undefined>();
  const [isDisableFilterProvince, setIsDisableFilterProvince] =
    React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [isShowView, setIsShowView] = React.useState<boolean>(false);
  const [isShowStatus, setIsShowStatus] = React.useState<boolean>(false);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [kisInfoDialog, setKISInfoDialog] = React.useState({
    open: false,
    isEdit: false,
  });
  const [filter, setFilter] = useState<FilterParams>({ page: 0 });
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
      label: t(translations.kisInformation.price),
    },
    {
      id: 'modifiedDate',
      label: t(translations.kisInformation.latestUpdate),
    },
    {
      id: 'status',
      label: t(translations.common.status),
      isShow: isShowStatus,
      isHide: !isShowStatus,
    },
    {
      id: 'action',
      label: t(translations.common.action),
      // isShow: isUpdate,
      // isHide: !isUpdate,
    },
  ];

  React.useEffect(() => {
    // console.log(userInformation, 'userInformation -----');
    if (userInformation) {
      if (
        userInformation.provinceId ||
        userInformation.groups?.some(
          group => group.groupName === 'imi_super_admin',
        )
      ) {
        setIsShowStatus(true);
        setIsUpdate(true);
      } else {
        if (
          (userInformation.roles &&
            userInformation.groups &&
            userInformation.groups[0].groupName !== 'imi_super_admin' &&
            userInformation.roles.includes('kis_pricing_range_update')) ||
          userInformation.roles.includes('kis_pricing_update_province')
        ) {
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }
      }
    }
  }, [userInformation]);

  // React.useEffect(() => {
  //   if (userInformation && userInformation.roles && userInformation.groups) {
  //     if (
  //       userInformation.groups.length > 0 &&
  //       userInformation.groups[0].groupName !==  'imi_super_admin' &&
  //       userInformation.roles.length > 0 &&
  //       (userInformation.roles.includes('kis_pricing_range_update') ||
  //         userInformation.roles.includes('kis_pricing_update_province'))
  //     ) {
  //       console.log('---------');
  //       setIsShowStatus(true);
  //     } else {
  //       if (userInformation.groups[0].groupName ===  'imi_super_admin') {
  //         setIsShowView(true);
  //       }
  //     }
  //   }
  //   console.log('-------- 11111')
  // }, [userInformation]);

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, []);

  React.useEffect(() => {
    if (provinces.length > 0) {
      if (userInformation && userInformation?.provinceId) {
        const provinceId = parseInt(userInformation?.provinceId);
        const _province = provinces.filter(
          (item: any) => item.id === provinceId,
        );
        setCurrentProvince(_province[0]);
        fetchKis(_province[0]);
        setIsDisableFilterProvince(true);
      } else {
        setCurrentProvince(provinces[0]);
        fetchKis(provinces[0]);
      }
    }
  }, [provinces, userInformation]);

  const changeProvinceStatus = (item: KisInfo) => {
    const newParams: KisInfo = {
      id: item.id,
      status: item.status,
    };
    dispatch(actions.updateProvinceKisInformation(newParams));
  };

  const fetchKis = (province?: Province) => {
    dispatch(
      actions.fetchKisByProvince({
        size: 10,
        page: 0,
        provinceId: province?.id,
      }),
    );
    setFilter({ ...filter, page: 0 });
    setCurrentProvince(province);
  };

  const handleOnPageChange = (page?: number, limit?: number) => {
    dispatch(
      actions.fetchKisByProvince({
        size: limit,
        page,
        provinceId: currentProvince?.id,
      }),
    );
    setFilter({ ...filter, page });
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

  const handleEditKIS = React.useCallback((id: number) => {
    setSelectedKIS(id);
    setKISInfoDialog(prev => ({ ...prev, open: true, isEdit: true }));
  }, []);

  const handleViewKIS = React.useCallback((id: number) => {
    setSelectedKIS(id);
    setKISInfoDialog(prev => ({ ...prev, open: true, isEdit: false }));
  }, []);

  const handleCloseKISInfoDialog = React.useCallback(() => {
    setSelectedKIS(undefined);
    setKISInfoDialog(prev => ({ ...prev, open: false }));
  }, []);

  const renderItem = (item: AuditTrail, index?: number) => {
    return [
      moment(item?.timestamp).format('DD/MM/YYYY HH:mm'),
      item.by,
      item.actions,
    ];
  };

  return (
    <>
      <Card sx={{ padding: '1rem' }}>
        <KisToolbar
          onChangeProvince={fetchKis}
          provinces={provinces}
          currentProvince={currentProvince}
          type="province"
          isDisableFilterProvince={isDisableFilterProvince}
        />
        <TableList
          type="province"
          filter={filter}
          handleOnPageChange={handleOnPageChange}
          onChangeStatus={changeProvinceStatus}
          headers={headers}
          items={kisPageable?.data}
          totalElements={kisPageable?.total}
          onEdit={handleEditKIS}
          onView={handleViewKIS}
          isUpdate={isUpdate}
          isShowStatus={isShowStatus}
        />
      </Card>
      <Loading isLoading={isLoading} />
      {/* <AuditBox
        items={undefined}
        headers={headersAudit}
        renderItem={renderItem}
      /> */}
      {selectedKIS && (
        <KisInformationDialog
          id={selectedKIS}
          open={kisInfoDialog.open}
          isEdit={kisInfoDialog.isEdit}
          onClose={handleCloseKISInfoDialog}
        />
      )}
    </>
  );
});

export default withTitle(KisProvince, 'kisInformation.kisPricingManagement');
