import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import searchIcon from 'assets/images/search-icon.svg';
import { useRef } from 'react';
interface Props {
  onSearch: (value: string) => void;
  placeholder?: string;
  keyword?: string;
  width?: number | string;
  className?: string;
  size?: 'small' | 'medium';
}

export const SearchBar = (props: Props) => {
  const {
    keyword = '',
    placeholder = '',
    onSearch,
    width = '100%',
    size,
    ...rest
  } = props;

  const timeOutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: any) => {
    timeOutIdRef.current && clearTimeout(timeOutIdRef.current);
    timeOutIdRef.current = setTimeout(() => {
      const value = event?.target?.value;
      onSearch(value);
    }, 500);
  };

  return (
    <Autocomplete
      {...rest}
      freeSolo
      options={[]}
      onChange={handleChange}
      onInputChange={handleChange}
      value={keyword || ''}
      onKeyPress={handleChange}
      disableClearable
      size={size}
      renderInput={params => (
        <TextField
          placeholder={placeholder}
          {...params}
          sx={{
            width,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <img src={searchIcon} alt="" />
                </InputAdornment>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
