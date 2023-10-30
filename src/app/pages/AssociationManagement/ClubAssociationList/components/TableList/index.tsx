import { Card } from '@mui/material';
import Table from 'app/components/Table';
import { memo, useState, useEffect } from 'react';
import {
  FilterAssociationParams,
  FilterListParams,
  MembershipRequest,
  MembershipType,
  Province,
} from 'types';
import { MemberStatus } from 'types/enums';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate } from 'react-router-dom';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { AssociationManagement } from 'types/AssociationManagement';
import { Status } from 'app/components/Status';

import { debounce, get } from 'lodash';
import { useFilter } from 'app/hooks/useFilter';
import moment from 'moment';

import { Star } from 'app/components/Star';
import { EllipsisText } from 'app/components/EllipsisText';
import { Loading } from 'app/components/Loading';

import { useFilterList } from 'app/hooks/useFilterList';

import { ToolbarFilter } from '../ToolbarFilter';
import starIcon from '../../../../../../assets/images/star.svg';
import { selectClubAssociationManagement } from '../../slice/selectors';
import { useClubAssociationManagementSlice } from '../../slice';

interface Props {
  provinceId?: string;
}

interface ValueFilter {
  star?: string[];
  associationStatus?: string[];
  packageStatus?: string[];
  certDocuments?: string;
  adArtDocuments?: string;
}

enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

const initialFilter = {
  size: 10,
  page: 0,
  searchKey: '',
  star: [],
  associationStatus: [],
  packageStatus: [],
  adArtDocuments: '',
  certDocuments: '',
  provinceId: '',
};

