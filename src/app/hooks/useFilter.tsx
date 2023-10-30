import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FilterMemberParams } from 'types';
import { MembershipType } from 'types/enums';
import querystring from 'query-string';
import { debounce, isArray, set } from 'lodash';

interface Props {
  onFetchData: (filter: FilterMemberParams) => void;
  defaultFilter: FilterMemberParams;
}

export const useFilter = ({ onFetchData, defaultFilter }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<FilterMemberParams>(defaultFilter);

  const filterFromQuery = (query: any) => {
    const newFilter = {
      ...filter,
      ...query,
      offset: query.offset ? +query.offset : filter.offset,
      limit: query.limit ? +query.limit : filter.limit,
    };
    return newFilter;
  };

  React.useEffect(() => {
    const params = querystring.parse(location.search, {
      arrayFormat: 'bracket',
    });
    const newFilter: FilterMemberParams = filterFromQuery(params);
    setFilter(newFilter);
    const handleFetchData = debounce(() => onFetchData(newFilter), 100);
    handleFetchData();
  }, [location.search]);

  const onFilterToQueryString = (values: any): void => {
    navigate(
      {
        pathname: location.pathname,
        search: `?${querystring.stringify(
          {
            ...values,
            offset: values.offset > 0 ? values.offset : 0,
          },
          { arrayFormat: 'bracket', skipNull: true, skipEmptyString: true },
        )}`,
      },
      { replace: true },
    );
  };

  return { filter, onFilterToQueryString };
};
