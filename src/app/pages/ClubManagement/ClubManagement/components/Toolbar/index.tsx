/**
 *
 * Toolbar
 *
 */
import {
  Grid,
  Select,
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
  styled,
} from '@mui/material';

import Button, { ButtonProps } from '@mui/material/Button';

import { SearchInput } from 'app/components/SearchInput';

import { Star } from 'app/components/Star';

import React, { memo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Icon } from '@iconify/react';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { Stars, MemberStatus, Upload } from 'types/enums';

import { Province, clubFilterParams } from 'types';
import { LoadingButton } from '@mui/lab';

interface Props {
  handleSearch: () => void;
  onSearchClub: (value: string) => void;
  searchValue?: string;
  currentProvince?: Province;
  provinces?: Province[];
  onChangeProvince?: (province?: Province) => void;
  filter: clubFilterParams;
  onChangeFilter: (params: clubFilterParams) => void;
  isExport?: boolean;
  provinceId?: string;
}

const StartRoot = styled('div')({
  display: 'flex',
  '& img': {
    marginLeft: 8,
  },
});

const ExportButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#00AB55',
  boxShadow: 'none',
  marginLeft: 7,
  '&:hover': {
    backgroundColor: '#00AB55',
  },
}));

const ClearFilterButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#FFFFFF',
  boxShadow: 'none',
  backgroundColor: '#FF6B00',
  '&:hover': {
    backgroundColor: '#FF6B00',
  },
}));

const initialFilter = {
  star: [],
  clubStatus: [],
  clubType: [],
  adArtDocuments: '',
  certDocuments: '',
  provinceId: '',
};

interface ValueFilter {
  star?: string[];
  clubType?: string[];
  clubStatus?: string[];
  certDocuments?: string;
  adArtDocuments?: string;
}

