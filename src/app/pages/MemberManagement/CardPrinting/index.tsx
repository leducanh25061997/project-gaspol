/**
 *
 * MemberJoinClubDetail
 *
 */
import { withTitle } from 'app/components/HOC/WithTitle';
import React, { memo, useState } from 'react';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { withLoading } from 'app/components/HOC/WithLoading';
import { CardPrintingStatus } from 'types/enums';
import { Loading } from 'app/components/Loading';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import CardDownloaded from './components/CardDownloaded';

import RequestList from './components/RequestList';

import { selectcardPrintingManagement } from './slice/selectors';
import { useCardPrintingManagementSlice } from './slice';

interface Props {}

const CardPrintingManagement = withLoading(
  memo((props: Props) => {
    const [isProcessRead, setIsPRocessRead] = useState<boolean>(false);
    const [isDowloadRead, setIsDowloadRead] = useState<boolean>(false);
    const { actions } = useCardPrintingManagementSlice();
    const {
      provinces,
      clubs,
      cardPrintingDataPageable,
      cardPrintingApprovedDataPageable,
      isLoading,
    } = useSelector(selectcardPrintingManagement);
    const dispatch = useDispatch();
    const fetchFormData = useSelector(selectAuth);
    const { userInformation } = fetchFormData;

    React.useEffect(() => {
      if (userInformation) {
        if (
          userInformation?.roles.length > 0 &&
          (userInformation.roles.includes('member_card_printing_process') ||
            userInformation.roles.includes(
              'member_card_printing_process_province',
            ))
        ) {
          setIsPRocessRead(true);
        }
        if (
          userInformation.roles.length > 0 &&
          (userInformation.roles.includes('member_card_printing_download') ||
            userInformation.roles.includes(
              'member_card_printing_download_province',
            ))
        ) {
          setIsDowloadRead(true);
        }
      }
    }, [userInformation]);

    React.useEffect(() => {
      const filter = {
        page: 0,
        size: 10,
        startDate: '',
        endDate: '',
        status: CardPrintingStatus.REQUESTED,
        provinceId: userInformation?.provinceId
          ? userInformation.provinceId
          : '',
      };
      dispatch(actions.fetchCardPrintingData(filter));
      dispatch(
        actions.fetchCardPrintingApprovedData({
          ...filter,
          status: [CardPrintingStatus.AVAILABLE, CardPrintingStatus.APPROVED],
        }),
      );
    }, [actions, dispatch, userInformation?.provinceId]);

    React.useEffect(() => {
      dispatch(actions.fetchProvinces());
      dispatch(
        actions.fetchClubs({
          page: 0,
          size: 10,
        }),
      );
    }, [actions, dispatch]);

    return (
      <div>
        <Grid item xs={12} sm={12} md={12}>
          {isProcessRead && (
            <RequestList
              provinces={provinces}
              clubs={clubs}
              requestListData={cardPrintingDataPageable}
              provinceId={userInformation?.provinceId}
            />
          )}
          {isDowloadRead && (
            <CardDownloaded
              provinces={provinces}
              clubs={clubs}
              approvedListData={cardPrintingApprovedDataPageable}
              provinceId={userInformation?.provinceId}
            />
          )}
        </Grid>
        <Loading isLoading={isLoading} />
      </div>
    );
  }),
);

export default withTitle(
  CardPrintingManagement,
  'sidebar.cardPrintingManagement',
);
