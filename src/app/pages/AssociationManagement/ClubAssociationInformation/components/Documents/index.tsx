import { memo, useState } from 'react';
import { Button, Card, Divider, Grid, styled, Typography } from '@mui/material';
import { SubRow, SubKey, SubValue } from 'app/components/KeyValue';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Label } from 'app/components/Label';
import { Star } from 'app/components/Star';
import {
  ColInfo,
  LabelInfo,
  RowFooter,
  RowInfo,
  TitleStyle,
  ValueStyle,
} from 'app/components/KeyText';
import { ApprovalDialog } from 'app/components/ApprovalDialog';
import {
  AssociationInformationType,
  ApproveAssociationFormRequest,
} from 'types/AssociationManagement';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { useAssociationInformationSlice } from '../../slice';
import { selectAssociationInformation } from '../../slice/selectors';

export const TextEllipsis = styled('div')({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '200px',
});

export const TextEllipsisRight = styled('div')({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '200px',
  float: 'right',
});

interface Props {
  info?: AssociationInformationType;
}

export const Documents = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = useAssociationInformationSlice();
  const { isApproved } = useSelector(selectAssociationInformation);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const handleApprove = () => {
    const newParams: any = {
      id: info?.id,
      associationBody: {
        artDocumentsApproval: true,
      },
      navigate,
    };
    dispatch(actions.approveDocuments(newParams));
    setOpenConfirmDialog(false);
  };
  return (
    <Card sx={{ marginTop: '1rem' }}>
      <RowFooter>
        <TitleStyle>
          <Label>{t(translations.clubAssociationInformation.documents)}</Label>
        </TitleStyle>
      </RowFooter>
      <SubRow>
        <SubKey>
          {t(translations.clubAssociationInformation.adArtDocument)}
        </SubKey>
        <Typography
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'end',
            width: 200,
          }}
        >
          <Grid>
            {info?.artDocuments && info?.artDocuments.length > 0 ? (
              <Grid>
                <Grid>
                  <TextEllipsis>
                    <a
                      href={info?.artDocuments[0]}
                      target="_blank"
                      style={{ color: '#00AB55' }}
                      rel="noreferrer"
                    >
                      {info?.artDocuments[0]}
                    </a>
                  </TextEllipsis>
                </Grid>
                {info?.artDocumentsApproval || isApproved ? (
                  <div style={{ fontWeight: 'bold', color: '#00AB55' }}>
                    {t(translations.common.approved)}
                  </div>
                ) : (
                  <LoadingButton
                    sx={{ marginTop: '0.5rem' }}
                    variant="contained"
                    onClick={() => {
                      setOpenConfirmDialog(true);
                    }}
                  >
                    {t(translations.common.approve)}
                  </LoadingButton>
                )}
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Typography>
      </SubRow>
      <Divider />
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.certDocument)}
        </LabelInfo>
        <ValueStyle>
          {info?.certDocuments && info?.certDocuments.length > 0 && (
            <TextEllipsisRight>
              <a
                href={info?.certDocuments[0]}
                target="_blank"
                style={{ color: '#00AB55' }}
                rel="noreferrer"
              >
                {info?.certDocuments[0]}
              </a>
            </TextEllipsisRight>
          )}
        </ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.certNumber)}
        </LabelInfo>
        <ValueStyle>{info?.certNumber}</ValueStyle>
      </RowInfo>
      <RowFooter>
        <LabelInfo>
          {t(translations.clubAssociationInformation.otherDocument)}
        </LabelInfo>
        <ValueStyle>
          {info?.additionalDocuments &&
            info?.additionalDocuments.length > 0 &&
            info?.additionalDocuments.map(res => (
              <TextEllipsisRight>
                <a
                  href={res}
                  target="_blank"
                  style={{ color: '#00AB55' }}
                  rel="noreferrer"
                >
                  {res}
                </a>
              </TextEllipsisRight>
            ))}
        </ValueStyle>
      </RowFooter>
      <ApprovalDialog
        title={t(translations.common.confirmation)}
        description={t(translations.common.areYouWantApprove)}
        open={openConfirmDialog}
        isConfirmDialog
        onCancel={() => setOpenConfirmDialog(false)}
        onApprove={() => handleApprove()}
      />
    </Card>
  );
});
