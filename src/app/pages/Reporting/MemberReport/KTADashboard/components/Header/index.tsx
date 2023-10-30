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
  packageType: string[];
  enrollmentType: string[];
  startDate?: any;
  endDate?: any;
}

interface Props {
  title?: string;
  filterList: FilterList[];
  onChecked: (event: any) => void;
  oldValueFilter?: ValueFilter;
  setRangeDate: any;
  rangeDate: DateRange<Date>;
}

export const Header = memo((props: Props) => {
  const {
    title,
    filterList,
    onChecked,
    oldValueFilter,
    setRangeDate,
    rangeDate,
  } = props;
  const { t } = useTranslation();
  const ref = useRef(null);
  const [listFilter, setListFilter] = useState<FilterList[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [valueChecked, setValueChecked] = useState<ValueFilter>({
    packageType: [''],
    enrollmentType: [''],
    startDate: '',
    endDate: '',
  });

  const handleDoneFilter = (rangeDate: any) => {
    if (rangeDate?.length && rangeDate[1]) {
      const newFilter = {
        ...valueChecked,
        startDate:
          rangeDate?.length && rangeDate[0]
            ? parseInt(moment(rangeDate[0]).format('x'))?.toString()
            : ('' as string),
        endDate:
          rangeDate?.length && rangeDate[1]
            ? parseInt(moment(rangeDate[1]).endOf('day').format('x')).toString()
            : ('' as string),
      };
      setValueChecked(newFilter);
      onChecked(newFilter);
    }
  };

  const handleApplyFilter = () => {
    onChecked(valueChecked);
    setIsOpen(false);
  };

  useEffect(() => {
    if (oldValueFilter) {
      setValueChecked(oldValueFilter);
    }
  }, [oldValueFilter]);

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
      <div className="flex y-center">
        <Stack
          flexDirection={'row'}
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
                startDate: '',
                endDate: '',
              };
              setValueChecked(newFilter);
            }}
          />
          <Button
            ref={ref}
            variant="contained"
            sx={{
              backgroundColor: '#01AB55',
              color: 'white',
              marginLeft: '8px',
              height: '41px',
              width: '100px',
            }}
            onClick={() => setIsOpen(true)}
          >
            <Icon style={{ width: 20, height: 20 }} icon={roundFilterList} />
            <span style={{ marginLeft: 12 }}>
              {t(translations.common.filter)}
            </span>
          </Button>
          <Menu
            open={isOpen}
            anchorEl={ref.current}
            onClose={() => {
              setListFilter(filterList);
              setIsOpen(false);
            }}
            PaperProps={{
              sx: { width: 200, maxWidth: '100%' },
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {filterList?.map(item => (
              <FormControl sx={{ marginLeft: '10px' }} key={item.title}>
                <FormLabel
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: 20,
                  }}
                  component="legend"
                >
                  {item.title}
                </FormLabel>
                {item.name === 'packageType'
                  ? item.data.map((itemCheckbox: any, index) => (
                      <MenuItem
                        sx={{ color: 'text.secondary', padding: '0px' }}
                        key={index}
                      >
                        <ListItemIcon sx={{ padding: '0px' }}>
                          <Checkbox
                            onChange={event => {
                              const newStatus = item?.status;
                              if (event.target.checked) {
                                if (itemCheckbox.value === '') {
                                  newStatus &&
                                    newStatus.length > 0 &&
                                    newStatus.splice(0, newStatus.length);
                                } else {
                                  newStatus &&
                                    newStatus.length > 0 &&
                                    newStatus.indexOf('') > -1 &&
                                    newStatus.splice(newStatus.indexOf(''), 1);
                                }
                                newStatus && newStatus.push(itemCheckbox.value);
                              } else {
                                newStatus &&
                                  newStatus.indexOf(itemCheckbox.value) > -1 &&
                                  newStatus.splice(
                                    newStatus.indexOf(itemCheckbox.value),
                                    1,
                                  );
                              }
                              newStatus &&
                                setValueChecked({
                                  ...valueChecked,
                                  packageType: newStatus,
                                });
                            }}
                            checked={
                              item?.status &&
                              item?.status?.length === 0 &&
                              (itemCheckbox.value === '' ||
                                itemCheckbox.value === 'All')
                                ? true
                                : item?.status?.includes(itemCheckbox.value)
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ marginLeft: '-1rem' }}
                          primary={itemCheckbox.name}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </MenuItem>
                    ))
                  : null}
                {item.name === 'enrollmentType'
                  ? item.data.map((itemCheckbox: any, index) => (
                      <MenuItem
                        sx={{ color: 'text.secondary', padding: '0px' }}
                        key={index}
                      >
                        <ListItemIcon sx={{ padding: '0px' }}>
                          <Checkbox
                            onChange={event => {
                              const newStatus = item?.status;
                              if (event.target.checked) {
                                if (itemCheckbox.value === '') {
                                  newStatus &&
                                    newStatus.length > 0 &&
                                    newStatus.splice(0, newStatus.length);
                                } else {
                                  newStatus &&
                                    newStatus.length > 0 &&
                                    newStatus.indexOf('') > -1 &&
                                    newStatus.splice(newStatus.indexOf(''), 1);
                                }
                                newStatus && newStatus.push(itemCheckbox.value);
                              } else {
                                newStatus &&
                                  newStatus.indexOf(itemCheckbox.value) > -1 &&
                                  newStatus.splice(
                                    newStatus.indexOf(itemCheckbox.value),
                                    1,
                                  );
                              }
                              newStatus &&
                                setValueChecked({
                                  ...valueChecked,
                                  enrollmentType: newStatus,
                                });
                            }}
                            checked={
                              item?.status &&
                              item?.status?.length === 0 &&
                              (itemCheckbox.value === '' ||
                                itemCheckbox.value === 'All')
                                ? true
                                : item?.status?.includes(itemCheckbox.value)
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ marginLeft: '-1rem' }}
                          primary={itemCheckbox.name}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </MenuItem>
                    ))
                  : null}
              </FormControl>
            ))}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '10px',
                marginTop: '10px',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#01AB55',
                  color: 'white',
                  marginLeft: '8px',
                  height: '45px',
                  width: '100px',
                }}
                onClick={() => {
                  handleApplyFilter();
                }}
              >
                <span>{t(translations.common.apply)}</span>
              </Button>
            </Box>
          </Menu>
        </Stack>
      </div>
    </div>
  );
});

function setIsOpen(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
