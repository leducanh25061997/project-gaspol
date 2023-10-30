import { RequestStatus } from 'types';
import { Stack, Box } from '@mui/material';

interface Props {
  status?: RequestStatus;
}

export const backgroundColor = (status?: RequestStatus): string => {
  switch (status) {
    case 'In Queuing':
      return '#e4f8dd';
    case 'Freezed':
      return '#ffe2e1';
    case 'No-Response':
      return '#c8d3fcd9';
    case 'Missing - Data':
      return '#fff5d7';
    default:
      return '#fff';
  }
};

export const textColor = (status?: RequestStatus): string => {
  switch (status) {
    case 'In Queuing':
      return '#229a16';
    case 'Freezed':
      return '#b72136';
    case 'No-Response':
      return '#16579a';
    case 'Missing - Data':
      return '#b78103';
    default:
      return '#333';
  }
};

export function MembershipRequestStatus(props: Props) {
  const { status } = props;
  return (
    <>
      <Stack direction="row" justifyContent="flex-start">
        <Box
          sx={{
            backgroundColor: backgroundColor(status),
            padding: '0px 8px',
            borderRadius: '10px',
            color: textColor(status),
          }}
        >
          {status}
        </Box>
      </Stack>
    </>
  );
}
