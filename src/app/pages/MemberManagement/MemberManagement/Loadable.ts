/**
 *
 * Asynchronously loads the component for MemberManagement
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MemberManagement = lazyLoad(
  () => import('./index'),
  module => module.default,
);
