import React, { memo, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  FormControl,
  IconButton,
  styled,
  Box,
  Checkbox,
  Typography,
  Collapse,
  Stack,
  FormHelperText,
} from '@mui/material';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Roles } from 'types/enums';
import { TitlePage } from 'app/components/Label';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import {
  ArrowDropDown,
  ArrowRight,
  FormatColorReset,
} from '@mui/icons-material';

import { DialogAssignUser } from 'app/pages/ClubManagement/Components/DialogAssignUser';

import { DialogClubManagement } from '../../../Components/DialogClubManagement';
import { useClubManagementCreateSlice } from '../../slice';

interface Props {
  setClubManagements: (value: any) => void;
  clubMangements?: any;
  setOwnerUserUuid: (value: any) => void;
}

const AssignText = styled('div')({
  color: 'rgba(134, 134, 134, 1)',
  marginLeft: '10px',
});

const GeneralClubManagementRoot = styled('div')({
  padding: '15px 10px 13px 17px',
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiTypography-root': {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiButtonBase-root': {
    padding: '0px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

const ButtonShowPopupRoot = styled('div')({
  padding: '15px 10px 13px 17px',
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  '& div': {
    position: 'absolute',
    top: '-9px',
    background: '#FFFFFF',
    padding: '0 10px',
    color: '#637381',
    lineHeight: '1.4375em',
    fontWeight: '400',
    fontSize: '11px !important',
    left: '6px',
  },
  '& .MuiTypography-root': {
    flex: 2,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiButtonBase-root': {
    padding: '0px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

export const ClubManagements = ({
  setClubManagements,
  clubMangements,
  setOwnerUserUuid,
}: Props) => {
  const {
    control,
    setValue,
    getValues,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState<boolean>(true);
  const [selectedId, setSelectedId] = React.useState<number | undefined>();
  const [selectedRole, setSelectedRole] = React.useState<string | undefined>();
  const [isClubAdmin, setIsCLubAdmin] = useState<boolean>(false);
  const [dataAdmin, setDataAdmin] = React.useState(undefined);
  const [checked, setChecked] = React.useState(false);
  const [adminDialog, setAdminDialog] = React.useState({
    open: false,
  });
  const [clubMangement, setClubMangement] = useState<any>();
  const { actions } = useClubManagementCreateSlice();
  const roles = React.useMemo(
    () => [
      {
        title: `${t(translations.clubAssociationInformation.clubAdmin)}*`,
        role: Roles.ADMIN,
        name: 'clubAdmin',
      },
      {
        title: `${t(translations.clubAssociationInformation.finance)}*`,
        role: Roles.FINANCE,
        name: 'finance',
      },
      {
        title: `${t(translations.clubAssociationInformation.president)}*`,
        role: Roles.PRESIDENT,
        name: 'president',
      },
      {
        title: `${t(translations.clubAssociationInformation.vicePresident)}`,
        role: Roles.VICE_PRESIDENT,
        name: 'vicePresident',
      },
      {
        title: `${t(translations.clubAssociationInformation.secretary)}*`,
        role: Roles.SECRETARY,
        name: 'secretary',
      },
      {
        title: `${t(translations.clubAssociationInformation.humanResource)}`,
        role: Roles.HUMAN_RESOURCE,
        name: 'humanResource',
      },
    ],
    [],
  );

  const handleOpen = React.useCallback((data: any, id: number) => {
    dispatch(actions.resetProfile());
    setAdminDialog(prev => ({ ...prev, open: true }));
    setSelectedRole(data.role);
    setClubMangement(data);
    setSelectedId(id);
  }, []);

  useEffect(() => {
    if (
      (errors.clubAdmin ||
        errors.president ||
        errors.secretary ||
        errors.finance ||
        errors.vicePresident ||
        errors.humanResource) &&
      !collapse
    ) {
      setCollapse(true);
    }
  }, [errors]);

  const handleRemove = React.useCallback(
    (data: any, id: number) => {
      const obj = {
        userUuid: '',
        role: data.role,
        name: data.name,
        title: data.title,
        fullName: '',
        phone: '',
        nikNumber: '',
        nikType: 'NIK',
      };
      switch (data.role) {
        case Roles.ADMIN:
          setValue('clubAdmin', '');
          setDataAdmin(undefined);
          setIsCLubAdmin(false);
          setOwnerUserUuid(undefined);
          break;
        case Roles.PRESIDENT:
          setValue('president', '');
          break;
        case Roles.SECRETARY:
          setValue('secretary', '');
          break;
        case Roles.FINANCE:
          setValue('finance', '');
          break;
        case Roles.VICE_PRESIDENT:
          setValue('vicePresident', '');
          break;
        case Roles.HUMAN_RESOURCE:
          setValue('humanResource', '');
          break;
        default:
          break;
      }
      const dataFilter = clubMangements.filter(
        (item: any) => item.role !== data.role,
      );
      dataFilter.splice(id, 0, obj);
      if (checked) {
        setChecked(false);
      }
      setClubManagements([...dataFilter]);
    },
    [clubMangements],
  );

  const onClose = React.useCallback(() => {
    setClubMangement(undefined);
    setSelectedId(undefined);
    setAdminDialog(prev => ({ ...prev, open: false }));
  }, []);

  const handleSubmit = React.useCallback(
    (data: any) => {
      switch (data.role) {
        case Roles.ADMIN:
          setValue('clubAdmin', data.fullName);
          setDataAdmin(data);
          setIsCLubAdmin(true);
          setOwnerUserUuid(data.userUuid);
          break;
        case Roles.PRESIDENT:
          setValue('president', data.fullName);
          break;
        case Roles.SECRETARY:
          setValue('secretary', data.fullName);
          break;
        case Roles.FINANCE:
          setValue('finance', data.fullName);
          break;
        case Roles.VICE_PRESIDENT:
          setValue('vicePresident', data.fullName);
          break;
        case Roles.HUMAN_RESOURCE:
          setValue('humanResource', data.fullName);
          break;
        default:
          break;
      }
      const dataFilter = clubMangements.filter(
        (item: any) => item.role !== data.role,
      );
      dataFilter.splice(data.index, 0, data);
      setClubManagements([...dataFilter]);
      setAdminDialog(prev => ({ ...prev, open: false }));
    },
    [clubMangements],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const dataFilter = clubMangements.filter(
        (item: any) => item.role === Roles.ADMIN,
      );
      const data = dataFilter[0];
      setValue('clubAdmin', data.fullName);
      setValue('president', data.fullName);
      setValue('secretary', data.fullName);
      setValue('finance', data.fullName);
      setValue('vicePresident', data.fullName);
      setValue('humanResource', data.fullName);
      clearErrors('clubAdmin');
      clearErrors('president');
      clearErrors('secretary');
      clearErrors('finance');
      const clubs: any[] = [];
      roles.map((item: any) => {
        clubs.push({
          userUuid: data.userUuid,
          role: item.role,
          name: item.name,
          fullName: data.fullName,
          phone: data.phone,
          nikNumber: data.nikNumber,
          nikType: data.nikType,
          title: item.title,
          isFillData: true,
        });
      });
      setClubManagements(clubs);
      setChecked(event.target.checked);
    } else {
      clubMangements.map((item: any) => {
        if (item.role !== Roles.ADMIN && item.isFillData) {
          setValue(item.name, '');
          item.userUuid = '';
          item.fullName = '';
          item.phone = '';
          item.nikNumber = '';
          item.nikType = 'NIK';
          item.isFillData = false;
          return item;
        }
      });
      setClubManagements([...clubMangements]);
      setChecked(event.target.checked);
    }
  };

  return (
    <Card sx={{ mt: 3, padding: '1rem' }}>
      <Stack
        onClick={() => setCollapse(!collapse)}
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
          {t(translations.clubManagementConfirm.clubManagement)}
        </Box>
        {collapse ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Controller
          name="roles"
          control={control}
          render={({ field }) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                <Checkbox
                  {...field}
                  disabled={!isClubAdmin}
                  style={{ padding: 0 }}
                  checked={checked}
                  onChange={handleChange}
                />
                <AssignText>
                  {t(translations.clubInformation.assignAllRoles)}
                </AssignText>
              </Box>
            );
          }}
        />
        <Grid container spacing={2} justifyContent="center" mt={1}>
          {clubMangements?.map((clubMangement: any, i: number) => {
            return (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth key={clubMangement.index}>
                  <Controller
                    name={clubMangement.name}
                    render={({ field }) => {
                      if (clubMangement.fullName) {
                        return (
                          <ButtonShowPopupRoot>
                            <div>{clubMangement.title}</div>
                            <Typography
                              onClick={() => handleOpen(clubMangement, i)}
                            >
                              {clubMangement.fullName}
                            </Typography>
                            <span
                              style={{
                                cursor: 'pointer',
                                marginRight: '4px',
                              }}
                              onClick={() => handleRemove(clubMangement, i)}
                            >
                              <img
                                style={{ width: '16px' }}
                                src={
                                  window.location.origin + '/images/delete.svg'
                                }
                              />
                            </span>
                          </ButtonShowPopupRoot>
                        );
                      } else {
                        return (
                          <GeneralClubManagementRoot
                            onClick={() => handleOpen(clubMangement, i)}
                          >
                            <Typography>{clubMangement.title}</Typography>
                            <IconButton
                              sx={{
                                position: 'relative',
                                bgcolor: 'white',
                              }}
                              component="span"
                              children={<ArrowRight />}
                            />
                          </GeneralClubManagementRoot>
                        );
                      }
                    }}
                    control={control}
                  />
                  {errors[`${clubMangement.name}`] ? (
                    <FormHelperText>
                      {errors[`${clubMangement.name}`].message}
                    </FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>
            );
          })}
        </Grid>
      </Collapse>
      <DialogClubManagement
        selectedId={selectedId}
        open={adminDialog.open}
        onClose={onClose}
        onSubmit={handleSubmit}
        clubMangement={clubMangement}
        selectedRole={selectedRole}
        isClubAdmin={isClubAdmin}
        dataAdmin={dataAdmin}
      />
    </Card>
  );
};
