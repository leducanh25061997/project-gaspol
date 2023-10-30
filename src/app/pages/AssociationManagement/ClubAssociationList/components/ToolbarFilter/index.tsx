import { Icon } from '@iconify/react';
import {
  Grid,
  Box,
  FormLabel,
  Menu,
  IconButton,
  Autocomplete,
  TextField,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Select,
  Button,
} from '@mui/material';
import { memo, useRef, useState, useMemo, useEffect } from 'react';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import {
  FilterAssociationParams,
  FilterListParams,
  FilterMemberParams,
  Province,
} from 'types';

import { Stars, MemberStatus, Upload } from 'types/enums';

import { LoadingButton } from '@mui/lab';

import { SearchInput } from 'app/components/SearchInput';
import { Star } from 'app/components/Star';
import ExportExCel from 'app/pages/MemberManagement/MemberManagement/components/ExportFileExcel';

interface ValueFilter {
  star?: string[];
  associationStatus?: string[];
  packageStatus?: string[];
  certDocuments?: string;
  adArtDocuments?: string;
}
interface Props {
  handleSearch: () => void;
  onSearchClubAssociation: (value: string) => void;
  searchValue: string;
  currentProvince?: Province;
  provinces?: Province[];
  onChangeProvince?: (province?: Province) => void;
  filter: ValueFilter;
  onChangeFilter: (params: FilterListParams) => void;
  provinceId?: string;
}

interface starType {
  value: Stars;
  name: number;
}

interface ExportRequest {
  startDate?: string;
  endDate?: string;
}

const initialFilter = {
  star: [],
  associationStatus: [],
  packageStatus: [],
  adArtDocuments: '',
  certDocuments: '',
  provinceId: '',
};

export const ToolbarFilter = memo((props: Props) => {
  const {
    onSearchClubAssociation,
    searchValue,
    currentProvince,
    provinces,
    onChangeProvince,
    filter,
    onChangeFilter,
    provinceId,
    handleSearch,
  } = props;
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalFilter, setInternalFilter] =
    useState<ValueFilter>(initialFilter);
  const isDisable = useMemo(() => !!provinceId, [provinceId]);
  const [openExportDialog, setOpenExportDialog] = useState(false);

  useEffect(() => {
    setInternalFilter(filter);
  }, [filter]);

  const stars = [
    {
      value: Stars.FOUR,
      name: 4,
    },
    {
      value: Stars.THREE,
      name: 3,
    },
    {
      value: Stars.TWO,
      name: 2,
    },
    {
      value: Stars.ONE,
      name: 1,
    },
    {
      value: Stars.ZERO,
      name: 0,
    },
  ];
  const status = [
    {
      value: 'ACTIVATED',
      name: t(translations.common.activated),
    },
    {
      value: MemberStatus.BANNED,
      name: t(translations.common.banned),
    },
  ];

  const packageName = [
    {
      value: 'ACTIVE',
      name: t(translations.common.active),
    },
    {
      value: MemberStatus.EXPIRED,
      name: t(translations.common.expired),
    },
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
      title: t(translations.tableAssociation.star),
    },
    adArtDocuments: {
      name: 'adArt',
      data: adArt,
      title: t(translations.tableAssociation.adArt),
    },
    certificates: {
      name: 'certificate',
      data: certificate,
      title: t(translations.tableAssociation.eCertificate),
    },
    status: {
      name: 'status',
      data: status,
      title: t(translations.tableAssociation.associationStatus),
    },
    package: {
      name: 'packageName',
      data: packageName,
      title: t(translations.tableAssociation.packageStatusInfo),
    },
  };

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  const handleExport = (data: ExportRequest) => {
    setOpenExportDialog(false);
  };

  const handleExportData = (e: any) => {
    setOpenExportDialog(true);
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
            getOptionLabel={(item: any | null) =>
              item?.name || t(translations.common.all)
            }
            disabled={isDisable}
            value={currentProvince || t(translations.common.all)}
            renderInput={params => <TextField {...params} />}
            onChange={(_, data: any | null) => {
              onChange(data);
            }}
          />
        </Box>
        <SearchInput
          width={300}
          keyword={searchValue}
          onSearch={onSearchClubAssociation}
          placeholder={`${t(translations.common.nameAndCode)}`}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            backgroundColor: '#01AB55',
            color: 'white',
            width: '100px',
          }}
          onClick={handleSearch}
        >
          {t(translations.common.search)}
        </Button>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignSelf: 'center',
        }}
      >
        {/* <Button
          variant="contained"
          sx={{
            marginRight: '2rem',
            display: 'table-row',
            width: '100px',
            height: '40px',
          }}
          onClick={e => {
            handleExportData(e);
          }}
        >
          {t(translations.common.export)}
        </Button> */}
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
                primary={<Star numberStar={parseInt(item.value)} />}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          ))}
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
          {filterList.status.data.map((item, index) => (
            <MenuItem sx={{ color: 'text.secondary' }} key={index}>
              <ListItemIcon>
                <Checkbox
                  onChange={event => {
                    const newStatus = internalFilter.associationStatus;
                    event.target.checked
                      ? !internalFilter.associationStatus?.includes(
                          item.value,
                        ) &&
                        setInternalFilter({
                          ...internalFilter,
                          associationStatus:
                            internalFilter?.associationStatus?.concat(
                              item.value,
                            ),
                        })
                      : internalFilter.associationStatus?.includes(
                          item.value,
                        ) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          associationStatus: newStatus,
                        });
                  }}
                  checked={internalFilter.associationStatus?.includes(
                    item.value,
                  )}
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
              fontWeight: 600,
              fontSize: 16,
              color: '#000',
              ml: 2,
            }}
          >
            {filterList.package.title}
          </FormLabel>
          {filterList.package.data.map((item, index) => (
            <MenuItem sx={{ color: 'text.secondary' }} key={index}>
              <ListItemIcon>
                <Checkbox
                  onChange={event => {
                    const newStatus = internalFilter.packageStatus;
                    // console.log(newStatus)
                    event.target.checked
                      ? !internalFilter.packageStatus?.includes(item.value) &&
                        setInternalFilter({
                          ...internalFilter,
                          packageStatus: internalFilter?.packageStatus?.concat(
                            item.value,
                          ),
                        })
                      : internalFilter.packageStatus?.includes(item.value) &&
                        newStatus &&
                        newStatus.indexOf(item.value) > -1 &&
                        newStatus.splice(newStatus.indexOf(item.value), 1) &&
                        setInternalFilter({
                          ...internalFilter,
                          packageStatus: newStatus,
                        });
                  }}
                  checked={internalFilter.packageStatus?.includes(item.value)}
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
            {filterList.adArtDocuments.title}
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
                filterList.adArtDocuments.data.forEach(item => {
                  event.target.value === item.value &&
                    setInternalFilter({
                      ...internalFilter,
                      adArtDocuments: event.target.value,
                    });
                });
              }}
            >
              {filterList.adArtDocuments.data.map(item => (
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
                      certDocuments: event.target.value,
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
      <ExportExCel
        openDialog={openExportDialog}
        onCancel={() => setOpenExportDialog(false)}
        onSubmit={handleExport}
      />
    </Grid>
  );
});
