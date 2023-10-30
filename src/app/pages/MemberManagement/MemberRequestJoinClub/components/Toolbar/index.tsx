/**
 *
 * Toolbar
 *
 */
import {
  FormLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import { SearchBar } from 'app/components/SearchBar';
import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { Icon } from '@iconify/react';

import { translations } from 'locales/translations';
import { FilterParams } from 'types';
import { LoadingButton } from '@mui/lab';

interface Props {
  searchValue: string;
  onSearchUSer: (keyword: string) => void;
  filter: FilterParams;
  onChangeFilter: (params: FilterParams) => void;
}

export const Toolbar = memo((props: Props) => {
  const { searchValue, onSearchUSer, filter, onChangeFilter } = props;

  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useRef(null);

  const filterList = [
    {
      value: true,
      title: t(translations.memberRequestJoinClub.assigned),
    },
    {
      value: false,
      title: t(translations.memberRequestJoinClub.unassigned),
    },
    {
      value: null,
      title: t(translations.common.all),
    },
  ];

  const [internalFilter, setInternalFilter] =
    React.useState<FilterParams>(filter);

  return (
    <Grid
      sx={{ marginBottom: '1rem' }}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Grid>
        <SearchBar
          width={200}
          keyword={searchValue}
          onSearch={onSearchUSer}
          placeholder={t(translations.memberRequestJoinClub.searchPlaceholder)}
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
            sx: { width: 250 },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <FormLabel
            sx={{
              fontWeight: 600,
              fontSize: 16,
              ml: 2,
              color: '#000',
            }}
          >
            {t(translations.memberRequestJoinClub.filterTitle)}
          </FormLabel>
          <MenuItem>
            <Select
              sx={{ width: 230, mb: 3, mt: 2 }}
              value={
                (internalFilter.isImiAdmin &&
                  t(translations.memberRequestJoinClub.assigned)) ||
                (internalFilter.isImiAdmin == null &&
                  t(translations.common.all)) ||
                t(translations.memberRequestJoinClub.unassigned)
              }
              onChange={event => {
                let newFilter: boolean | null = null;
                switch (event.target.value) {
                  case t(translations.memberRequestJoinClub.assigned):
                    newFilter = true;
                    break;
                  case t(translations.memberRequestJoinClub.unassigned):
                    newFilter = false;
                    break;
                  case t(translations.common.all):
                    newFilter = null;
                    break;
                  default:
                    newFilter = null;
                }
                setInternalFilter({
                  ...internalFilter,
                  isImiAdmin: newFilter,
                });
              }}
            >
              {filterList.map(item => (
                <MenuItem key={item.title} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </MenuItem>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '10px',
              marginTop: '10px',
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
