/**
 *
 * GeneralInformation
 *
 */
import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ClubGeneralInformation } from 'app/components/ClubGeneralInformation';
import { ClubDocuments } from 'app/components/ClubDocuments';
import { ClubLocation } from 'app/components/ClubLocation';
import { BankGeneralInformation } from 'app/components/BankGeneralInformation';
import { ClubMembershipInfomation } from 'app/components/ClubMembershipInfomation';
import { translations } from 'locales/translations';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, ClubInformation, IndividualInformation } from 'types';
import { MemberStatus } from 'types/enums';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';

import { ApprovalDialog } from 'app/components/ApprovalDialog';

import { Label, TitlePage } from 'app/components/Label';

import { useClubInformationSlice } from '../../slice';

import { ClubDocument } from './ClubDocument';

interface Props {
  info?: ClubInformation;
}

export const GeneralInformation = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useClubInformationSlice();
  const { info } = props;
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [artDocumentsApproval, setArtDocumentsApproval] =
    useState<boolean>(false);

  useEffect(() => {
    if (info && info?.artDocumentsApproval) {
      setArtDocumentsApproval(true);
    }
  }, [info]);

  const statusNoteRequestSchema = yup
    .object({
      note: yup
        .string()
        .required(t(translations.VerifyMembershipEdit.leaveNote)),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClubInformation>({
    resolver: yupResolver(statusNoteRequestSchema),
  });

  const statusClub = [
    MemberStatus.ACTIVE,
    MemberStatus.BANNED,
    MemberStatus.EXPIRED,
  ];

  // const onSubmit = (data: ClubInformation) => {
  //   dispatch(
  //     actions.submitClubDocuments({
  //       club: info,
  //       forms: data,
  //       documents: [],
  //     }),
  //   );
  // };

  const handleOpenAprrovalDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleApprove = () => {
    const newParams: ClubInformation = {
      id: info?.id,
      star: info?.star,
      artDocumentsApproval: true,
    };
    dispatch(actions.submitApprovalCubDocuments(newParams));
    setArtDocumentsApproval(true);
    setOpenConfirmDialog(false);
  };

  // useEffect(() => {
  //   if (info) {
  //     setCertForms({ eCertificateNumber: info.eCertificateNumber });
  //   }
  // }, [info]);

  // useEffect(() => {
  //   return () => {
  //     setCertForms({});
  //     setCertError(undefined);
  //   };
  // }, []);

  return (
    <Grid container spacing={3} sx={{ mt: '-10px' }}>
      <Grid item xs={12} sm={12} md={6}>
        <ClubGeneralInformation info={info} />
        <BankGeneralInformation info={info} />
        <ClubDocuments
          info={info}
          handleOpenAprrovalDialog={handleOpenAprrovalDialog}
          buttonName={t(translations.common.approve)}
          artDocumentsApproval={artDocumentsApproval}
        />
        {/* <ClubDocument
          filesUrls={info?.artDocumentLinks}
          filePaths={info?.artDocuments}
          title={t(translations.clubInformation.clubAdArt)}
          buttonName={t(translations.common.approve)}
          info={info}
          onSave={documents =>
            onSave(documents, 'artDocuments', { artDocumentsApproval: true })
          }
        /> */}
        {/* <Card sx={{ mt: 5 }}>
          <Grid container justifyContent={'space-between'} sx={{ mb: 5 }}>
            <Label>
              {t(translations.clubManagementConfirm.clubCategories)}
            </Label>
            <IconButton component="span" children={<AddIcon />} />
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent={'flex-start'}
            flexWrap={'wrap'}
          >
            {info?.clubCategoriesLink?.map(item => (
              <Grid item>
                <Paper sx={{ padding: 1, bgcolor: '#C4C4C4' }} elevation={5}>
                  {item.slice(1)}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Card> */}
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <ClubLocation info={info} />
        <ClubMembershipInfomation info={info} />
        <Card sx={{ mt: 5 }}>
          <Grid container justifyContent={'space-between'} mb={1}>
            <TitlePage>{t(translations.common.description)}</TitlePage>
          </Grid>
          <Typography
            style={{ color: '#000000', fontWeight: 400, lineHeight: '24px' }}
          >
            {info?.description}
          </Typography>
        </Card>
        {/* <ClubDocument
          filesUrls={info?.documentLinks}
          filePaths={info?.documents}
          title={t(translations.clubInformation.clubDocument)}
          buttonName={t(translations.common.save)}
          info={info}
          onSave={documents => onSave(documents, 'documents')}
          isHeader
        />
        <ClubDocument
          filesUrls={info?.certDocumentLinks}
          filePaths={info?.certDocuments}
          title={t(translations.clubInformation.clubCertificate)}
          buttonName={t(translations.common.save)}
          info={info}
          onSave={documents => {
            onSave(documents, 'certDocuments', certForms);
          }}
          extra={
            <TextField
              label="E-Certificate number"
              error={!!certError}
              helperText={certError}
              value={certForms.eCertificateNumber}
              onChange={ev => {
                const { value } = ev.target;
                setCertForms({ eCertificateNumber: value });
                setCertError(
                  value.length
                    ? undefined
                    : 'E-Certificate number is required!',
                );
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          }
        />*/}

        {/* <Card sx={{ mt: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'row'}>
              <Label>{t(translations.clubInformation.changeStatus)}</Label>
              <Select {...register('status')} sx={{ height: 30, ml: 3 }}>
                {(statusClub || []).map((value, index) => (
                  <MenuItem key={value} value={value}>
                    {`${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ mt: 3 }}>
              <TextField
                {...register('note')}
                fullWidth
                label={`${t(translations.tableMembership.note)}*`}
                error={!!errors.note}
                helperText={errors?.note?.message}
                multiline
                minRows={6}
              />
            </Stack>
            <Box sx={{ mt: 5, textAlign: 'end' }}>
              <LoadingButton variant="contained" type="submit">
                {t(translations.common.save)}
              </LoadingButton>
            </Box>
          </form>
        </Card> */}
      </Grid>
      <ApprovalDialog
        title={t(translations.common.confirmation)}
        description={t(translations.common.areYouWantApprove)}
        open={openConfirmDialog}
        isConfirmDialog
        onCancel={() => setOpenConfirmDialog(false)}
        onApprove={() => handleApprove()}
      />
    </Grid>
  );
});
