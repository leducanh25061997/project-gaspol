/**
 *
 * GeneralInfo
 *
 */
import React, { memo } from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';

import {
  Key,
  KV,
  Row,
  Value,
  RowJustifyBetween,
  SubRow,
  SubKey,
} from 'app/components/KeyValue';
import { MemberStatus, MemberStatusLowerCase } from 'types/enums';

import { IndividualInformation } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import moment from 'moment';
import { get } from 'lodash';

import { EllipsisText } from '../EllipsisText';
import { ValueStyle } from '../KeyText';

interface Props {
  info?: IndividualInformation;
}

export const MemberGeneralInformation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              color: '#777777',
            }}
          >
            {t(translations.createNewMemberPage.memberInformation)}
          </Box>
        </Stack>
        <KV>
          {/* <RowJustifyBetween>
            <Key>{t(translations.common.name)}</Key>
            <Value>{info?.fullName}</Value>
          </RowJustifyBetween> */}
          <RowJustifyBetween>
            <Key>{t(translations.common.name)}</Key>
            <Value>{info?.fullName}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.createNewMemberPage.phoneNumber)}</Key>
            <Value>{info?.phone}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.memberStatus)}</Key>
            <Value>
              {info?.status ? get(MemberStatusLowerCase, info.status) : ''}
            </Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.identificationNumber)}</Key>
            <Value>
              {info?.identification?.identifierNikNumber ||
                info?.identification?.identifierKitasNumber ||
                info?.identification?.identifierKtpNumber}
            </Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.email)}</Key>
            <Value>{info?.email}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.birthPlace)}</Key>
            <Value>{info?.birthPlace}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.dob)}</Key>
            <Value>{info?.birthday || '-'}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.gender)}</Key>
            <Value>{info?.gender?.toUpperCase()}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.bloodType)}</Key>
            <Value>{info?.bloodType}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.createNewMemberPage.nationality)}</Key>
            <Value>{info?.nationality}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.hobby)}</Key>
            <ValueStyle>
              <EllipsisText
                isFloat
                text={
                  info?.hobby?.replaceAll('#', ' ') ||
                  info?.hobbies?.join().replaceAll(',', ', ')
                }
                line={1}
              ></EllipsisText>
            </ValueStyle>
          </RowJustifyBetween>
          {/* <RowJustifyBetween style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <Key>{t(translations.common.expirationDate)}</Key>
            <Value>
              {info?.expiredDate &&
                moment(info?.expiredDate).format('DD/MM/YYYY')}
            </Value>
          </RowJustifyBetween> */}
        </KV>
      </Card>
      <Card sx={{ marginTop: '27px' }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              color: '#777777',
            }}
          >
            {t(translations.createNewMemberPage.address)}
          </Box>
        </Stack>
        <KV>
          <RowJustifyBetween>
            <Key>{t(translations.common.province)}</Key>
            <Value>{info?.provinceName}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.city)}</Key>
            <Value>{info?.cityName}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.district)}</Key>
            <Value>{info?.districtName}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.ward)}</Key>
            <Value>{info?.wardName}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.common.fullAddress)}</Key>
            <Value>{info?.address}</Value>
          </RowJustifyBetween>
          <RowJustifyBetween>
            <Key>{t(translations.createNewMemberPage.rtRwNumber)}</Key>
            <Value>{info?.rtRwNumber}</Value>
          </RowJustifyBetween>
          {/* <RowJustifyBetween style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <Key>{t(translations.createNewMemberPage.postalCode)}</Key>
            <Value>{info?.postCode}</Value>
          </RowJustifyBetween> */}
        </KV>
      </Card>
    </>
  );
});
