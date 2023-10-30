import {
  MemberStatus,
  MemberStatusLowerCase,
  MemberListStatusLowerCase,
  PackageStatus,
  PackageStatusLowerCase,
} from 'types/enums';
import { Stack, Box } from '@mui/material';
import { get } from 'lodash';
interface Props {
  status?: MemberStatus;
  transparentBg?: boolean;
  isPackage?: boolean;
  isMemberOfClub?: boolean;
}

export const backgroundColor = (status?: MemberStatus): string => {
  switch (get(MemberStatus, `${status}`, '')) {
    case MemberStatus.EXPIRED:
    case MemberStatus.BANNED:
      return '#F7CBD4';
    case MemberStatus.PAYMENT_FAILED:
      return '#FFE1CB';
    case MemberStatus.ACTIVE:
    case MemberStatus.DONE:
    case MemberStatus.APPROVED:
    case MemberStatus.ACCEPTED:
      return '#ACF7A6';
    case MemberStatus.PROCESSING:
      return 'rgba(255, 193, 7, 0.16)';
    case MemberStatus.ERROR:
      return 'rgba(255, 72, 66, 0.16)';
    case MemberStatus.DRAFT:
    case MemberStatus.PENDING:
      return '#F0D6C3';
    case MemberStatus.CREATED:
    case MemberStatus.PAYMENT_PROCESSING:
    case MemberStatus.PAYMENT_ERROR:
    case MemberStatus.ACTIVATED:
    case MemberStatus.VERIFYING:
    case MemberStatus.SUCCESS:
      return 'rgba(84, 214, 44, 0.16)';
    default:
      return '#fff';
  }
};

export const textColor = (status?: MemberStatus): string => {
  switch (get(MemberStatus, `${status}`, '')) {
    case MemberStatus.EXPIRED:
    case MemberStatus.BANNED:
      return '#DA0E31';
    case MemberStatus.PAYMENT_FAILED:
    case MemberStatus.PENDING:
      return '#FF6B00';
    case MemberStatus.ACTIVE:
    case MemberStatus.APPROVED:
    case MemberStatus.DONE:
    case MemberStatus.SUCCESS:
    case MemberStatus.ACCEPTED:
      return '#22B502';
    case MemberStatus.PROCESSING:
      return '#B78103';
    case MemberStatus.DRAFT:
      return '#B9BD00';
    case MemberStatus.PAYMENT_ERROR:
    case MemberStatus.PAYMENT_PROCESSING:
    case MemberStatus.CREATED:
    case MemberStatus.ACTIVATED:
    case MemberStatus.VERIFYING:
      return '#229A16';
    case MemberStatus.ERROR:
      return 'rgba(183, 33, 54, 1)';
    default:
      return '#333';
  }
};

const renderStatus = (
  transparentBg?: boolean,
  isPackage?: boolean,
  isMemberOfClub?: boolean,
  status?: MemberStatus,
) => {
  if (transparentBg || isPackage) {
    return get(PackageStatusLowerCase, `${status}`);
  } else if (isMemberOfClub) {
    return get(MemberListStatusLowerCase, `${status}`);
  } else {
    return get(MemberStatusLowerCase, `${status}`);
  }
};

export function Status(props: Props) {
  const { status, transparentBg, isPackage, isMemberOfClub } = props;
  return (
    <>
      <Stack direction="row" justifyContent="flex-start">
        <Box
          sx={{
            backgroundColor: transparentBg
              ? 'transparent'
              : backgroundColor(status),
            padding: transparentBg ? '0px' : '0px 8px',
            borderRadius: transparentBg ? 0 : '8px',
            color: textColor(status),
            fontWeight: 700,
          }}
        >
          {renderStatus(transparentBg, isPackage, isMemberOfClub, status)}
          {/* {transparentBg || isPackage
            ? get(PackageStatusLowerCase, `${status}`)
            : get(MemberStatusLowerCase, `${status}`)} */}
        </Box>
      </Stack>
    </>
  );
}
