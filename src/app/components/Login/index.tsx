import { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { KeycloakError, AuthParams } from 'types';
// ----------------------------------------------------------------------
interface Props {
  onSubmit: (values: AuthParams) => void;
  error?: KeycloakError;
}

const authSchema = Yup.object()
  .shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  })
  .required();

export default function LoginForm(props: Props) {
  const { onSubmit } = props;
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<AuthParams>({ resolver: yupResolver(authSchema) });

  const handleShowPassword = useCallback(() => {
    setShowPassword(show => !show);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          {...register('username')}
          fullWidth
          label={t(translations.loginPage.username)}
          error={!!(errors.username && errors.username.type === 'required')}
          helperText={
            !!(errors.username && errors.username.type === 'required') &&
            t(translations.loginPage.usernameIsRequired)
          }
        />
        <TextField
          {...register('password')}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label={t(translations.loginPage.password)}
          error={!!(errors.password && errors.password.type === 'required')}
          helperText={
            !!(errors.password && errors.password.type === 'required') &&
            t(translations.loginPage.passwordIsRequired)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? 'mdi:eye' : 'mdi:eye-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link component={RouterLink} variant="subtitle2" to="#">
          {t(translations.loginPage.forgotPassword)}
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t(translations.loginPage.login)}
      </LoadingButton>
    </form>
  );
}
