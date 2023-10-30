import { MemberStatus } from 'types/enums';
import { Stack, Box } from '@mui/material';
import { get } from 'lodash';

interface Props {
  status?: MemberStatus;
  value?: string;
  // transparentBg?: boolean;
}

// export const backgroundColor = (status?: MemberStatus): string => {
//   switch (get(MemberStatus, `${status}`, '')) {
//     case MemberStatus.BANNED:
//       return '#F7CBD4';
//     case MemberStatus.EXPIRED:
//       return '#FFE1CB';
//     case MemberStatus.ACTIVE:
//     case MemberStatus.DONE:
//     case MemberStatus.APPROVED:
//       return '#ACF7A6';
//     case MemberStatus.PROCESSING:
//       return '#FFEBB7';
//     case MemberStatus.VERIFYING:
//       return '#BBBBBB';
//     case MemberStatus.DRAFT:
//     case MemberStatus.PENDING:
//       return '#F0D6C3';
//     case MemberStatus.ACTIVATED:
//       return 'rgba(84, 214, 44, 0.16)'
//     default:
//       return '#fff';
//   }
// };

export const textColor = (status?: MemberStatus): string => {
  switch (get(MemberStatus, `${status}`, '')) {
    case MemberStatus.BANNED:
      return '#DA0E31';
    case MemberStatus.EXPIRED:
      return '#B72136';
    case MemberStatus.PENDING:
      return '#FF6B00';
    case MemberStatus.ACTIVE:
    case MemberStatus.APPROVED:
    case MemberStatus.DONE:
      return '#22B502';
    case MemberStatus.PROCESSING:
      return '#FF3427';
    case MemberStatus.VERIFYING:
      return '#E73008';
    case MemberStatus.DRAFT:
      return '#B9BD00';
    case MemberStatus.ACTIVATED:
      return '#229A16';
    default:
      return '#333';
  }
};

export function Package(props: Props) {
  const { status, value } = props;
  return (
    <>
      <Stack direction="column" justifyContent="flex-start">
        <Box>{value}</Box>
        <Box
          sx={{
            // backgroundColor: transparentBg
            //   ? 'transparent'
            //   : backgroundColor(status),
            // padding: transparentBg ? '0px' : '0px 8px',
            // borderRadius: transparentBg ? 0 : '10px',
            color: textColor(status),
          }}
        >
          {get(MemberStatus, `${status}`)}
        </Box>
      </Stack>
    </>
  );
}
