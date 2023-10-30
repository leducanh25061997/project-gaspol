import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  TextField,
  InputAdornment,
  Stack,
  FormHelperText,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { translations } from 'locales/translations';
import { Controller, FieldErrors } from 'react-hook-form';
import { PhoneNumberRequest } from 'types';

interface Props {
  errors?: FieldErrors;
  control: any;
  fieldName: string;
  requestPhoneNumber: (payload: PhoneNumberRequest) => void;
  phoneRequestType?: string;
  label: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const PhoneNumberInput = memo(
  ({
    control,
    errors,
    fieldName,
    requestPhoneNumber,
    phoneRequestType,
    label,
    disabled,
    defaultValue,
  }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(
      '',
    );

    const verifyPhoneNumber = (phoneNumber: any) => {
      if (phoneNumber) {
        const newPhone = phoneNumber.split(' ');
        const newPhoneNumberShift = newPhone
          .filter((element: any, index: number) => index > 0)
          .join('');
        const phoneNumberRequest: PhoneNumberRequest = {
          number: newPhoneNumberShift,
          type: phoneRequestType,
        };
        dispatch(requestPhoneNumber(phoneNumberRequest));
      }
      document.querySelector('.special-label')?.classList.remove('onFocus');
    };

    return (
      <Stack>
        <Controller
          name="phone"
          render={({ field }) => {
            return (
              <PhoneInput
                {...field}
                autoFormat={true}
                containerStyle={{ width: '100%' }}
                searchClass="search-class"
                inputClass="fullWidth"
                inputStyle={{ width: '100%' }}
                enableTerritories
                enableSearch={true}
                country="id"
                specialLabel={`${t(translations.createClubError.phoneNumber)}*`}
                onChange={(e: any) => {
                  field.onChange(e);
                }}
                onFocus={_ => {
                  document
                    .querySelector('.special-label')
                    ?.classList.add('onFocus');
                }}
                onBlur={e => verifyPhoneNumber(e.target.value)}
                inputProps={{
                  name: 'phone',
                }}
              />
            );
          }}
          control={control}
        />
        {errors?.message ? (
          <FormHelperText>{errors?.message}</FormHelperText>
        ) : (
          ''
        )}
        {/* // <Controller
        //   name={fieldName}
        //   control={control}
        //   render={({ field }) => {
        //     return (
        //       <TextField
        //         error={!!errors}
        //         type="number"
        //         label={label}
        //         InputProps={{
        //           startAdornment: (
        //             <InputAdornment position="start">+62</InputAdornment>
        //           ),
        //           inputProps: { type: 'number', pattern: '[0-9*]' },
        //         }}
        //         helperText={errors?.message}
        //         onChange={(event: any) => {
        //           field.onChange(event);
        //         }}
        //         value={field.value ? field.value : defaultValue}
        //         disabled={disabled}
        //         onBlur={(event: any) => {
        //           verifyPhoneNumber(event.target.value);
        //         }}
        //       />
        //     );
        //   }}
        // /> */}
      </Stack>
    );
  },
);
