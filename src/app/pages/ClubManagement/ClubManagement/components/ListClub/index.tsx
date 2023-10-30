/**
 *
 * ListClub
 *
 */
import { Grid, styled } from '@mui/material';
import Table from 'app/components/Table';
import { translations } from 'locales/translations';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterListParams, MembershipRequest, Province } from 'types';

import moment from 'moment';

import { Star } from 'app/components/Star';

import { Status } from 'app/components/Status';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import path from 'app/routes/path';

import { OrderType } from 'types/enums';

import { Package } from 'app/components/Package';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { useFilterList } from 'app/hooks/useFilterList';

import { useClubManagementSlice } from '../../slice';
import { selectClubManagement } from '../../slice/selectors';
import { Toolbar } from '../Toolbar';

interface Props {
  items?: MembershipRequest[];
  totalElements?: number;
}

const initialFilter = {
  size: 10,
  page: 0,
  searchKey: '',
  provinceId: '',
  star: [],
  clubStatus: [],
  clubType: [],
  adArtDocuments: '',
  certDocuments: '',
};

const StartRoot = styled('div')({
  display: 'flex',
  '& img': {
    marginLeft: 8,
  },
});
interface ValueFilter {
  star?: string[];
  clubStatus?: string[];
  clubType?: string[];
  certDocuments?: string;
  adArtDocuments?: string;
}

