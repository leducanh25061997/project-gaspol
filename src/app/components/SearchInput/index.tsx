import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import searchIcon from 'assets/images/search-icon.svg';
import React, { useRef, useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
  placeholder?: string;
  keyword?: string;
  width?: number | string;
  className?: string;
  size?: 'small' | 'medium';
  defaultValue?: string;
}

export const SearchInput = (props: Props) => {
  const {
    keyword = '',
    placeholder = '',
    onSearch,
    width = '100%',
    size,
    defaultValue,
    ...rest
  } = props;
  const [value, setValue] = useState('');
  React.useEffect(() => {
    if (keyword) {
      setValue(keyword);
    }
  }, [keyword]);

  const timeOutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: any) => {
    const text = event.target.value;
    setValue(text);
    timeOutIdRef.current && clearTimeout(timeOutIdRef.current);
    timeOutIdRef.current = setTimeout(() => {
      onSearch(text);
    }, 10);
  };

  return (
    <TextField
      placeholder={placeholder}
      onChange={handleChange}
      value={typeof defaultValue !== 'undefined' ? defaultValue : value}
      // onKeyPress={handleChange}
      sx={{
        width,
      }}
      id="searchName"
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <img src={searchIcon} alt="" />
            </InputAdornment>
          </>
        ),
      }}
    />
  );
};