export const TableList = memo(({ provinceId }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<any>(initialFilter);
  const dispatch = useDispatch();
  const { provinces, associationManagement, isLoading } = useSelector(
    selectClubAssociationManagement,
  );
  const { actions } = useClubAssociationManagementSlice();
  const [searchValue, setSearchValue] = useState<string>('');
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [currentProvince, setCurrentProvince] = useState<
    Province | undefined
  >();

  const fetchDataForPage = (params: FilterListParams) => {
    dispatch(
      actions.fetchAssociationList({
        size: params.size,
        page: params.page,
        searchKey: params.searchKey,
        star: params.star,
        associationStatus: params.associationStatus,
        packageStatus: params.packageStatus,
        adArtDocuments: params.adArtDocuments,
        certDocuments: params.certDocuments,
        provinceId: params.provinceId || (provinceId ? provinceId : ''),
      }),
    );
    setFilter(params);
  };

  const checkIsFilter = (params: FilterListParams) => {
    if (
      (params?.star && params?.star.length > 0) ||
      (params?.associationStatus && params?.associationStatus.length > 0) ||
      (params?.packageStatus && params?.packageStatus.length > 0) ||
      params?.page !== 0 ||
      params?.size !== 10 ||
      params?.searchKey ||
      params?.provinceId ||
      params?.adArtDocuments ||
      params?.certDocuments
    ) {
      return true;
    } else {
      return false;
    }
  };

  const { onFilterToQueryString, filterParams } = useFilterList({
    onFetchData: (params: FilterListParams) => {
      checkIsFilter(params) && fetchDataForPage(params);
    },
    defaultFilter: filter,
  });

  const headers = [
    {
      id: 'associationName',
      label: t(translations.tableAssociation.associationName),
      hasSort: true,
    },
    {
      id: 'associationCode',
      label: t(translations.tableAssociation.associationCode),
      hasSort: true,
    },
    {
      id: 'associationStar',
      label: t(translations.tableAssociation.associationStar),
    },
    {
      id: 'packageInfo',
      label: t(translations.tableAssociation.packageInfo),
    },
    {
      id: 'province',
      label: t(translations.tableAssociation.province),
    },
    {
      id: 'associationStatus',
      label: t(translations.tableAssociation.associationStatus),
      hasSort: true,
    },
    {
      id: 'createdTime',
      label: t(translations.tableAssociation.createdTime),
    },
  ];

  const onRequestSort = (event: any, property: string) => {
    const onOrder =
      property && filter?.associationFilter?.orderType === OrderType.ASC
        ? OrderType.DESC
        : OrderType.ASC;

    const newFilterParams = {
      ...filter,
      associationFilter: {
        ...filter?.associationFilter,
        orderBy: property,
        orderType: onOrder,
      },
    };
    setFilter(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };

  useEffect(() => {
    // dispatch(actions.fetchProvinces());
  }, []);

  useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (provinceId) {
        const data = provinces?.filter(
          (item: any) => parseInt(provinceId) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else if (filter?.provinceId) {
        const newProvince = provinces?.find(
          province => province.id === Number(filter.provinceId),
        );
        setCurrentProvince(newProvince);
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      } else {
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      }
    }
  }, [provinces, provinceId]);

  const handleOnPageChange = (pageNumber: number, limit: number) => {
    const newFilterParams = {
      ...filter,
      page: pageNumber,
      size: limit,
    };
    setFilter(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };

  const renderItem = (item: AssociationManagement) => {
    return [
      <EllipsisText text={item?.associationName} line={1} />,
      item?.associationCode ? item.associationCode : '-',
      <Star numberStar={item?.star} />,
      // item?.packageName ? item?.packageName : '-',
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{item?.packageName ? item.packageName : ''}</div>
        <Status status={item?.packageStatus} transparentBg />
      </div>,
      item?.provinceName,
      <Status status={item?.associationStatus as MemberStatus} />,
      item?.createdTime
        ? moment(item.createdTime).format('DD/MM/YYYY HH:mm')
        : '-',
    ];
  };

  const handleSearch = () => {
    const newFilterParams = {
      ...filter,
      page: 0,
      searchKey: searchValue,
      provinceId: currentProvince?.name === 'All' ? '' : currentProvince?.id,
    };
    setFilter(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };

  const onChangeFilter = (filterParams: ValueFilter) => {
    const excludeStatus = ['VERIFYING', 'CREATED'];
    const excludePackageStatus = ['CREATED'];
    const newFilterParams = {
      ...filter,
      star: filterParams?.star || '',
      associationStatus: filterParams.associationStatus?.includes('ACTIVATED')
        ? filterParams.associationStatus.concat(excludeStatus)
        : filterParams.associationStatus,
      packageStatus: filterParams.packageStatus?.includes('ACTIVE')
        ? filterParams.packageStatus.concat(excludePackageStatus)
        : filterParams.packageStatus,
      certDocuments:
        filterParams.certDocuments === 'All' ? '' : filterParams.certDocuments,
      adArtDocuments:
        filterParams.adArtDocuments === 'All'
          ? ''
          : filterParams.adArtDocuments,
    };
    setFilter(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };

  const onSearchClubAssociation = (value: string) => {
    setSearchValue(value);
  };

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
  };

  return (
    <div>
      <Card sx={{ padding: '1rem' }}>
        <ToolbarFilter
          handleSearch={handleSearch}
          onChangeFilter={onChangeFilter}
          filter={filter}
          onSearchClubAssociation={onSearchClubAssociation}
          searchValue={filter?.searchKey}
          currentProvince={currentProvince}
          provinces={newProvinces}
          onChangeProvince={onChangeProvince}
          provinceId={provinceId}
        />
        <Table
          headers={headers}
          items={associationManagement?.data}
          pageNumber={filter?.page}
          totalElements={associationManagement?.count}
          renderItem={renderItem}
          onSelectRow={item =>
            navigate(path.associations + `/club-associations` + `/${item.id}`, {
              state: { id: item.id },
            })
          }
          order={'desc'}
          orderBy={''}
          onRequestSort={onRequestSort}
          onPageChange={handleOnPageChange}
          className="mt-15"
        />
      </Card>
      <Loading isLoading={isLoading} />
    </div>
  );
});
