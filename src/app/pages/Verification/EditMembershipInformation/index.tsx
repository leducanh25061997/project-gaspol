/**
 *
 * EditIndividualRequestDetail
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import Page from 'app/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { withLoading } from 'app/components/HOC/WithLoading';
import { translations } from 'locales/translations';
import { Container, Grid } from '@mui/material';
import {
  ParamsUpload,
  Transaction,
  Member,
  IndividualInformation,
} from 'types';

import { Header } from './components/Header';
import { FormRequest } from './components/FormRequest';
import { selectEditIndividualMember } from './slice/selectors';
import { useEditIndividualMemberSlice } from './slice';

interface Props {
  setLoading?: Function;
}

export const EditMembershipInformation = withLoading(
  memo((props: Props) => {
    const { actions } = useEditIndividualMemberSlice();
    const { t } = useTranslation();
    const [formData, setFormdata] = React.useState<
      IndividualInformation | undefined
    >();
    const { userPackage, individualInformation } = useSelector(
      selectEditIndividualMember,
    );
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { id } = params;
    const [fileData, setFileData] = React.useState<any | undefined>();
    const [isApprove, setIsApprove] = React.useState<boolean | undefined>(
      false,
    );
    const handleSubmitForm = (data: any) => {
      setFormdata({ ...individualInformation, ...data });
      setIsApprove(true);
    };

    React.useEffect(() => {
      if (id) {
        dispatch(actions.fetchMembershipRequestDetail(id));
      }
    }, []);

    React.useEffect(() => {
      if (userPackage?.individualInfo?.id) {
        dispatch(
          actions.fetchIndividualInformation(
            `${userPackage.individualInfo.id}`,
          ),
        );
      }
    }, [userPackage?.individualInfo]);

    React.useEffect(() => {
      if (formData && fileData && isApprove) {
        const newData = { ...fileData };

        const files = [];

        if (fileData?.profilePicture?.file) {
          files.push(fileData?.profilePicture?.nameFile);
        } else {
          delete newData?.profilePicture;
        }

        if (fileData?.nikPicture?.file) {
          files.push(fileData?.nikPicture?.nameFile);
        } else {
          delete newData?.nikPicture;
        }

        if (fileData?.simPicture?.file) {
          files.push(fileData?.simPicture?.nameFile);
        } else {
          delete newData?.simPicture;
        }
        dispatch(
          actions.editIndividualRequest({
            files: {
              fileNames: files,
            },
            formData,
            fileData: newData,
            id,
            navigate,
            t,
            translations,
          }),
        );
      }
      setIsApprove(false);
    }, [isApprove]);

    return (
      <Page title={t(translations.VerifyMembershipEdit.title)}>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Header id={id} />
              <FormRequest
                memberId={id || 'undefined'}
                handleSubmitForm={handleSubmitForm}
                setFileData={setFileData}
                individualInformation={individualInformation}
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }),
);
