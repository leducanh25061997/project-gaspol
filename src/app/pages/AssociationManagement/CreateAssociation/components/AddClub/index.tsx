import { memo, useState } from 'react';
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

import { DialogAddClub } from '../DialogAddClub';

interface Props {
  clubs: any;
  setClubs: any;
}

interface dataRequest {
  provinceClub?: Province;
  club?: Club;
}

interface documentType {
  name?: string;
  value?: string;
}
const AssignText = styled('div')({
  color: '#00AB55',
  marginLeft: '10px',
});

export const AddClub = memo(({ clubs, setClubs }: Props) => {
  const {
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(true);
  const [clubInfo, setClubInfo] = useState<documentType[] | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onClick, setOnclick] = useState<boolean>(false);
  const [posClub, setPosClub] = useState<boolean>(false);
  const [checkReset, setCheckReset] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: dataRequest) => {
    const newDocument = clubInfo ? clubInfo : [];
    const newClub = clubs;
    const checkNewClub = newClub.find((element: any) => {
      if (element.clubId === data?.club?.id) {
        return true;
      }
    });
    if (!checkNewClub) {
      newClub.push({ clubId: data?.club?.id });
      newDocument.push({
        name: data?.provinceClub?.name,
        value: data?.club?.clubName,
      });
      setClubs(newClub);
      setClubInfo(newDocument);
      setIsOpen(false);
      Notifier.addNotifySuccess({
        messageId: 'clubAssociationInformation.successfulInvite',
      });
      setCheckReset(true);
    } else {
      Notifier.addNotifyError({
        messageId: 'clubAssociationInformation.addClubFailed',
      });
      setCheckReset(false);
    }
  };

  function handleRemove(id: any) {
    const newClubInfo = clubInfo ? clubInfo : [];
    newClubInfo.splice(id, 1);
    setClubInfo(newClubInfo);
    setOnclick(!onClick);
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
