import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { SearchBar } from 'app/components/SearchBar';

// material
import { styled } from '@mui/material/styles';

import { Button, FormControl, Grid, TextField, Toolbar } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';
import { OldMemberListRequestData } from 'types/ClaimList';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 80,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
}));

interface Props {
  keyword: string;
  placeholder?: string;
  state?: any;
  onSearch: (params: OldMemberListRequestData) => void;
}

interface oldNumberRequest {
  nikNumber?: string;
  oldKtaNumber?: string;
  phoneOrName?: string;
}

export default function TableToolbar(props: Props) {
  const { keyword, placeholder = '', onSearch, state } = props;
  const { t } = useTranslation();
  const [filterRequest, setFilterRequest] = React.useState<oldNumberRequest>({
    nikNumber: '',
    oldKtaNumber: state?.oldKtaNumber,
    phoneOrName: '',
  });

  const onChange = (e: any) => {
    e.target.name === 'nikNumber' &&
      setFilterRequest({
        ...filterRequest,
        nikNumber: e.target.value,
      });
    e.target.name === 'oldKtaNumber' &&
      setFilterRequest({
        ...filterRequest,
        oldKtaNumber: e.target.value,
      });
  };

  const onSearchName = (e: any) => {
    setFilterRequest({
      ...filterRequest,
      phoneOrName: e,
    });
  };

  const submit = () => {
    onSearch({
      nikNumber: filterRequest.nikNumber,
      oldKtaNumber: filterRequest.oldKtaNumber,
      phoneOrName: filterRequest.phoneOrName,
    });
  };

  return (
    <RootStyle>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label={`${t(translations.common.oldKTASearch)}`}
            type="text"
            name="oldKtaNumber"
            fullWidth
            onChange={onChange}
            value={filterRequest?.oldKtaNumber}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label={`${t(translations.common.nikNumberSearch)}`}
            type="text"
            name="nikNumber"
            fullWidth
            onChange={onChange}
            value={filterRequest?.nikNumber}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <SearchBar
            onSearch={onSearchName}
            placeholder={`${t(translations.common.searchByName)}`}
            keyword={keyword}
            width={'100%'}
          ></SearchBar>
        </Grid>
        <Grid item xs={12} sm={2} md={2} sx={{ alignSelf: 'center' }}>
          <Button
            variant="contained"
            onClick={submit}
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'table-row',
              width: '100px',
            }}
          >
            {t(translations.common.apply)}
          </Button>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
