import React, { memo } from 'react';
import { withTitle } from 'app/components/HOC/WithTitle';
import { useSelector } from 'react-redux';
import { Loading } from 'app/components/Loading';

import { TableList } from './components/TableList';
import { selectBusinessPartnerManagement } from './slice/selectors';

interface Props {}

const BusinessPartnerManagement = memo((props: Props) => {
  const { membersDataPageable, isLoading } = useSelector(
    selectBusinessPartnerManagement,
  );

  return (
    <div>
      <TableList
        items={membersDataPageable?.data}
        totalElements={membersDataPageable?.total}
      />
      <Loading isLoading={isLoading} />
    </div>
  );
});

export default withTitle(
  BusinessPartnerManagement,
  'businessPartnerManagement.headerTitle',
);
