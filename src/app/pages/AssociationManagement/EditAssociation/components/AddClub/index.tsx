import { memo, useEffect, useState } from 'react';
import {
  Grid,
  Card,
  TextField,
  FormControl,
  IconButton,
  styled,
  Stack,
  Box,
  Collapse,
} from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import AddIcon from '@mui/icons-material/Add';

import { useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { AddClubField } from 'app/components/AddClubField';
import { Province } from 'types/Province';
import { Club } from 'types/Club';
import Notifier from 'app/pages/Notifier';
import { useDispatch, useSelector } from 'react-redux';

import { DialogAddClub } from '../DialogAddClub';
import { selectAssociation } from '../../slice/selectors';
import { useEditAssociationSlice } from '../../slice';
import { EditClubStatus } from '../../slice/types';

interface Props {
  clubs: any;
  setClubs: any;
  id: any;
}

interface dataRequest {
  provinceClub?: Province;
  club?: Club;
}

interface documentType {
  name?: string;
  value?: string;
  clubId?: number;
}

enum Status {
  WAITING = 'WAITING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

const AssignText = styled('div')({
  color: '#00AB55',
  marginLeft: '10px',
});

export const AddClub = memo(({ clubs, setClubs, id }: Props) => {
  const {
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useEditAssociationSlice();
  const { clubAssociationInformation, editClub } =
    useSelector(selectAssociation);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [clubInfo, setClubInfo] = useState<documentType[] | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onClick, setOnclick] = useState<boolean>(false);
  const [formData, setFormData] = useState<dataRequest>();
  const [posRM, setPosRM] = useState<any>();
  const [posClub, setPosClub] = useState<boolean>(false);
  const [checkReset, setCheckReset] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: dataRequest) => {
    const newClub = clubs;
    const checkNewClub = newClub.find((element: any) => {
      if (element.clubId === data?.club?.id) {
        return true;
      }
    });
    if (!checkNewClub) {
      setFormData(data);
      const idAssociation = id;
      dispatch(
        actions.approveUpdateClub({
          id: idAssociation,
          body: {
            clubId: data?.club?.id,
            status: Status.ACCEPTED,
          },
        }),
      );
      setCheckReset(true);
    } else {
      setCheckReset(false);
      Notifier.addNotifyError({
        messageId: 'clubAssociationInformation.addClubFailed',
      });
    }
  };

  useEffect(() => {
    if (clubAssociationInformation) {
      const newDocument: any[] = [];
      const newClub: any[] = [];
      clubAssociationInformation?.data.map((res: any) => {
        newDocument.push({
          name: res.provinceClub,
          value: res.clubName,
          clubId: res.clubId,
        });
        newClub.push({
          clubId: res.clubId,
          associationId: parseInt(id),
          status: res.status,
        });
      });
      setClubInfo(newDocument);
      setClubs(newClub);
    }
  }, [clubAssociationInformation]);

  useEffect(() => {
    const newDocument = clubInfo ? clubInfo : [];
    const newClub = clubs;
    if (editClub === EditClubStatus.ADDED) {
      newClub.push({ clubId: formData?.club?.id });
      newDocument.push({
        name: formData?.provinceClub?.name,
        value: formData?.club?.clubName,
        clubId: formData?.club?.id,
      });
      Notifier.addNotifySuccess({
        messageId: 'clubAssociationInformation.successfulInvite',
      });
      setIsOpen(false);
      setClubs(newClub);
      setClubInfo(newDocument);
    }
  }, [editClub]);

  useEffect(() => {
    const newDocument = clubInfo ? clubInfo : [];
    const newClub = clubs;
    if (editClub === EditClubStatus.REMOVED) {
      newDocument.splice(posRM, 1);
      newClub.splice(posRM, 1);
      setClubs(newClub);
      setClubInfo(newDocument);
      setOnclick(!onClick);
      Notifier.addNotifySuccess({
        messageId: 'clubAssociationInformation.removeClubSuccess',
      });
    }
  }, [editClub, posRM]);

  function handleRemove(pos: any, clubID: any) {
    setPosRM(pos);
    const idAssociation = id;
    dispatch(
      actions.approveUpdateClub({
        id: idAssociation,
        body: {
          clubId: clubID,
          status: Status.REJECTED,
        },
      }),
    );
  }

  const handleAddClub = () => {
    setIsOpen(true);
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
          {t(translations.clubAssociationInformation.inviteClub)}
        </Box>
        {collapse ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          {/* {clubInfo &&
            clubInfo.length > 0 &&
            clubInfo.map((res: documentType, index: any) => (
              <Grid
                item
                xs={12}
                md={6}
                sx={
                  index > 1
                    ? { mt: 0, paddingTop: '0px!important' }
                    : { mt: 0, paddingTop: '1rem!important' }
                }
              >
                <Stack key={'clubName' + index}>
                  <AddClubField
                    id={index}
                    name={res?.name}
                    data={res?.value}
                    clubId={res?.clubId}
                    handleRemove={handleRemove}
                  />
                </Stack>
              </Grid>
            ))} */}
        </Grid>
        <Grid
          sx={
            clubInfo && clubInfo?.length > 0
              ? { display: 'flex', mt: 2 }
              : { display: 'flex', mt: 2 }
          }
          mb={2}
        >
          <IconButton
            component="span"
            children={<AddIcon />}
            sx={{ borderRadius: '50%', border: '1px solid', padding: 0 }}
            onClick={handleAddClub}
          />
          <AssignText>
            {t(translations.clubAssociationInformation.inviteMoreClub)}
          </AssignText>
        </Grid>
      </Collapse>
      <DialogAddClub
        open={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        setCheckReset={setCheckReset}
        checkReset={checkReset}
      />
    </Card>
  );
});