export const Toolbar = memo((props: Props) => {
  const {
    onSearchClub,
    onChangeProvince,
    searchValue,
    currentProvince,
    provinces,
    filter,
    onChangeFilter,
    isExport,
    provinceId,
    handleSearch,
  } = props;
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const isDisable = React.useMemo(() => !!provinceId, [provinceId]);

  const stars = [
    {
      value: Stars.FOUR,
      draw: Stars.FOUR,
      name: t(translations.tableRequestClub.star, { count: 4 }),
    },
    {
      value: Stars.THREE,
      draw: Stars.THREE,
      name: t(translations.tableRequestClub.star, { count: 3 }),
    },
    {
      value: Stars.TWO,
      draw: Stars.TWO,
      name: t(translations.tableRequestClub.star, { count: 2 }),
    },
    {
      value: Stars.ONE,
      draw: Stars.ONE,
      name: t(translations.tableRequestClub.star, { count: 1 }),
    },
  ];

  // const clubType = [
  //   {
  //     value: 'GASPOL_CLUB',
  //     name: t(translations.common.gaspolClub),
  //   },
  //   {
  //     value: 'IMI_CLUB',
  //     name: t(translations.common.imiClub),
  //   },
  // ];

  const status = [
    {
      value: 'ACTIVATED',
      name: t(translations.common.activated),
    },
    {
      value: MemberStatus.BANNED,
      name: t(translations.common.banned),
    },
    // {
    //   value: MemberStatus.CREATED,
    //   name: t(translations.common.created),
    // },
    // {
    //   value: MemberStatus.VERIFYING,
    //   name: t(translations.common.verifying),
    // },
  ];

  const adArt = [
    {
      value: 'true',
      name: t(translations.tableRequestClub.uploaded),
    },
    {
      value: 'false',
      name: t(translations.tableRequestClub.notUpload),
    },
    {
      value: 'All',
      name: t(translations.common.all),
    },
  ];

  const certificate = [
    {
      value: 'true',
      name: t(translations.tableRequestClub.uploaded),
    },
    {
      value: 'false',
      name: t(translations.tableRequestClub.notUpload),
    },
    {
      value: 'All',
      name: t(translations.common.all),
    },
  ];

  const filterList = {
    stars: {
      name: 'stars',
      data: stars,
      title: t(translations.tableRequestClub.titleStar),
    },
    adArts: {
      name: 'adArt',
      data: adArt,
      title: t(translations.tableRequestClub.adArt),
    },
    certificates: {
      name: 'certificate',
      data: certificate,
      title: t(translations.tableRequestClub.eCertificate),
    },
    // clubType: {
    //   name: 'clubType',
    //   data: clubType,
    //   title: t(translations.tableRequestClub.clubType),
    // },
    status: {
      name: 'status',
      data: status,
      title: t(translations.tableRequestClub.clubStatus),
    },
  };

  const [internalFilter, setInternalFilter] =
    React.useState<ValueFilter>(initialFilter);

  useEffect(() => {
    setInternalFilter(filter);
  }, [filter]);

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  return (
    <Grid
      sx={{ marginBottom: '1rem', marginTop: '1rem' }}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          '& .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':
            {
              py: 0,
            },
          '& .MuiOutlinedInput-root': {
            height: '41px',
          },
        }}
      >
        <Box sx={{ mr: 2 }}>
          <Autocomplete
            sx={{ width: 176 }}
            disableClearable
            disabled={isDisable}
            options={provinces || []}
            getOptionLabel={(item: any | null) =>
              item?.name || t(translations.common.all)
            }
            value={currentProvince || t(translations.common.all)}
            renderInput={params => <TextField {...params} label="Province" />}
            onChange={(_, data: any | null) => {
              onChange(data);
            }}
          />
        </Box>
        <SearchInput
          width={316}
          keyword={searchValue}
          onSearch={onSearchClub}
          placeholder={`${t(translations.common.nameAndCode)}`}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            backgroundColor: '#01AB55',
            color: 'white',
            width: '100px',
            height: '41px',
          }}
          onClick={handleSearch}
        >
          {t(translations.common.search)}
        </Button>
      </Grid>
      <Grid display={'flex'}>
        {/* <Grid
          // sx={{ marginRight: '2.625rem' }}
          display="flex"
          direction="row"
          alignItems="center"
        >
          {isExport && (
            <ExportButton variant="contained">{'Export'}</ExportButton>
          )}
        </Grid> */}
        {/* <IconButton onClick={() => setIsOpen(true)} ref={ref}>
          <Icon icon={roundFilterList} />
        </IconButton> */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#01AB55',
            color: 'white',
            marginLeft: '8px',
            height: '41px',
            width: '100px',
          }}
          onClick={() => setIsOpen(true)}
          ref={ref}
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
            {filterList.stars.title}
          </FormLabel>
          {filterList.stars.data.map((item, index) => (
            <MenuItem sx={{ color: 'text.secondary' }} key={index}>
              <ListItemIcon>
                <Checkbox
                  onChange={event => {
                    const newStatus = internalFilter.star;
                    event.target.checked
                      ? !internalFilter.star?.includes(item.value) &&
                        setInternalFilter({
                          ...internalFilter,
                          star: internalFilter.star?.concat(item.value),
                        })
                      : internalFilter.star?.includes(item.value) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          star: newStatus,
                        });
                  }}
                  checked={internalFilter.star?.includes(item.value)}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Star numberStar={parseInt(item.draw)} />}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          ))}
          {/* <FormLabel
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: '#000',
              ml: 2,
            }}
          >
            {filterList.clubType.title}
          </FormLabel>
          {filterList.clubType.data.map(item => (
            <MenuItem sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <Checkbox
                  onChange={event => {
                    const newStatus = internalFilter.clubType;
                    event.target.checked
                      ? !internalFilter.clubType?.includes(item.value) &&
                        setInternalFilter({
                          ...internalFilter,
                          clubType: internalFilter.clubType?.concat(item.value),
                        })
                      : internalFilter.clubType?.includes(item.value) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          clubType: newStatus,
                        });
                  }}
                  checked={internalFilter.clubType?.includes(item.value)}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          ))} */}
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
                    const newStatus = internalFilter.clubStatus;
                    event.target.checked
                      ? !internalFilter.clubStatus?.includes(item.value) &&
                        setInternalFilter({
                          ...internalFilter,
                          clubStatus: internalFilter.clubStatus?.concat(
                            item.value,
                          ),
                        })
                      : internalFilter.clubStatus?.includes(item.value) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          clubStatus: newStatus,
                        });
                  }}
                  checked={internalFilter.clubStatus?.includes(item.value)}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          ))}
          <FormLabel
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
              ml: 2,
            }}
          >
            {filterList.adArts.title}
          </FormLabel>
          <MenuItem>
            <Select
              sx={{ width: 200, mb: 3 }}
              value={
                internalFilter.adArtDocuments
                  ? internalFilter.adArtDocuments
                  : t(translations.common.all)
              }
              onChange={event => {
                filterList.adArts.data.forEach(item => {
                  event.target.value === item.value &&
                    setInternalFilter({
                      ...internalFilter,
                      adArtDocuments: item.value,
                    });
                });
              }}
            >
              {filterList.adArts.data.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </MenuItem>
          <FormLabel
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
              ml: 2,
            }}
          >
            {filterList.certificates.title}
          </FormLabel>
          <MenuItem>
            <Select
              sx={{ width: 200 }}
              // defaultValue={filterList.certificates.data[2].value}
              value={
                internalFilter.certDocuments
                  ? internalFilter.certDocuments
                  : t(translations.common.all)
              }
              onChange={event => {
                filterList.certificates.data.forEach(item => {
                  event.target.value === item.value &&
                    setInternalFilter({
                      ...internalFilter,
                      certDocuments: item.value,
                    });
                });
              }}
            >
              {filterList.certificates.data.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </MenuItem>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mr: 2,
              mt: 2,
            }}
          >
            {/* <Button
              variant="contained"
              sx={{
                backgroundColor: '#01AB55',
                color: 'white',
                marginLeft: '8px',
                height: '45px',
                width: '100px',
              }}
              onClick={() => {
                setIsOpen(false);
                onChangeFilter(internalFilter);
              }}
            >
              <Icon style={{ width: 20, height: 20 }} icon={roundFilterList} />
              <span style={{ marginLeft: 12 }}>
                {t(translations.common.filter)}
              </span>
            </Button> */}
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
