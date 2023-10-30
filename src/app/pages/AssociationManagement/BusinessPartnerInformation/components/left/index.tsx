import React, { memo, useEffect, useState } from 'react';
import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { MembershipRequest } from 'types';
import { CorporateMerchantInfomation } from 'app/components/BusinessPartnerInfomation/CorporateMerchantInfomation';

import { Document } from './Document';

interface Props {
  info?: MembershipRequest;
}

export const LeftInfomation = memo((props: Props) => {
  const { info } = props;

  return (
    <Grid>
      <CorporateMerchantInfomation info={info} />
      <Grid sx={{ mt: 5 }}>
        <Document info={info} />
      </Grid>
    </Grid>
  );
});
