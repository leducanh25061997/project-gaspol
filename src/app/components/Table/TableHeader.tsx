// material
import { visuallyHidden } from '@mui/utils';
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';
import { TableHeaderProps } from 'types';

// ----------------------------------------------------------------------

interface Props {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: TableHeaderProps[];
  numSelected: number;
  onRequestSort: (event: any, property: string) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  hasCheckbox?: boolean;
  stickyHeader?: boolean;
}

const styleBg = {
  backgroundColor: 'inherit',
};

export default function TableHeader(props: Props) {
  const {
    order,
    orderBy,
    rowCount,
    headLabel,
    numSelected,
    onRequestSort,
    onSelectAllClick,
    hasCheckbox,
    stickyHeader,
  } = props;

  const createSortHandler =
    (property: string, hasSort?: boolean) => (event: any) => {
      if (hasSort) {
        onRequestSort(event, property);
      }
    };

  return (
    <TableHead style={{ background: '#F0F0F0' }}>
      <TableRow style={stickyHeader ? styleBg : {}}>
        {hasCheckbox && (
          <TableCell padding="checkbox" style={stickyHeader ? styleBg : {}}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}

        {headLabel.map((headCell: TableHeaderProps) => {
          if (!headCell.isHide) {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.align}
                sortDirection={orderBy === headCell.id ? order : false}
                style={stickyHeader ? styleBg : {}}
              >
                <TableSortLabel
                  hideSortIcon={!headCell.hasSort}
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id, headCell.hasSort)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}
