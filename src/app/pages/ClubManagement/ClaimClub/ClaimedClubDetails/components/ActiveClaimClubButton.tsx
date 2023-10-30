import { Button } from '@mui/material';
import { AlertDialog } from 'app/components/AlertDialog';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { showError, showSuccess } from 'utils/commonFunction';

import { useClaimClubDetailsSlice } from '../slice';

export default function ActiveClaimClubButton() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useClaimClubDetailsSlice();
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    if (!id) return;
    dispatch(
      actions.activeClaimClub({
        params: id,
        onSuccess: () => {
          navigate('/clubs/list');
          showSuccess(t(translations.claimClubList.clubActivated));
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
      <Button
        onClick={handleClickActive}
        variant="contained"
        className="text-white fs-16 lh-19 px-34 py-14 rounded-10 active-btn"
      >
        {t(translations.common.active)}
      </Button>
      <AlertDialog
        open={isDialogOpen}
        title={t(translations.common.confirmation)}
        description={t(translations.claimClubList.clubActive)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
