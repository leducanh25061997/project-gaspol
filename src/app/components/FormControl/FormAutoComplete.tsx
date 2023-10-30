import { TextField, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { get } from 'lodash';

interface Props {
  control: any;
  errors: any;
  label: string;
  name: string;
  options?: any;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (_: any, data: any, field: any) => void;
  getOptionLabel?: (option: any) => string;
}

export const FormAutoComplete = (props: Props) => {
  const {
    control,
    errors,
    label,
    name,
    options,
    disabled,
    multiple,
    onChange,
    getOptionLabel,
  } = props;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={multiple ? [] : ''}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            multiple={multiple}
            freeSolo
            options={options}
            disabled={disabled}
            onChange={(_, data) => {
              if (onChange) {
                onChange(_, data, field);
              }
            }}
            value={field.value || ''}
            getOptionLabel={getOptionLabel}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                error={!!get(errors, name)}
                helperText={get(errors, `${name}.message`)}
                onChange={event => field.onChange(event)}
              />
            )}
          />
        );
      }}
    />
  );
};
