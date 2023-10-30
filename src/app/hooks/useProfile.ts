import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';
import { Role } from 'types/Role';

export const useProfile = () => {
  const { userInformation } = useSelector(selectAuth);
  return userInformation;
};

export const useRole = () => {
  const { userInformation } = useSelector(selectAuth);

  const userRoles = React.useMemo(
    () => userInformation?.roles || [],
    [userInformation],
  );

  const userHasAtLeastAllowedRoles = React.useCallback(
    (allowedRoles: Role[]): boolean => {
      return allowedRoles.some(role => userRoles?.includes(role));
    },
    [userRoles],
  );

  const userHasWholeAllowedRoles = React.useCallback(
    (allowedRoles: Role[]): boolean => {
      return allowedRoles.every(role => userRoles?.includes(role));
    },
    [userRoles],
  );

  return { userRoles, userHasAtLeastAllowedRoles, userHasWholeAllowedRoles };
};
