/**
 *
 * Note
 *
 */
import React, { memo, useMemo } from 'react';
import { Grid, Card, Typography, Stack, Box, Avatar } from '@mui/material';
import { Club, IndividualInformation } from 'types';
import { Key, KV, RowJustifyBetween, Value } from 'app/components/KeyValue';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { currencyFormat } from 'utils/helpers/currency';
import { useSelector } from 'react-redux';

import { KisType } from 'types/enums';

import { EllipsisText } from 'app/components/EllipsisText';

import { numberWithCommas } from 'utils/commonFunction';

import { selectMemberInformation } from '../../slice/selectors';

interface Props {
  info?: IndividualInformation;
}

export const KisDetail = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  const { membershipKis } = useSelector(selectMemberInformation);

  const carRacing = useMemo(() => {
    return membershipKis?.length
      ? membershipKis.filter(kis => kis.kisType === KisType.CAR)
      : [];
  }, [membershipKis]);

  const motocycleRacing = useMemo(() => {
    return membershipKis?.length
      ? membershipKis.filter(kis => kis.kisType === KisType.MOTOR)
      : [];
  }, [membershipKis]);
  // [
  //   {
  //     iconName: 'A1',
  //     name: 'Balap Mobil & Drag Race',
  //     price: 50000,
  //     background: '#1A73E8',
  //   },
  //   {
  //     iconName: 'B5',
  //     name: 'Slalom ',
  //     price: 50000,
  //     background: '#1A73E8',
  //   },
  // ];
  // const motocycleRacing = [
  //   {
  //     iconName: 'C1',
  //     name: 'Balap Motor & Drag Bike ',
  //     price: 50000,
  //     background: '#27099D',
  //   },
  //   {
  //     iconName: 'C3',
  //     name: 'Adventure Motor ',
  //     price: 50000,
  //     background: '#27099D',
  //   },
  // ];
  return (
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
          {t(translations.common.currentKISActive)}
        </Box>
      </Stack>
      <KV>
        <Grid container sx={{ marginTop: '0' }} spacing={2}>
          <Grid item md={6}>
            {carRacing?.length ? (
              <Typography sx={{ color: '#777777', fontWeight: '600' }}>
                {t(translations.common.carRacing)}
              </Typography>
            ) : (
              ''
            )}
          </Grid>
          <Grid item md={6}>
            {motocycleRacing?.length ? (
              <Typography sx={{ color: '#777777', fontWeight: '600' }}>
                {t(translations.common.motorcycleRacing)}
              </Typography>
            ) : (
              ''
            )}
          </Grid>
          {membershipKis?.length ? (
            <>
              {' '}
              <Grid
                item
                md={6}
                sx={{
                  paddingRight: '10px',
                  '& .item_racing': {
                    display: 'flex',
                    flexDirection: 'row',
                    '& .item_name': {
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '24px',
                    },
                    '& .kisName': {
                      color: '#000',
                      fontWeight: '600',
                      fontSize: '12px',
                    },
                  },
                }}
              >
                {carRacing?.length
                  ? carRacing.map(item => (
                      <div className="item_racing" key={item?.kisId}>
                        <Avatar
                          sx={{
                            marginRight: '10px',
                            background: '#1A73E8',
                            color: '#fff',
                          }}
                        >
                          {item?.kisId}
                        </Avatar>
                        <div className="item_name">
                          {item?.kisName ? (
                            <EllipsisText
                              text={
                                <Box className="kisName">{item.kisName}</Box>
                              }
                              line={1}
                            />
                          ) : (
                            ''
                          )}
                          <Typography
                            sx={{ color: '#777777', fontSize: '12px' }}
                          >
                            RP {item?.price ? numberWithCommas(item.price) : 0}
                          </Typography>
                        </div>
                      </div>
                    ))
                  : ''}
              </Grid>
              <Grid
                item
                md={6}
                sx={{
                  borderLeft: '1px solid #DEDEDE',
                  '& .item_racing': {
                    display: 'flex',
                    flexDirection: 'row',
                    // borderLeft: '1px solid #DEDEDE',
                    // paddingLeft: '11px',
                    '& .item_name': {
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '24px',
                    },
                    '& .kisName': {
                      color: '#000',
                      fontWeight: '600',
                      fontSize: '12px',
                    },
                  },
                }}
              >
                {motocycleRacing?.length
                  ? motocycleRacing.map(item => (
                      <div className="item_racing" key={item?.kisId}>
                        <Avatar
                          sx={{
                            marginRight: '10px',
                            background: '#27099D',
                            color: '#fff',
                          }}
                        >
                          {item?.kisId}
                        </Avatar>
                        <div className="item_name">
                          {item?.kisName ? (
                            <EllipsisText
                              text={
                                <Box className="kisName">{item.kisName}</Box>
                              }
                              line={1}
                            />
                          ) : (
                            ''
                          )}
                          <Typography
                            sx={{ color: '#777777', fontSize: '12px' }}
                          >
                            RP {item?.price ? numberWithCommas(item.price) : 0}
                          </Typography>
                        </div>
                      </div>
                    ))
                  : ''}
              </Grid>
            </>
          ) : (
            ''
          )}
        </Grid>
      </KV>
    </Card>
  );
});
