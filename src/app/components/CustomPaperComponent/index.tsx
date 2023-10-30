/**
 *
 * ApprovalDialog
 *
 */
import { memo } from 'react';
import { Paper, Stack } from '@mui/material';
import { PageableClub, Clubdata } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  setNextPage: () => void;
  param: any;
  clubsRequest: PageableClub<Clubdata> | undefined;
}

export const CustomPaperComponent = memo(
  ({ setNextPage, param, clubsRequest }: Props) => {
    const { t } = useTranslation();
    return (
      <Stack>
        {Number(clubsRequest?.data?.length) === 0 && !clubsRequest?.isScroll && (
          <Stack
            sx={{
              color: 'gray',
              mt: -5,
              ml: 3,
            }}
          >
            {t(translations.common.notFound)}
          </Stack>
        )}
        <Paper {...param} />
      </Stack>
    );
  },
);
