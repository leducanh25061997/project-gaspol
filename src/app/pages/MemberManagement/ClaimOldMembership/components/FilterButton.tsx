/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, Checkbox, ClickAwayListener, IconButton } from '@mui/material';
import React, { RefObject, useRef, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import filterIcon from 'assets/images/filter-icon.svg';
import styled from 'styled-components';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { FilterParams, FilterStatusType } from '../slice/types';

const Dropdown = styled.div`
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  width: 279px;
  border-radius: 5px;
  color: #777777;
  z-index: 99999;
  right: 0;
  .action {
    border-top: 1px solid #868686;
    .action-button {
      color: #ffffff;
      background: #00ab55;
      border-radius: 5px;
    }
  }
`;

interface Props {
  onFilterStatus: (status: FilterStatusType | undefined) => void;
  filterParams: FilterParams;
}

function FilterButton(props: Props) {
  const { filterParams } = props;
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState({
    done: false,
    pending: false,
  });
  useEffect(() => {
    if (filterParams?.status) {
      setChecked({
        ...checked,
        done: filterParams?.status === 'DONE',
        pending: filterParams?.status === 'PENDING',
      });
    }
  }, [filterParams]);
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const _getFilterValue = (
      isDone: boolean,
      isPending: boolean,
    ): FilterStatusType | undefined => {
      if (isDone && isPending) return;
      if (isDone) return 'DONE';
      if (isPending) return 'PENDING';
    };

    const filterValue = _getFilterValue(checked.done, checked.pending);
    setOpen(false);
    props.onFilterStatus(filterValue);
  };

  const onchange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setChecked({
      ...checked,
      [name]: event.target.checked,
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#01AB55',
            color: 'white',
            marginLeft: '8px',
            width: '100px',
            height: '41px',
          }}
          onClick={handleClick}
        >
          <Icon style={{ width: 20, height: 20 }} icon={roundFilterList} />
          <span style={{ marginLeft: 12 }}>
            {t(translations.common.filter)}
          </span>
        </Button>

        <Dropdown className={classNames('absolute pt-14', { 'd-none': !open })}>
          <span className="title fs-18 fw-700 lh-21 ml-17">
            {t(translations.common.status)}
          </span>
          <div className="content flex-column mt-10 ml-17">
            <div className="item flex y-center fw-600">
              <Checkbox
                checked={checked.done}
                onChange={e => onchange(e, 'done')}
              />
              <span>{t(translations.common.done)}</span>
            </div>
            <div className="item flex y-center fw-600 mt-10 mb-10">
              <Checkbox
                checked={checked.pending}
                onChange={e => onchange(e, 'pending')}
              />
              <span>{t(translations.common.pending)}</span>
            </div>
          </div>
          <div className="action flex x-end py-16 px-16">
            <Button className="action-button fw-700" onClick={handleConfirm}>
              {t(translations.common.apply)}
            </Button>
          </div>
        </Dropdown>
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(FilterButton);
