import { memo, useState, useEffect } from 'react';
import {
  Grid,
  Stack,
  Box,
  Card,
  TextField,
  FormControl,
  Autocomplete,
  Paper,
  styled,
  Collapse,
} from '@mui/material';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPaperComponent } from 'app/components/CustomPaperComponent';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import nationalCode from 'utils/nationalCode/index.json';
import { Province, Club, Profile } from 'types';
import { UserPackageType } from 'types/enums';

import NumberFormat from 'react-number-format';

import { Icon } from '@iconify/react';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import { selectCreateMember } from '../../slice/selectors';
import { useCreateMemberSlice } from '../../slice';

export const ClubChoiceWarningStyle = styled('div')({
  background: 'rgba(26, 115, 232, 0.2)',
  color: '#1A73E8',
  fontSize: '14px',
  lineHeight: '16px',
  padding: '8px 10px',
  borderRadius: '8px',
  // marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: '8px',
  },
});
interface Props {}

export const ClubInformationForm = memo((props: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const memberGerenalInfo = useSelector(selectCreateMember);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if ((errors.club || errors.provinceClub) && !open) {
      setOpen(true);
    }
  }, [errors]);

  useEffect(() => {
    if (memberGerenalInfo.clubsRequest.data) {
      const newClubs: Club[] = memberGerenalInfo.clubsRequest.data.filter(
        res => {
          if (
            res.packageStatus !== 'PAYMENT_PROCESSING' &&
            res.packageStatus !== 'EXPIRED' &&
            res.packageCode === 'IMI_CLUB'
          )
            return res;
        },
      );
      setClubs(newClubs);
    }
  }, [memberGerenalInfo]);

  return (
    <Card sx={{ mt: 3, padding: '1rem' }}>
      <Stack
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#777777',
          }}
        >
          {t(translations.createNewMemberPage.ImiClubInfo)}
        </Box>
        {open ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                name="provinceClub"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={memberGerenalInfo?.provinceRequests || []}
                      getOptionLabel={option =>
                        option.name +
                        ' ' +
                        '(' +
                        option.clubNumber +
                        ' ' +
                        t(translations.createNewMemberPage.club) +
                        ')'
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.provinceClub}
                          label={`${t(
                            translations.createNewMemberPage.provinceClub,
                          )}*`}
                          helperText={errors?.provinceClub?.message}
                        />
                      )}
                      PaperComponent={param => (
                        <Paper
                          sx={{
                            boxShadow: 3,
                          }}
                          {...param}
                        />
                      )}
                      onChange={(_, data) => {
                        setValue('clubId', '');
                        field.onChange(data);
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                name="club"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={clubs?.length ? clubs : []}
                      getOptionLabel={option =>
                        option.clubName +
                        (option?.clubCode ? ' (' + option.clubCode + ')' : '')
                      }
                      disabled={!getValues('provinceClub')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.club}
                          label={`${t(translations.common.clubChoise)}*`}
                          helperText={errors?.club?.message}
                        />
                      )}
                      onChange={(_, data) => {
                        field.onChange(data);
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <ClubChoiceWarningStyle>
              <Icon icon="akar-icons:info-fill" width={20} height={20} />{' '}
              {t(translations.common.clubChoiceWarning)}
            </ClubChoiceWarningStyle>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
});
