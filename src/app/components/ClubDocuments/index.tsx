import { memo, useState, useEffect } from 'react';
import { Card, Grid, Divider } from '@mui/material';

import { SubKey, KV, SubRow, SubValue } from 'app/components/KeyValue';
import { IndividualInformation, Document } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { LoadingButton } from '@mui/lab';

import { TitlePage, TitleStatus } from 'app/components/Label';

interface Props {
  info?: IndividualInformation;
  handleOpenAprrovalDialog: () => void;
  buttonName: string;
  artDocumentsApproval?: boolean;
}

export const ClubDocuments = memo((props: Props) => {
  const { info, handleOpenAprrovalDialog, buttonName, artDocumentsApproval } =
    props;
  const { t } = useTranslation();

  return (
    <Card sx={{ mt: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>{t(translations.common.documents)}</TitlePage>
        <TitleStatus>
          {artDocumentsApproval && t(translations.common.approved)}
        </TitleStatus>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>
            {t(translations.clubAssociationInformation.adArtDocument)}
          </SubKey>
          <SubValue hideTooltip={true}>
            <Grid>
              {info?.artDocuments && info?.artDocuments.length > 0 ? (
                <Grid>
                  <Grid>
                    <a
                      href={info?.artDocuments[0]}
                      target="_blank"
                      style={{ color: '#00AB55' }}
                      rel="noreferrer"
                    >
                      {info?.artDocuments[0]}
                    </a>
                  </Grid>
                  {!artDocumentsApproval ? (
                    <LoadingButton
                      variant="contained"
                      onClick={() => {
                        handleOpenAprrovalDialog();
                      }}
                    >
                      {buttonName}
                    </LoadingButton>
                  ) : (
                    ''
                  )}
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>
            {t(translations.clubAssociationInformation.certDocument)}
          </SubKey>
          <SubValue hideTooltip={true}>
            {info?.certDocuments && info?.certDocuments.length > 0 ? (
              <a
                href={info?.certDocuments[0]}
                target="_blank"
                style={{ color: '#00AB55' }}
                rel="noreferrer"
              >
                {info?.certDocuments[0]}
              </a>
            ) : (
              // info?.certDocuments[0]
              ''
            )}
          </SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>
            {t(translations.clubAssociationInformation.certNumber)}
          </SubKey>
          <SubValue>{info?.certNumber}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>
            {t(translations.clubAssociationInformation.otherDocument)}
          </SubKey>
          <SubValue hideTooltip={true}>
            <Grid>
              {info?.additionalDocuments && info?.additionalDocuments.length > 0
                ? info?.additionalDocuments.map((item, i) => (
                    <div>
                      <a
                        href={item}
                        target="_blank"
                        style={{ color: '#00AB55' }}
                        rel="noreferrer"
                      >
                        {item}
                      </a>
                    </div>
                  ))
                : ''}
            </Grid>
          </SubValue>
        </SubRow>
      </KV>
    </Card>
  );
});
