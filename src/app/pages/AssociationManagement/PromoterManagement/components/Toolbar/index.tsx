/**
 *
 * Toolbar
 *
 */
import {
  Grid,
  Select,
  Stack,
  Autocomplete,
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  FormLabel,
  InputLabel,
} from '@mui/material';
import { SearchBar } from 'app/components/SearchBar';
import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Icon } from '@iconify/react';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { Stars, MemberStatus, Upload } from 'types/enums';

import { Province, FilterList, FilterMemberParams } from 'types';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSearchPromoter: (value: string) => void;
  searchValue: string;
  currentProvince?: Province;
  provinces?: Province[];
  onChangeProvince?: (province?: Province) => void;
  filter: FilterMemberParams;
  onChangeFilter: (params: FilterMemberParams) => void;
}

export const Toolbar = memo((props: Props) => {
  const {
    onSearchPromoter,
    onChangeProvince,
    searchValue,
    currentProvince,
    provinces,
    filter,
    onChangeFilter,
  } = props;

  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const status = [
    {
      value: 'APPROVED',
      name: t(translations.common.active),
    },
    {
      value: MemberStatus.BANNED,
      name: t(translations.common.banned),
    },
    {
      value: MemberStatus.EXPIRED,
      name: t(translations.common.expired),
    },
    {
      value: MemberStatus.PENDING,
      name: t(translations.common.pending),
    },
    {
      value: MemberStatus.PROCESSING,
      name: t(translations.common.processing),
    },
    {
      value: MemberStatus.PAYMENT_FAILED,
      name: t(translations.common.failed),
    },
    {
      value: MemberStatus.VERIFYING,
      name: t(translations.common.verifying),
    },
    {
      value: MemberStatus.DRAFT,
      name: t(translations.common.draft),
    },
    {
      value: '',
      name: t(translations.common.all),
    },
  ];

  const filterList = {
    status: {
      name: 'status',
      data: status,
      title: t(translations.tableRequestClub.status),
    },
  };

  const [internalFilter, setInternalFilter] = React.useState(filter);

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
            options={provinces || []}
            disableClearable
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
          onSearch={onSearchPromoter}
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
                    const newStatus = internalFilter.promoterFilter?.status;
                    event.target.checked
                      ? !internalFilter.promoterFilter?.status?.includes(
                          item.value,
                        ) &&
                        setInternalFilter({
                          ...internalFilter,
                          promoterFilter: {
                            ...internalFilter.promoterFilter,
                            status:
                              item.value === ''
                                ? []
                                : internalFilter.promoterFilter?.status?.concat(
                                    item.value,
                                  ),
                          },
                        })
                      : internalFilter.promoterFilter?.status?.includes(
                          item.value,
                        ) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          promoterFilter: {
                            ...internalFilter.promoterFilter,
                            status: item.value === '' ? [] : newStatus,
                          },
                        });
                  }}
                  checked={
                    internalFilter.promoterFilter?.status &&
                    internalFilter.promoterFilter?.status.length === 0 &&
                    item.value === ''
                      ? true
                      : internalFilter.promoterFilter?.status?.includes(
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
