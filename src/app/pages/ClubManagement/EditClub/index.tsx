/**
 *
 * EditClub
 *
 */
import React, { memo, useEffect } from 'react';
import { Grid, Container, styled } from '@mui/material';

import Page from 'app/components/Page';

import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useLoading } from 'app/hooks';
import { useNavigate, useParams } from 'react-router';
import { MainContent } from 'app/components/HOC/WithTitle';

import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'app/components/Header';

import { FormRequest } from './components/FormRequest';

import { selectClubManagementEdit } from './slice/selectors';
import { useClubManagementEditSlice } from './slice';

export const RootStyle = styled('div')({
  '& .MuiInputLabel-root.Mui-error': {
    color: '#9D9D9D',
  },
  '& .MuiFormHelperText-root': {
    color: '#A84600',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#A84600',
  },
  '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#9D9D9D',
  },
  '& .MuiFormControl-root': {
    marginTop: 0,
    height: '87px',
  },
  '& #packageStatus': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& #packageName': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& #memberStatus': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& #phoneNumber': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
});
interface Props {
  setLoading?: Function;
}

export const EditClub = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useClubManagementEditSlice();
  const fetchFormData = useSelector(selectClubManagementEdit);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(actions.fetchCategories());
    dispatch(actions.fetchPackages());
    dispatch(actions.fetchProvinces());
    dispatch(actions.fetchBank());
  }, []);

  React.useEffect(() => {
    if (id) {
      dispatch(actions.fetchClub(id));
      dispatch(
        actions.fetchListMemberOfClub({
          clubId: Number(id),
          clubMembershipId: Number(id),
        }),
      );
    }
  }, [actions, dispatch, id]);

  return (
    <Page title={t(translations.clubManagementConfirm.editTitle)}>
      <MainContent>
        <Header title={t(translations.clubManagementConfirm.editTitle)} />
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <RootStyle>
              <FormRequest
                setLoading={props.setLoading}
                clubId={id || 'undefined'}
                individualInformation={fetchFormData?.club}
              />
            </RootStyle>
          </Grid>
        </Grid>
      </MainContent>
    </Page>
  );
});
