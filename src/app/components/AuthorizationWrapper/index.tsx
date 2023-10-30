import * as React from 'react';
import { useProfile } from 'app/hooks';
import { Role } from 'types/Role';

interface Props {
  children: any;
  allowedRoles?: Role[];
}
function AuthorizationWrapper(props: Props) {
  const { children, allowedRoles } = props;
  const userRoles = useProfile()?.roles || [];
  const hasPermission = (allowedRoles || []).every(role =>
    userRoles.includes(role),
  );
  return hasPermission ? children : null;
}
export default AuthorizationWrapper;
