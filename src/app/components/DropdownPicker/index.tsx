import React from 'react';
import moment from 'moment';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import styled from 'styled-components';

const CustomTextField = styled(TextField)`
  min-width: 140px;
  & .MuiInputBase-input {
    padding: 9px 14px;
  }
`;

type Props = Omit<TextFieldProps, 'onChange' | 'value' | 'select' | 'label'> & {
  data: {
    value: any;
    label: string;
  }[];
  label: string;
};

export default function DropdownPicker(props: Props) {
  const { defaultValue, label, data, ...rest } = props;
  const [value, setValue] = React.useState(defaultValue);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <CustomTextField
      {...rest}
      select
      label={label}
      value={value}
      onChange={handleChangeValue}
    >
      {data.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}
