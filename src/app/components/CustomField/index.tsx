import {
  Typography,
  styled,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CreateAssociationRequest_taaAssociation_Members } from 'types/AssociationManagement';
import { Roles } from 'types/enums';

import { TextFieldAssign } from '../TextFieldAssign';

interface Props {
  name: string;
  title: string;
  handleRemove: (id: any) => void;
  associationMng?: CreateAssociationRequest_taaAssociation_Members[];
  role: Roles;
  setIsOpen?: (value: boolean) => void;
  setIsOpenAssignUser?: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
  setTitle: (value: string) => void;
  setRole: (value: Roles) => void;
  control: any;
  errors?: any;
  setCategory?: (value: string) => void;
}

const CardRoot = styled('div')({
  '& .MuiFormHelperText-root': {
    marginLeft: '14px',
    color: 'rgba(168, 70, 0, 1)',
  },
});

export const CustomField = (props: Props) => {
  const {
    name,
    title,
    handleRemove,
    associationMng,
    role,
    setIsOpen,
    setIsOpenAssignUser,
    setIsAdmin,
    setTitle,
    setRole,
    control,
    errors,
    setCategory,
  } = props;

  return (
    <>
      {associationMng &&
      associationMng.filter(value => value.role === role).length > 0 ? (
        associationMng
          .filter(value => value.role === role)
          .map(value => (
            <CardRoot>
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <FormControl fullWidth>
                  <Controller
                    name={title}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          label={title}
                          type="text"
                          value={value.fullName}
                          InputProps={{
                            endAdornment:
                              typeof role !== 'undefined' ? (
                                <span
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleRemove(role)}
                                >
                                  <img
                                    style={{ width: '16px' }}
                                    src={
                                      window.location.origin +
                                      '/images/delete.svg'
                                    }
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
          ))
      ) : (
        <>
          <Controller
            name={name}
            render={({ field }) => {
              return (
                <TextFieldAssign
                  title={title}
                  handleOpen={() => {
                    setIsOpen && setIsOpen(true);
                    setIsOpenAssignUser && setIsOpenAssignUser(true);
                    setIsAdmin(true);
                    setTitle(title);
                    setRole(role);
                    name && setCategory && setCategory(name);
                  }}
                />
              );
            }}
            control={control}
          />
          {errors && errors[`${name}`] && (
            <FormHelperText>{errors[`${name}`]?.message}</FormHelperText>
          )}
        </>
      )}
    </>
  );
};
