import { memo } from 'react';
import { Grid } from '@mui/material';
import { MembershipRequest } from 'types';
import { CompanyInfomation } from 'app/components/BusinessPartnerInfomation/CompanyInfomation';

import { Status } from './status';

interface Props {
  info?: MembershipRequest;
}

export const RightInfomation = memo((props: Props) => {
  const { info } = props;

  return (
    <Grid>
      <CompanyInfomation info={info} />
      <Grid sx={{ mt: 5 }}>
        <Status />
      </Grid>
    </Grid>
  );
});
