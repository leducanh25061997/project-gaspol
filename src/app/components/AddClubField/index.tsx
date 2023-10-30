import { Typography, styled, FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
  id?: any;
  name?: string;
  data?: string;
  clubId?: any;
  handleRemove: (id: any, clubId: any) => void;
}

const CardRoot = styled('div')({
  '& .MuiFormHelperText-root': {
    marginLeft: '14px',
    color: 'rgba(168, 70, 0, 1)',
  },
});

export const AddClubField = (props: Props) => {
  const { name, data, handleRemove, id, clubId } = props;

  return (
    <CardRoot>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FormControl fullWidth sx={{ mt: 0 }}>
          <Controller
            name={name ? name : ''}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label={name ? name : ''}
                  type="text"
                  value={data ? data : ''}
                  InputProps={{
                    endAdornment:
                      typeof id !== 'undefined' ||
                      typeof clubId !== 'undefined' ? (
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemove(id, clubId)}
                        >
                          <img
                            style={{ width: '16px' }}
                            src={window.location.origin + '/images/delete.svg'}
                          />
                        </span>
                      ) : (
                        <></>
                      ),
                  }}
                />
              );
            }}
          />
        </FormControl>
      </div>
    </CardRoot>
  );
};
