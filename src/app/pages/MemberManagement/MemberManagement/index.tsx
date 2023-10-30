/**
 *
 * MemberManagement
 *
 */
import React, { memo, useEffect, useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MembershipType } from 'types/enums';
import { withTitle } from 'app/components/HOC/WithTitle';
import { Loading } from 'app/components/Loading';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { TableList } from './components/TableList';

import { useMemberManagementSlice } from './slice';
import { selectMemberManagement } from './slice/selectors';

interface Props {}

const MemberManagement = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMemberManagementSlice();
  const { membersDataPageable, isLoading } = useSelector(
    selectMemberManagement,
  );

  const headers = [
    {
      id: 'name',
      label: t(translations.tableMembership.name),
      width: 200,
      hasSort: true,
    },
    {
      id: 'ktaNumber',
      label: t(translations.common.ktaNumber),
    },
    {
      id: 'phone',
      label: t(translations.tableMembership.phoneNumber),
    },
    {
      id: 'packageName',
      label: t(translations.tableMembership.packageInfo),
      hasSort: true,
    },
    {
      id: 'provinceName',
      label: t(translations.tableMembership.provinceName),
      hasSort: true,
    },
    {
      id: 'status',
      label: t(translations.tableMembership.memberStatus),
      hasSort: true,
    },
    {
      id: 'registerTime',
      label: t(translations.tableMembership.registerTime),
      hasSort: true,
    },
    {
      id: 'moremenu',
      label: '',
    },
  ];

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, [actions, dispatch]);

  return (
    <div>
      <TableList
        headers={headers}
        items={membersDataPageable?.data}
        totalElements={membersDataPageable?.count}
      />
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default withTitle(MemberManagement, 'memberManagement.headerTitle');
