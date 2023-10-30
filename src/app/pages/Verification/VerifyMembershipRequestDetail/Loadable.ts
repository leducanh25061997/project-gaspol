/**
 *
 * Asynchronously loads the component for VerifyMembershipRequestDetail
 *
 */

import { lazyLoad } from 'utils/loadable';

export const VerifyMembershipRequestDetail = lazyLoad(
  () => import('./index'),
  module => module.VerifyMembershipRequestDetail,
);
