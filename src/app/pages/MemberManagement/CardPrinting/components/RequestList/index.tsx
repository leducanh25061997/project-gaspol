import { Icon } from '@iconify/react';
import { Button, Card, Checkbox, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { translations } from 'locales/translations';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DateRangeComponent from 'app/components/DateRangeComponent';

import {
  CardPrintingRequest,
  Club,
  ClubResponse,
  Pageable,
  Province,
} from 'types';

import Table from 'app/components/Table';

import { ApprovalDialog } from 'app/components/ApprovalDialog';
import { EllipsisText } from 'app/components/EllipsisText';
import _, { clone, debounce, set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { CardPrintingStatus } from 'types/enums';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import TableToolbar from '../TableToolbar';

import { useCardPrintingManagementSlice } from '../../slice';

const MAX_ITEM_APPROVAL = 15;

interface Props {
  requestListData?: Pageable<CardPrintingRequest>;
  provinces?: Province[];
  clubs?: ClubResponse;
  provinceId?: string;
}

enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}
interface Filter {
  page?: number;
  size?: number;
  fromDate?: string;
  toDate?: string;
  status?: CardPrintingStatus;
  provinceId?: number;
}

const RequestList = memo((props: Props) => {
  const { provinces, clubs, requestListData, provinceId } = props;
  const { t, i18n } = useTranslation();
  const { actions } = useCardPrintingManagementSlice();
  const dispatch = useDispatch();
  const [selectedCardIds, setSelectedCardIds] = useState<Set<number>>(
    new Set(),
  );

  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    fromDate: '',
    toDate: '',
    status: CardPrintingStatus.REQUESTED,
    orders: [] as string[],
  });

  const [isProcessingCards, setProcessingCards] = useState(false);
  const [isOpenConfirmMultiApproval, setOpenConfirmMultiApproval] =
    useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [cardProcessId, setCardProcessId] = useState<number | undefined>();
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const [newClubs, setNewClubs] = useState<any[]>([]);
  const [currentClub, setCurrentClub] = React.useState<Club | undefined>();
  const [paramsClubRequest, setParamsClubRquest] = React.useState({
    page: 0,
    size: 10,
  });
  const [searchValue, setSearchValue] = React.useState<any>('');
  const [order, setOrder] = useState<OrderType>(OrderType.DESC);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const listData = requestListData?.data || [];
  const numberSelectedCards = selectedCardIds.size;

  const onCheckAllItem = (isChecked: boolean) => {
    if (isChecked && listData.length > 0) {
      const processMaxItem =
        MAX_ITEM_APPROVAL < listData.length
          ? MAX_ITEM_APPROVAL
          : listData.length;

      setSelectedCardIds(
        new Set(listData.slice(0, processMaxItem).map((item: any) => item?.id)),
      );
    } else {
      setSelectedCardIds(new Set());
    }
  };

  React.useEffect(() => {
    setSelectedCardIds(prev => {
      const availableCards: any = listData.filter(
        (card: any) => card.id && prev.has(+card.id),
      );
      const cloneSelectedCardIds = clone(prev);
      cloneSelectedCardIds.forEach(id => {
        if (
          availableCards.length > 0 &&
          availableCards.every((club: any) => club.id !== id)
        ) {
          cloneSelectedCardIds.delete(id);
        }
      });
      return cloneSelectedCardIds;
    });
  }, [listData]);

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
      label: (
        <span>
          <Checkbox
            onChange={(e: any) => {
              onCheckAllItem(e.currentTarget.checked);
            }}
            checked={
              numberSelectedCards > 0 &&
              (numberSelectedCards >= MAX_ITEM_APPROVAL ||
                numberSelectedCards === listData.length)
            }
            disabled={listData.length === 0}
          />
          <span>{t(translations.cardPrinting.cardName)}</span>
        </span>
      ),
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
      id: 'requestedBy',
      label: t(translations.cardPrinting.requestedBy),
    },
    {
      id: 'requestedDate',
      label: t(translations.cardPrinting.requestedTime),
      hasSort: true,
    },
    {
      id: 'action',
      label: t(translations.tableOldMemberShip.action),
    },
  ];

  const fetchCardPrintingProcess = (newFilter: Filter) => {
    dispatch(actions.fetchCardPrintingData(newFilter));
  };

  const fetchCardPrintingApproved = (newFilter: any) => {
    dispatch(actions.fetchCardPrintingApprovedData(newFilter));
  };

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
      fetchCardPrintingProcess(newFilter);
    }
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

  const renderItem = (item: any) => {
    return [
      <div style={{ display: 'flex' }}>
        <Checkbox
          onChange={(e: any) => {
            setSelectedCardIds(prev => {
              if (e.currentTarget.checked) {
                if (prev.size >= MAX_ITEM_APPROVAL) return prev;
                prev.add(item.id);
              } else {
                prev.delete(item.id);
              }
              return new Set(prev);
            });
          }}
          checked={selectedCardIds.has(item.id)}
        />
        <EllipsisText line={2} text={item?.cardName} />
      </div>,
      item?.phoneNumber,
      item?.provinceName ? (
        <EllipsisText line={2} text={item?.provinceName} />
      ) : (
        '-'
      ),
      item?.clubName ? <EllipsisText line={2} text={item?.clubName} /> : '-',
      item?.requestedBy ? (
        <EllipsisText line={2} text={item?.requestedBy} />
      ) : (
        '-'
      ),
      item?.requestedDate
        ? moment(item.requestedDate).format('DD/MM/YYYY - HH:mm')
        : '-',
      <Typography
        sx={{
          color: '#FF6B00',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onClick={() => {
          setCardProcessId(item?.id);
          setOpenConfirmDialog(true);
        }}
      >
        {t(translations.cardPrinting.process)}
      </Typography>,
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

  const handleSearch = () => {
    const newFilter = {
      ...filter,
      page: 0,
      searchKey: searchValue,
    };
    if (currentProvince?.id) {
      set(newFilter, 'provinceId', currentProvince.id);
    }
    if (currentClub?.id) {
      set(newFilter, 'clubId', currentClub.id);
    }
    setFilter(newFilter);
    fetchCardPrintingProcess(newFilter as any);
  };

  React.useEffect(() => {
    if (currentProvince?.id) {
      setFilter(prev => ({ ...prev, provinceId: currentProvince?.id }));
    }
  }, [currentProvince]);

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
    fetchCardPrintingProcess(newFilter);
  };

  const onApprovalProcessSuccess = () => {
    fetchCardPrintingProcess(filter);
    fetchCardPrintingApproved({
      page: 0,
      size: 10,
      status: [CardPrintingStatus.AVAILABLE, CardPrintingStatus.APPROVED],
      startDate: '',
      endDate: '',
      orders: [] as string[],
    });
  };

  const onApprovedSendProcessDownload = () => {
    dispatch(
      actions.sendProcessDownloadCard(
        {
          status: CardPrintingStatus.APPROVED,
          id: cardProcessId,
        },
        (err?: any) => {
          setOpenConfirmDialog(false);
          if (!err) {
            onApprovalProcessSuccess();
          }
        },
      ),
    );
  };

  React.useEffect(() => {}, []);

  const onApprovedSendMultiProcessDownload = () => {
    setProcessingCards(true);
    dispatch(
      actions.sendProcessDownloadCards(
        {
          payload: { status: CardPrintingStatus.APPROVED },
          ids: Array.from(selectedCardIds),
        },
        (err?: any) => {
          setOpenConfirmMultiApproval(false);
          if (!err) {
            onApprovalProcessSuccess();
            setSelectedCardIds(new Set());
            setProcessingCards(false);
          }
        },
      ),
    );
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
    fetchCardPrintingProcess(newFilterParams);
  };

  return (
    <Card sx={{ padding: 0, marginTop: '14px' }}>
      <Stack
        sx={{
          padding: '24px 24px 16px 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon
              icon="fluent:calendar-edit-16-filled"
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
              {t(translations.cardPrinting.requestedList)}
            </Box>
          </Grid>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                marginRight: 8,
                fontWeight: 700,
                fontSize: '16px',
                color: '#777777',
              }}
            >
              <span>{`${selectedCardIds.size}/${MAX_ITEM_APPROVAL}`}</span>
            </span>
            <Button
              variant="contained"
              disabled={selectedCardIds.size <= 0}
              onClick={() => setOpenConfirmMultiApproval(true)}
            >
              Process
            </Button>
          </div>
        </div>

        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TableToolbar
            keyword={''}
            handleSearch={handleSearch}
            onSearch={onFilterByName}
            placeholder={t(translations.cardPrinting.searchPlaceholder)}
            provinces={newProvinces}
            currentProvince={currentProvince}
            onChangeProvince={onChangeProvince}
            clubs={newClubs}
            currentClub={currentClub}
            onChangeClub={onChangeClub}
            loadMoreClubs={loadMoreClubs}
            loadPrevClubs={loadPrevClubs}
            onSearchClub={onSearchClub}
            width={'236px'}
            provinceId={provinceId}
          />
          <Stack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
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
                fetchCardPrintingProcess(newFilter);
              }}
            />
          </Stack>
        </Grid>
      </Stack>
      <Stack>
        <Table
          headers={headers}
          items={requestListData?.data || []}
          pageNumber={filter.page}
          totalElements={requestListData?.count || 0}
          renderItem={renderItem}
          order={order === OrderType.ASC ? 'asc' : 'desc'}
          orderBy={'requestedDate'}
          onPageChange={handleOnPageChange}
          onRequestSort={onRequestSort}
        />
      </Stack>
      <ApprovalDialog
        title={t(translations.common.confirmation)}
        description={t(translations.cardPrinting.areYouSureYouWantToProcess)}
        open={openConfirmDialog}
        isConfirmDialog
        onCancel={() => setOpenConfirmDialog(false)}
        onApprove={onApprovedSendProcessDownload}
      />
      {isOpenConfirmMultiApproval && (
        <ApprovalDialog
          title={t(translations.common.confirmation)}
          description={t(translations.cardPrinting.areYouSureYouWantToProcess)}
          open
          isConfirmDialog
          onCancel={() => setOpenConfirmMultiApproval(false)}
          onApprove={onApprovedSendMultiProcessDownload}
          loading={isProcessingCards}
        />
      )}
    </Card>
  );
});

export default RequestList;
