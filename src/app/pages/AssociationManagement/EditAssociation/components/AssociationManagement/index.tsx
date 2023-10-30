import { memo, useEffect, useState } from 'react';
import 'react-phone-input-2/lib/material.css';
import {
  Grid,
  Card,
  TextField,
  FormControl,
  IconButton,
  styled,
  Checkbox,
  Typography,
  Stack,
  Box,
  Collapse,
} from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import { Controller, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { TextFieldAssign } from 'app/components/TextFieldAssign';
import {
  CreateAssociationRequest_taaAssociation_Members,
  AssociationInformationType,
} from 'types/AssociationManagement';
import { Roles } from 'types/enums';
import { CustomField } from 'app/components/CustomField';

import { DialogAssignManagement } from '../DialogAssignManagement';
import { DialogAssignUser } from '../DialogAssignUser';

interface Props {
  setAssociationMng: (
    value: CreateAssociationRequest_taaAssociation_Members[],
  ) => void;
  associationMng: CreateAssociationRequest_taaAssociation_Members[];
  info?: AssociationInformationType;
}

const AssignText = styled('div')({
  color: 'rgba(134, 134, 134, 1)',
  marginLeft: '10px',
});

export const AssociationManagement = memo((props: Props) => {
  const { setAssociationMng, associationMng, info } = props;
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenAssignUser, setIsOpenAssignUser] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [enableAssign, setEnableAssign] = useState<boolean>(false);
  const [checkChange, setCheckChange] = useState<boolean>(false);
  const [role, setRole] = useState<Roles>(Roles.ADMIN);
  const [associationAdmin, setAssociationAdmin] = useState<any>({});
  const [assignAll, setAssignAll] = useState<boolean>(false);
  const [categoryName, setCategory] = useState<string>('');
  const onClose = () => {
    setIsOpen(false);
  };

  const onCloseAssignUser = () => {
    setIsOpenAssignUser(false);
  };

  const onSubmit = (data: any) => {
    const newType: any = {};
    const getAssociation = associationMng || [];
    const newAssociationMng: any = {
      userUuid: data.uuid,
      phone: data.phone,
      fullName: data.name,
      identification: null,
      role: data.role,
    };
    if (data.nikNumber) {
      switch (data.nikType) {
        case 'KITAS':
          newType.identifierKitasNumber = data.nikNumber;
          newAssociationMng.identification = newType;
          break;
        case 'NIK':
          newType.identifierNikNumber = data.nikNumber;
          newAssociationMng.identification = newType;
          break;
        default:
          newType.identifierKtpNumber = data.nikNumber;
          newAssociationMng.identification = newType;
          break;
      }
    } else {
      delete newAssociationMng.identification;
    }
    setValue('associationAdmin', newAssociationMng);
    setAssociationAdmin(newAssociationMng);
    getAssociation.push(newAssociationMng);
    setAssociationMng(getAssociation);
    setEnableAssign(true);
    setIsOpen(false);
    setCheckChange(!checkChange);
  };

  const onSubmitAssignUser = (data: any, name: string) => {
    const newType: any = {};
    const getAssociation = associationMng || [];
    const newAssociationMng: any = {
      userUuid: data.uuid,
      phone: data.phone,
      fullName: data.name,
      identification: null,
      role: data.role,
    };
    if (data.nikNumber) {
      switch (data.nikType) {
        case 'KITAS':
          newType.identifierKitasNumber = data.nikNumber;
          newAssociationMng.identification = newType;
          break;
        case 'NIK':
          newType.identifierNikNumber = data.nikNumber;
          newAssociationMng.identification = newType;
          break;
        default:
          newType.identifierKtpNumber = data.nikNumber;
          newAssociationMng.identification = newType;
          break;
      }
    } else {
      delete newAssociationMng.identification;
    }
    setValue(categoryName, newAssociationMng);
    getAssociation.push(newAssociationMng);
    setAssociationMng(getAssociation);
    setIsOpenAssignUser(false);
  };

  const handleRemove = (id: any) => {
    const newAssociation = associationMng || [];
    let pos = 0;
    if (role === Roles.ADMIN) {
      setAssociationAdmin({});
    }
    newAssociation.map((data, i) => {
      if (data.role === id) {
        pos = i;
      }
    });
    newAssociation.splice(pos, 1);
    setAssociationMng(newAssociation);
    setCheckChange(!checkChange);
    setEnableAssign(false);
  };

  useEffect(() => {
    if (info) {
      let nameCat = 'associationAdmin';
      const newMember: any = [];
      info?.members.map(res => {
        res?.roles.map(roleAss => {
          const getMember = {
            userUuid: res.userUuid,
            phone: res.phone,
            fullName: res.fullName,
            identification: null,
            role: roleAss.role,
          };
          const newType: any = {};
          newType.identifierNikNumber = res.ktaNumber;
          getMember.identification = newType;
          switch (roleAss.role) {
            case Roles.ADMIN:
              setEnableAssign(true);
              setAssociationAdmin(getMember);
              nameCat = 'associationAdmin';
              break;
            case Roles.PRESIDENT:
              nameCat = 'president';
              break;
            case Roles.SECRETARY:
              nameCat = 'secretary';
              break;
            case Roles.FINANCE:
              nameCat = 'finance';
              break;
            case Roles.VICE_PRESIDENT:
              nameCat = 'vicePresident';
              break;
            case Roles.HUMAN_RESOURCE:
              nameCat = 'humanResource';
              break;
            default:
              break;
          }
          newMember.push(getMember);
          setValue(nameCat, getMember);
        });
      });
      setAssociationMng(newMember);
    }
  }, [info]);

  const assignRoleAdmin = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const newAssociationMng: any[] = [];
    const roles = [
      Roles.ADMIN,
      Roles.PRESIDENT,
      Roles.SECRETARY,
      Roles.FINANCE,
      Roles.VICE_PRESIDENT,
      Roles.HUMAN_RESOURCE,
    ];
    if (assignAll) {
      roles.map(res => {
        const newData: any = {};
        let nameCat = '';
        newData.uuid = associationAdmin.uuid;
        newData.phone = associationAdmin.phone;
        newData.fullName = associationAdmin.fullName;
        newData.role = res;
        switch (res) {
          case Roles.ADMIN:
            nameCat = 'associationAdmin';
            break;
          case Roles.PRESIDENT:
            nameCat = 'president';
            break;
          case Roles.SECRETARY:
            nameCat = 'secretary';
            break;
          case Roles.FINANCE:
            nameCat = 'finance';
            break;
          case Roles.VICE_PRESIDENT:
            nameCat = 'vicePresident';
            break;
          case Roles.HUMAN_RESOURCE:
            nameCat = 'humanResource';
            break;
          default:
            break;
        }
        setValue(nameCat, newData);
        newAssociationMng.push(newData);
      });
      setAssociationMng(newAssociationMng);
      setCheckChange(!checkChange);
    } else {
      associationAdmin &&
        associationAdmin?.phone &&
        setAssociationMng([associationAdmin]);
      setCheckChange(!checkChange);
    }
  }, [assignAll]);

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
          {t(translations.clubAssociationInformation.associationManagement)}
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
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Checkbox
                  {...field}
                  style={{ padding: 0 }}
                  value={assignAll}
                  disabled={!enableAssign}
                  onChange={() => {
                    setAssignAll(!assignAll);
                  }}
                />
                <AssignText>
                  {t(translations.clubAssociationInformation.assignAllRoles)}
                </AssignText>
              </Box>
            );
          }}
        />
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <CustomField
                associationMng={associationMng}
                role={Roles.ADMIN}
                setRole={setRole}
                name="associationAdmin"
                title={`${t(
                  translations.clubAssociationInformation.associationAdmin,
                )}*`}
                handleRemove={handleRemove}
                setIsOpen={setIsOpen}
                setIsAdmin={setIsAdmin}
                setTitle={setTitle}
                control={control}
                errors={errors}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CustomField
                associationMng={associationMng}
                role={Roles.PRESIDENT}
                name="president"
                title={`${t(
                  translations.clubAssociationInformation.president,
                )}*`}
                handleRemove={handleRemove}
                setIsOpenAssignUser={setIsOpenAssignUser}
                setIsAdmin={setIsAdmin}
                setTitle={setTitle}
                setRole={setRole}
                control={control}
                errors={errors}
                setCategory={setCategory}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CustomField
                associationMng={associationMng}
                role={Roles.SECRETARY}
                name="secretary"
                title={`${t(
                  translations.clubAssociationInformation.secretary,
                )}*`}
                handleRemove={handleRemove}
                setIsOpenAssignUser={setIsOpenAssignUser}
                setIsAdmin={setIsAdmin}
                setTitle={setTitle}
                setRole={setRole}
                control={control}
                errors={errors}
                setCategory={setCategory}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <CustomField
                associationMng={associationMng}
                role={Roles.FINANCE}
                name="finance"
                title={`${t(translations.clubAssociationInformation.finance)}*`}
                handleRemove={handleRemove}
                setIsOpenAssignUser={setIsOpenAssignUser}
                setIsAdmin={setIsAdmin}
                setTitle={setTitle}
                setRole={setRole}
                control={control}
                errors={errors}
                setCategory={setCategory}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CustomField
                associationMng={associationMng}
                role={Roles.VICE_PRESIDENT}
                name="vicePresident"
                title={`${t(
                  translations.clubAssociationInformation.vicePresident,
                )}`}
                handleRemove={handleRemove}
                setIsOpenAssignUser={setIsOpenAssignUser}
                setIsAdmin={setIsAdmin}
                setTitle={setTitle}
                setRole={setRole}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CustomField
                associationMng={associationMng}
                role={Roles.HUMAN_RESOURCE}
                name="humanResource"
                title={`${t(
                  translations.clubAssociationInformation.humanResource,
                )}`}
                handleRemove={handleRemove}
                setIsOpenAssignUser={setIsOpenAssignUser}
                setIsAdmin={setIsAdmin}
                setTitle={setTitle}
                setRole={setRole}
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
      <DialogAssignManagement
        open={isOpen}
        isAdmin={isAdmin}
        onClose={onClose}
        title={title}
        onSubmit={onSubmit}
      />
      <DialogAssignUser
        associationAdmin={associationAdmin}
        role={role}
        open={isOpenAssignUser}
        onClose={onCloseAssignUser}
        title={title}
        onSubmit={onSubmitAssignUser}
      />
    </Card>
  );
});
