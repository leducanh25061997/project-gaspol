import { useRef, useState, memo } from 'react';
import { Icon } from '@iconify/react';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { SearchBar } from 'app/components/SearchBar';

import {
  Box,
  IconButton,
  Menu,
  Autocomplete,
  Grid,
  FormLabel,
  TextField,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';

import { Province, FilterMemberParams } from 'types';

import { MemberStatus } from 'types/enums';

import { LoadingButton } from '@mui/lab';
interface Props {
  onSearchBusinessPartner: (value: string) => void;
  searchValue: string;
  currentProvince?: Province;
  provinces?: Province[];
  onChangeProvince?: (province?: Province) => void;
  filter: FilterMemberParams;
  onChangeFilter: (params: FilterMemberParams) => void;
}

export const TableToolbar = memo((props: Props) => {
  const {
    onSearchBusinessPartner,
    onChangeProvince,
    searchValue,
    currentProvince,
    provinces,
    filter,
    onChangeFilter,
  } = props;
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const status = [
    { name: t(translations.common.active), value: MemberStatus.ACTIVE },
    { name: t(translations.common.expired), value: MemberStatus.EXPIRED },
    { name: t(translations.common.processing), value: MemberStatus.PROCESSING },
    { name: t(translations.common.failed), value: MemberStatus.FAILED },
    { name: t(translations.common.banned), value: MemberStatus.BANNED },
    { name: t(translations.common.all), value: 'All' },
  ];
  const [internalFilter, setInternalFilter] = useState(filter);
  const filterList = {
    status: {
      name: 'status',
      data: status,
      title: t(translations.tableRequestClub.status),
    },
  };

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  return (
    <Grid
      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ mr: 2 }}>
          <Autocomplete
            sx={{ width: 200 }}
            disableClearable
            options={provinces || []}
            getOptionLabel={(item: any | null) =>
              item?.name || t(translations.common.all)
            }
            value={currentProvince || t(translations.common.all)}
            renderInput={params => <TextField {...params} />}
            onChange={(_, data: any | null) => {
              onChange(data);
            }}
          />
        </Box>
        <SearchBar
          width={300}
          keyword={searchValue}
          onSearch={onSearchBusinessPartner}
          placeholder={`${t(translations.common.search)} (${t(
            translations.tableRequestPromoter.promoterName,
          )})`}
        />
      </Grid>
      <Grid>
        <IconButton onClick={() => setIsOpen(true)} ref={ref}>
          <Icon icon={roundFilterList} />
        </IconButton>
        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => {
            setIsOpen(false);
          }}
          PaperProps={{
            sx: { width: 230 },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <FormLabel
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: '#000',
              ml: 2,
            }}
          >
            {filterList.status.title}
          </FormLabel>
          {filterList.status.data.map(item => (
            <MenuItem sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <Checkbox
                  onChange={event => {
                    const newStatus = internalFilter.partnerFilter?.status;
                    event.target.checked
                      ? !internalFilter.partnerFilter?.status?.includes(
                          item.value,
                        ) &&
                        setInternalFilter({
                          ...internalFilter,
                          partnerFilter: {
                            ...internalFilter.partnerFilter,
                            status:
                              item.value === ''
                                ? []
                                : internalFilter.partnerFilter?.status?.concat(
                                    item.value,
                                  ),
                          },
                        })
                      : internalFilter.partnerFilter?.status?.includes(
                          item.value,
                        ) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          partnerFilter: {
                            ...internalFilter.partnerFilter,
                            status: item.value === '' ? [] : newStatus,
                          },
                        });
                  }}
                  checked={
                    internalFilter.partnerFilter?.status &&
                    internalFilter.partnerFilter?.status.length === 0 &&
                    item.value === ''
                      ? true
                      : internalFilter.partnerFilter?.status?.includes(
                          item.value,
                        )
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mr: 2,
              mt: 2,
            }}
          >
            <LoadingButton
              variant="contained"
              onClick={() => {
                setIsOpen(false);
                onChangeFilter(internalFilter);
              }}
            >
              {t(translations.common.apply)}
            </LoadingButton>
          </Box>
        </Menu>
      </Grid>
    </Grid>
  );
});
