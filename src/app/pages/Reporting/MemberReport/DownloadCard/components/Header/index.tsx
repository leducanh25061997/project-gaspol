import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import DateRangeComponent from 'app/components/DateRangeComponent';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { Icon } from '@iconify/react';
import { memo, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { FilterList, FilterParams } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { DateRange } from '@mui/lab';

interface ValueFilter {
  fromDate?: any;
  toDate?: any;
}

interface Props {
  title?: string;
  onChecked: (event: any) => void;
  setRangeDate: any;
  rangeDate: DateRange<Date>;
}

export const Header = memo((props: Props) => {
  const { title, onChecked, setRangeDate, rangeDate } = props;
  const { t } = useTranslation();
  const [valueChecked, setValueChecked] = useState<ValueFilter>({
    fromDate: '',
    toDate: '',
  });

  const handleDoneFilter = (rangeDate: any) => {
    if (rangeDate?.length && rangeDate[1]) {
      const newFilter = {
        ...valueChecked,
        fromDate:
          rangeDate?.length && rangeDate[0]
            ? parseInt(moment(rangeDate[0]).format('x'))?.toString()
            : ('' as string),
        toDate:
          rangeDate?.length && rangeDate[1]
            ? parseInt(moment(rangeDate[1]).endOf('day').format('x')).toString()
            : ('' as string),
      };
      setValueChecked(newFilter);
      onChecked(newFilter);
    }
  };

  return (
    <div className="title-container flex x-between mb-24 y-center">
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'rgba(134, 134, 134, 1)',
          mr: '29px',
        }}
      >
        {title}
      </Typography>
      <Stack
        sx={{
          '& .date_range': {
            height: '41px',
          },
        }}
      >
        <DateRangeComponent
          setRangeDefaultDate={setRangeDate}
          rangeDefaultDate={rangeDate}
          handleDoneFilter={handleDoneFilter}
          resetPicker={() => {
            const newFilter = {
              ...valueChecked,
              fromDate: '',
              toDate: '',
            };
            setValueChecked(newFilter);
          }}
        />
      </Stack>
    </div>
  );
});

function setIsOpen(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
