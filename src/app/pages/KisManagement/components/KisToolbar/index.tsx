import { Icon } from '@iconify/react';

import { KisInfo, Province } from 'types';
import { useEffect, useState } from 'react';

import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Typography,
  Autocomplete,
  FormControl,
  TextField,
  Stack,
  Button,
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
  marginBottom: '0.5rem',
}));

interface Props {
  type: 'imi' | 'province';
  provinces?: Province[];
  currentProvince?: Province;
  onChangeProvince?: (province?: Province) => void;
  onAddNew?: () => void;
  isConfigureUpdate?: boolean;
  isDisableFilterProvince?: boolean;
}

export default function KisToolbar(props: Props) {
  const {
    type,
    provinces,
    currentProvince,
    onChangeProvince,
    onAddNew,
    isConfigureUpdate,
    isDisableFilterProvince,
  } = props;
  const { t } = useTranslation();

  const handleChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  return (
    <RootStyle>
      <Stack>
        <Stack
          sx={{
            display: type === 'imi' ? 'none' : 'block',
            '& .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':
              {
                py: 0,
              },
            '& .MuiOutlinedInput-root': {
              height: '41px',
            },
          }}
        >
          <Autocomplete
            sx={{ width: 350 }}
            value={currentProvince || null}
            disabled={isDisableFilterProvince}
            options={provinces || []}
            onChange={(_, data: any | null) => {
              handleChange(data);
            }}
            getOptionLabel={item => item.name || ''}
            renderInput={params => <TextField {...params} />}
          />
        </Stack>
      </Stack>
      <Stack sx={{ marginBottom: '-20px' }}>
        {isConfigureUpdate && (
          <Button
            variant="contained"
            startIcon={<Icon fontSize="large" icon="mdi:plus" />}
            sx={{
              display: type === 'province' ? 'none' : 'flex',
            }}
            onClick={onAddNew}
          >
            {t(translations.common.addNew)}
          </Button>
        )}
      </Stack>
    </RootStyle>
  );
}
