import { EllipsisText } from 'app/components/EllipsisText';
import Table from 'app/components/Table';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { useClaimClubDetailsSlice } from '../slice';
import { selectClaimedClubDetails } from '../slice/selectors';
import { ClaimClubDetailsResponse, OldMemberItem } from '../slice/types';

import AssignAdminButton from './AssignAdminBtn';

const CTable = styled(Table)`
  .status {
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    padding: 1px 8px;
    border-radius: 6px;
    width: fit-content;

    &.active {
      background: rgba(84, 214, 44, 0.16);
      color: #229a16;
    }

    &.expired,
    &.banned {
      color: #b72136;
      background: rgba(255, 72, 66, 0.16);
    }
  }
`;
interface Props {
  show: boolean;
  clubDetails?: ClaimClubDetailsResponse;
}
function ClaimClubTable(props: Props) {
  const { show, clubDetails } = props;

  const dispatch = useDispatch();
  const { data, filter, total } = useSelector(
    selectClaimedClubDetails,
  ).oldMemberList;

  const { actions } = useClaimClubDetailsSlice();
  const { t } = useTranslation();
  const { id } = useParams();

  React.useEffect(() => {
    if (!clubDetails?.clubMembershipId) return;
    dispatch(
      actions.getOldMemberList({
        claimId: clubDetails?.clubMembershipId,
        filter: {
          page: 0,
          size: 10,
        },
      }),
    );
  }, [clubDetails]);

  const headers = [
    {
      id: 'name',
      label: t(translations.common.name),
    },
    {
      id: 'ktaNumber',
      label: t(translations.common.ktaNumber),
    },

    {
      id: 'role',
      label: t(translations.tableAssociation.role),
    },
    {
      id: 'phone',
      label: t(translations.editMember.phoneNumber),
    },
    {
      id: 'packageStatus',
      label: t(translations.common.packageStatus),
    },
    {
      id: 'memberStatus',
      label: t(translations.common.memberStatus),
    },
    {
      id: 'empty',
      label: '',
    },
  ];
  const handleChangePage = (page: number, size: number) => {
    if (!clubDetails?.clubMembershipId) return;
    dispatch(
      actions.getOldMemberList({
        claimId: clubDetails?.clubMembershipId,
        filter: { ...filter, page, size },
      }),
    );
  };

  const renderItem = (item: OldMemberItem, index?: number) => {
    return [
      item.fullName,
      item.ktaNumber,
      item.roles[0].title,
      item.phone,
      <div
        className={classNames('text-capitalize status', {
          active: item.packageStatus === 'ACTIVE',
          expired: item.packageStatus === 'EXPIRED',
        })}
      >
        {item.packageStatus?.toLowerCase()}
      </div>,
      <div
        className={classNames('text-capitalize status', {
          active: item.status === 'ACTIVE',
          banned: item.status === 'BANNED',
        })}
      >
        {item.status?.toLowerCase()}
      </div>,
      item.roles[0].role === 'ADMIN' ? (
        ''
      ) : (
        <AssignAdminButton
          userId={item.userUuid}
          memberId={clubDetails?.clubMembershipId}
        />
      ),
    ];
  };

  return (
    <CTable
      headers={headers}
      items={data}
      order="asc"
      orderBy=""
      pageNumber={filter.page}
      limitElement={filter.size}
      onPageChange={handleChangePage}
      totalElements={total}
      renderItem={renderItem}
      className={classNames({ 'd-none': !show })}
    />
  );
}

export default React.memo(ClaimClubTable);
