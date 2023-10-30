import { withTitle } from 'app/components/HOC/WithTitle';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import path from 'app/routes/path';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';

import { LoadingButton } from '@mui/lab';

import { SubKey, KV, SubRow, SubValue } from 'app/components/KeyValue';

import { CreateDialog } from 'app/components/CreateDialog/index';

import { useBusinessPartnerInformationSlice } from './slice';

import { selectBusinessPartnerInfomation } from './slice/selectors';
import { LeftInfomation } from './components/left';
import { RightInfomation } from './components/right';

interface Props {}

const BusinessPartnerInformation = memo((props: Props) => {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useBusinessPartnerInformationSlice();
  const params = useParams();
  const { businessPartnerInformation } = useSelector(
    selectBusinessPartnerInfomation,
  );
  const { id } = params;

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchBusinessPartnerInformation(id));
  }, []);

  const onConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const handleSubmitForm = () => {};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} sx={{ mt: 5 }}>
        <LeftInfomation info={businessPartnerInformation} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} sx={{ mt: 5 }}>
        <RightInfomation info={businessPartnerInformation} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 2, textAlign: 'end' }}>
        <LoadingButton variant="contained" onClick={onConfirmModal}>
          {t(translations.common.approve)}
        </LoadingButton>
        <CreateDialog
          open={openConfirmModal}
          title={t(translations.common.confirmApproval)}
          description={
            <KV>
              <SubRow>
                <SubKey>
                  {t(translations.confirmApproveDialog.merchantName)}
                  <span>:</span>
                </SubKey>
                <SubKey>{'Raymond Nguyen'}</SubKey>
                {/* <SubValue>{info?.businessPartnerCode}</SubValue> */}
              </SubRow>
              <SubRow>
                <SubKey>
                  {t(translations.common.picPhoneNumber)}
                  <span>:</span>
                </SubKey>
                <SubValue>{'086546544656'}</SubValue>
                {/* <SubValue>{info?.businessPartnerCode}</SubValue> */}
              </SubRow>
              <SubRow>
                <SubKey>
                  {t(translations.common.companyName)}
                  <span>:</span>
                </SubKey>
                <SubValue>{'Geleximco export and import Ha Noi'}</SubValue>
                {/* <SubValue>{info?.businessPartnerCode}</SubValue> */}
              </SubRow>
              <SubRow>
                <SubKey>
                  {t(translations.companyInformation.businessType)}
                  <span>:</span>
                </SubKey>
                <SubValue>{'Services'}</SubValue>
                {/* <SubValue>{info?.businessPartnerCode}</SubValue> */}
              </SubRow>
              <SubRow>
                <SubKey>
                  {t(translations.common.expiredDate)}
                  <span>:</span>
                </SubKey>
                <SubValue>{'20/12/2023'}</SubValue>
                {/* <SubValue>
                  {info?.expiredDate &&
                    moment(info?.expiredDate).format('DD/MM/YYYY')}
                </SubValue> */}
              </SubRow>
            </KV>
          }
          onCancel={() => setOpenConfirmModal(false)}
          onCreate={() => {
            handleSubmitForm();
          }}
        />
      </Grid>
    </Grid>
  );
});

export default withTitle(
  BusinessPartnerInformation,
  'businessPartnerInformation.title',
  path.businessPartnerInformation,
);