export const ListClub = memo((props: Props) => {
  const { items, totalElements } = props;
  const { t } = useTranslation();
  const { actions } = useClubManagementSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provinces } = useSelector(selectClubManagement);
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const fetchDataForPage = (params: FilterListParams) => {
    dispatch(
      actions.fetchClubsData({
        size: params.size,
        page: params.page,
        searchKey: params.searchKey,
        provinceId:
          params?.provinceId ||
          (userInformation?.provinceId ? userInformation.provinceId : ''),
        star: params?.star,
        clubType: 'IMI_CLUB',
        clubStatus: params?.clubStatus,
        adArtDocuments: params?.adArtDocuments,
        certDocuments: params?.certDocuments,
      }),
    );
    setFilterParams(params);
  };

  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();

  const [isExport, setIsExport] = React.useState<boolean>(false);
  const [isDetailRead, sestIsDetailRead] = React.useState<boolean>(false);

  const checkIsFilter = (params: FilterListParams) => {
    if (
      (params?.star && params?.star.length > 0) ||
      (params?.clubStatus && params?.clubStatus.length > 0) ||
      (params?.clubType && params?.clubType.length > 0) ||
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

  const { onFilterToQueryString, filterParams, setFilterParams } =
    useFilterList({
      onFetchData: (params: FilterListParams) => {
        fetchDataForPage(params);
      },
      defaultFilter: initialFilter,
    });

  useEffect(() => {
    if (userInformation && userInformation.roles) {
      if (
        userInformation.roles.length > 0 &&
        userInformation.roles.includes('club_list_export')
      ) {
        setIsExport(true);
      }
      if (
        userInformation.roles.length > 0 &&
        (userInformation.roles.includes('club_details_read') ||
          userInformation.roles.includes('club_details_read_province') ||
          userInformation.roles.includes('club_details_update_basic_profile') ||
          userInformation.roles.includes('club_details_update_province'))
      ) {
        sestIsDetailRead(true);
      }
    }
  }, [userInformation]);

  useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, []);

  // useEffect(() => {
  //   if (provinces && provinces.length > 0) {
  //     const obj = { name: t(translations.common.all), id: 0 };
  //     setNewProvinces([obj, ...provinces]);
  //   }
  // }, [provinces]);

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (userInformation?.provinceId) {
        const id: string = userInformation.provinceId;
        const data = provinces?.filter(
          (item: any) => parseInt(id) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else if (filterParams?.provinceId) {
        const newProvince = provinces?.find(
          province => province.id === Number(filterParams.provinceId),
        );
        setCurrentProvince(newProvince);
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      } else {
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      }
    }
  }, [provinces, userInformation]);

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
  };

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, []);

  const handleFetchDataForPage = (params: FilterListParams) => {
    fetchDataForPage({
      size: params.size,
      page: params.page,
      searchKey: params.searchKey,
      provinceId: params?.provinceId,
      star: params?.star,
      clubStatus: params?.clubStatus,
      clubType: params?.clubType,
      adArtDocuments: params?.adArtDocuments,
      certDocuments: params?.certDocuments,
    });
  };

  const onRequestSort = (event: any, property: string) => {
    const onOrder =
      property && (filterParams as any)?.clubFilter?.orderType === OrderType.ASC
        ? OrderType.DESC
        : OrderType.ASC;

    const newFilterParams = {
      ...filterParams,
      clubFilter: {
        ...(filterParams as any)?.clubFilter,
        orderBy: property,
        orderType: onOrder,
      },
    };
    setFilterParams(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };
  const handleOnPageChange = (pageNumber: number, size: number) => {
    const newFilterParams = {
      ...filterParams,
      page: pageNumber,
      size,
    };
    setFilterParams(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };

  const onSearchClub = (value: string) => {
    setSearchValue(value);
  };

  const handleSearch = () => {
    const newFilterParams = {
      ...filterParams,
      page: 0,
      searchKey: searchValue,
      provinceId: currentProvince?.name === 'All' ? null : currentProvince?.id,
    };
    setFilterParams(newFilterParams);
    onFilterToQueryString(newFilterParams);
  };

  const onChangeFilter = (filterParams: ValueFilter) => {
    const newFilterParams = {
      ...filterParams,
      page: 0,
      star: filterParams?.star || '',
      clubStatus: filterParams?.clubStatus || [],
      clubType: filterParams?.clubType || [],
      certDocuments:
        filterParams.certDocuments === 'All' ? '' : filterParams.certDocuments,
      adArtDocuments:
        filterParams.adArtDocuments === 'All'
          ? ''
          : filterParams.adArtDocuments,
      // star: filterParams.star,
      // clubStatus: filterParams.clubStatus,
      // packageStatus: filterParams.packageStatus,
    };
    setFilterParams(newFilterParams as any);
    onFilterToQueryString(newFilterParams);
  };

  const headers = [
    {
      id: 'clubName',
      label: t(translations.tableRequestClub.name),
      hasSort: false,
    },
    {
      id: 'clubCode',
      label: t(translations.tableRequestClub.clubCode),
      hasSort: false,
    },
    {
      id: 'clubStar',
      label: t(translations.tableRequestClub.clubStar),
      // width: '15%',
    },
    {
      id: 'packageName',
      label: t(translations.tableRequestClub.packageInfo),
      // width: '15%',
    },
    {
      id: 'province',
      label: t(translations.common.province),
      // width: '25%',
    },
    {
      id: 'status',
      label: t(translations.common.clubStatus),
      hasSort: false,
      // width: '15%',
    },
    {
      id: 'createdTime',
      label: t(translations.tableRequestClub.createdTime),
      hasSort: false,
      // width: '15%',
    },
  ];

  const renderItem = (item: MembershipRequest, index?: number) => {
    let packageName = item?.packageName || '';
    if (item.packageName === 'Gaspol Club') {
      packageName = t(translations.common.gaspolClub);
    }
    return [
      item.clubName,
      item.clubCode,
      <Star numberStar={item.star ? parseInt(item.star) : 0} />,
      <Package status={item?.packageStatus} value={packageName} />,
      item.provinceName,
      <Status status={item?.clubStatus} />,
      item.createdTime
        ? moment(item?.createdTime).format('DD/MM/YYYY HH:mm')
        : '-',
    ];
  };

  // React.useEffect(() => {
  //   sessionStorage.getItem('clubManagementList') &&
  //     // setFilter(JSON.parse(sessionStorage.getItem('clubManagementList') || ''));
  // }, []);

  return (
    <Grid>
      <Toolbar
        handleSearch={handleSearch}
        onChangeFilter={onChangeFilter}
        filter={filterParams}
        onSearchClub={onSearchClub}
        searchValue={filterParams?.searchKey || ''}
        currentProvince={currentProvince}
        provinces={newProvinces}
        onChangeProvince={onChangeProvince}
        isExport={isExport}
        provinceId={userInformation?.provinceId}
      />
      <Table
        headers={headers}
        pageNumber={filterParams.page}
        totalElements={totalElements}
        order={(filterParams as any)?.clubFilter?.orderType || 'desc'}
        onRequestSort={onRequestSort}
        orderBy={`${(filterParams as any)?.clubFilter?.orderBy}`}
        items={items}
        renderItem={renderItem}
        onSelectRow={item => {
          if (isDetailRead) {
            navigate(path.club + `/${item.id}`);
          }
        }}
        onPageChange={handleOnPageChange}
      />
    </Grid>
  );
});
