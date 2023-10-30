import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { get } from 'lodash';
import { useEffect } from 'react';
interface Props {
  control: any;
  errors: any;
  label: string;
  name: string;
  [propsName: string]: any;
}

export const FormTextField = (props: Props) => {
  const { control, errors, label, name, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          error={!!get(errors, name)}
          label={label}
          helperText={get(errors, `${name}.message`)}
          onChange={event => field.onChange(event)}
          InputLabelProps={{ shrink: field.value }}
        />
      )}
    />
  );
};
