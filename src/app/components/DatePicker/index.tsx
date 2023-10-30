import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import styled from 'styled-components';

interface Props {
  label: string;
  className?: string;
}

const RootContainer = styled.div`
  .MuiInputBase-input {
    padding: 9px 14px;
  }
`;
export default function DatePicker(props: Props) {
  const { label, className } = props;
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <RootContainer className={className}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </RootContainer>
  );
}
