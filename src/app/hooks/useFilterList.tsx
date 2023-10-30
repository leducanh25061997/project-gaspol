import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FilterListParams, FilterMemberParams } from 'types';
import { MembershipType } from 'types/enums';
import querystring from 'query-string';
import { debounce, isArray, set } from 'lodash';

interface Props {
  onFetchData: (filter: FilterListParams) => void;
  defaultFilter: FilterListParams;
}

export const useFilterList = ({ onFetchData, defaultFilter }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterParams, setFilterParams] =
    React.useState<FilterListParams>(defaultFilter);

  const filterFromQuery = (query: any) => {
    const newFilter = {
      ...filterParams,
      ...query,
      page: query.page ? +query.page : filterParams.page,
      size: query.size ? +query.size : filterParams.size,
      province: query.province ? query.province : '',
      provinceId: query.provinceId ? query.provinceId : '',
      packageType: query.packageType ? query.packageType : [],
      enrollmentType: query.enrollmentType ? query.enrollmentType : [],
      searchKey: query.searchKey ? query.searchKey : '',
      searchField: query.searchField ? query.searchField : '',
      startDate: query.startDate ? query.startDate : '',
      endDate: query.endDate ? query.endDate : '',
      fromDate: query.fromDate ? query.fromDate : '',
      toDate: query.toDate ? query.toDate : '',
      clubId: query.clubId ? query.clubId : '',
      star: query.star ? query.star : [],
      memberNo: query.memberNo ? query.memberNo : [],
      status: query.status ? query.status : '',
      memberStatus: query.memberStatus ? query.memberStatus : [],
      packageCode: query.packageCode ? query.packageCode : [],
      packageStatus: query.packageStatus ? query.packageStatus : [],
    };
    return newFilter;
  };

  React.useEffect(() => {
    const params = querystring.parse(location.search, {
      arrayFormat: 'bracket',
    });
    const newFilter: FilterListParams = filterFromQuery(params);
    setFilterParams(newFilter);
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
            page: values.page > 0 ? values.page : 0,
          },
          { arrayFormat: 'bracket', skipNull: true, skipEmptyString: true },
        )}`,
      },
      { replace: true },
    );
  };

  return { filterParams, onFilterToQueryString, setFilterParams };
};
