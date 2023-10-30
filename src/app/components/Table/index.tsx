/**
 *
 * Table
 *
 */
import { memo, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce, isEmpty, isNil, isUndefined } from 'lodash';
import {
  Card,
  Table as MuiTable,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Grid,
} from '@mui/material';
import { TableHeaderProps } from 'types';

import styled from 'styled-components';

import Scrollbar from '../Scrollbar';
import TableToolbar from '../TableToolbar';

import './table.css';
import TableHead from './TableHeader';
import { messages } from './messages';

const RootContainer = styled(Grid)`
  .MuiTableCell-head {
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: #868686;
    white-space: nowrap;
    padding: 16px;
  }
`;
interface Props {
  headers: TableHeaderProps[];
  limitElement?: number;
  pageNumber?: number;
  items?: any[];
  totalElements?: number;
  renderItem: (item: any, index?: number) => any[];
  onSelectRow?: (rowData: any) => void;
  onRequestSort?: (event: any, property: string) => void;
  onPageChange?: (page: number, limit: number) => void;
  hasCheckbox?: boolean;
  order: 'asc' | 'desc';
  orderBy: string;
  isNoPaging?: boolean;
  className?: string;
  stickyHeader?: boolean;
  maxHeight?: number;
}

const Table = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    headers,
    limitElement = 10,
    pageNumber,
    items,
    renderItem,
    totalElements = 0,
    onSelectRow,
    onPageChange,
    hasCheckbox,
    onRequestSort,
    order,
    orderBy,
    isNoPaging,
    className,
    stickyHeader = false,
    maxHeight,
  } = props;
  const { t, i18n } = useTranslation();

  const [page, setPage] = useState<number>(pageNumber || 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    if (limitElement) {
      setRowsPerPage(limitElement);
    }
  }, [limitElement]);

  useEffect(() => {
    setPage(pageNumber || 0);
  }, [pageNumber]);

  const handleRequestSort = (event: any, property: string) => {
    if (onRequestSort) onRequestSort(event, property);
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (checked) {
      const newSelectedItems = items ? items.map(n => n.name) : [];
      setSelected(newSelectedItems);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (onPageChange) {
      setPage(newPage);
      onPageChange(newPage, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowPerPage);
    if (onPageChange) {
      onPageChange(page, newRowPerPage);
    }
  };

  const handleSelectRow = (rowData: any) => {
    if (onSelectRow) {
      onSelectRow(rowData);
    }
  };

  const showHeader = (isShow?: boolean) => {
    return isShow !== undefined ? isShow : true;
  };

  return (
    <RootContainer className={className}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, maxHeight }}>
          <MuiTable stickyHeader={stickyHeader}>
            <TableHead
              order={order}
              orderBy={orderBy}
              headLabel={headers}
              rowCount={totalElements}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              hasCheckbox={hasCheckbox}
              stickyHeader={stickyHeader}
            />
            <TableBody>
              {isEmpty(items) ? (
                <TableRow hover>
                  <TableCell align="center" colSpan={headers.length}>
                    {isUndefined(items) ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <Typography>{t(...messages.noDataFound())}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                items?.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={event => handleSelectRow(item)}
                    hover
                  >
                    {renderItem(item, index).map(
                      (col, index) =>
                        showHeader(headers[index].isShow) && (
                          <TableCell
                            key={index}
                            align={headers[index].align}
                            style={{
                              width: headers[index].width,
                              ...headers[index].style,
                            }}
                            onClick={event => {
                              if (headers[index].disable) {
                                event.stopPropagation();
                              }
                            }}
                          >
                            <div
                              className={index === 0 ? 'col-table' : ''}
                              style={{
                                width: headers[index].width,
                              }}
                            >
                              {col}
                            </div>
                          </TableCell>
                        ),
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Scrollbar>
      <>
        {!isNoPaging && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </>
    </RootContainer>
  );
});

export default Table;
