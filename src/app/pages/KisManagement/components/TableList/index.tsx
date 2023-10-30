/**
 *
 * TableList
 *
 */
// import TableToolbar from '../ToolbarFilter';
import React, { memo } from 'react';
import Table from 'app/components/Table';
import { CustomPriceBox } from 'app/components/CustomPriceBox';
import { ToggleStatus } from 'app/components/ToggleStatus';
import { ActionList } from 'app/components/ActionList';
import { KisInfo, TableHeaderProps, FilterParams } from 'types';
import moment from 'moment';
import { KisStatus } from 'types/enums';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { EllipsisText } from 'app/components/EllipsisText';
import { filter } from 'lodash';

interface Props {
  headers: TableHeaderProps[];
  filter?: FilterParams;
  items?: KisInfo[];
  type: 'imi' | 'province';
  totalElements?: number;
  onChangeStatus: (item: KisInfo) => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  handleOnPageChange: (page?: number, limit?: number) => void;
  isConfigureUpdate?: boolean;
  isUpdate?: boolean;
  isShowStatus?: boolean;
}

export const TableList = memo((props: Props) => {
  const {
    headers,
    items,
    totalElements,
    type,
    onChangeStatus,
    onView,
    onEdit,
    filter,
    handleOnPageChange,
    isConfigureUpdate,
    isUpdate,
    isShowStatus,
  } = props;
  const { t } = useTranslation();

  const changeStatus = (checked: boolean, id: number) => {
    const newData = {
      ...items?.filter(value => value.id === id)[0],
      status: checked ? KisStatus.ENABLE : KisStatus.DISABLE,
    };
    onChangeStatus(newData as KisInfo);
  };

  const renderItem = (item: KisInfo, index?: number) => {
    return [
      <EllipsisText text={item?.kisName} line={1} />,
      type === 'province' ? item?.kisIdStr : item?.kisId,
      <CustomPriceBox
        price={item?.provincePrice}
        minPrice={item?.minPrice}
        maxPrice={item?.maxPrice}
        type={type}
      />,
      moment(
        item?.modifiedDate ? item?.modifiedDate : item?.createdDate,
      ).format('DD/MM/YYYY HH:mm'),
      isConfigureUpdate || isShowStatus
        ? item.id && (
            <ToggleStatus
              kisId={item.id}
              checked={item.status === KisStatus.ENABLE}
              changeStatus={changeStatus}
            />
          )
        : '',
      isConfigureUpdate || isUpdate
        ? item.id && (
            <ActionList
              items={[
                {
                  icon: 'bi:eye-fill',
                  action: onView,
                  id: item.id,
                  title: t(translations.common.view),
                },
                {
                  icon: 'ant-design:edit-filled',
                  action: onEdit,
                  id: item.id,
                  title: t(translations.common.edit),
                },
              ]}
            />
          )
        : item.id && (
            <ActionList
              items={[
                {
                  icon: 'bi:eye-fill',
                  action: onView,
                  id: item.id,
                  title: t(translations.common.view),
                },
              ]}
            />
          ),
    ];
  };

  return (
    <Table
      headers={headers}
      items={items}
      limitElement={10}
      pageNumber={filter?.page}
      totalElements={totalElements}
      renderItem={renderItem}
      order={'desc'}
      orderBy={''}
      onPageChange={handleOnPageChange}
    />
  );
});
