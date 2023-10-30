import { Button } from '@mui/material';
import { AlertDialog } from 'app/components/AlertDialog';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { showError, showSuccess } from 'utils/commonFunction';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import styled from 'styled-components';

import { useClaimClubDetailsSlice } from '../slice';
import { selectClaimedClubDetails } from '../slice/selectors';

const StyleButton = styled.button`
  white-space: nowrap;
  border-radius: 4px;
  background: #00ab55;
`;

interface Props {
  userId: string;
  memberId: any;
}

export default function AssignAdminButton(props: Props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { actions } = useClaimClubDetailsSlice();
  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { filter } = useSelector(selectClaimedClubDetails).oldMemberList;

  const handleConfirm = () => {
    if (!id) return;
    dispatch(
      actions.assignAdmin({
        params: { claimId: props.memberId, userUuid: props.userId },
        onSuccess: () => {
          dispatch(
            actions.getOldMemberList({
              claimId: props.memberId,
              filter,
            }),
          );
          showSuccess(t(translations.claimClubList.adminAssigned));
        },
        onError: showError,
      }),
    );
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleClickActive = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <StyleButton
        onClick={handleClickActive}
        className="text-white fs-10 lh-12 fw-600 px-4 py-4"
      >
        {t(translations.claimClubList.assignAdmin)}
      </StyleButton>
      <AlertDialog
        open={isDialogOpen}
        title={t(translations.common.confirm)}
        description={t(translations.claimClubList.areYouSureAssignClub)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
