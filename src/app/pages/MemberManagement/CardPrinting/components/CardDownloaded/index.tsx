import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import {
  Autocomplete,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState, memo, useMemo } from 'react';
import { Icon } from '@iconify/react';
import moment from 'moment';

import DateRangeComponent from 'app/components/DateRangeComponent';

import {
  Club,
  Province,
  CardPrintingRequest,
  Pageable,
  ClubResponse,
} from 'types';

import Table from 'app/components/Table';

import { useDispatch, useSelector } from 'react-redux';
import { EllipsisText } from 'app/components/EllipsisText';
import { ApprovalDialog } from 'app/components/ApprovalDialog';
import ExportExCel from 'app/pages/MemberManagement/MemberManagement/components/ExportFileExcel';
import { CardPrintingStatus } from 'types/enums';
import _, { debounce, set, unset } from 'lodash';

import TableToolbar from '../../components/TableToolbar';
import { useCardPrintingManagementSlice } from '../../slice';

interface Filter {
  page?: number;
  size?: number;
  fromDate?: string;
  toDate?: string;
  status?: CardPrintingStatus[];
  provinceId?: number;
}

enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}
interface Props {
  approvedListData?: Pageable<CardPrintingRequest>;
  provinces?: Province[];
  clubs?: ClubResponse;
  provinceId?: string;
}
const CardDownloaded = memo((props: Props) => {
  const { provinces, clubs, approvedListData, provinceId } = props;
  const { t, i18n } = useTranslation();
  const { actions } = useCardPrintingManagementSlice();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    status: [CardPrintingStatus.AVAILABLE, CardPrintingStatus.APPROVED],
    startDate: '',
    endDate: '',
    orders: [] as string[],
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openExportDialog, setOpenExportDialog] = useState<boolean>(false);
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();

  const [cardProcessId, setCardProcessId] = useState<number | undefined>();
  const [newClubs, setNewClubs] = useState<any[]>([]);
  const [currentClub, setCurrentClub] = React.useState<Club | undefined>();
  const [paramsClubRequest, setParamsClubRquest] = React.useState({
    page: 0,
    size: 10,
  });
  const [searchValue, setSearchValue] = React.useState<any>('');
  const [order, setOrder] = useState<OrderType>(OrderType.DESC);
  // React.useEffect(() => {
  //   dispatch(actions.fetchCardPrintingApprovedData(filter));
  //   dispatch(actions.fetchProvinces());
  //   dispatch(actions.fetchClubs(paramsClubRequest));
  // }, []);

  React.useEffect(() => {
    setFilter(prev => ({ ...prev, provinceId: currentProvince?.id }));
  }, [currentProvince]);

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (provinceId) {
        const data = provinces?.filter(
          (item: any) => parseInt(provinceId) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else {
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      }
    }
  }, [provinces, provinceId]);

  React.useEffect(() => {
    if (clubs && clubs?.data && clubs?.data?.length) {
      const obj = { name: t(translations.common.all), id: 0 };
      setNewClubs([obj, ...clubs?.data]);
    }
  }, [clubs]);

  const headers = [
    {
      id: 'name',
      label: t(translations.cardPrinting.cardName),
    },
    {
      id: 'phone',
      label: t(translations.editMember.phoneNumber),
    },
    {
      id: 'province',
      label: t(translations.editMember.province),
    },
    {
      id: 'joinedClub',
      label: t(translations.cardPrinting.joinedClub),
    },
    {
      id: 'processedBy',
      label: t(translations.cardPrinting.processedBy),
    },
    {
      id: 'generatedDate',
      label: t(translations.cardPrinting.generatedTime),
      hasSort: true,
    },
    {
      id: 'action',
      label: t(translations.tableOldMemberShip.action),
    },
  ];

  const handleDoneFilter = (rangeDate: any) => {
    if (rangeDate?.length && rangeDate[1]) {
      const newFilter = {
        ...filter,
        page: 0,
        fromDate:
          rangeDate?.length && rangeDate[0]
            ? parseInt(moment(rangeDate[0]).format('x'))?.toString()
            : ('' as string),
        toDate:
          rangeDate?.length && rangeDate[1]
            ? parseInt(moment(rangeDate[1]).endOf('day').format('x')).toString()
            : ('' as string),
      };
      setFilter(newFilter);
      fetchCardPrintingApproved(newFilter);
    }
  };
  const renderItem = (item: any) => {
    return [
      <EllipsisText line={2} text={item?.cardName} />,
      item?.phoneNumber,
      item?.provinceName ? (
        <EllipsisText line={2} text={item?.provinceName} />
      ) : (
        '-'
      ),
      item?.clubName ? <EllipsisText line={2} text={item?.clubName} /> : '-',
      item?.processedBy ? (
        <EllipsisText line={2} text={item?.processedBy} />
      ) : (
        '-'
      ),
      <div>
        <div>
          {item?.generatedDate
            ? moment(item.generatedDate).format('DD/MM/YYYY - HH:mm')
            : '-'}
        </div>
        <Typography
          sx={{
            textTransform: 'lowercase',
            color: !item?.downloadCount
              ? 'rgba(255, 107, 0, 1)'
              : 'rgba(0, 171, 85, 1)',
          }}
        >
          {item?.downloadCount || 0} {t(translations.cardPrinting.download)}
        </Typography>
      </div>,
      item?.generatedDate && item?.status === CardPrintingStatus.AVAILABLE ? (
        <Typography
          sx={{
            color: 'rgba(52, 202, 0, 1)',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => {
            setCardProcessId(item?.id);
            setOpenConfirmDialog(true);
          }}
        >
          {t(translations.cardPrinting.download)}
        </Typography>
      ) : (
        ''
      ),
    ];
  };

  const loadMoreClubs = () => {
    const page = paramsClubRequest?.page;
    setParamsClubRquest({
      ...paramsClubRequest,
      page: page + 1,
    });
    dispatch(
      actions.fetchClubs({
        ...paramsClubRequest,
        page: page + 1,
      }),
    );
  };

  const onSearchClub = debounce((value: string) => {
    if (!_.isUndefined(value)) {
      const newParams = {
        ...paramsClubRequest,
        searchKey: value,
      };
      setParamsClubRquest(newParams);
      dispatch(actions.fetchClubs(newParams));
    }
  }, 300);

  const loadPrevClubs = () => {
    const page = paramsClubRequest?.page;
    if (page > 0) {
      setParamsClubRquest({
        ...paramsClubRequest,
        page: page - 1,
      });
      dispatch(
        actions.fetchClubs({
          ...paramsClubRequest,
          page: page - 1,
        }),
      );
    }
  };

  const fetchCardPrintingApproved = (newFilter: Filter) => {
    dispatch(actions.fetchCardPrintingApprovedData(newFilter));
  };

  const onFilterByName = (value?: string) => {
    setSearchValue(value);
  };

  const onChangeProvince = (newProvince?: Province) => {
    if (newProvince) {
      setCurrentProvince(newProvince);
    }
  };

  const onChangeClub = (newClub?: Club) => {
    if (newClub) {
      setCurrentClub(newClub);
    }
  };

  const handleOnPageChange = (page: number, limit: number) => {
    const newFilter = {
      ...filter,
      page,
      size: limit,
    };
    setFilter(newFilter);
    fetchCardPrintingApproved(newFilter);
  };

  const onApprovedDownload = () => {
    dispatch(
      actions.getDownloadLink(
        {
          id: cardProcessId,
        },
        (err?: any) => {
          setOpenConfirmDialog(false);
          if (!err) {
            // navigate(path.cardPrinting);
            // setOpenConfirmDialog(false);
            fetchCardPrintingApproved(filter);
          }
        },
      ),
    );
  };

  const handleExport = (data: any) => {
    const newParams = {
      ...filter,
      fromDate: data?.rangeDate?.fromDate,
      toDate: data?.rangeDate?.toDate,
    };
    dispatch(
      actions.getExportLink(newParams, (err?: any) => {
        setOpenExportDialog(false);
        if (!err) {
          // navigate(path.cardPrinting);
        }
      }),
    );
  };

  const handleSearch = () => {
    const newFilter = {
      ...filter,
      page: 0,
      searchKey: searchValue,
    };
    if (currentProvince?.id) {
      set(newFilter, 'provinceId', currentProvince?.id);
    } else {
      unset(newFilter, 'provinceId');
    }
    if (currentClub?.id) {
      set(newFilter, 'clubId', currentClub?.id);
    } else {
      unset(newFilter, 'clubId');
    }
    setFilter(newFilter);
    fetchCardPrintingApproved(newFilter);
  };

  const onRequestSort = (event: any, property: string) => {
    const onOrder =
      property && order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
    const _orders: string[] = [];
    _orders.push(property + ' ' + onOrder);
    const newFilterParams = {
      ...filter,
      orders: _orders as string[],
    };
    setFilter(newFilterParams);
    setOrder(onOrder);
    fetchCardPrintingApproved(newFilterParams);
  };

  return (
    <Card sx={{ padding: 0, marginTop: '14px' }}>
      <Stack
        sx={{
          padding: '24px 24px 16px 24px',
        }}
      >
        <Grid
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}
        >
          <Icon
            icon="fa-solid:download"
            width={40}
            height={34}
            color="#959595"
          />
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              color: '#777777',
            }}
          >
            {t(translations.cardPrinting.readyForDownload)}
          </Box>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <TableToolbar
            keyword={''}
            handleSearch={handleSearch}
            onSearch={onFilterByName}
            onSearchClub={onSearchClub}
            placeholder={t(translations.cardPrinting.searchPlaceholder)}
            provinces={newProvinces}
            currentProvince={currentProvince}
            onChangeProvince={onChangeProvince}
            clubs={newClubs}
            currentClub={currentClub}
            onChangeClub={onChangeClub}
            loadMoreClubs={loadMoreClubs}
            loadPrevClubs={loadPrevClubs}
            width={'230px'}
            widthAutoComplete={140}
            provinceId={provinceId}
          />
          <Stack
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Box
              sx={{
                mr: {
                  xs: 1,
                  xl: 2,
                },
                '& .date_range': {
                  height: '41px',
                },
              }}
            >
              <DateRangeComponent
                handleDoneFilter={handleDoneFilter}
                resetPicker={() => {
                  const newFilter = {
                    ...filter,
                    fromDate: '',
                    toDate: '',
                  };
                  setFilter(newFilter);
                  fetchCardPrintingApproved(newFilter);
                }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#01AB55',
                color: 'white',
                paddingTop: '10px',
                paddingBottom: '10px',
                height: '41px',
              }}
              onClick={() => setOpenExportDialog(true)}
            >
              {t(translations.common.export)}
            </Button>
          </Stack>
          <ExportExCel
            openDialog={openExportDialog}
            onCancel={() => setOpenExportDialog(false)}
            onSubmit={handleExport}
          />
        </Grid>
      </Stack>
      <Stack>
        <Table
          headers={headers}
          items={approvedListData?.data || []}
          pageNumber={filter.page}
          totalElements={approvedListData?.count || 0}
          renderItem={renderItem}
          order={order === OrderType.ASC ? 'asc' : 'desc'}
          orderBy={'generatedDate'}
          onPageChange={handleOnPageChange}
          onRequestSort={onRequestSort}
        />
      </Stack>
      <ApprovalDialog
        title={t(translations.common.confirmation)}
        description={t(translations.cardPrinting.areYouSureYouWantToDownload)}
        open={openConfirmDialog}
        isConfirmDialog
        onCancel={() => setOpenConfirmDialog(false)}
        onApprove={onApprovedDownload}
      />
    </Card>
  );
});

export default CardDownloaded;
