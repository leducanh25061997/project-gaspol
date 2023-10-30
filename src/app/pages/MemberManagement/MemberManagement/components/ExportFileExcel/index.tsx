import {
  Typography,
  FormControl,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { CustomDialog } from 'app/components/CustomDialog';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import {
  Controller,
  FieldError,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { memo, useEffect, useState } from 'react';
import DateRangeComponent from 'app/components/DateRangeComponent';
import moment from 'moment';

interface ExportRequest {
  // startDate?: string;
}
interface Props {
  openDialog: boolean;
  onCancel?: () => void;
  onSubmit: (data: any) => void;
}
const ExportExCel = memo((props: Props) => {
  const { openDialog, onCancel, onSubmit } = props;
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    fromDate: '',
    toDate: '',
  });

  const validateForm = yup.object().shape({
    rangeDate: yup
      .object()
      .required(t(translations.exportData.PeriodTimeIsRequired))
      .nullable(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateForm),
  });

  // const onSubmit = (inputData: ExportRequest) => {
  //   console.log(inputData);
  // };

  const handleDoneFilter = (rangeDate: any) => {
    const newFilter = {
      ...filter,
      fromDate:
        rangeDate?.length && rangeDate[0]
          ? parseInt(moment(rangeDate[0]).format('x'))?.toString()
          : ('' as string),
      toDate:
        rangeDate?.length && rangeDate[1]
          ? parseInt(moment(rangeDate[1]).endOf('day').format('x')).toString()
          : ('' as string),
    };
    setFilter(newFilter);
    setValue('rangeDate', newFilter);
  };

  useEffect(() => {
    if (!openDialog) {
      clearErrors(['rangeDate']);
    }
  }, [openDialog]);

  const content = (
    <div>
      <Typography sx={{ marginBottom: 3, marginTop: 3 }}>
        {t(translations.common.chooseTimePeriod)}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <FormControl>
              <Controller
                name="rangeDate"
                render={({ field }) => {
                  return (
                    <DateRangeComponent
                      handleDoneFilter={handleDoneFilter}
                      resetPicker={() => {
                        setFilter({
                          ...filter,
                          fromDate: '',
                          toDate: '',
                        });
                      }}
                      errors={errors}
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <LoadingButton onClick={handleSubmit(onSubmit)} variant="contained">
              {t(translations.common.export)}
            </LoadingButton>
          </Grid>
        </Grid>

        {/* <Button
          variant="contained"
          onSubmit={handleSubmit(onSubmit)}
          type="submit"
        >
          {t(translations.common.create)}
        </Button> */}
      </form>
    </div>
  );
  return (
    <>
      <CustomDialog
        open={openDialog}
        title={t(translations.common.exportData)}
        content={content}
        onCancel={onCancel}
      />
    </>
  );
});
export default ExportExCel;
